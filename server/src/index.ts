// src/index.ts
import  cors from 'cors';
import express, { Request, Response} from 'express';
import {GetUser, Login, Register, DeleteUser, UpdateUser} from './controllers/UserController';
import {AddParty, AddUserToParty, GetParty, DeleteParty, UpdateParty, GetPartyByUser} from './controllers/PartyController';
import { AddPresentToParty, GetAllPresents, DeletePresentFromParty, UpdatePresent} from './controllers/PresentsController';
//import session from 'express-session';
//import passport from 'passport';
//import './auth/passportConfig';

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());
//app.use(session({ secret: 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', resave: false, saveUninitialized: false }));
//app.use(passport.initialize());
//app.use(passport.session());

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
app.get('/getParty-by-user/:userid',(req,res) => GetPartyByUser(req, res));

// Posts endpoints
//app.post('/posts', (req, res) => CreatePost(req, res));
//app.get('/posts/:postId', (req, res) => GetPost(req, res));
//app.put('/posts/:postId', (req, res) => UpdatePost(req, res));
//app.delete('/posts/:postId', (req, res) => DeletePost(req, res));

//// Likes endpoints
//app.post('/posts/:postId/likes', (req, res) => LikePost(req, res));
//app.delete('/posts/:postId/likes', (req, res) => UnlikePost(req, res));

//// Comments endpoints
//app.post('/posts/:postId/comments', (req, res) => CreateComment(req, res));
//app.get('/posts/:postId/comments', (req, res) => GetComments(req, res));
//app.put('/posts/:postId/comments/:commentId', (req, res) => UpdateComment(req, res));
//app.delete('/posts/:postId/comments/:commentId', (req, res) => DeleteComment(req, res));

//// Conversations endpoints
//app.post('/conversations', (req, res) => CreateConversation(req, res));
//app.get('/conversations/:conversationId', (req, res) => GetConversation(req, res));

//// Participants endpoints
//app.post('/conversations/:conversationId/participants', (req, res) => AddParticipant(req, res));
//app.delete('/conversations/:conversationId/participants/:userId', (req, res) => RemoveParticipant(req, res));

//// Messages endpoints
//app.post('/conversations/:conversationId/messages', (req, res) => SendMessage(req, res));
//app.get('/conversations/:conversationId/messages', (req, res) => GetMessages(req, res));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
