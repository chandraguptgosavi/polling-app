import { PollOption } from "./poll-option";

export interface Poll {
    poll_id: number;
    question: string;
    options: PollOption[];
    created_at: string;
    vote_count: number;
  }