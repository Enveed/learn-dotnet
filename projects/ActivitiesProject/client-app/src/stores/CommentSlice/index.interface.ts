import { ChatComment } from "../../interfaces/Comment/index.interface";
import { HubConnection } from "@microsoft/signalr";

export interface CommentSlice {
  comments: ChatComment[];
  hubConnection: HubConnection | null;
  createHubConnection: (activityId: string) => void;
  stopHubConnection: () => void;
  clearComments: () => void;
}
