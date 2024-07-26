require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authentication, verifyToken } = require('./middlewares/auth');

const karyawan = require('./models/karyawan');
const jabatan = require('./models/jabatan');

const port = 3333;

const app = express();
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //we're connected!
    console.log('Database ready!');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authentication);

app.get('/', (req, res) => {
    res.send('Helloo!! Selamat Datang')
});

app.post('/karyawan/signup', (req, res) => {
    const payload = req.body;

    karyawan.create(payload)
        .then((data) => {
            res.json({
                message: "data karyawan telah ditambah",
                data
            })
        })
        .catch((error) => {
            res.json({
                message: error.message
            })
        })
})

app.post('/karyawan/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const karyawann = await karyawan.findOne({ email });

        if (karyawann) {
            const hashed = bcryptjs.compare(password, karyawann.password);

            if (hashed) {
                const payload = {
                    email: karyawan.email,
                    alamat: karyawan.alamat,
                    status: karyawan.status
                }

                const token = jwt.sign(payload, process.env.SECRET_KEY)

                res.json({
                    message: "Login successful!",
                    data: {
                        token,
                        payload
                    }
                })
            } else {
                res.json({
                    message: "Email or password wrong!"
                })
            }
        } else {
            res.json({
                message: "Email or password wrong!"
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

app.get('/karyawan', (req, res) => {
    karyawan.find()
        .then((data) => {
            res.json({
                message: "get karyawan successful!",
                data
            })
        })
        .catch((error) => {
            res.json({
                message: error.message
            })
        })
})

app.put('/karyawan/:id/update', (req, res) => {
    const payload = req.body;
    const id = req.params.id;

    karyawan.updateOne({ _id: id }, payload)
        .then((data) => {
            res.json({
                message: "karyawan updated!",
                data
            })
        })
        .catch((error) => {
            res.json({
                message: error.message
            })
        })
})

app.delete('/karyawan/:id/delete', (req, res) => {
    const id = req.params.id;

    karyawan.deleteOne({ _id: id })
        .then((data) => {
            res.json({
                message: "karyawan deleted!",
                data
            })
        })
        .catch((error) => {
            res.json({
                message: error.message
            })
        })
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dpsiabsensi.flgkvuw.mongodb.net/?retryWrites=true&w=majority&appName=DPSIabsensi`, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
    console.log(`server ready on port ${port}`);
});