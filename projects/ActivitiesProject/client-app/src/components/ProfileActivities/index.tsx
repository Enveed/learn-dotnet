import { SyntheticEvent, useEffect } from "react";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useBoundStore } from "../../stores";
import { UserActivity } from "../../interfaces";
const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];
export default function ProfileActivities() {
  const { loadUserActivities, profile, loadingActivities, userActivities } =
    useBoundStore();
  useEffect(() => {
    loadUserActivities(profile!.username, "");
  }, [loadUserActivities, profile]);
  const handleTabChange = (_e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userActivities.map((activity: UserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">{activity.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(activity.date), "do LLL")}</div>
                    <div>{format(new Date(activity.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
