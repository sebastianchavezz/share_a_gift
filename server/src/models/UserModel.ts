//src/models/UserModel.ts
import { getRepository, Repository } from 'typeorm';
import { User } from '../db/Entities';

class UserModel {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    async loginUser(username: string, password: string): Promise<User> {
        // Logic to find and validate user credentials (not implemented)
        const user = await this.userRepository.findOne({ where: { Username: username } });
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.Psswrd);
        if (!passwordMatch) {
            throw new Error("Incorrect Password");
        }
        return user;
    }

    async registerUser(userData: any): Promise<void> {
        const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash the password
        const newUser = this.userRepository.create({
            Username: userData.username,
            Email: userData.email,
            Tel: userData.tel,
            Psswrd: hashedPassword,
            AddressID: userData.addressId,
        });
        await this.userRepository.save(newUser);
    }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);    
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
}

export { UserModel };
