// backend/index.js
import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const PORT = process.env.PORT ;

// Middleware
app.use(cors(
    {
        origin:'*'
    }
));
app.use(express.json());

// MongoDB Connection (Replace with your own MongoDB URI)
mongoose.connect(`${process.env.MONGODB_URI}`)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    experience: Number,
    location: String,
    fees: Number,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// API 1: Add Doctor
app.post('/api/add-doctor', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add doctor' });
    }
});

// API 2: List Doctors with Filters + Pagination
app.get('/api/list-doctor-with-filter', async (req, res) => {
    try {
        const { specialization, location, minFees, maxFees, page = 1, limit = 10 } = req.query;
        let filter = {};

        if (specialization) filter.specialization = specialization;
        if (location) filter.location = location;
        if (minFees) filter.fees = { ...filter.fees, $gte: Number(minFees) };
        if (maxFees) filter.fees = { ...filter.fees, $lte: Number(maxFees) };

        const doctors = await Doctor.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Doctor.countDocuments(filter);

        res.json({ doctors, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
