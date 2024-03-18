"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePresent = exports.DeletePresentFromParty = exports.GetAllPresents = exports.AddPresentToParty = void 0;
const AddPresentToParty = async (req, res) => {
    console.log('Present added ');
    res.status(200).send('Present added to Party Succesfully');
};
exports.AddPresentToParty = AddPresentToParty;
const GetAllPresents = async (req, res) => {
    console.log('Getting all the presents.');
    res.status(200).send('Present added to Party Succesfully');
};
exports.GetAllPresents = GetAllPresents;
const DeletePresentFromParty = async (req, res) => {
    console.log('Getting all the presents.');
    res.status(200).send('Present added to Party Succesfully');
};
exports.DeletePresentFromParty = DeletePresentFromParty;
const UpdatePresent = async (req, res) => {
    console.log('Register new User');
    res.status(200).send('Register Succesfully');
};
exports.UpdatePresent = UpdatePresent;
