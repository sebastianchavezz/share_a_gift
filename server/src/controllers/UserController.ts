//src/controllers/User.ts
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import jwt from 'jsonwebtoken';
import fs from 'fs';

const userModel = new UserModel();

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('req: ',req.body);
        const { username, password } = req.body;
        
        const user = await userModel.loginUser(username, password);

        // Check if user is found and password matches
        if (user) {
            // Generate JWT token
            const accessToken = jwt.sign({ userId: user.UserID }, 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', { expiresIn: '1h' });

            // Send the token in the response
            res.status(200).json({
                 accessToken: accessToken, 
                 userId: user.UserID, 
                 email: user.Email, 
                 achternaam: user.AchterNaam,
                 naam: user.Naam,
                 message: 'User logged In' });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const Register = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('REGISTERING');
        await userModel.addUser(req.body);
        console.log('Resgistration succesfull for user ', req.body.username);
        res.status(200).send('User registered Successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('req.params', req.params.userid);
        const user = await userModel.getUserById(req.params.userid);
        if (user) {
            
            res.status(200).json({'naam':user.Naam,'achternaam':user.AchterNaam ,'email':user.Email});
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.updateUser(userId, req.body);
        res.status(200).send('User updated Successfully');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId); // Assuming userId is passed in the request parameters
        await userModel.deleteUser(userId);
        res.status(200).send('User deleted Successfully');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
};
export const GetPicture= async (req: Request, res: Response): Promise<void> => {
    try {
        const user=  await userModel.getUserById(req.params.userid);
        const data = user.ImageData;
        res.status(200).send(data);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const CommitPicture = async (req: Request, res: Response): Promise<void> => {
    try {
        const imageBuffer = req.file?.buffer;
        await userModel.CommitPicture(req.params.userid, imageBuffer);
        res.status(200).send('Picture updated Successfully');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const SearchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('WE IN SEARCH');
        const query = req.query.q; // Assuming the search query is provided as a query parameter
        const users = await userModel.searchUsers(query);
        res.status(200).json(users);
      } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).send("Internal Server Error");
      }
}

export const RequestFriendship = async (req: Request, res: Response): Promise<void> => {
    try {
        const from = req.params.userid;
        const to = req.body.other_user;
        await userModel.requestFriendship(from, to);
        res.status(200).send('Request pending');
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
}

export const GetFriendshipRequest = async (req: Request, res: Response): Promise<void> => {
    try{
        const friendshiptRequest = await userModel.getFriendshipRequest(req.params.userid);
        const user_request = friendshiptRequest.map(request => ({
            userids : request.requester.UserID,
            user_names : request.requester.Username
        }));
        console.log('Friendship query ', user_request);
        if(user_request){
            res.status(200).json(user_request);
        }else{
            res.status(404).send('Friendship Not found');
        }
    } catch (error){
        res.status(500).send('Internal Server Error');
    }
}

export const AcceptOrDeclineRequest = async (req: Request, res: Response): Promise<void> => {
    try{
        const userid = req.params.userid;
        const otherid = req.body.other_user;
        const status = req.body.status;
        await userModel.acceptOrDeclineRequest(userid, otherid, status);
        res.status(200).send('Request is either accepted or declined');
    }catch (error){
        res.status(500).send('Internal Server Error');
    }
}
