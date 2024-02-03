import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./components";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  </React.StrictMode>
);
