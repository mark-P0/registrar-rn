import React from 'react';
import { Text, View } from 'react-native';

export default function Filler({
  text,
  description,
}: {
  text: string;
  description: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 96,
          color: 'gray',
        }}
      >
        {text}
      </Text>
      <Text
        style={{
          fontFamily: 'sans-serif-light',
          fontSize: 18,
          color: 'gray',
          marginVertical: 24,
        }}
      >
        {description}
      </Text>
    </View>
  );
}
