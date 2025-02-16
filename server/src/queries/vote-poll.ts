export const VOTE_POLL = `
        INSERT INTO poll_votes (poll_id, option_id)
        VALUES ($1, $2)
    `;
