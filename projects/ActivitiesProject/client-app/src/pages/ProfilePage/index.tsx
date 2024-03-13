import { Grid } from "semantic-ui-react";
import ProfileHeader from "../../components/ProfileHeader";

export default function ProfilePage() {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
      </Grid.Column>
    </Grid>
  );
}
