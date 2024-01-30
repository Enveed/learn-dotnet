import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Heading, Icon } from "@chakra-ui/react";
import { PiUsersThree } from "react-icons/pi";
import { List, ListItem } from "@chakra-ui/react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <div>
      <Heading as="h2">
        <Icon as={PiUsersThree} />
        I'm a Heading
      </Heading>
      <List>
        {activities.map((activity: any) => (
          <ListItem>{activity.title}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
