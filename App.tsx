import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegistrarContext from './src/contexts/RegistrarContext';
import { ScheduleCodeProvider } from './src/contexts/ScheduleCodeContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import TabNavigation from './src/rnav/TabsMaterial';

export default function App() {
  const registrar = useContext(RegistrarContext);

  useEffect(() => {
    console.log('Hello from App!');
  }, []);

  // Initialize the registrar wrapper
  useEffect(() => {
    (async () => {
      // registrar.clamp();
      await registrar.getOptions();
    })();
  }, []);

  // Potential provider hell?
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="darkolivegreen" />
      {/* Schedule provider */}
      <ScheduleCodeProvider>
        {/* Settings provider */}
        <SettingsProvider>
          <NavigationContainer>
            <TabNavigation></TabNavigation>
          </NavigationContainer>
        </SettingsProvider>
      </ScheduleCodeProvider>
    </SafeAreaProvider>
  );
}
