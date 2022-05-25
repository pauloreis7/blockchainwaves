import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";

import { theme } from "./styles/theme";
import { getWeb3Library } from "./services/getWeb3LibraryProvider";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
