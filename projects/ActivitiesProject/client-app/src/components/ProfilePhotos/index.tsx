import { Card, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../interfaces";

interface Props {
  profile: Profile;
}

export default function ProfilePhotos({ profile }: Props) {
  return (
    <Tab.Pane>
      <Header icon="image" content="Photos" />
      <Card.Group itemsPerRow={5}>
        {profile.photos?.map((photo) => (
          <Card key={photo.id}>
            <Image src={photo.url} />
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
}
