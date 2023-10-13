import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Filler from '../../common/Filler';
import RegistrarContext from '../../contexts/RegistrarContext';
import ScheduleCodeContext from '../../contexts/ScheduleCodeContext';

export default function DetailsTab({ navigation }: any) {
  const [subjectDetails, setSubjectDetails] = useState<Object>([]);
  const [studentList, setStudentList] = useState<string[][]>([]);

  const registrar = useContext(RegistrarContext);
  const [scheduleCode, setScheduleCode] = useContext(ScheduleCodeContext);

  useEffect(() => {
    console.log('Hello from Details!');
  }, []);

  useEffect(() => {
    if (scheduleCode === null) {
      return;
    }

    (async () => {
      setSubjectDetails({});
      setStudentList([]);

      const [details, students]: any = await registrar.getSubjectInfo(
        scheduleCode
      );

      setSubjectDetails(details);
      setStudentList(students);
    })();
  }, [scheduleCode]);

  if (scheduleCode === null) {
    return <Filler text={'•́ ‿ ,•̀'} description={'i has nothin'} />;
  }

  return studentList.length === 0 ? (
    <ActivityIndicator
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size="large"
      color="forestgreen"
    />
  ) : (
    <View style={{ flex: 1 }}>
      <SubjectInfo details={subjectDetails} />

      <View
        style={{
          height: 5,
          marginHorizontal: 12,
          marginVertical: 12,
          backgroundColor: 'lightgray',
          borderRadius: 24,
        }}
      />

      <FlatList
        // ListHeaderComponent={<SubjectInfo details={subjectDetails} />}
        // stickyHeaderIndices={[0]}
        // style={{ marginHorizontal: 18 }}
        keyExtractor={(item) => item[0]}
        data={studentList}
        renderItem={({ item, index }) => {
          return <StudentItem item={item} />;
        }}
      />
    </View>
  );
}

function SubjectInfo({
  details: {
    'Available Slots': availableSlots,
    Note: note,
    Schedule: schedule,
    'Schedule Code': schedCode,
    'School Year': schoolYear,
    Section: section,
    'Subject Code': subject,
    Units: units,
  },
  details,
}: {
  details: any;
}) {
  let toScheduleString: string[] = [];
  for (let item of schedule) {
    Object.entries(item).forEach(([day, sched]) =>
      toScheduleString.push(`${day}: ${sched}`)
    );
  }

  let scheduleString = toScheduleString.join('\n');
  // Reorder details
  details = {
    'Academic Year': schoolYear,
    'Schedule Code': schedCode,
    Subject: subject,
    Section: section,
    Schedule: scheduleString,
    Units: units,
    Slots: availableSlots,
    Notes: note,
  };

  // Header itself
  return (
    <View
      style={{
        marginHorizontal: 8,
        marginTop: 8,
        // backgroundColor: 'gray',
      }}
    >
      {Object.keys(details).map((key, index) => {
        return (
          // Info rows
          <View
            key={index}
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 0.25,
                fontFamily: 'sans-serif-light',
                fontSize: 10,
                textAlign: 'right',
                // backgroundColor: 'gray',
                marginHorizontal: 3,
                marginTop: 3,
              }}
            >
              {key}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 10,
                fontWeight: ['Subject', 'Section', 'Schedule'].includes(key)
                  ? 'bold'
                  : 'normal',
                // color: ['Subject', 'Section', 'Schedule'].includes(key)
                //   ? 'darkolivegreen'
                //   : 'black',
                backgroundColor: 'gainsboro',
                marginHorizontal: 3,
                marginTop: 3,
                // padding: 1,
              }}
            >
              {details[key]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function StudentItem({
  item,
  item: [index, name, studentID, course, gender, status],
}: {
  item: any;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000 * 0.33,
      delay: index * 1000 * 0.25,
      useNativeDriver: true,
    }).start();
  }, []);

  // For icons
  let iconName,
    iconColor = 'white';
  if (gender.toLowerCase() === 'female') {
    iconName = 'woman-outline';
    // iconColor = '#c72481';
  } else {
    iconName = 'man-outline';
    // iconColor = '#45a9a3';
  }

  // For names
  let [surname, firstName] = name.split(', ');
  name = `${firstName} ${surname}`;
  // console.log(surname, firstName);

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        paddingVertical: 8,
        // paddingHorizontal: 12,
        marginHorizontal: 18,
        marginBottom: 12,
        backgroundColor: 'darkolivegreen',
        // justifyContent: 'space-between',
        borderRadius: 8,
        opacity: fadeAnim,
      }}
    >
      <Ionicons
        style={{ paddingHorizontal: 12 }}
        name={iconName}
        color={iconColor}
        size={42}
      />

      <View>
        {/* <View style={{ flexDirection: 'row' }}>
          <Text style={{}}>{firstName}</Text>
          <Text style={{}}>{surname}</Text>
        </View> */}

        <Text
          style={{
            // fontFamily: 'sans-serif-condensed',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: 'sans-serif-condensed',
            fontSize: 12,
            color: 'white',
          }}
        >
          {/* {[studentID, course, status].join(' | ')} */}
          {studentID}
        </Text>
        <Text
          style={{
            fontFamily: 'sans-serif-condensed',
            fontSize: 10,
            color: 'white',
            opacity: 0.5,
          }}
        >
          {[course, status].join(' | ')}
        </Text>
      </View>
    </Animated.View>
  );
}
