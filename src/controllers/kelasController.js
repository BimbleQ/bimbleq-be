const db = require("../config/db");

const getKelasAwal = async (req, res) => {
  try {
    const user = req.session.user; //ambil data user dari session

    if (!user || user.role !== "siswa") {
      return res.status(403).json({ message: "Akses hanya untuk siswa" });
    }
    const id_siswa = user.id_user; //id_siswa dari session

    const [kelasAwal] = await db.query(
      `SELECT 
                pertemuan.id_pertemuan, 
                kelas.nama_kelas,
                DATE_FORMAT(pertemuan.waktu_kelas, '%Y-%m-%d %H:%i:%s') AS waktu_kelas
             FROM siswa_kelas
             JOIN kelas ON siswa_kelas.id_kelas = kelas.id_kelas
             JOIN pertemuan ON kelas.id_kelas = pertemuan.id_kelas
             WHERE siswa_kelas.id_siswa = ?`,
      [id_siswa]
    );

    if (kelasAwal.length === 0) {
      return res.status(404).json({ message: "Tidak ada kelas yang ditemukan untuk siswa ini" });
    }

    res.status(200).json({ kelasAwal });
  } catch (error) {
    console.error("Error mendapatkan data kelas awal:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

//mendapatkan daftar kelas tujuan berdasarkan mata pelajaran dari kelas awal
const getKelasTujuanRefId = async (req, res) => {
    const { id_pertemuan_lama } = req.query;
  
    if (!id_pertemuan_lama) {
      return res.status(400).json({ message: "id_pertemuan_lama harus disertakan" });
    }
  
    try {
      // Ambil id_kelas dari id_pertemuan_lama
      const [kelasAwalResult] = await db.query(
        `SELECT kelas.id_matpel
               FROM pertemuan
               JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
               WHERE pertemuan.id_pertemuan = ?`,
        [id_pertemuan_lama]
      );
  
      if (kelasAwalResult.length === 0) {
        return res.status(404).json({ message: "Kelas awal tidak ditemukan" });
      }
  
      const id_matpel = kelasAwalResult[0].id_matpel;
  
      // Ambil data id_pertemuan, nama_kelas, dan waktu_kelas untuk kelas tujuan
      const [kelasTujuan] = await db.query(
        `SELECT 
                  pertemuan.id_pertemuan,
                  kelas.nama_kelas,
                  DATE_FORMAT(pertemuan.waktu_kelas, '%Y-%m-%d %H:%i:%s') AS waktu_kelas
               FROM pertemuan
               JOIN kelas ON pertemuan.id_kelas = kelas.id_kelas
               WHERE kelas.id_matpel = ? AND pertemuan.id_pertemuan != ?`,
        [id_matpel, id_pertemuan_lama]
      );
  
      if (kelasTujuan.length === 0) {
        return res.status(404).json({ message: "Kelas tujuan tidak ditemukan" });
      }
  
      res.status(200).json({ kelasTujuan });
    } catch (error) {
      console.error("Error mendapatkan data kelas tujuan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  };

const getJumlahKelasAktif = async (req, res) => {
  try {
    // Query untuk menghitung jumlah kelas aktif
    const [kelasAktif] = await db.query(
      `SELECT COUNT(DISTINCT pertemuan.id_kelas) AS jumlah_kelas_aktif
               FROM pertemuan`
    );

    // Kirim hasil ke response
    res.status(200).json({ jumlah_kelas_aktif: kelasAktif[0].jumlah_kelas_aktif });
  } catch (error) {
    console.error("Error mendapatkan jumlah kelas aktif:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const getKelas = async (req, res) => {
  try {
    const query = `
          SELECT 
              kelas.id_kelas,
              kelas.nama_kelas,
              kelas.tipe,
              kelas.jadwal_default,
              pelajaran.nama_matpel,
              pengajar.nama AS nama_pengajar,
              COUNT(siswa_kelas.id_siswa) AS jumlah_siswa
          FROM kelas
          LEFT JOIN pelajaran ON kelas.id_matpel = pelajaran.id_matpel
          LEFT JOIN pengajar ON kelas.id_pengajar = pengajar.id_pengajar
          LEFT JOIN siswa_kelas ON kelas.id_kelas = siswa_kelas.id_kelas
          GROUP BY kelas.id_kelas;
      `;

    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error mendapatkan daftar kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

const createKelas = async (req, res) => {
  try {
    // Data dari request body
    const { id_matpel, id_pengajar, nama_kelas, tipe } = req.body;

    // Validasi id_matpel ada di tabel pelajaran
    const [pelajaran] = await db.query(`SELECT * FROM pelajaran WHERE id_matpel = ?`, [id_matpel]);
    if (pelajaran.length === 0) {
      return res.status(400).json({ message: "Mata pelajaran tidak ditemukan." });
    }

    // Validasi id_pengajar ada di tabel pengajar
    const [pengajar] = await db.query(`SELECT * FROM pengajar WHERE id_pengajar = ?`, [id_pengajar]);
    if (pengajar.length === 0) {
      return res.status(400).json({ message: "Pengajar tidak ditemukan." });
    }

    // Validasi tipe kelas
    if (!["reguler", "privat"].includes(tipe)) {
      return res.status(400).json({ message: "Tipe kelas harus 'reguler' atau 'privat'." });
    }

    // Query untuk menambahkan kelas baru
    await db.query(`INSERT INTO kelas (id_matpel, id_pengajar, nama_kelas, tipe) VALUES (?, ?, ?, ?)`, [id_matpel, id_pengajar, nama_kelas, tipe]);

    res.status(201).json({ message: "Kelas berhasil dibuat." });
  } catch (error) {
    console.error("Error saat membuat kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

const updateKelas = async (req, res) => {
  try {
    const { id_kelas } = req.params; // Ambil ID kelas dari query string
    const { id_matpel, nama_kelas, tipe, id_pengajar } = req.body; // Data yang ingin diperbarui

    if (!id_kelas) {
      return res.status(400).json({ message: "id_kelas harus disertakan" });
    }

    // Validasi apakah kelas dengan ID tersebut ada
    const [kelas] = await db.query(`SELECT * FROM kelas WHERE id_kelas = ?`, [id_kelas]);
    if (kelas.length === 0) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    // Update data kelas
    await db.query(
      `UPDATE kelas
           SET id_matpel = COALESCE(?, id_matpel),
               nama_kelas = COALESCE(?, nama_kelas),
               tipe = COALESCE(?, tipe),
               id_pengajar = COALESCE(?, id_pengajar)
           WHERE id_kelas = ?`,
      [id_matpel, nama_kelas, tipe, id_pengajar, id_kelas]
    );

    res.status(200).json({ message: "Kelas berhasil diperbarui" });
  } catch (error) {
    console.error("Error saat memperbarui kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getKelasTujuanRefId, getKelasAwal, getJumlahKelasAktif, createKelas, updateKelas, getKelas };
