import nodemailer from 'nodemailer';

export function mailToRegister(email:string){
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
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
        } else {
            console.log('Email sent:', info.response);
        }
    });
}