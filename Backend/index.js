const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error("Missing MONGODB_URI environment variable.");
    process.exit(1);
}
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'moviesworldcenter@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-email-password'
  }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

connectToDatabase();

app.post('/api/Signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const db = client.db('FireX'); 
        const collection = db.collection('FireXUserInfor'); 

        const result = await collection.insertOne({ name: name, email: email, password: password });
        console.log(`Inserted ${result.insertedCount} document(s)`);

        res.status(200).json({ message: "User information stored successfully" });
    } catch (err) {
        console.error("Error storing user information:", err);
        res.status(500).json({ message: "Failed to store user information" });
    }
});

app.post('/api/Login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = client.db('FireX'); 
        const collection = db.collection('FireXUserInfor'); 

        // Check if there exists a document with the given name and email
        const documents = await collection.find({
            email: email,
            password: password,
        }).toArray();

        if (documents.length > 0) {
            res.json({ found: true });
        } else {
            res.json({ found: false });
        }
    } catch (err) {
        console.error("Error checking user information:", err);
        res.status(500).json({ message: "Failed to check user information" });
    }
});

app.post('/api/Verification', async (req, res) => {
    const { email } = req.body;

    try {
        // Generate 6-digit code
        const code = [...Array(6)].map(() => Math.floor(Math.random() * 10).toString());
        
        // Send email using Nodemailer
        await transporter.sendMail({
            from: '"FireX App" <moviesworldcenter@gmail.com>',
            to: email,
            subject: 'Your 6-Digit Verification Code',
            text: `Your verification code is: ${code.join(' ')}`,
            html: `
                <h1>FireX App Verification</h1>
                <p>Your verification code is:</p>
                <h2 style="font-size: 24px; letter-spacing: 8px; font-weight: bold;">${code.join(' ')}</h2>
                <p>Please enter this code in the app to complete your verification.</p>
                <p>If you didn't request this code, please ignore this email.</p>
            `
        });

        // Send the code back to the frontend
        res.status(200).json({ 
            message: "Verification code sent successfully",
            code: code
        });
    } catch (err) {
        console.error("Error in verification process:", err);
        res.status(500).json({ message: "Failed to send verification code" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});