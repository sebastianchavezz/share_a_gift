"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.GetUser = exports.Register = exports.Login = void 0;
const Login = async (req, res) => {
    console.log('creating new User');
    res.status(200).send('User logged In');
};
exports.Login = Login;
const Register = async (req, res) => {
    console.log('Register new User');
    res.status(200).send('Register Succesfully');
};
exports.Register = Register;
const GetUser = async (req, res) => {
    console.log('Register new User');
    res.status(200).send('Register Succesfully');
};
exports.GetUser = GetUser;
const UpdateUser = async (req, res) => {
    console.log('Register new User');
    res.status(200).send('Register Succesfully');
};
exports.UpdateUser = UpdateUser;
const DeleteUser = async (req, res) => {
    console.log('User added ');
    res.status(200).send('User added to Party Succesfully');
};
exports.DeleteUser = DeleteUser;
