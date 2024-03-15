//src/controllers/User.ts
import { Request, Response } from "express";

export const Login = async (req: Request, res: Response): Promise<void> => {
     console.log('creating new User');

     res.status(200).send('User logged In');
};

export const Register = async (req: Request, res: Response): Promise<void> => {
     console.log('Register new User');
     
     res.status(200).send('Register Succesfully');
};

export const GetUser = async (req: Request, res: Response): Promise<void> => {
     console.log('Register new User');
     
     res.status(200).send('Register Succesfully');
};

export const UpdateUser = async (req: Request, res: Response): Promise<void> => {
    console.log('Register new User');
    
    res.status(200).send('Register Succesfully');
};

export const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    console.log('User added ');
    
    res.status(200).send('User added to Party Succesfully');
};
