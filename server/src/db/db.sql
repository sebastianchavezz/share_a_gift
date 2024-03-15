-- Create the "User" table
CREATE TABLE "User" (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Tel VARCHAR(20),
  Parties INTEGER,
  Psswrd VARCHAR(100),
  AddressID INTEGER,
  FOREIGN KEY (AddressID) REFERENCES Address(AddressID)
);

-- Create the Address table
CREATE TABLE Address (
  AddressID SERIAL PRIMARY KEY,
  Street VARCHAR(255),
  City VARCHAR(100),
  State VARCHAR(50),
  PostalCode VARCHAR(20)
);

-- Create the Party table
CREATE TABLE Party (
  PartyID SERIAL PRIMARY KEY,
  Occasion VARCHAR(255),
  DateStart DATE,
  DateEnd DATE,
  Messaging VARCHAR(255)
);

-- Link Users and Parties (assuming many users can be in one party)
CREATE TABLE PartyUser (
  PartyID INTEGER NOT NULL,
  UserID INTEGER NOT NULL,
  PRIMARY KEY (PartyID, UserID),
  FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
  FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

CREATE TABLE Present(
    EAN VARCHAR(20) PRIMARY KEY,
    Store VARCHAR(100)
);

CREATE TABLE Presents(
    PresentsID SERIAL PRIMARY KEY,
    PresentID VARCHAR(20) NOT NULL,
    PricePayed DECIMAL(10, 2),
    FOREIGN KEY (PresentID) REFERENCES Present(EAN)
);
