import { Tab } from "semantic-ui-react";
import ProfilePhotos from "../ProfilePhotos";
import { Profile } from "../../interfaces";
import ProfileAbout from "../ProfileAbout";
import ProfileFollowings from "../ProfileFollowings";

interface Props {
  profile: Profile;
}

export default function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings predicate="followers" />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings predicate="following" />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
