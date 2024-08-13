-- CS 340 Summer 2024 / Project Step 5 / Group 79
-- Authors: Quinn Glenn, Tieg Zaharia
-- Description: this is the MariaDB DML (Data Manipulation Queries) file containing SQL 
--              necessary for the CRUD interactions in the LEBRON basketball quiz game.
-- 
-- Special characters for variables: :variableName


-- INSERT queries

-- Add a new NBA player
INSERT INTO Players (name, age, jerseyNumber)
VALUES (:nameInput, :ageInput, :jerseyNumberInput);

-- Add a new conference
INSERT INTO Conferences (name)
VALUES (:conferenceNameInput);

-- Add a new team (updated to match "sub-query that allows the FK to be selected based on human-readable information")
INSERT INTO Teams (name, conferenceID)
VALUES (
  :teamNameInput,
  (SELECT conferenceID FROM Conferences WHERE name = :conferenceNameInput)  -- sub-query to get conferenceID
);

-- Add a new position
INSERT INTO Positions (name)
VALUES (:positionNameInput);

-- Assign a position to a player (updated to match "sub-query that allows the FK to be selected based on human-readable information")
INSERT INTO PlayerPositions (playerID, positionID)
VALUES (
  (SELECT playerID FROM Players WHERE name = :playerNameInput),  -- sub-query to get playerID
  (SELECT positionID FROM Positions WHERE name = :positionNameInput)  -- sub-query to get positionID
);

-- Add a new season
INSERT INTO Seasons (year)
VALUES (:yearInput);

-- Add a player to a team for a season (updated to match "sub-query that allows the FK to be selected based on human-readable information")
INSERT INTO SeasonTeamPlayers (playerID, seasonID, teamID)
VALUES (
  (SELECT playerID FROM Players WHERE name = :playerNameInput),  -- sub-query to get playerID
  (SELECT seasonID FROM Seasons WHERE year = :seasonYearInput),  -- sub-query to get seasonID
  (SELECT teamID FROM Teams WHERE name = :teamNameInput)  -- sub-query to get teamID
);

-- SELECT queries

-- Get all players with the relevant associated tables' info.
SELECT Players.playerID, 
       Players.name, 
       Players.age, 
       Players.jerseyNumber, 
       Positions.name as positionName, 
       Teams.name as teamName, 
       Seasons.year as year
  FROM Players 
  LEFT JOIN PlayerPositions ON PlayerPositions.playerID = Players.playerID
  LEFT JOIN Positions ON Positions.positionID = PlayerPositions.positionID
  INNER JOIN SeasonTeamPlayers ON SeasonTeamPlayers.playerID = Players.playerID
  LEFT JOIN Teams ON Teams.teamID = SeasonTeamPlayers.teamID
  LEFT JOIN Seasons ON Seasons.seasonID = SeasonTeamPlayers.seasonID;

-- Get all teams, with their associated conference name.
SELECT Teams.name, 
       Teams.teamID, 
       Conferences.name as conferenceName
  FROM Teams
  LEFT JOIN Conferences ON Teams.conferenceID = Conferences.conferenceID;

-- Get all positions, with the number of players for each position.
SELECT Positions.name as name,
       Positions.positionID AS positionID,
       (SELECT count(*) FROM PlayerPositions WHERE PlayerPositions.positionID = Positions.positionID) as playerCount
  FROM Positions;

-- Get all conferences
SELECT * FROM Conferences;

-- Get all seasons
SELECT * FROM Seasons;

-- Get a specific player by ID
SELECT * FROM Players
  WHERE playerID = :playerIDInput;

-- Get all players in a specific team for a season
SELECT p.name, p.age, p.jerseyNumber, t.name AS teamName, s.year
  FROM Players p
  JOIN SeasonTeamPlayers stp ON p.playerID = stp.playerID
  JOIN Teams t ON stp.teamID = t.teamID
  JOIN Seasons s ON stp.seasonID = s.seasonID
  WHERE t.teamID = :teamIDInput AND s.year = :yearInput;



-- Get players with dynamic filtering (from suggestions "add a SELECT utilizing a search/filter with a dynamically populated list of")
SELECT p.playerID, p.name, p.age, p.jerseyNumber, t.name AS teamName, pos.name AS positionName, c.name AS conferenceName
  FROM Players p
  JOIN SeasonTeamPlayers stp ON p.playerID = stp.playerID
  JOIN Teams t ON stp.teamID = t.teamID
  JOIN PlayerPositions pp ON p.playerID = pp.playerID
  JOIN Positions pos ON pp.positionID = pos.positionID
  JOIN Conferences c ON t.conferenceID = c.conferenceID
  WHERE (:nameInput IS NULL OR p.name LIKE CONCAT('%', :nameInput, '%'))
    AND (:ageInput IS NULL OR p.age = :ageInput)
    AND (:teamIDInput IS NULL OR t.teamID = :teamIDInput)
    AND (:positionIDInput IS NULL OR pos.positionID = :positionIDInput)
    AND (:conferenceIDInput IS NULL OR c.conferenceID = :conferenceIDInput);

-- UPDATE queries

-- Update player information
UPDATE Players
  SET name = :nameInput, age = :ageInput, jerseyNumber = :jerseyNumberInput
  WHERE playerID = :playerIDInput;

-- Update team information
UPDATE Teams
  SET name = :teamNameInput, conferenceID = :conferenceIDInput
  WHERE teamID = :teamIDInput;

-- Update conference information
UPDATE Conferences
  SET name = :conferenceNameInput
  WHERE conferenceID = :conferenceIDInput;

-- Update position information
UPDATE Positions
  SET name = :positionNameInput
  WHERE positionID = :positionIDInput;

-- DELETE queries

-- Delete a player
DELETE FROM Players
  WHERE playerID = :playerIDInput;

-- Delete a team
DELETE FROM Teams
  WHERE teamID = :teamIDInput;

-- Delete a conference
DELETE FROM Conferences
  WHERE conferenceID = :conferenceIDInput;

-- Delete a position
DELETE FROM Positions
  WHERE positionID = :positionIDInput;

-- Delete a player's position assignment
DELETE FROM PlayerPositions
  WHERE playerPositionID = :playerPositionIDInput;

-- Delete a player's season team assignment
DELETE FROM SeasonTeamPlayers
  WHERE seasonTeamPlayerID = :seasonTeamPlayerIDInput;