
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column({ length: 50, unique: true })
  Username: string;

  @Column({ length: 100, unique: true })
  Email: string;

  @Column({ length: 20, nullable: true })
  Tel: string;

  @Column({ default: 0 })
  Parties: number;

  @Column({ length: 100 })
  Psswrd: string;

  @Column()
  AddressID: number;

  @OneToMany(() => PartyUser, partyUser => partyUser.user)
  parties: PartyUser[];

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @ManyToOne(() => Address, address => address.user)
  @JoinColumn({ name: 'AddressID' })
  address: Address;

  @OneToMany(() => Friendship, friendship => friendship.user1)
  friendships1: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.user2)
  friendships2: Friendship[];
}

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  AddressID: number;

  @Column({ length: 255, nullable: true })
  Street: string;

  @Column({ length: 100, nullable: true })
  City: string;

  @Column({ length: 50, nullable: true })
  State: string;

  @Column({ length: 20, nullable: true })
  PostalCode: string;

  @OneToMany(() => User, user => user.address)
  user: User;
}

@Entity()
class Party {
  @PrimaryGeneratedColumn()
  PartyID: number;

  @Column({ length: 255 })
  Occasion: string;

  @Column()
  DateStart: Date;

  @Column()
  DateEnd: Date;

  @Column({ length: 255, nullable: true })
  Messaging: string;

  @OneToMany(() => PartyUser, partyUser => partyUser.party)
  users: PartyUser[];

  @OneToMany(() => Present, present => present.party)
  presents: Present[];
}

@Entity()
class PartyUser {
  @ManyToOne(() => Party, party => party.users, { primary: true })
  @JoinColumn({ name: 'PartyID' })
  party: Party;

  @ManyToOne(() => User, user => user.parties, { primary: true })
  @JoinColumn({ name: 'UserID' })
  user: User;
}

@Entity()
class Present {
  @PrimaryGeneratedColumn()
  PresentsID: number;

  @ManyToOne(() => Party, party => party.presents)
  @JoinColumn({ name: 'PartyID' })
  party: Party;

  @ManyToOne(() => Present, present => present.presents)
  @JoinColumn({ name: 'PresentID' })
  present: Present;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  PricePayed: number;
}

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  PostID: number;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @Column('text')
  Content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];
}

@Entity()
class Like {
  @PrimaryGeneratedColumn()
  LikeID: number;

  @ManyToOne(() => Post, post => post.likes)
  @JoinColumn({ name: 'PostID' })
  post: Post;

  @ManyToOne(() => User, user => user.likes
  @JoinColumn({ name: 'UserID' })
  user: User;
}

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  CommentID: number;

  @ManyToOne(() => Post, post => post.comments)
  @JoinColumn({ name: 'PostID' })
  post: Post;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @Column('text')
  Content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;
}

@Entity()
class Conversation {
  @PrimaryGeneratedColumn()
  ConversationID: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  LastMessageAt: Date;

  @OneToMany(() => Participant, participant => participant.conversation)
  participants: Participant[];

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];
}

@Entity()
class Participant {
  @ManyToOne(() => Conversation, conversation => conversation.participants, { primary: true })
  @JoinColumn({ name: 'ConversationID' })
  conversation: Conversation;

  @ManyToOne(() => User, user => user.participants, { primary: true })
  @JoinColumn({ name: 'UserID' })
  user: User;
}

@Entity()
class Message {
  @PrimaryGeneratedColumn()
  MessageID: number;

  @ManyToOne(() => Conversation, conversation => conversation.messages)
  @JoinColumn({ name: 'ConversationID' })
  conversation: Conversation;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'SenderID' })
  sender: User;

  @Column('text')
  Content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;
}

@Entity()
class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn()
  FriendshipID: number;

  @Column()
  UserID1: number;

  @Column()
  UserID2: number;

  @ManyToOne(() => User, user => user.friendships1)
  @JoinColumn({ name: 'UserID1' })
  user1: User;

  @ManyToOne(() => User, user => user.friendships2)
  @JoinColumn({ name: 'UserID2' })
  user2: User;
}

export { User, Address, Party, PartyUser, Present, Post, Like, Comment, Conversation, Participant, Message, Friendship };
