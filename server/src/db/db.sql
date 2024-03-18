-- Create the Address table
CREATE TABLE IF NOT EXISTS Address (
  AddressID SERIAL PRIMARY KEY,
  Street VARCHAR(255),
  City VARCHAR(100),
  State VARCHAR(50),
  PostalCode VARCHAR(20)
);

-- Create the "User" table
CREATE TABLE IF NOT EXISTS "User" (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(50) NOT NULL UNIQUE,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Tel VARCHAR(20),
  Parties INTEGER,
  Psswrd VARCHAR(100),
  AddressID INTEGER,
  FOREIGN KEY (AddressID) REFERENCES Address(AddressID)
);

-- Create the Party table
CREATE TABLE IF NOT EXISTS Party (
  PartyID SERIAL PRIMARY KEY,
  Occasion VARCHAR(255),
  DateStart DATE,
  DateEnd DATE,
  Messaging VARCHAR(255)
);

-- Link Users and Parties (assuming many users can be in one party)
CREATE TABLE IF NOT EXISTS PartyUser (
  PartyID INTEGER NOT NULL,
  UserID INTEGER NOT NULL,
  PRIMARY KEY (PartyID, UserID),
  FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
  FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the Present table
CREATE TABLE IF NOT EXISTS Present (
    PresentID SERIAL PRIMARY KEY,
    EAN VARCHAR(20) NOT NULL UNIQUE,
    Store VARCHAR(100)
);

-- Create the Presents table (linking Presents to Parties)
CREATE TABLE IF NOT EXISTS Presents (
    PresentsID SERIAL PRIMARY KEY,
    PartyID INTEGER NOT NULL,
    PresentID INTEGER NOT NULL,
    PricePayed DECIMAL(10, 2),
    FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
    FOREIGN KEY (PresentID) REFERENCES Present(PresentID)
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    PostID SERIAL PRIMARY KEY,
    UserID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the Likes table
CREATE TABLE IF NOT EXISTS Likes (
    LikeID SERIAL PRIMARY KEY,
    PostID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    CommentID SERIAL PRIMARY KEY,
    PostID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the CommentLikes table (linking Likes to Comments)
CREATE TABLE IF NOT EXISTS CommentLikes (
    LikeID SERIAL PRIMARY KEY,
    CommentID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    FOREIGN KEY (CommentID) REFERENCES Comments(CommentID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the Conversations table
CREATE TABLE IF NOT EXISTS Conversations (
    ConversationID SERIAL PRIMARY KEY,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastMessageAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Participants table (linking Users to Conversations)
CREATE TABLE IF NOT EXISTS Participants (
    ConversationID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    PRIMARY KEY (ConversationID, UserID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the Messages table (linking Messages to Conversations)
CREATE TABLE IF NOT EXISTS Messages (
    MessageID SERIAL PRIMARY KEY,
    ConversationID INTEGER NOT NULL,
    SenderID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (SenderID) REFERENCES "User"(UserID)
);

-- Create the GroupChat table
CREATE TABLE IF NOT EXISTS GroupChat (
    GroupChatID SERIAL PRIMARY KEY,
    PartyID INTEGER NOT NULL,
    ConversationID INTEGER NOT NULL,
    FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID)
);

-- Create the GroupChatParticipants table (linking Users to GroupChats)
CREATE TABLE IF NOT EXISTS GroupChatParticipants (
    GroupChatID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    PRIMARY KEY (GroupChatID, UserID),
    FOREIGN KEY (GroupChatID) REFERENCES GroupChat(GroupChatID),
    FOREIGN KEY (UserID) REFERENCES "User"(UserID)
);

-- Create the PrivateChat table
CREATE TABLE IF NOT EXISTS PrivateChat (
    PrivateChatID SERIAL PRIMARY KEY,
    User1ID INTEGER NOT NULL,
    User2ID INTEGER NOT NULL,
    ConversationID INTEGER NOT NULL,
    FOREIGN KEY (User1ID) REFERENCES "User"(UserID),
    FOREIGN KEY (User2ID) REFERENCES "User"(UserID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID)
);
