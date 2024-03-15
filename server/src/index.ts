// src/index.ts
import express, { Request, Response} from 'express';
import {GetUser, Login, Register, DeleteUser, UpdateUser} from './controllers/User';
import {AddParty, AddUserToParty, GetParty, DeleteParty, UpdateParty} from './controllers/Party';
import { AddPresentToParty, GetAllPresents, DeletePresentFromParty, UpdatePresent} from './controllers/Presents';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

// User endpoints
app.post('/login', (req, res) => Login(req, res));
app.post('/register', (req, res) => Register(req, res));
app.get('/get-user', (req, res) => GetUser(req, res));
app.put('/update-user/:userid', (req, res) => UpdateUser(req, res));
app.delete('/delete-user/:userid', (req, res) => DeleteUser(req, res));

// Party endpoints
app.post('/add-party', (req, res) => AddParty(req, res));
app.get('/get-party', (req, res) => GetParty(req, res));
app.post('/add-user/:partyid', (req, res) => AddUserToParty(req, res));
app.put('/update-party/:partyid', (req, res) => UpdateParty(req, res));
app.delete('/delete-party/:partyid', (req, res) => DeleteParty(req, res));

// Present endpoints
app.post('/add-present/:partyid', (req, res) => AddPresentToParty(req, res));
app.get('/getPresents/:partyid', (req, res) => GetAllPresents(req, res));
app.put('/update-present/:partyid/:presentid', (req, res) => UpdatePresent(req, res));
app.delete('/delete-present/:partyid/:presentid', (req, res) => DeletePresentFromParty(req, res));


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
