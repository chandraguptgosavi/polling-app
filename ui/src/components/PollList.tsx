import { Poll } from "@/types/poll";
import PollCard from "./PollCard";

const PollList = ({ 
  polls, 
  votedPolls,
  onVote ,
  loading
}: { 
  polls: Poll[], 
  votedPolls: number[],
  onVote: (pollId: number, optionId: number) => void ,
  loading: boolean
}) => (
  <div className="space-y-6">
    {!loading ? polls.map(poll => (
      <PollCard
        key={poll.poll_id}
        poll={poll}
        hasVoted={votedPolls.includes(poll.poll_id)}
        onVote={onVote}
      />
    ))  : <p className="text-center text-gray-800 text-xl">Loading...</p>}
  </div>
);

export default PollList;