import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useBoundStore } from "../../stores";

export default function Home() {
  const { isLoggedIn } = useBoundStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
        </Header>
        {isLoggedIn() ? (
          <>
            <Header as="h2" inverted content="Welcome to Activities" />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to Activities
            </Button>
          </>
        ) : (
          <Button as={Link} to="/login" size="huge" inverted>
            Login
          </Button>
        )}
      </Container>
    </Segment>
  );
}
