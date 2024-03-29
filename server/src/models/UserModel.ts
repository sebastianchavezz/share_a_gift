//src/models/UserModel.ts
import { getRepository, Repository } from 'typeorm';
import { User } from '../db/Entities';
import pool from '../db/db';

class UserModel {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = pool.getRepository(User);
    }

    async loginUser(username: string, password: string): Promise<User> {
        // Logic to find and validate user credentials (not implemented)
        console.log('user inside the Login', username);
        const user = await this.userRepository.findOne({ where: { Username: username } });
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = user.Psswrd === password;
        if (!passwordMatch) {
            throw new Error("Incorrect Password");
        }
        return user;
    }

    async addUser(userData: any): Promise<void> {
        //TODO: check if email already in use
        const hashedPassword = userData.password;
        console.log('userdata: ', userData);
        const newUser = this.userRepository.create({
            Username: userData.username, Email: userData.email,
            Naam: userData.naam, AchterNaam: userData.achterNaam,
            Tel: userData.tel,
            Psswrd: hashedPassword,
            //AddressID: userData.addressId,
        });
        await this.userRepository.save(newUser);
    }

    async getUserById(userid: string): Promise<User> {
        console.log('userId inside Model', userid);
        console.log(typeof userid);
        const id = parseInt(userid,10);
        const user = await this.userRepository.findOne({where:{UserID: id}});    
        if(!user){
            throw new Error('User not Found');
        }
        return user;
    }

    async updateUser(userId: number, updatedUserData: any): Promise<void> {
        // Logic to update user data (not implemented)
        //TODO
    }

    async deleteUser(userId: number): Promise<void> {
        await this.userRepository.delete(userId);
    }

    async findUserByEmail(email:string): Promise<User>{
        const user= await this.userRepository.findOne({where:{Email: email}});
        if (!user){
            throw new Error('No user with this email!');
        }
        return user;
    }
    async CommitPicture(userid: string, picture:any): Promise<void> {
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({where: {UserID: id}})
        if(!user){
            throw new Error('User not found');
        }
        user.ImageData = picture;
        await this.userRepository.save(user);
    }
    async searchUsers(query: any): Promise<User[]> {
        // Implement logic to search users based on the query
        const users = await this.userRepository.createQueryBuilder("user")
          .where("user.Username LIKE :query OR user.Email LIKE :query", { query: `%${query}%` })
          .getMany();
        return users;
      }

}

export { UserModel };
