export const GET_POLLS = `
SELECT
  p.id AS poll_id,
  p.question,
  p.created_at AS created_at,
  json_agg(
    json_build_object(
      'option_id', po.id,
      'option_text', po.option_text,
      'votes', (
          SELECT COUNT(*)
          FROM poll_votes pv
          WHERE pv.option_id = po.id
      ),
      'option_created_at', po.created_at
    )
  ) AS options,
   (SELECT COUNT(pv.id) FROM poll_votes pv WHERE pv.poll_id = p.id) AS vote_count
FROM polls p
JOIN poll_options po ON p.id = po.poll_id
GROUP BY p.id, p.question, p.created_at
ORDER BY p.id;
`;

export const GET_POLL_BY_ID = `
SELECT p.id FROM polls p WHERE p.id = $1;
`;

export const GET_POLL_OPTION_BY_ID = `
SELECT po.id FROM poll_options po WHERE po.id = $1;
`;
