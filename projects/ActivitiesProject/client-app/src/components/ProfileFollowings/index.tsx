import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useBoundStore } from "../../stores";
import ProfileCard from "../ProfileCard";
import { useEffect } from "react";

interface Props {
  predicate: string;
}

export default function ProfileFollowings({ predicate }: Props) {
  const { loadFollowings, loadingFollowings, profile, followings } =
    useBoundStore();

  useEffect(() => {
    loadFollowings(predicate);
  }, [loadFollowings, predicate]);

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`People ${
              predicate === "following" ? "following" : "followed by"
            }  ${profile?.displayName}`}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.username} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
