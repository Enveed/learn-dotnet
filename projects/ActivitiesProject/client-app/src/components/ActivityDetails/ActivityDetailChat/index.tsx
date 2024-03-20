import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import { useBoundStore } from "../../../stores";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  activityId: string;
}

export default function ActivityDetailedChat({ activityId }: Props) {
  const { createHubConnection, clearComments, comments } = useBoundStore();

  useEffect(() => {
    if (activityId) {
      createHubConnection(activityId);

      return () => {
        clearComments();
      };
    }
  }, [activityId, createHubConnection, clearComments]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
}
