"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteParty = exports.UpdateParty = exports.AddUserToParty = exports.GetParty = exports.AddParty = void 0;
const AddParty = async (req, res) => {
    console.log('Party added ');
    res.status(200).send('Party added Succesfully');
};
exports.AddParty = AddParty;
const GetParty = async (req, res) => {
    console.log('Party added ');
    res.status(200).send('Party added Succesfully');
};
exports.GetParty = GetParty;
const AddUserToParty = async (req, res) => {
    console.log('User added ');
    res.status(200).send('User added to Party Succesfully');
};
exports.AddUserToParty = AddUserToParty;
const UpdateParty = async (req, res) => {
    console.log('Register new User');
    res.status(200).send('Register Succesfully');
};
exports.UpdateParty = UpdateParty;
const DeleteParty = async (req, res) => {
    console.log('User added ');
    res.status(200).send('User added to Party Succesfully');
};
exports.DeleteParty = DeleteParty;
