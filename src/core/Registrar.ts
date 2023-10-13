import cheerio from 'cheerio';
import superagent from 'superagent';

export default class Registrar {
  urls = {
    // registrar: 'https://httpbin.org/status/404',
    registrar: '[REDACTED]',
    subject: '[REDACTED]',
    student: '[REDACTED]',
  };

  startingPage: number = 0;
  numberOfResults: number = 20;
  searchKeyword: string = '';

  agent: superagent.SuperAgentStatic;

  // Yikes...
  options: any = {};
  selected: any = {};

  isLive: boolean = false;
  private waitingCallbacks: Array<{ (): void }> = [];
  private isClamped: boolean = false;

  constructor() {
    this.agent = superagent.agent();
  }

  // private constructor() {
  //   this.agent = superagent.agent();
  // }

  // static async initialize(clamp: boolean = false) {
  //   let registrar: Registrar = new Registrar();

  //   // School year, semester
  //   registrar.options = {};
  //   registrar.selected = {};
  //   if (!clamp) {
  //     await registrar.getOptions();
  //   }

  //   if (registrar.isLive) {
  //     registrar.logging(
  //       'log',
  //       'Initializing',
  //       !clamp
  //         ? 'Should return new instance...'
  //         : 'Option-getting is clamped!!!!'
  //     );
  //   }

  //   return registrar;
  // }

  clamp() {
    this.isClamped = true;
  }

  addCallback(callback: { (): void }) {
    if (!this.waitingCallbacks.includes(callback)) {
      this.waitingCallbacks.push(callback);
    }
  }

  async getOptions() {
    try {
      let options: any = {};
      let selected: any = {};

      if (!this.isClamped) {
        const mainPage = await this.agent.get(this.urls.registrar);

        let $ = cheerio.load(mainPage.text);

        $('select').each((_, category) => {
          let categoryName: string = $(category).attr('name') || '';

          options[categoryName] = [];
          $('option', $(category)).each((_, item) => {
            if ($(item).attr('selected')) {
              selected[categoryName] = $(item).text();
            }

            options[categoryName].push($(item).text());
          });
        });
        this.isLive = true;
      }

      this.options = options;
      this.selected = selected;

      // this.logging('log', 'Calling callbacks:', this.waitingCallbacks);
      for (let callback of this.waitingCallbacks) {
        this.logging('log', 'Queued callbacks', `Calling \`${callback.name}\``);
        callback();
      }

      this.logging(
        'log',
        'Initialization',
        !this.isClamped ? 'Wrapper should be ready...' : 'Wrapper is clamped!'
      );
    } catch (error) {
      this.isLive = false;
      this.logging('error', 'Failed to retrieve options', error);
    }
  }

  async changeOptions(given: any = {}) {
    if (!this.isLive) {
      this.logging(
        'warn',
        'Cannot change options',
        'Initial connection was not established'
      );
      return;
    }

    let validKeys = Object.keys(this.options);
    let givenKeys = Object.keys(given);
    for (let key of givenKeys) {
      if (validKeys.includes(key)) {
        let givenValue = given[key];
        if (this.options[key].includes(givenValue)) {
          this.selected[key] = givenValue;
        }
      } else {
        this.logging('warn', 'Given key may be invalid', key);
      }
    }

    try {
      await this.agent
        .post(this.urls.registrar)
        .send(this.encodeData(this.selected));
    } catch (error) {
      this.logging('error', 'Failed to change options', error);
    }
  }

  async getSubjects(keyword: string = null!, resultCount = null) {
    if (!this.isLive) {
      this.logging(
        'warn',
        'Cannot retrieve subjects',
        'Initial connection was not established'
      );
      return [];
    }

    if (keyword || keyword === '') {
      this.searchKeyword = keyword!;
    }

    if (resultCount) {
      this.numberOfResults = resultCount!;
    }

    const data = {
      start: this.startingPage,
      length: this.numberOfResults,
      'search[value]': this.searchKeyword,
    };
    const stringData = this.encodeData(data);

    try {
      let response = await this.agent.post(this.urls.subject).send(stringData);
      const rawSubjectData = JSON.parse(response.text).data;

      // code, subject name, sched code, section, free slots, link,
      let subjects = rawSubjectData.map(
        ([subjectCodeTag, subjectName, ...info]: [string, any]) => {
          let tag = cheerio.load(subjectCodeTag)('a');
          let [tagCode, tagLink] = [
            tag.text(),
            this.urls.registrar + tag.attr('href'),
          ];

          // Units: ` \(\d units?\)`
          // Digits: `\d`

          let units = subjectName.match(/ \(\d units?\)/g)[0];
          subjectName = subjectName.replace(units, '');
          units = units.match(/\d/g)[0];

          // console.log(subjectName, units, typeof units);

          // Descriptive object instead?
          let subjectInfoList = [tagCode, subjectName, ...info, units, tagLink];
          // console.log(subjectInfoList);
          return subjectInfoList;
        }
      );

      return await subjects;
    } catch (error) {
      this.logging('error', 'Failed to get subjects', error);
      return [];
    }
  }

  async getSubjectInfo(code: string) {
    try {
      let studentPage = await this.agent.get(
        `${this.urls.student}?schedcode=${code}`
      );

      let $ = cheerio.load(studentPage.text);

      // let subjectDetails: Object[] = [];
      // $('.profile-info-row').each((_, element) => {
      //   subjectDetails.push({
      //     [$(element).find('.profile-info-name').text().trim()]: $(element)
      //       .find('.profile-info-value')
      //       .text()
      //       .trim(),
      //   });
      // });

      let subjectDetails: {
        [key: string]: any;
      } = {};
      let schedule: any = [];
      $('.profile-info-row').each((_, element) => {
        let newKey = $(element).find('.profile-info-name').text().trim();
        let newValue = $(element).find('.profile-info-value').text().trim();

        if (newKey.length < 3) {
          schedule.push({
            [newKey]: newValue,
          });
        } else {
          subjectDetails[newKey] = newValue;
        }

        // if (Object.keys(subjectDetails).includes(newKey)) {
        //   let oldData = subjectDetails[newKey];
        //   if (typeof oldData === 'string') {
        //     subjectDetails[newKey] = [oldData, newValue];
        //   } else {
        //     subjectDetails[newKey].push(newValue);
        //   }
        // } else {
        //   subjectDetails[newKey] = newValue;
        // }
      });
      subjectDetails['Schedule'] = schedule;

      let students: string[][] = [];
      $('tr.black').each((_, element) => {
        let student: string[] = [];
        $('td', element).each((_, inner) => {
          student.push($(inner).text());
        });
        students.push(student);
      });

      return [subjectDetails, students];
    } catch (error) {
      this.logging('error', `Failed to get students of code ${code}`, error);
      return [];
    }
  }

  encodeData(data: any, delim = '&') {
    return Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join(delim);
  }

  logging(type: 'log' | 'error' | 'warn', message: string, error: any) {
    let logger = {
      log: console.log,
      error: console.error,
      warn: console.warn,
    }[type];
    logger(`[Registrar] ${message} | ${error}`);
  }
}
