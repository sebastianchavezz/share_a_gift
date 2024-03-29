"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePicture = exports.DeleteParty = exports.UpdateParty = exports.AddUserToParty = exports.GetPartyByUser = exports.GetParty = exports.AddParty = void 0;
const PartyModel_1 = require("../models/PartyModel");
const partyModel = new PartyModel_1.PartyModel();
//TODO: data validation in every CONTROLLERS
const AddParty = async (req, res) => {
    try {
        console.log('body; ', req.body);
        const imageBuffer = req.file?.buffer;
        if (imageBuffer === undefined) {
            await partyModel.addParty(req.body, null);
        }
        else {
            await partyModel.addParty(req.body, imageBuffer);
        }
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
        const party = await partyModel.getPartyById(req.params.partyid);
        if (party) {
            const partyMembers = party.users ? party.users.map((user) => user.Username || user.Email) : [];
            const data = {
                name: party.Name,
                occasion: party.Occasion,
                date: party.DateEnd,
                image: party.ImageData,
                description: party.Description,
                members: partyMembers
            };
            res.status(200).json(data);
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
        console.log("request body input:", req.params.userid);
        const parties = await partyModel.getPartyByUser(req.params.userid);
        const parties_list = parties.map(party => ({
            partyid: party.PartyID,
            name: party.Name,
            occasion: party.Occasion,
            dateend: party.DateEnd
        }));
        console.log('parties: ', parties_list);
        if (parties_list) {
            res.status(200).json(parties_list);
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
        await partyModel.updateParty(req.params.partyid, req.body);
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
const UpdatePicture = async (req, res) => {
    try {
        const imageBuffer = req.file?.buffer;
        await partyModel.updatePicture(req.params.partyid, imageBuffer);
        res.status(200).send('Picture updated Successfully');
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.UpdatePicture = UpdatePicture;
