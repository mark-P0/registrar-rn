import { createContext, useContext } from 'react';
import Registrar from '../core/Registrar';

const RegistrarContext = createContext<Registrar>(new Registrar());

export default RegistrarContext;

// export const RegistrarProvider = ({ children }: any) => {
//   const registrar = useContext(RegistrarContext);

//   useEffect(() => {
//     console.log('Hello from Provider!');
//   }, []);

//   // useEffect(() => {
//   //   // (async function () {
//   //   //   setRegistrar(await Registrar.initialize(true));
//   //   // })();

//   //   // initialize Registrar hererererere
//   // }, []);

//   return (
//     <RegistrarContext.Provider value={registrar!}>
//       {children}
//     </RegistrarContext.Provider>
//   );
// };

export const useRegistrar = () => {
  let registrarInContext = useContext(RegistrarContext);

  if (!registrarInContext.isLive) {
    // await registrarInContext.getOptions();
  }

  return registrarInContext;
};
