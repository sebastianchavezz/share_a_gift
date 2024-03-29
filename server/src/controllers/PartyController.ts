//src/controllers/PartyController.ts
import { Request, Response } from "express";
import { PartyModel } from "../models/PartyModel";
import {User} from "../db/Entities"


const partyModel = new PartyModel();

//TODO: data validation in every CONTROLLERS
export const AddParty = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('body; ', req.body);
        const imageBuffer = req.file?.buffer;
        if(imageBuffer === undefined){
            await partyModel.addParty(req.body, null);
        }else{
            await partyModel.addParty(req.body, imageBuffer);
        }
        res.status(200).send('Party added Successfully');
    } catch (error) {
        console.error("Error adding party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const party =await partyModel.getPartyById(req.params.partyid);
        if (party) {
            const partyMembers = party.users ? party.users.map((user: User) => user.Username || user.Email): [];

            const data = {
                name : party.Name,
                occasion : party.Occasion,
                date : party.DateEnd,
                image : party.ImageData,
                description : party.Description,
                members : partyMembers
            }
            res.status(200).json(data);
        } else {
            res.status(404).send("Party not found");
        }
    } catch (error) {
        console.error("Error getting party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetPartyByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("request body input:", req.params.userid);
        const parties = await partyModel.getPartyByUser(req.params.userid);
        const parties_list = parties.map(party => ({
            partyid: party.PartyID,
            name : party.Name,
            occasion: party.Occasion,
            dateend: party.DateEnd
        }));

        console.log('parties: ',parties_list);
        if (parties_list) {
            res.status(200).json(parties_list);
        } else {
            res.status(404).send("Party not found");
        }
    } catch (error) {
        console.error("Error getting party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const AddUserToParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const userId = parseInt(req.body.userId); // Assuming userId is passed in the request body
        await partyModel.addUserToParty(partyId, userId);
        res.status(200).send('User added to Party Successfully');
    } catch (error) {
        console.error("Error adding user to party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const UpdateParty = async (req: Request, res: Response): Promise<void> => {
    try {
        await partyModel.updateParty(req.params.partyid, req.body);
        res.status(200).send('Party updated Successfully');
    } catch (error) {
        console.error("Error updating party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const DeleteParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await partyModel.deleteParty(partyId);
        res.status(200).send('Party deleted Successfully');
    } catch (error) {
        console.error("Error deleting party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const UpdatePicture = async (req: Request, res: Response): Promise<void> => {
    try {
        const imageBuffer = req.file?.buffer;
        await partyModel.updatePicture(req.params.partyid, imageBuffer);
        res.status(200).send('Picture updated Successfully');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};

