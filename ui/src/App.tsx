import { useEffect, useState } from "react";
import { Poll } from "./types/poll";
import Header from "./components/Header";
import Buttton from "./components/Button";
import CreatePollForm from "./components/CreatePollForm";
import PollList from "./components/PollList";
import PollService from "./services/poll-service";

const PollApp = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [votedPolls, setVotedPolls] = useState<number[]>([]);
  const [loadingPolls, setLoadingPolls] = useState(true);

  const handleVote = async (pollId: number, optionId: number) => {
    if (!votedPolls.includes(pollId)) {
      await PollService.votePoll(pollId, optionId);

      const updatedPolls = polls.map((poll) => {
        if (poll.poll_id === pollId) {
          const updatedOptions = poll.options.map((option) => {
            if (option.option_id === optionId) {
              return {
                ...option,
                votes: option.votes + 1,
                votedByCurrentUser: true,
              };
            }
            return option;
          });
          return { ...poll, options: updatedOptions };
        }
        return poll;
      });

      setPolls(updatedPolls);
      setVotedPolls([pollId, ...votedPolls]);
    }
  };

  const handleCreatePoll = async (question: string, options: string[]) => {
    const newPoll = {
      question,
      options,
    };

    try {
      await PollService.createPoll(newPoll);
      setPolls([
        ...polls,
        {
          poll_id: Date.now(),
          question,
          options: options.map((opt) => {
            return {
              option_id: Date.now(),
              option_text: opt,
              votes: 0,
              votedByCurrentUser: false,
            };
          }),
          vote_count: 0,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      return;
    }
    setShowCreateForm(false);
  };

  const fetchPolls = async () => {
    try {
      setLoadingPolls(true);
      const polls = await PollService.getPolls();
      setPolls(polls);
    } catch {
      setPolls([]);
    }
    setLoadingPolls(false);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPolls();
    }, 5000);
  }, []);
console.log(loadingPolls)
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Header />

        {!showCreateForm ? (
          <Buttton
            onClick={() => setShowCreateForm(true)}
            text={"Create a Poll"}
          />
        ) : (
          <CreatePollForm
            onSubmit={handleCreatePoll}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        <PollList polls={polls} votedPolls={votedPolls} onVote={handleVote} loading={loadingPolls} />
      </div>
    </div>
  );
};

export default PollApp;
