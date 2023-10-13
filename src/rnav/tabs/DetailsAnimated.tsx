import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  View,
} from 'react-native';
import RegistrarContext from '../../contexts/RegistrarContext';
import ScheduleCodeContext from '../../contexts/ScheduleCodeContext';

let testDetails = {
  /* [REDACTED] */
};

let testStudents = [
  /* [REDACTED] */
];

let height = 100;
export default function DetailsTab({ navigation }: any) {
  const scrollY = new Animated.Value(0);
  // Height should be height of header
  // Currently hard-coded
  // Paano makukuha yung height
  const clampY = Animated.diffClamp(scrollY, 0, height);
  const interpolY = clampY.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
  });

  const [subjectDetails, setSubjectDetails] = useState<Object>(testDetails);
  const [studentList, setStudentList] = useState<string[][]>(testStudents);

  const registrar = useContext(RegistrarContext);
  const [scheduleCode, setScheduleCode] = useContext(ScheduleCodeContext);

  useEffect(() => {
    console.log('Hello from Details!');
  }, []);

  useEffect(() => {
    if (scheduleCode === null) {
      return;
    }

    console.log(`Considering: ${scheduleCode}`);

    (async () => {
      setSubjectDetails({});
      setStudentList([]);

      const [details, students]: any = await registrar.getSubjectInfo(
        scheduleCode
      );

      console.log(details);
      console.log(students);
      setSubjectDetails(details);
      setStudentList(students);
    })();
  }, [scheduleCode]);

  // return scheduleCode === null ? (
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
      <Animated.View
        style={{
          transform: [{ translateY: interpolY }],
          elevation: 4,
          zIndex: 100,
        }}
      >
        <SubjectInfo
          styles={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            elevation: 4,
            // height: 45,
            // flex: 1,
          }}
          details={subjectDetails}
        />
      </Animated.View>
      <FlatList
        // ListHeaderComponent={<SubjectInfo details={subjectDetails} />}
        style={{ paddingHorizontal: 18, paddingTop: 12 }}
        keyExtractor={(item) => item[0]}
        data={studentList}
        onScroll={({ nativeEvent }) => {
          let yOffset = nativeEvent.contentOffset.y;
          scrollY.setValue(yOffset);
        }}
        renderItem={({ item, index }) => {
          // console.log(item);
          return <Text style={{ marginBottom: 12 }}>{item}</Text>;
        }}
      />
    </View>
  );
}

function SubjectInfo({ details, styles }: { details: any; styles: any }) {
  return (
    <View
      style={{
        ...styles,
        paddingHorizontal: 10,
        paddingVertical: 6,
      }}
    >
      {/* <Text>{JSON.stringify(details)}</Text> */}
      {Object.keys(details).map((key, index) => {
        return (
          <View
            key={index}
            style={{
              // flex: 1,
              flexDirection: 'row',
            }}
          >
            <Text style={{ flex: 0.25, fontSize: 10, textAlign: 'right' }}>
              {JSON.stringify(key)}
            </Text>
            <View style={{ marginHorizontal: 6 }} />
            <Text style={{ flex: 1, fontSize: 10 }}>
              {JSON.stringify(details[key])}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function StudentItem() {}
