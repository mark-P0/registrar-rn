import React from 'react';
import {Text, View} from 'react-native';
import Styles from '../constants/Styles';

export default function TemplateView(text: String) {
  return (
    <View style={Styles.centeredFlex}>
      <Text>{text}</Text>
    </View>
  );
}
