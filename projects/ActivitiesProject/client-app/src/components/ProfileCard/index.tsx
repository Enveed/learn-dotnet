import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../interfaces";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton";

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>
          {profile.bio && profile.bio.length > 40
            ? profile.bio!.substring(0, 37) + "..."
            : profile.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {profile.followersCount} followers
      </Card.Content>
      <FollowButton profile={profile} />
    </Card>
  );
}
