-- CS 340 Summer 2024
-- Project Step 2 Draft
-- Group 79
-- Quinn Glenn
-- Tieg Zaharia

-- Special characters for variables: :variableName

-- INSERT queries

-- Add a new NBA player
INSERT INTO Players (name, age, jerseyNumber)
VALUES (:nameInput, :ageInput, :jerseyNumberInput);

-- Add a new conference
INSERT INTO Conferences (name)
VALUES (:conferenceNameInput);

-- Add a new team
INSERT INTO Teams (name, conferenceID)
VALUES (:teamNameInput, :conferenceIDInput);

-- Add a new position
INSERT INTO Positions (name)
VALUES (:positionNameInput);

-- Assign a position to a player
INSERT INTO PlayerPositions (playerID, positionID)
VALUES (:playerIDInput, :positionIDInput);

-- Add a new season
INSERT INTO Seasons (year)
VALUES (:yearInput);

-- Add a player to a team for a season
INSERT INTO SeasonTeamPlayers (playerID, seasonID, teamID)
VALUES (:playerIDInput, :seasonIDInput, :teamIDInput);

-- SELECT queries

-- Get all players
SELECT * FROM Players;

-- Get all teams
SELECT * FROM Teams;

-- Get all positions
SELECT * FROM Positions;

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