//src/controllers/PresentController.ts
import { Request, Response } from "express";
import { PresentModel } from "../models/PresentModel";

const presentModel = new PresentModel();

export const AddPresentToParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await presentModel.addPresentToParty(partyId, req.body);
        res.status(200).send('Present added to Party Successfully');
    } catch (error) {
        console.error("Error adding present to party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const GetAllPresents = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const presents = await presentModel.getAllPresentsForParty(partyId);
        if (presents) {
            res.status(200).json(presents);
        } else {
            res.status(404).send("No presents found for the party");
        }
    } catch (error) {
        console.error("Error getting presents:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const DeletePresentFromParty = async (req: Request, res: Response): Promise<void> => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const presentId = parseInt(req.params.presentId); // Assuming presentId is passed in the request parameters
        await presentModel.deletePresentFromParty(partyId, presentId);
        res.status(200).send('Present deleted from Party Successfully');
    } catch (error) {
        console.error("Error deleting present from party:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const UpdatePresent = async (req: Request, res: Response): Promise<void> => {
    try {
        const presentId = parseInt(req.params.presentId); // Assuming presentId is passed in the request parameters
        await presentModel.updatePresent(presentId, req.body);
        res.status(200).send('Present updated Successfully');
    } catch (error) {
        console.error("Error updating present:", error);
        res.status(500).send("Internal Server Error");
    }
};
