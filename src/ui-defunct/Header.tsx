import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { scaledHeight, scaledWidth } from './Common';

scaledWidth;

scaledHeight;

export default () => {
    let test = useWindowDimensions();
    console.log(test);

    return (
        <Header leftComponent={buttons[0]} centerComponent={{ text: 'heh' }} />
    );
};

const buttons = [
    {
        icon: 'home',
        color: '#fff',
        type: 'font-awesome',
        onPress: () => console.log('press...'),
    },
    {},
];
