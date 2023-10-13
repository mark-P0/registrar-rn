// This was moved to `../App.tsx`

// import { NavigationContainer } from '@react-navigation/native';
// import React, { useContext, useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { RegistrarContext } from '../contexts/RegistrarContext';
// import TabNavigation from './TabsMaterial';

// export default function App() {
//   // // `useMemo`?
//   // const [registrar, setRegistrar] = useState<Registrar>();

//   const registrar = useContext(RegistrarContext);

//   useEffect(() => {
//     console.log('Hello from App!');
//     (async () => {
//       // registrar.clamp();
//       await registrar.getOptions();
//     })();
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <TabNavigation></TabNavigation>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// }

export {};
