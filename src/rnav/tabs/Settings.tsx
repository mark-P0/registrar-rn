import React, { useContext, useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import Filler from '../../common/Filler';
import RegistrarContext from '../../contexts/RegistrarContext';
import SettingsContext from '../../contexts/SettingsContext';

const yearSpaceDash = (year: string) => year.replace('-', ' - ');
const capitalize = (word: string) =>
  word[0].toUpperCase() + word.slice(1).toLowerCase();

export default function SettingsTab() {
  const [year, setYear] = useState<string>(null!);
  const [sem, setSem] = useState<string>(null!);
  const [options, setOptions] = useState([]);

  const registrar = useContext(RegistrarContext);
  const [currentSettings, setSettings] = useContext(SettingsContext);

  useEffect(() => {
    console.log('Hello from Settings!');
  }, []);

  useEffect(() => {
    (async () => {
      if ([year, sem].includes(null!)) {
        return;
      }

      let options = {
        schoolyear: year.replace(/ /g, ''),
        semester: sem.toUpperCase(),
      };

      await registrar.changeOptions(options);
      setSettings(options);
    })();
  }, [year, sem]);

  useEffect(() => {
    let initializeSettings = () => {
      let liveOptions: any = [];
      for (let item of Object.keys(registrar.options)) {
        liveOptions.push(
          item === 'schoolyear'
            ? {
                name: 'Academic Year',
                values: registrar.options[item].map(yearSpaceDash),
              }
            : item === 'semester'
            ? {
                name: 'Semester',
                values: registrar.options[item].map(capitalize),
              }
            : {}
        );
      }
      setOptions(liveOptions);

      setYear(yearSpaceDash(registrar.selected['schoolyear']));
      setSem(capitalize(registrar.selected['semester']));
    };

    if (!registrar.isLive) {
      registrar.addCallback(initializeSettings);
    } else {
      initializeSettings();
    }
  }, []);

  if (!registrar.isLive) {
    return <Filler text={'(◉‿◉)'} description={'despair'} />;
  }

  // Performance issues? Sa pag-open ng accordion
  return (
    <ScrollView>
      <List.Section title="Year & Semester">
        {options.map((item: any, index) => {
          const yearSetting: any = options[0];
          const toConsider: string =
            item.name === yearSetting.name ? year : sem;
          const usedCallback =
            item.name === yearSetting.name ? setYear : setSem;

          return (
            <List.Accordion
              key={index}
              title={item.name}
              description={toConsider}
            >
              {item.values.map((subitem: string, index: number) => (
                <List.Item
                  key={index}
                  title={subitem}
                  style={{ backgroundColor: 'gainsboro' }}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={
                        toConsider === subitem
                          ? 'circle-slice-8'
                          : 'circle-outline'
                      }
                    />
                  )}
                  onPress={() => {
                    usedCallback(subitem);
                  }}
                />
              ))}
            </List.Accordion>
          );
        })}
      </List.Section>

      <List.Section title="[DEBUG]">
        <List.Item
          title="Tap me for a surprise!"
          left={(props) => <List.Icon {...props} icon="react" />}
          onPress={() => {
            // console.log(registrar.options);
            Alert.alert(
              'surprise mo to',
              'olol pakyu',
              [
                {
                  text: 'Die',
                },
                {
                  text: 'Bitch',
                },
              ],
              { onDismiss: () => null }
            );
          }}
        />
      </List.Section>
    </ScrollView>
  );
}
