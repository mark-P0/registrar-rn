import { createContext } from 'react';

export const TestContext = createContext(() => {
  console.log('hiiiii');
});

// export default function TestContextProvider {

// }
