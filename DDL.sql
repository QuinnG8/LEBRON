CREATE TABLE Players (
    playerID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    jerseyNumber INT NOT NULL
);


CREATE TABLE Teams (
    teamID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    conferenceID INT,
    FOREIGN KEY (conferenceID) REFERENCES Conferences(conferenceID)
);


CREATE TABLE Conferences (
    conferenceID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE Positions (
    positionID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE PlayerPositions (
    playerPositionID INT AUTO_INCREMENT PRIMARY KEY,
    playerID INT NOT NULL,
    positionID INT NOT NULL,
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    FOREIGN KEY (positionID) REFERENCES Positions(positionID)
);


CREATE TABLE Seasons (
    seasonID INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL
);

CREATE TABLE SeasonPlayers (
    seasonPlayerID INT AUTO_INCREMENT PRIMARY KEY,
    playerID INT NOT NULL,
    seasonID INT NOT NULL,
    teamID INT NOT NULL,
    FOREIGN KEY (playerID) REFERENCES Players(playerID),
    FOREIGN KEY (seasonID) REFERENCES Seasons(seasonID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID)
);

INSERT INTO Players (name, age, jerseyNumber) VALUES
('LeBron James', 37, 6),
('Stephen Curry', 34, 30),
('Kevin Durant', 33, 7),
('Giannis Antetokounmpo', 29, 34),
('Luka Dončić', 24, 77);


INSERT INTO Teams (name, conferenceID) VALUES
('Los Angeles Lakers', 1),
('Golden State Warriors', 1),
('Brooklyn Nets', 2),
('Milwaukee Bucks', 2),
('Dallas Mavericks', 1);


INSERT INTO Conferences (name) VALUES
('Western Conference'),
('Eastern Conference');


INSERT INTO Positions (name) VALUES
('Point Guard'),
('Shooting Guard'),
('Small Forward'),
('Power Forward'),
('Center');


INSERT INTO PlayerPositions (playerID, positionID) VALUES
(1, 3),  -- LeBron James is a Small Forward
(2, 1),  -- Stephen Curry is a Point Guard
(3, 3),  -- Kevin Durant is a Small Forward
(4, 5),  -- Giannis Antetokounmpo is a Center
(5, 1);  -- Luka Dončić is a Point Guard

INSERT INTO Seasons (year) VALUES
(2023),
(2022),
(2021),
(2020),
(2019);


INSERT INTO SeasonPlayers (playerID, seasonID, teamID) VALUES
(1, 1, 1),  -- LeBron James played for Lakers in 2023
(2, 1, 2),  -- Stephen Curry played for Warriors in 2023
(3, 1, 3),  -- Kevin Durant played for Nets in 2023
(4, 1, 4),  -- Giannis Antetokounmpo played for Bucks in 2023
(5, 1, 5);  -- Luka Dončić played for Mavericks in 2023
