import { Request, Response } from "express";

export const AddParty = async (req: Request, res: Response): Promise<void> => {
    console.log('Party added ');
    
    res.status(200).send('Party added Succesfully');
};

export const GetParty = async (req: Request, res: Response): Promise<void> => {
    console.log('Party added ');
    
    res.status(200).send('Party added Succesfully');
};

export const AddUserToParty = async (req: Request, res: Response): Promise<void> => {
    console.log('User added ');
    
    res.status(200).send('User added to Party Succesfully');
};

export const UpdateParty = async (req: Request, res: Response): Promise<void> => {
    console.log('Register new User');
    
    res.status(200).send('Register Succesfully');
};

export const DeleteParty = async (req: Request, res: Response): Promise<void> => {
    console.log('User added ');
    
    res.status(200).send('User added to Party Succesfully');
};
