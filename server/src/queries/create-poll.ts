export const CREATE_POLL = `
INSERT INTO polls (question, option_count)
VALUES ($1, $2)
RETURNING id
`;

