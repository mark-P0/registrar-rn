import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, Text, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
// import Animated from 'react-native-reanimated';
import RegistrarContext from "../../contexts/RegistrarContext";
import ScheduleCodeContext from "../../contexts/ScheduleCodeContext";
import SettingsContext from "../../contexts/SettingsContext";

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//     // paddingBottom: 0,
//     paddingHorizontal: 12,
//     paddingTop: 12,
//   },
// });

export default function HomeTab({ navigation }: any) {
  const [keyword, setKeyword] = useState("");
  const [subjects, setSubjects] = useState<string[][]>([]);

  const registrar = useContext(RegistrarContext);
  const [currentSettings, setSettings] = useContext(SettingsContext);
  const scheduleContext = useContext(ScheduleCodeContext);

  useEffect(() => {
    console.log("Hello from Home!");
  }, []);

  useEffect(() => {
    let initializeHome = async () => {
      let currSubj = await registrar.getSubjects();
      setSubjects(currSubj);
    };

    if (!registrar.isLive) {
      registrar.addCallback(initializeHome);
    } else {
      initializeHome();
    }
  }, [currentSettings]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        {/* react native elements */}
        {/* <SearchBar
          platform="android"
          // lightTheme={true}
          placeholder="Enter subject, course, etc."
          value={keyword}
          onChangeText={setKeyword}
          searchIcon={false}
          cancelIcon={false}
          containerStyle={{ flex: 0 }}
          onSubmitEditing={async () => {
            console.log(keyword);
            // registrar.searchKeyword = keyword;
            // setSubjects(await registrar.getSubjects());
          }}
        ></SearchBar> */}

        {/* react native paper */}
        <Searchbar
          placeholder="Enter subject, course, etc."
          value={keyword}
          onChangeText={setKeyword}
          // icon={'home'}
          // clearIcon={'search'}
          onSubmitEditing={async () => {
            setSubjects(await registrar.getSubjects(keyword));
          }}
        />
      </View>

      {/* Subjects list */}
      {subjects.length === 0 ? (
        <ActivityIndicator
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          size="large"
          color="forestgreen"
        />
      ) : (
        <FlatList
          // "List padding" dependent on each item's margin
          style={{ paddingHorizontal: 8 }}
          numColumns={2}
          data={subjects}
          keyExtractor={(item) => item[2]}
          renderItem={({ item, index }) => {
            return (
              <SubjectCardItem
                key={index}
                details={item}
                nav={navigation}
                index={index}
                schedContext={scheduleContext}
              />
            );
          }}
        />
      )}

      {
        // <ScrollView
        //   style={{ flexGrow: 1 }}
        //   contentContainerStyle={{ flexGrow: 1 }}
        // >
        //   <View style={{ flex: 1, paddingHorizontal: 16 }}>
        //     {subjects.map((subject, index) => (
        //       <Text key={index}>{subject}</Text>
        //     ))}
        //     {/* <Text>*insert `Home screen` here*</Text> */}
        //   </View>
        // </ScrollView>
      }
    </View>
  );
}

function SubjectCardItem({
  details: [code, subjectName, schedCode, section, freeSlots, units, link],
  nav: navigation,
  index,
  schedContext: [scheduleCode, setScheduleCode],
}: {
  details: any;
  nav: any;
  index: number;
  schedContext: [string, React.Dispatch<React.SetStateAction<string>>];
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000 * 0.5,
      delay: index * 1000 * 0.1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        // Spacing around card
        marginHorizontal: 6,
        marginBottom: 12,
        // Corner rounding
        borderRadius: 12,
        backgroundColor: "darkolivegreen",
        opacity: fadeAnim,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          // Spacing within card
          paddingHorizontal: 8,
          paddingVertical: 10,
          overflow: "hidden",
        }}
        android_ripple={{ color: "silver", borderless: true }}
        onPress={() => {
          setScheduleCode(schedCode);
          navigation.navigate("Details", {
            code: schedCode,
          });
        }}
      >
        <Text
          style={{
            // flex: 1,
            fontFamily: "sans-serif-light",
            fontSize: 10,
            color: "lightgray",
          }}
        >
          {code}
        </Text>
        <Text
          style={{
            // flex: 1,
            fontFamily: "sans-serif-condensed",
            fontWeight: "bold",
            fontSize: 16,
            color: "white",
          }}
        >
          {subjectName}
        </Text>
        <Text
          style={{
            // flex: 1,
            fontFamily: "sans-serif-condensed",
            fontSize: 12,
            color: "lightgray",
          }}
        >
          {`${schedCode} | ${units} unit${Number(units) > 1 ? "s" : ""}`}
        </Text>
        <View
          style={{
            flex: 1,
            marginVertical: 12,
          }}
        />
        <Text
          style={{
            // flex: 1,
            textAlign: "right",
            fontWeight: "bold",
            fontSize: 12,
            color: "white",
            // marginTop: 16,
          }}
        >
          {section}
        </Text>
        {/* [code*, subjectName*, schedCode*, section*, freeSlots, units, link], */}
      </Pressable>
    </Animated.View>
  );
}
