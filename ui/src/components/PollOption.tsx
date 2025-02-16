import { PollOption } from "@/types/poll-option";

const PollOptionItem = ({
  option,
  pollId,
  hasVoted,
  totalVotes,
  onVote,
}: {
  option: PollOption;
  pollId: number;
  hasVoted: boolean;
  totalVotes: number;
  onVote: (pollId: number, optionId: number) => void;
}) => {
  const percentage =
    totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

  return (
    <div className="border border-gray-200 rounded-md p-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{option.option_text}</span>
        <span className="text-sm text-gray-500">
          {option.votes} votes ({percentage}%)
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${
            option.votedByCurrentUser ? "bg-green-500" : "bg-blue-500"
          } h-2.5 rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {!hasVoted && (
        <button
          onClick={() => onVote(pollId, option.option_id)}
          className="mt-2 text-sm text-blue-500 hover:text-blue-600"
        >
          Vote for this option
        </button>
      )}
    </div>
  );
};

export default PollOptionItem;
