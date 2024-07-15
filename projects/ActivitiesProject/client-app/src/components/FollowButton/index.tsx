import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../interfaces";
import { useBoundStore } from "../../stores";
import { SyntheticEvent } from "react";

interface Props {
  profile: Profile;
}

export default function FollowButton({ profile }: Props) {
  const { updateFollowing, user } = useBoundStore();

  if (user?.username === profile.username) return null;

  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    updateFollowing(username, !profile.following);
  };

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="teal"
          content={profile.following ? "Following" : "Not Following"}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          fluid
          basic
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={(e) => handleFollow(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
}
