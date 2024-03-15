import { Response, Request } from "express";

export const AddPresentToParty = async (req: Request, res: Response): Promise<void> => {
    console.log('Present added ');
    
    res.status(200).send('Present added to Party Succesfully');
};

export const GetAllPresents = async (req: Request, res: Response): Promise<void> => {
    console.log('Getting all the presents.');
    
    res.status(200).send('Present added to Party Succesfully');
};

export const DeletePresentFromParty = async (req: Request, res: Response): Promise<void> => {
    console.log('Getting all the presents.');
    
    res.status(200).send('Present added to Party Succesfully');
};

export const UpdatePresent = async (req: Request, res: Response): Promise<void> => {
    console.log('Register new User');
    
    res.status(200).send('Register Succesfully');
};