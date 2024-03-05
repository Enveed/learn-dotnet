import { Image, List } from "semantic-ui-react";
import { useBoundStore } from "../../../stores";
import { Profile } from "../../../interfaces";
import { Link } from "react-router-dom";

interface Props {
  attendees: Profile[];
}

export default function ActivityListItemAttendee({ attendees }: Props) {
  const {} = useBoundStore();

  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item
          key={attendee.username}
          as={Link}
          to={`/profile/${attendee.username}`}
        >
          <Image
            size="mini"
            circular
            src={attendee.image || "/assets/user.png"}
          />
        </List.Item>
      ))}
    </List>
  );
}
