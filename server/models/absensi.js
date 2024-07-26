const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const absensiSchema = new Schema ({
    tanggal: Date,
    status: String,
    catatan: String,
    id_karyawan: {
        type: Schema.Types.ObjectId,
        ref: "karyawan"
    }
}, {
    timestamps: true
})

const absensi = mongoose.model("absensi", absensiSchema);

module.exports = absensi;