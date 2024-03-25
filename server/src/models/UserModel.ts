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
        const newUser = this.userRepository.create({
            Username: userData.username, Email: userData.email,
            Naam: userData.naam, AchterNaam: userData.achterNaam,
            Tel: userData.tel,
            Psswrd: hashedPassword,
            //AddressID: userData.addressId,
        });
        await this.userRepository.save(newUser);
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({where:{UserID: userId}});    
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
}

export { UserModel };
