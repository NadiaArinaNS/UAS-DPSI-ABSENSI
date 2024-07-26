const mongoose = require('mongoose');
const bycryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const karyawanSchema = new Schema({
    nama: String,
    alamat: String,
    telepon: String,
    status: String,
    email: {
        type: String,
        unique: [true, 'Email is already used!'],
        validate: {
            validator: (email) => {
                return /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(String(email));
            },
            message: 'Email format is wrong!'
        },
        required: [true, 'Please input your email!']
    },
    password: {
        type: String,
        validate: {
            validator: (password) => {
                return new Promise((resolve, reject) => {
                    if (/^(?=.*\d)(?=.*[a-z]).{6,}$/.test(String(password))) {
                        resolve()
                    } else {
                        let statusMessage = 'Password at least 6 characters and contains at leats one number and one lowercase!';

                        reject(statusMessage)
                    }
                })
            }
        }
    },
}, {
    timestamps: true
});

karyawanSchema.pre('save', function (next) {
    bycryptjs.genSalt(10, (errSalt, salt) => {
        if (!errSalt) {
            bycryptjs.hash(this.password, salt, (errHash, hash) => {
                if (!errHash) {
                    this.password = hash;
                    next();
                } else {
                    next(errHash);
                }
            })
        } else {
            next(errSalt)
        }
    })
})

const Karyawan = mongoose.model("karyawan", karyawanSchema);

module.exports = Karyawan;