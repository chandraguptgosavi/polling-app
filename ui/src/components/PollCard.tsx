import { Poll } from "@/types/poll";
import PollOptionItem from "./PollOption";

const PollCard = ({ 
  poll, 
  hasVoted,
  onVote 
}: { 
  poll: Poll, 
  hasVoted: boolean,
  onVote: (pollId: number, optionId: number) => void 
}) => {
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{poll.question}</h2>
      
      <div className="space-y-3">
        {poll.options.map(option => (
          <PollOptionItem
            key={option.option_id}
            option={option}
            pollId={poll.poll_id}
            hasVoted={hasVoted}
            totalVotes={totalVotes}
            onVote={onVote}
          />
        ))}
      </div>
      
      {hasVoted && (
        <p className="text-green-600 text-sm mt-3">
          You have voted on this poll.
        </p>
      )}
      
      <p className="text-gray-500 text-sm mt-3">
        Total votes: {totalVotes}
      </p>
    </div>
  );
};

export default PollCard;