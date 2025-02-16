import { API_URL } from "@/config";
import axios from "axios";

const BASE_URL = `${API_URL}/polls`;

const getPolls = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error(`Error getting polls :`, error);
    return [];
  }
};

const createPoll = async (poll: { question: string; options: string[] }) => {
  try {
    await axios.post(BASE_URL, poll);
    return true;
  } catch (error) {
    console.error(`Error creating poll :`, error);
    return false;
  }
};

const votePoll = async (pollId: number, optionId: number) => {
  try {
    await axios.post(`${BASE_URL}/${pollId}/vote`, { pollId, optionId });
    return true;
  } catch (error) {
    console.error(`Error voting :`, error);
    return false;
  }
};

const PollService = {
  getPolls,
  createPoll,
  votePoll,
};

export default PollService;
