
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { customerName, customerPhone, serviceName } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password',
        },
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'braidsbynuria@gmail.com',
        subject: 'New Appointment Booking',
        text: `Customer Name: ${customerName}, Phone: ${customerPhone}, Service: ${serviceName}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Error sending email');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

