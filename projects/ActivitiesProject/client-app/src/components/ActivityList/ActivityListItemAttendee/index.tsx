import { Image, List, Popup } from "semantic-ui-react";
import { useBoundStore } from "../../../stores";
import { Profile } from "../../../interfaces";
import { Link } from "react-router-dom";
import { ProfileCard } from "../..";

interface Props {
  attendees: Profile[];
}

export default function ActivityListItemAttendee({ attendees }: Props) {
  const {} = useBoundStore();

  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item
              key={attendee.username}
              as={Link}
              to={`/profiles/${attendee.username}`}
            >
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}
