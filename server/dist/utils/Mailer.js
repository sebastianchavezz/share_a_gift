"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailToRegister = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function mailToRegister(email) {
    // Create a Nodemailer transporter
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'sebastianchavez940@gmail.com',
            pass: 'pkwo qwwv fbnj yqti',
        },
    });
    // Define email content
    const mailOptions = {
        to: email,
        subject: 'Create an Account', // Email subject
        text: 'please ckeate an Account at ...',
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.response);
        }
    });
}
exports.mailToRegister = mailToRegister;
