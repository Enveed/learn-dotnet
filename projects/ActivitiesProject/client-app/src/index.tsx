import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "./navigation";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <Navigation />
  </ChakraProvider>
);
