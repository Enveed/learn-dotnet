import { Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container maxW="container.sm">
      <Heading as="h1" size="lg" letterSpacing={"tighter"}>
        Home page
      </Heading>
      <Heading as="h3" size="sm" letterSpacing={"tighter"}>
        Go to <Link to="/activities">Activities</Link>
      </Heading>
    </Container>
  );
}
