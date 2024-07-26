const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jabatanSchema = new Schema({
    nama: String,
    departemen: String,
    tglmulai: Date,
    tglselesai: Date,
    id_karyawan: {
        type: Schema.Types.ObjectId,
        ref: "karyawan"
    }
}, {
    timestamps: true
})

const Jabatan = mongoose.model("jabatan", jabatanSchema);

module.exports = jabatan;