import { Grid } from "semantic-ui-react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileContent from "../../components/ProfileContent";
import { useParams } from "react-router-dom";
import { useBoundStore } from "../../stores";
import { useEffect } from "react";
import { LoadingComponent } from "../../components";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { loadingProfile, loadProfile, profile } = useBoundStore();

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            {" "}
            <ProfileHeader profile={profile} />{" "}
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
