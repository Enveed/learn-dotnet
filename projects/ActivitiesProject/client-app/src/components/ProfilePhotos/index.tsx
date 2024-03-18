import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Profile } from "../../interfaces";
import { useBoundStore } from "../../stores";
import { SyntheticEvent, useState } from "react";
import ImageUpload from "../ImageUpload";
import { Photo } from "../../interfaces/Profile/index.interface";

interface Props {
  profile: Profile;
}

export default function ProfilePhotos({ profile }: Props) {
  const { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto } =
    useBoundStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

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
            <ImageUpload uploadPhoto={handlePhotoUpload} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser() && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={photo.id}
                        disabled={photo.isMain}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                        loading={target === photo.id && loading}
                      />
                      <Button basic color="red" icon="trash" />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
