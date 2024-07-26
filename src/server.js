const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const jobRoutes = require('./routes/jobRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
