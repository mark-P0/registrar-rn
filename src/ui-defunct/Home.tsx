import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationBar from './Header';

export default () => {
    return (
        <SafeAreaProvider>
            <NavigationBar></NavigationBar>
        </SafeAreaProvider>
    );
};
