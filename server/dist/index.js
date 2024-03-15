"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const User_1 = require("./controllers/User");
const Party_1 = require("./controllers/Party");
const Presents_1 = require("./controllers/Presents");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
// User endpoints
app.post('/login', (req, res) => (0, User_1.Login)(req, res));
app.post('/register', (req, res) => (0, User_1.Register)(req, res));
app.get('/get-user', (req, res) => (0, User_1.GetUser)(req, res));
app.put('/update-user/:userid', (req, res) => (0, User_1.UpdateUser)(req, res));
app.delete('/delete-user/:userid', (req, res) => (0, User_1.DeleteUser)(req, res));
// Party endpoints
app.post('/add-party', (req, res) => (0, Party_1.AddParty)(req, res));
app.get('/get-party', (req, res) => (0, Party_1.GetParty)(req, res));
app.post('/add-user/:partyid', (req, res) => (0, Party_1.AddUserToParty)(req, res));
app.put('/update-party/:partyid', (req, res) => (0, Party_1.UpdateParty)(req, res));
app.delete('/delete-party/:partyid', (req, res) => (0, Party_1.DeleteParty)(req, res));
// Present endpoints
app.post('/add-present/:partyid', (req, res) => (0, Presents_1.AddPresentToParty)(req, res));
app.get('/getPresents/:partyid', (req, res) => (0, Presents_1.GetAllPresents)(req, res));
app.put('/update-present/:partyid/:presentid', (req, res) => (0, Presents_1.UpdatePresent)(req, res));
app.delete('/delete-present/:partyid/:presentid', (req, res) => (0, Presents_1.DeletePresentFromParty)(req, res));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});