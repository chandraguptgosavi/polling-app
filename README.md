# Polling Application

## Database Schema

### 1. `polls` Table
| Column      | Data Type | Constraints                | Description                        |
|-------------|-----------|----------------------------|------------------------------------|
| `id`        | SERIAL    | PRIMARY KEY                | Unique poll identifier             |
| `question`  | TEXT      | NOT NULL                   | The poll question                  |
| `created_at`| TIMESTAMP | DEFAULT CURRENT_TIMESTAMP  | Timestamp when the poll was created|

### 2. `poll_options` Table
| Column        | Data Type | Constraints                                    | Description                               |
|---------------|-----------|------------------------------------------------|-------------------------------------------|
| `id`          | SERIAL    | PRIMARY KEY                                    | Unique option identifier                  |
| `poll_id`     | INTEGER   | NOT NULL, FOREIGN KEY (REFERENCES polls(id))   | The ID of the poll this option belongs to |
| `option_text` | TEXT      | NOT NULL                                       | The text for this option                  |
| `created_at`  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                      | Timestamp when the option was created     |

### 3. `poll_votes` Table (Optional)
| Column       | Data Type | Constraints                                          | Description                                |
|--------------|-----------|------------------------------------------------------|--------------------------------------------|
| `id`         | SERIAL    | PRIMARY KEY                                          | Unique vote identifier                     |
| `poll_id`    | INTEGER   | NOT NULL, FOREIGN KEY (REFERENCES polls(id))         | The ID of the poll being voted on          |
| `option_id`  | INTEGER   | NOT NULL, FOREIGN KEY (REFERENCES poll_options(id))  | The ID of the selected option              |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                            | Timestamp when the vote was cast           |

## API Endpoints

### 1. Get All Polls
* **Endpoint:** `GET /polls`
* **Description:** Retrieves all polls along with their options and current vote counts.

### 2. Create a New Poll
* **Endpoint:** `POST /polls`
* **Description:** Creates a new poll with a question and multiple options.

### 3. Vote on a Poll
* **Endpoint:** `POST /polls/:id/vote`
* **Description:** Records a vote for a specified poll option.
* **Request Parameters:**
  * `id`: The poll ID.