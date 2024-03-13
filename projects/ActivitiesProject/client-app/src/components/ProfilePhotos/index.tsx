import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../interfaces";
import { useBoundStore } from "../../stores";
import { useState } from "react";

interface Props {
  profile: Profile;
}

export default function ProfilePhotos({ profile }: Props) {
  const { isCurrentUser } = useBoundStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser() && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            ></Button>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <p>Photo widget goes here</p>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
