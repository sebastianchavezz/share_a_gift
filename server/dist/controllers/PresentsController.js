"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePresent = exports.DeletePresentFromParty = exports.GetAllPresents = exports.AddPresentToParty = void 0;
const PresentsModel_1 = require("../models/PresentsModel");
const presentsModel = new PresentsModel_1.PresentsModel();
const AddPresentToParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await presentsModel.addPresentToParty(partyId, req.body);
        res.status(200).send('Present added to Party Successfully');
    }
    catch (error) {
        console.error("Error adding present to party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.AddPresentToParty = AddPresentToParty;
const GetAllPresents = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const presents = await presentsModel.getAllPresentsForParty(partyId);
        //TODO implement 
        //      if (presents) {
        //          res.status(200).json(presents);
        //      } else {
        //          res.status(404).send("No presents found for the party");
        //      }
    }
    catch (error) {
        console.error("Error getting presents:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.GetAllPresents = GetAllPresents;
const DeletePresentFromParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const presentId = parseInt(req.params.presentId); // Assuming presentId is passed in the request parameters
        await presentsModel.deletePresentFromParty(partyId, presentId);
        res.status(200).send('Present deleted from Party Successfully');
    }
    catch (error) {
        console.error("Error deleting present from party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.DeletePresentFromParty = DeletePresentFromParty;
const UpdatePresent = async (req, res) => {
    try {
        const presentId = parseInt(req.params.presentId); // Assuming presentId is passed in the request parameters
        await presentsModel.updatePresent(presentId, req.body);
        res.status(200).send('Present updated Successfully');
    }
    catch (error) {
        console.error("Error updating present:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.UpdatePresent = UpdatePresent;
