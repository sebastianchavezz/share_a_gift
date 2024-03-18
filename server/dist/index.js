"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./controllers/UserController");
const PartyController_1 = require("./controllers/PartyController");
const PresentsController_1 = require("./controllers/PresentsController");
//import session from 'express-session';
//import passport from 'passport';
//import './auth/passportConfig';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3001;
app.use(express_1.default.json());
//app.use(session({ secret: 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', resave: false, saveUninitialized: false }));
//app.use(passport.initialize());
//app.use(passport.session());
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
// User endpoints
app.post('/login', (req, res) => (0, UserController_1.Login)(req, res));
app.post('/register', (req, res) => (0, UserController_1.Register)(req, res));
app.get('/get-user', (req, res) => (0, UserController_1.GetUser)(req, res));
app.put('/update-user/:userid', (req, res) => (0, UserController_1.UpdateUser)(req, res));
app.delete('/delete-user/:userid', (req, res) => (0, UserController_1.DeleteUser)(req, res));
// Party endpoints
app.post('/add-party', (req, res) => (0, PartyController_1.AddParty)(req, res));
app.get('/get-party', (req, res) => (0, PartyController_1.GetParty)(req, res));
app.post('/add-user/:partyid', (req, res) => (0, PartyController_1.AddUserToParty)(req, res));
app.put('/update-party/:partyid', (req, res) => (0, PartyController_1.UpdateParty)(req, res));
app.delete('/delete-party/:partyid', (req, res) => (0, PartyController_1.DeleteParty)(req, res));
// Present endpoints
app.post('/add-present/:partyid', (req, res) => (0, PresentsController_1.AddPresentToParty)(req, res));
app.get('/getPresents/:partyid', (req, res) => (0, PresentsController_1.GetAllPresents)(req, res));
app.put('/update-present/:partyid/:presentid', (req, res) => (0, PresentsController_1.UpdatePresent)(req, res));
app.delete('/delete-present/:partyid/:presentid', (req, res) => (0, PresentsController_1.DeletePresentFromParty)(req, res));
app.get('/getParty-by-user/:userid', (req, res) => (0, PartyController_1.GetPartyByUser)(req, res));
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
