//src/models/UserModel.ts
import { Repository } from 'typeorm';
import { User, FriendshipRequest, Friendship } from '../db/Entities';
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

    async getUserById(userid: string): Promise<User> {
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

    async requestFriendship(from: string, to: string): Promise<void>{
        const id_sender = parseInt(from, 10);
        const id_receiver = parseInt(to, 10);
        const sender : User | null = await this.userRepository.findOne({where:{UserID:id_sender}});
        const receiver : User | null = await this.userRepository.findOne({where:{UserID:id_receiver}});
        
        if(!sender || !receiver){
            throw new Error('Sender or receiver not found');
        }
        if(sender.UserID === receiver.UserID){
            throw new Error('You cannot be friends with yourself mate!!');
        }

        const friendshipRepo = pool.getRepository(FriendshipRequest);
        //TODO : uitlezen wat de status is en daarop logica schrijven
        const existingRequest = await friendshipRepo.findOne({
            where: {requester: sender, receiver: receiver},
            relations: ['requester', 'receiver']
        })

        if(existingRequest){
            throw new Error('The status is pending. Geduld jong');
        }

        const newRequest = friendshipRepo.create({
            requester: sender,
            receiver: receiver,
            status: 'pending'
        });
        await friendshipRepo.save(newRequest);
    }

    async getFriendshipRequest(userid: string): Promise<FriendshipRequest[]> {
        const id = parseInt(userid, 10);
        const user: User | null = await this.userRepository.findOne({where:{UserID: id}});
    
        if (!user) {
            throw new Error('User not found');
        }
        const friendshipRequestRepo: Repository<FriendshipRequest> = pool.getRepository(FriendshipRequest);
        const friendshipRequest: FriendshipRequest[] | null = await friendshipRequestRepo.find({
            where: {
                receiver: user,
                status : 'pending'
            },
            relations : ['requester', 'receiver']
        });
        if (!friendshipRequest) {
            throw new Error('No friendship request found for this user');
        }
        return friendshipRequest;
    }

    async acceptOrDeclineRequest(userid: string, otherid: string, status: string): Promise<void>{
        const id_sender = parseInt(otherid, 10);
        const id_receiver = parseInt(userid, 10);
        const sender : User | null = await this.userRepository.findOne({where:{UserID:id_sender}});
        const receiver : User | null = await this.userRepository.findOne({where:{UserID:id_receiver}});
        
        if(!sender || !receiver){
            throw new Error('Sender or receiver not found');
        }

        const friendshipRepo = pool.getRepository(FriendshipRequest);
        //TODO : uitlezen wat de status is en daarop logica schrijven
        const existingRequest = await friendshipRepo.findOne({
            where: {requester: sender, receiver: receiver}
        })

        if(!existingRequest){
            throw new Error('The status is gewoon Herres maat');
        }
        
        if (existingRequest.status !== "pending") {
            throw new Error('The FRIENDSHIP was already accepted or deleted my n-word');
        }  
        existingRequest.status = status;
        await friendshipRepo.save(existingRequest);

        if (status === "accepted") {
            // Create a new friendship entry in the database
            const friendship = new Friendship();
            friendship.user = sender;
            friendship.friend = receiver;
            await friendship.save();
        }

    }

    async getAllFriends(userid: string): Promise<User[]>{
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({ where: { UserID: id } });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const friendshipRepo = pool.getRepository(Friendship);
        const friendships = await friendshipRepo.find({
            where: [{ user: user }, { friend: user }],
            relations: ['user','friend'] // Include the 'friend' relation to retrieve the associated user
        });
    
        if (!friendships || friendships.length === 0) {
            throw new Error('Friendship not found mate');
        }
   
        const friendIDs: number[] = [];
        for (const friendship of friendships) {
            if(friendship.friend.UserID === user.UserID){
                friendIDs.push(friendship.user.UserID);
            }else{
                friendIDs.push(friendship.friend.UserID);
            }
        }
        const users: User[] = []

        for(const friendsID of friendIDs){
            const temp_user = await this.userRepository.findOne({where:{UserID: friendsID}});
            if(!temp_user){
                throw new Error('NO USER');
            }
            users.push(temp_user);
        }
        return users;
    }
}

export { UserModel };
