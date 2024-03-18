-- Create the "user" table
CREATE TABLE IF NOT EXISTS "user" (
  userID SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Tel VARCHAR(20),
  Parties INTEGER,
  Psswrd VARCHAR(100)
);

-- Create the Party table
CREATE TABLE IF NOT EXISTS Party (
  PartyID SERIAL PRIMARY KEY,
  Occasion VARCHAR(255),
  DateStart DATE,
  DateEnd DATE,
  Messaging VARCHAR(255)
);

-- Link users and Parties (assuming many users can be in one party)
CREATE TABLE IF NOT EXISTS Partyuser (
  PartyID INTEGER NOT NULL,
  userID INTEGER NOT NULL,
  PRIMARY KEY (PartyID, userID),
  FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
  FOREIGN KEY (userID) REFERENCES "user"(userID)
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
    userID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the Likes table
CREATE TABLE IF NOT EXISTS Likes (
    LikeID SERIAL PRIMARY KEY,
    PostID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    CommentID SERIAL PRIMARY KEY,
    PostID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the CommentLikes table (linking Likes to Comments)
CREATE TABLE IF NOT EXISTS CommentLikes (
    LikeID SERIAL PRIMARY KEY,
    CommentID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    FOREIGN KEY (CommentID) REFERENCES Comments(CommentID),
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the Conversations table
CREATE TABLE IF NOT EXISTS Conversations (
    ConversationID SERIAL PRIMARY KEY,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    LastMessageAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Participants table (linking users to Conversations)
CREATE TABLE IF NOT EXISTS Participants (
    ConversationID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    PRIMARY KEY (ConversationID, userID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the Messages table (linking Messages to Conversations)
CREATE TABLE IF NOT EXISTS Messages (
    MessageID SERIAL PRIMARY KEY,
    ConversationID INTEGER NOT NULL,
    SenderID INTEGER NOT NULL,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (SenderID) REFERENCES "user"(userID)
);

-- Create the GroupChat table
CREATE TABLE IF NOT EXISTS GroupChat (
    GroupChatID SERIAL PRIMARY KEY,
    PartyID INTEGER NOT NULL,
    ConversationID INTEGER NOT NULL,
    FOREIGN KEY (PartyID) REFERENCES Party(PartyID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID)
);

-- Create the GroupChatParticipants table (linking users to GroupChats)
CREATE TABLE IF NOT EXISTS GroupChatParticipants (
    GroupChatID INTEGER NOT NULL,
    userID INTEGER NOT NULL,
    PRIMARY KEY (GroupChatID, userID),
    FOREIGN KEY (GroupChatID) REFERENCES GroupChat(GroupChatID),
    FOREIGN KEY (userID) REFERENCES "user"(userID)
);

-- Create the PrivateChat table
CREATE TABLE IF NOT EXISTS PrivateChat (
    PrivateChatID SERIAL PRIMARY KEY,
    user1ID INTEGER NOT NULL,
    user2ID INTEGER NOT NULL,
    ConversationID INTEGER NOT NULL,
    FOREIGN KEY (user1ID) REFERENCES "user"(userID),
    FOREIGN KEY (user2ID) REFERENCES "user"(userID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID)
);

CREATE TABLE IF NOT EXISTS Friendship (
    FriendshipID SERIAL PRIMARY KEY,
    userID1 INTEGER NOT NULL,
    userID2 INTEGER NOT NULL,
    FOREIGN KEY (userID1) REFERENCES "user"(userID),
    FOREIGN KEY (userID2) REFERENCES "user"(userID)
);