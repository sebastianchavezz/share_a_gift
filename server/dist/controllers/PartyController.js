"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteParty = exports.UpdateParty = exports.AddUserToParty = exports.GetPartyByUser = exports.GetParty = exports.AddParty = void 0;
const PartyModel_1 = require("../models/PartyModel");
const partyModel = new PartyModel_1.PartyModel();
const AddParty = async (req, res) => {
    try {
        await partyModel.addParty(req.body);
        res.status(200).send('Party added Successfully');
    }
    catch (error) {
        console.error("Error adding party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.AddParty = AddParty;
const GetParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const party = await partyModel.getPartyById(partyId);
        if (party) {
            res.status(200).json(party);
        }
        else {
            res.status(404).send("Party not found");
        }
    }
    catch (error) {
        console.error("Error getting party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.GetParty = GetParty;
const GetPartyByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId); // Assuming partyId is passed in the request parameters
        const party = await partyModel.getPartyByUser(userId);
        if (party) {
            res.status(200).json(party);
        }
        else {
            res.status(404).send("Party not found");
        }
    }
    catch (error) {
        console.error("Error getting party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.GetPartyByUser = GetPartyByUser;
const AddUserToParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        const userId = parseInt(req.body.userId); // Assuming userId is passed in the request body
        await partyModel.addUserToParty(partyId, userId);
        res.status(200).send('User added to Party Successfully');
    }
    catch (error) {
        console.error("Error adding user to party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.AddUserToParty = AddUserToParty;
const UpdateParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await partyModel.updateParty(partyId, req.body);
        res.status(200).send('Party updated Successfully');
    }
    catch (error) {
        console.error("Error updating party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.UpdateParty = UpdateParty;
const DeleteParty = async (req, res) => {
    try {
        const partyId = parseInt(req.params.partyId); // Assuming partyId is passed in the request parameters
        await partyModel.deleteParty(partyId);
        res.status(200).send('Party deleted Successfully');
    }
    catch (error) {
        console.error("Error deleting party:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.DeleteParty = DeleteParty;
