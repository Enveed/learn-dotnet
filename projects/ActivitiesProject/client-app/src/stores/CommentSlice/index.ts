import { StateCreator } from "zustand";
import { ActivitySlice } from "../ActivitySlice/index.interface";
import { CommonSlice } from "../CommonSlice/index.interface";
import { UserSlice } from "../UserSlice/index.interface";
import { ProfileSlice } from "../ProfileSlice/index.interface";
import { CommentSlice } from "./index.interface";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatComment } from "../../interfaces/Comment/index.interface";

export const createCommentSlice: StateCreator<
  ActivitySlice & CommonSlice & UserSlice & ProfileSlice & CommentSlice,
  [],
  [],
  CommentSlice
> = (set, get) => ({
  comments: [],
  hubConnection: null,
  createHubConnection: (activityId) => {
    if (get().selectedActivity) {
      set({
        hubConnection: new HubConnectionBuilder()
          .withUrl("http://localhost:5000/chat?activityId=" + activityId, {
            accessTokenFactory: () => get().user?.token as string,
          })
          .withAutomaticReconnect()
          .configureLogging(LogLevel.Information)
          .build(),
      });

      get()
        .hubConnection?.start()
        .catch((error) =>
          console.log("Error establishing the connection: ", error)
        );

      get().hubConnection?.on("LoadComments", (comments: ChatComment[]) => {
        set({
          comments: comments.map((comment: ChatComment) => {
            return {
              ...comment,
              createdAt: new Date(comment.createdAt + "Z"),
            };
          }),
        });
      });

      get().hubConnection?.on("ReceiveComment", (comment: ChatComment) => {
        set((state) => ({
          comments: [
            { ...comment, createdAt: new Date(comment.createdAt) },
            ...state.comments,
          ],
        }));
      });
    }
  },
  stopHubConnection: () => {
    get()
      .hubConnection?.stop()
      .catch((error) => console.log("Error stopping connection: ", error));
  },
  clearComments: () => {
    set({ comments: [] });
    get().stopHubConnection();
  },
  addComment: async (values) => {
    values.activityId = get().selectedActivity?.id;
    try {
      get().hubConnection?.invoke("SendComment", values);
    } catch (e) {
      console.log(e);
    }
  },
});
