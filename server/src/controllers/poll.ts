import pool from "@/db/connection";
import { CREATE_POLL } from "@/queries/create-poll";
import {
  GET_POLLS,
} from "@/queries/get-poll";
import { VOTE_POLL } from "@/queries/vote-poll";
import { Request, Response } from "express";

export const getPolls = async (_: Request, response: Response) => {
  try {
    const polls = await pool.query(GET_POLLS);
    response.json(polls.rows);
  } catch (error) {
    console.error(`Error getting polls :`, error);
    response.status(500).send("Error getting polls");
  }
};

export const createPoll = async (request: Request, response: Response) => {
  const { question, options } = request.body;
  try {
    const poll = await pool.query(CREATE_POLL, [question, options.length]);

    const pollId = poll.rows[0].id;

    const placeholders = options
      .map((_: string, index: number) => `($1, $${index + 2})`)
      .join(", ");

    const values = [pollId, ...options];

    await pool.query(
      `
    INSERT INTO poll_options (poll_id, option_text)
    VALUES ${placeholders}
  `,
      values
    );

    response.status(201).json({ message: "Poll created successfully" });
  } catch (error) {
    console.error(`Error creating poll :`, error);
    response.status(500).send("Error creating poll");
  }
};

export const vote = async (request: Request, response: Response) => {
  const { pollId, optionId } = request.body;
  const { id } = request.params;

  if (+id !== pollId) {
    response.status(400).send("Invalid poll ID");
    return;
  }

  try {
    await pool.query(VOTE_POLL, [pollId, optionId]);

    response.status(201).json({ message: "Voted successfully" });
  } catch (error) {
    console.error(`Error voting :`, error);
    response.status(500).send("Error voting");
  }
};
