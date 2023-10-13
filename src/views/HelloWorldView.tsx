import React from 'react';
import {Text, View} from 'react-native';
import Styles from '../constants/Styles';

export default function HelloWorldView() {
  return (
    <View style={Styles.centeredFlex}>
      <Text>Hewwo, lorwd!</Text>
      <Text>Navigation?</Text>
    </View>
  );
}
