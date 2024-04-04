//src/db/Entities.ts

import { extname } from "path";
import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'userid' })
  UserID!: number;

  @Column({ name: 'naam', length: 50, nullable: true })
  Naam!: string;

  @Column({ name: 'achterNaam', length: 50, nullable: true })
  AchterNaam!: string;

  @Column({ name: 'username', length: 50, unique: true, nullable: true })
  Username!: string;

  @Column({ name: 'email', length: 100, unique: true })
  Email!: string;

  @Column({ name: 'tel', length: 20, nullable: true })
  Tel!: string;

  @Column({ name: 'parties', default: 0 })
  Parties!: number;

  @Column({ name: 'psswrd', length: 100, nullable: true })
  Psswrd!: string;

  @Column({ name: 'profilePicture', type: 'bytea', nullable: true })
  ImageData: Buffer;

  @ManyToMany(() => Party, (party) => party.users)
  @JoinTable()
  parties!: Party[];

  @ManyToMany(() => User, {
    cascade: ['remove'],
  })
  @JoinTable({
    name: 'user_friends',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'UserID',
    },
    inverseJoinColumn: {
    name: 'friend_id',
    referencedColumnName: 'UserID',
  },
  })
  Friends!: User[];

  @OneToMany(() => FriendshipRequest, request => request.requester)
  sentFriendshipRequests: FriendshipRequest[];

  @OneToMany(() => FriendshipRequest, request => request.receiver)
  receivedFriendshipRequests: FriendshipRequest[];
}

@Entity()
class Party extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'partyid' })
  PartyID: number;

  @Column({ name: 'name', length: 255, nullable: true })
  Name: string;

  @Column({ name: 'occasion', length: 255 })
  Occasion: string;

  @Column({ name: 'datestart' })
  DateStart: Date;

  @Column({ name: 'dateend' })
  DateEnd: Date;

  @Column({ name: 'description', length: 255, nullable: true })
  Description: string;

  @Column({ name: 'image', type: 'bytea', nullable: true })
  ImageData: Buffer;

  @ManyToMany(() => User, (user) => user.parties, {
    cascade: ['remove'],
  })
  users: User[];

  @ManyToOne(() => User, user => user.parties, {
    cascade: true, // Add cascade deletion
  })
  @JoinColumn({ name: 'creator_id' })
  Creator: User;
}

@Entity()
class FriendshipRequest extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'request_id' })
  requestID!: number;

  @ManyToOne(() => User, user => user.sentFriendshipRequests)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @ManyToOne(() => User, user => user.receivedFriendshipRequests)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @Column({ default: 'pending' })
  status: string; // pending, accepted, rejected

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

@Entity()
class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'friendship_id' })
  friendshipID!: number;

  @ManyToOne(() => User, user => user.Friends)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, user => user.Friends)
  @JoinColumn({ name: 'friend_id' })
  friend: User;

}
/* 
  @OneToMany(() => Present, present => present.party)
  presents: Present[]; */
//party above
//user below
/*   @OneToMany(() => Participants, participants => participants.user)
  participants!: Participants[];

  @OneToMany(() => Likes, likes => likes.user)
  likes!: Likes[];


  @OneToMany(() => Posts, posts => posts.user)
  posts!: Posts[];

  @OneToMany(() => Comments, comments => comments.user)
  comments!: Comments[];

  @OneToMany(() => Messages, messages => messages.sender)
  messages!: Messages[];

  @OneToMany(() => Friendship, friendship => friendship.user1)
  friendships1!: Friendship[];

  @OneToMany(() => Friendship, friendship => friendship.user2)
  friendships2!: Friendship[]; */

/* @Entity()
class Present{
  @PrimaryGeneratedColumn({name:'presentsid'})
  PresentsID: number;

  @ManyToOne(() => Party, party => party.presents)
  @JoinColumn({ name: 'partyid' })
  party: Party;

  @ManyToOne(() => Present, present => present.party)
  @JoinColumn({ name: 'presentid' })
  present: Present;

  @Column({name:'pricepayed', type: 'decimal', precision: 10, scale: 2 })
  PricePayed: number;
}

@Entity()
class Posts{
  @PrimaryGeneratedColumn({name:'postid'})
  PostID: number;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({name:'content',type:'text'})
  Content: string;

  @Column({name:'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;

  @OneToMany(() => Likes, likes => likes.post)
  likes: Likes[];

  @OneToMany(() => Comments, comments => comments.post)
  comments: Comment[];
}

@Entity()
class Likes{
  @PrimaryGeneratedColumn({name:'likeid'})
  LikeID: number;

  @ManyToOne(() => Posts, posts => posts.likes)
  @JoinColumn({ name: 'postid' })
  post: Posts;

  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'userid' })
  user: User;
}

@Entity()
class Comments{
  @PrimaryGeneratedColumn({name:'commetid'})
  CommentID: number;

  @ManyToOne(() => Posts, posts => posts.comments)
  @JoinColumn({ name: 'postid' })
  post: Posts;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({name:'content',type:'text'})
  Content: string;

  @Column({name:'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;
}

@Entity()
class Conversations{
  @PrimaryGeneratedColumn({name:'conversationsid'})
  ConversationID: number;

  @Column({name:'createdat', default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({name:'lastmessageat', default: () => 'CURRENT_TIMESTAMP' })
  LastMessageAt: Date;

  @OneToMany(() => Participants, participants => participants.conversation)
  participants: Participants[];

  @OneToMany(() => Messages, messages => messages.conversation)
  messages: Messages[];
}

@Entity()
class Participants {
  @PrimaryGeneratedColumn()
  id: number; // Add a primary column

  @ManyToOne(() => Conversations, conversations => conversations.participants)
  @JoinColumn({ name: 'conversationid' })
  conversation: Conversations;

  @ManyToOne(() => User, user => user.participants)
  @JoinColumn({ name: 'userid' })
  user: User;
}

@Entity()
class Messages{
  @PrimaryGeneratedColumn({name:'messageid'})
  MessageID: number;

  @ManyToOne(() => Conversations, conversations => conversations.messages)
  @JoinColumn({ name: 'conversationid' })
  conversation: Conversations;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'senderid' })
  sender: User;

  @Column({name:'content',type:'text'})
  Content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  Timestamp: Date;
}

@Entity()
class Friendship {
  @PrimaryGeneratedColumn({name:'friendshipid'})
  FriendshipID: number;

  @Column()
  UserID1: number;

  @Column()
  UserID2: number;

  @ManyToOne(() => User, user => user.friendships1)
  @JoinColumn({ name: 'userid1' })
  user1: User;

  @ManyToOne(() => User, user => user.friendships2)
  @JoinColumn({ name: 'userid2' })
  user2: User;
}
 */
export { User, Party, Friendship, FriendshipRequest}

