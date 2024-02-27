import React, {createContext, useContext} from 'react';

const BaseUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({children}) => {
  const baseUrl = 'http://192.168.1.39:3000';

  return (
    <BaseUrlContext.Provider value={{baseUrl}}>
      {children}
    </BaseUrlContext.Provider>
  );
};
