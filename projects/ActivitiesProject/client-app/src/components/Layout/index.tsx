import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Heading, Icon } from "@chakra-ui/react";
import { PiUsersThree } from "react-icons/pi";
import { List, ListItem } from "@chakra-ui/react";
import { Activity } from "../../interfaces";

function Layout() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => setActivities(response.data));
  }, []);

  return (
    <div>
      <Heading as="h2">
        <Icon as={PiUsersThree} />
        I'm a Heading
      </Heading>
      <List>
        {activities.map((activity: Activity) => (
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default Layout;
