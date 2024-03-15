
import "reflect-metadata";
import { PrimaryColumn, ManyToOne, JoinColumn, BaseEntity ,Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
class User extends BaseEntity{
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

  @OneToMany(type => PartyUser, partyUser => partyUser.user)
  parties: PartyUser[];

  // Add other relevant user details here (e.g., password hash)

  @OneToMany(type => Address, address => address.user)
  address: Address;
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

  // Add other relevant address details here

  @OneToMany(type => User, user => user.address)
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

  // Add attributes defining the party (e.g., name, date)

  @OneToMany(type => PartyUser, partyUser => partyUser.party)
  users: PartyUser[];
}

@Entity()
class PartyUser {
  @PrimaryColumn() // Since the primary key consists of two columns, use @PrimaryColumn instead of @PrimaryGeneratedColumn
  PartyID: number;

  @PrimaryColumn() // Second part of the composite primary key
  UserID: number;

  @ManyToOne(() => Party, party => party.users) // Define ManyToOne relationship with Party entity
  @JoinColumn({ name: 'PartyID' }) // Specify the foreign key column
  party: Party; // Define the property to hold the related Party entity

  @ManyToOne(() => User, user => user.parties) // Define ManyToOne relationship with User entity
  @JoinColumn({ name: 'UserID' }) // Specify the foreign key column
  user: User; // Define the property to hold the related User entity
}

export { User, Address, Party, PartyUser };
