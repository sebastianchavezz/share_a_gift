//src/controllers/PartyController.ts
import { Request, Response } from "express";
import { PartyModel } from "../models/PartyModel";

const partyModel = new PartyModel();

export const AddParty = async (req: Request, res: Response): Promise<void> => {
    try {
        await partyModel.addParty(req.body);
        res.status(200).send('Party added Successfully');
    } catch (error) {
        console.error("Error adding party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const party = await partyModel.getPartyById(partyId);
        if (party) {
            res.status(200).json(party);
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
        const userId = parseInt(req.params.userId); // Assuming partyId is passed in the request parameters
        const party = await partyModel.getPartyByUser(userId);
        if (party) {
            res.status(200).json(party);
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
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await partyModel.updateParty(partyId, req.body);
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
