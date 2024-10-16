// @ts-nocheck
"use client"

import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider: React.FC = ({ children }) => {
  const [chatbotId, setChatbotId] = useState("/");

  return (
    <GlobalStateContext.Provider value={{ chatbotId, setChatbotId }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
