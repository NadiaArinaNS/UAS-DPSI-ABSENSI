const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tugasSchema = new Schema ({
    nama: String,
    deskripsi: String,
    tglmulai: Date,
    tglselesai: Date,
    id_karyawan: {
        type: Schema.Types.ObjectId,
        ref: "karyawan"
    }
}, {
    timestamps: true
})

const tugas = mongoose.model("tugas", tugasSchema);

module.exports = tugas;