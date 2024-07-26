const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const laporanBulananSchema = new Schema ({
    periode: String,
    dataLaporan: int
}, {
    timestamps: true
})

const laporanBulanan = mongoose.model("laporanBulanan", laporanBulananSchema);

module.exports = laporanBulanan;