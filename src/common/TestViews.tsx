import React from 'react';
import { View } from 'react-native';

let styles = {
  flexed: {
    flex: 1,
  },
};

interface TestProps {}

export const CenteredView: React.FC<TestProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </View>
  );
};

export const FlexedView: React.FC<TestProps> = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};
