import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./navigation";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <Navigation />
  </ChakraProvider>
);
