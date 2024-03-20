import { Segment, Header, Comment, Button } from "semantic-ui-react";
import { useBoundStore } from "../../../stores";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import TextArea from "../../ActivityForm/TextArea";

interface Props {
  activityId: string;
}

export default function ActivityDetailedChat({ activityId }: Props) {
  const { createHubConnection, clearComments, comments, addComment } =
    useBoundStore();

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
      <Segment clearing>
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

          <Formik
            onSubmit={(values, { resetForm }) =>
              addComment(values).then(() => resetForm())
            }
            initialValues={{ body: "" }}
          >
            {({ isSubmitting, isValid }) => (
              <Form className="ui form">
                <TextArea placeholder="Add comment" name="body" rows={2} />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                  floated="right"
                />
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </>
  );
}
