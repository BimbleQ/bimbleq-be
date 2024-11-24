-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Nov 2024 pada 18.02
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bimbelq3`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `assesmen`
--

CREATE TABLE `assesmen` (
  `id_assesmen` int(11) NOT NULL,
  `nama_assesmen` varchar(255) NOT NULL,
  `tipe_assesmen` enum('bulanan','uts','uas') NOT NULL,
  `waktu_penilaian` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `assesmen`
--

INSERT INTO `assesmen` (`id_assesmen`, `nama_assesmen`, `tipe_assesmen`, `waktu_penilaian`) VALUES
(1, 'Bulanan - Kelas 1', 'bulanan', '2024-11-30'),
(2, 'UTS - Kelas 1', 'uts', '2024-12-10'),
(3, 'UAS - Kelas 1', 'uas', '2024-12-20'),
(4, 'Bulanan - Kelas 2', 'bulanan', '2024-11-30'),
(5, 'UTS - Kelas 2', 'uts', '2024-12-10'),
(6, 'UAS - Kelas 2', 'uas', '2024-12-20');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kehadiran`
--

CREATE TABLE `kehadiran` (
  `id_siswa` int(11) NOT NULL,
  `id_pertemuan` int(11) NOT NULL,
  `kehadiran` enum('hadir','tidak_hadir') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kehadiran`
--

INSERT INTO `kehadiran` (`id_siswa`, `id_pertemuan`, `kehadiran`) VALUES
(2, 1, 'hadir'),
(2, 2, 'hadir'),
(3, 1, 'hadir'),
(3, 2, 'hadir'),
(4, 1, 'tidak_hadir'),
(4, 2, 'hadir'),
(5, 1, 'hadir'),
(5, 2, 'tidak_hadir'),
(6, 1, 'hadir'),
(6, 2, 'hadir'),
(7, 1, 'tidak_hadir'),
(7, 2, 'hadir'),
(8, 1, 'hadir'),
(8, 2, 'hadir'),
(9, 1, 'hadir'),
(9, 2, 'tidak_hadir'),
(10, 1, 'hadir'),
(10, 2, 'hadir'),
(11, 1, 'tidak_hadir'),
(11, 2, 'hadir');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `id_matpel` int(11) NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `id_pengajar` int(11) NOT NULL,
  `tipe` enum('reguler','privat') NOT NULL,
  `jadwal_default` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `id_matpel`, `nama_kelas`, `id_pengajar`, `tipe`, `jadwal_default`) VALUES
(1, 1, 'Kelas Matematika Reguler', 22, 'reguler', '2024-11-25 09:00:00'),
(2, 2, 'Kelas Fisika Privat', 23, 'privat', '2024-11-26 14:00:00'),
(3, 3, 'Kelas Kimia Reguler', 24, 'reguler', '2024-11-27 10:00:00'),
(4, 4, 'Kelas Biologi Privat', 25, 'privat', '2024-11-28 16:00:00'),
(5, 5, 'Kelas Bahasa Indonesia', 26, 'reguler', '2024-11-29 13:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelajaran`
--

CREATE TABLE `pelajaran` (
  `id_matpel` int(11) NOT NULL,
  `nama_matpel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pelajaran`
--

INSERT INTO `pelajaran` (`id_matpel`, `nama_matpel`) VALUES
(1, 'Matematika'),
(2, 'Fisika'),
(3, 'Kimia'),
(4, 'Biologi'),
(5, 'Bahasa Indonesia'),
(6, 'Bahasa Inggris'),
(7, 'Sejarah'),
(8, 'Geografi'),
(9, 'Ekonomi'),
(10, 'Sosiologi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `tipe_kelas` enum('privat','reguler') NOT NULL,
  `tipe_pembayaran` enum('transfer','cash') NOT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `waktu_tagihan` date DEFAULT curdate(),
  `waktu_pembayaran` datetime DEFAULT NULL,
  `waktu_tenggat` date DEFAULT NULL,
  `status` enum('pending','lunas','telat') NOT NULL,
  `link_bukti` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_siswa`, `tipe_kelas`, `tipe_pembayaran`, `jumlah`, `waktu_tagihan`, `waktu_pembayaran`, `waktu_tenggat`, `status`, `link_bukti`) VALUES
(1, 2, 'privat', 'transfer', 500000.00, '2024-11-01', '2024-11-03 10:00:00', '2024-11-05', 'lunas', 'https://templates.invoicehome.com/receipt-template-us-neat-750px.png'),
(2, 2, 'reguler', 'cash', 300000.00, '2024-11-10', NULL, '2024-11-15', 'pending', NULL),
(3, 2, 'privat', 'transfer', 450000.00, '2024-11-20', NULL, '2024-11-25', 'telat', NULL),
(4, 3, 'privat', 'transfer', 500000.00, '2024-11-01', '2024-11-04 12:00:00', '2024-11-05', 'lunas', 'https://templates.invoicehome.com/receipt-template-us-neat-750px.png'),
(5, 3, 'reguler', 'cash', 300000.00, '2024-11-15', NULL, '2024-11-20', 'pending', NULL),
(6, 3, 'privat', 'transfer', 450000.00, '2024-11-25', NULL, '2024-11-30', 'telat', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengajar`
--

CREATE TABLE `pengajar` (
  `id_pengajar` int(11) NOT NULL,
  `id_matpel` int(11) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengajar`
--

INSERT INTO `pengajar` (`id_pengajar`, `id_matpel`, `nama`, `kontak`) VALUES
(22, 1, 'Dr. Rani', '08123456809'),
(23, 2, 'Mr. John', '08123456810'),
(24, 3, 'Ms. Laila', '08123456811'),
(25, 4, 'Prof. Hadi', '08123456812'),
(26, 5, 'Mrs. Nurul', '08123456813');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penilaian`
--

CREATE TABLE `penilaian` (
  `id_assesmen` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `nilai` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `penilaian`
--

INSERT INTO `penilaian` (`id_assesmen`, `id_siswa`, `id_kelas`, `nilai`) VALUES
(1, 2, 1, 85.5),
(1, 3, 1, 78),
(1, 4, 1, 90),
(1, 5, 1, 88),
(1, 6, 1, 95),
(1, 7, 1, 72.5),
(1, 8, 1, 85),
(1, 9, 1, 91),
(1, 10, 1, 89),
(1, 11, 1, 87.5),
(2, 2, 1, 80.5),
(2, 3, 1, 82),
(2, 4, 1, 92),
(2, 5, 1, 84),
(2, 6, 1, 94),
(2, 7, 1, 70.5),
(2, 8, 1, 88),
(2, 9, 1, 90),
(2, 10, 1, 87.5),
(2, 11, 1, 85.5),
(3, 2, 1, 89),
(3, 3, 1, 80),
(3, 4, 1, 91),
(3, 5, 1, 85),
(3, 6, 1, 92),
(3, 7, 1, 75),
(3, 8, 1, 87),
(3, 9, 1, 89),
(3, 10, 1, 84),
(3, 11, 1, 86);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pertemuan`
--

CREATE TABLE `pertemuan` (
  `id_pertemuan` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_pengajar` int(11) NOT NULL,
  `waktu_kelas` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pertemuan`
--

INSERT INTO `pertemuan` (`id_pertemuan`, `id_kelas`, `id_pengajar`, `waktu_kelas`) VALUES
(1, 1, 22, '2024-11-25 09:00:00'),
(2, 1, 22, '2024-12-02 09:00:00'),
(3, 1, 22, '2024-12-09 09:00:00'),
(4, 2, 23, '2024-11-26 14:00:00'),
(5, 2, 23, '2024-12-03 14:00:00'),
(6, 2, 23, '2024-12-10 14:00:00'),
(7, 3, 24, '2024-11-27 10:00:00'),
(8, 3, 24, '2024-12-04 10:00:00'),
(9, 3, 24, '2024-12-11 10:00:00'),
(10, 4, 25, '2024-11-28 16:00:00'),
(11, 4, 25, '2024-12-05 16:00:00'),
(12, 4, 25, '2024-12-12 16:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_kelas_privat`
--

CREATE TABLE `request_kelas_privat` (
  `id_request_privat` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_matpel` int(11) NOT NULL,
  `id_pengajar` int(11) DEFAULT NULL,
  `waktu_kelas` datetime NOT NULL,
  `note` text DEFAULT NULL,
  `status_request` enum('pending','accepted','rejected') DEFAULT 'pending',
  `tanggal_request` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request_kelas_privat`
--

INSERT INTO `request_kelas_privat` (`id_request_privat`, `id_siswa`, `id_matpel`, `id_pengajar`, `waktu_kelas`, `note`, `status_request`, `tanggal_request`) VALUES
(1, 2, 1, 22, '2024-12-15 09:00:00', 'Ingin tambahan.', 'pending', '2024-11-24'),
(2, 3, 1, 22, '2024-12-16 09:00:00', 'Minta sesi ekstra.', 'accepted', '2024-11-24'),
(3, 4, 2, 23, '2024-12-15 10:00:00', 'Persiapan ujian.', 'rejected', '2024-11-24'),
(4, 5, 3, 24, '2024-12-17 11:00:00', 'Materi lanjutan.', 'pending', '2024-11-24'),
(5, 6, 4, 25, '2024-12-18 14:00:00', 'Perbaikan konsep.', 'accepted', '2024-11-24'),
(6, 3, 2, 23, '2024-12-16 10:00:00', 'Tambahan persiapan ujian.', 'accepted', '2024-11-24'),
(7, 4, 3, 24, '2024-12-17 11:00:00', 'Butuh penjelasan materi.', 'rejected', '2024-11-24'),
(8, 5, 4, 25, '2024-12-18 14:00:00', 'Kesulitan memahami topik.', 'pending', '2024-11-24'),
(9, 6, 5, 26, '2024-12-19 15:00:00', 'Memperdalam materi.', 'accepted', '2024-11-24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_kelas_reguler`
--

CREATE TABLE `request_kelas_reguler` (
  `id_request_reguler` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_pertemuan_lama` int(11) NOT NULL,
  `id_pertemuan_baru` int(11) NOT NULL,
  `note` text DEFAULT NULL,
  `status_request` enum('pending','accepted','rejected') DEFAULT 'pending',
  `tanggal_request` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request_kelas_reguler`
--

INSERT INTO `request_kelas_reguler` (`id_request_reguler`, `id_siswa`, `id_pertemuan_lama`, `id_pertemuan_baru`, `note`, `status_request`, `tanggal_request`) VALUES
(1, 2, 1, 4, 'Ingin ubah jadwal.', 'pending', '2024-11-24'),
(2, 3, 2, 5, 'Ada konflik jadwal.', 'accepted', '2024-11-24'),
(3, 4, 3, 6, 'Perlu jadwal baru.', 'rejected', '2024-11-24'),
(4, 5, 4, 7, 'Butuh pengganti.', 'pending', '2024-11-24'),
(5, 6, 5, 8, 'Konfirmasi jadwal.', 'accepted', '2024-11-24'),
(6, 2, 1, 2, 'Konflik jadwal, minta reschedule.', 'pending', '2024-11-24'),
(7, 3, 3, 4, 'Tidak bisa hadir, minta pindah jadwal.', 'accepted', '2024-11-24'),
(8, 4, 5, 6, 'Ada acara mendadak, perlu perubahan.', 'rejected', '2024-11-24'),
(9, 5, 7, 8, 'Butuh jadwal yang lebih fleksibel.', 'pending', '2024-11-24'),
(10, 6, 9, 10, 'Minta ganti karena bentrok ujian.', 'accepted', '2024-11-24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Jv45RPvSWXJkrJyzgX_Xw9ixgAExUaKt', 1732553897, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-11-25T16:57:41.160Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"Lax\"},\"user\":{\"id_user\":1,\"username\":\"admin1\",\"role\":\"admin\",\"nama\":\"\"}}'),
('vV4S99raYJX8XglF5WBrigc_ChW6a6x4', 1732554113, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-11-25T17:00:33.162Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"Lax\"},\"user\":{\"id_user\":2,\"username\":\"siswa1\",\"role\":\"siswa\",\"nama\":\"Ahmad\"}}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kontak` varchar(50) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `nama`, `kontak`, `alamat`) VALUES
(2, 'Ahmad', '08123456789', 'Jl. Merdeka No. 1'),
(3, 'Budi', '08123456790', 'Jl. Sudirman No. 5'),
(4, 'Citra', '08123456791', 'Jl. Gatot Subroto No. 3'),
(5, 'Dian', '08123456792', 'Jl. Hasanudin No. 7'),
(6, 'Eka', '08123456793', 'Jl. Diponegoro No. 9'),
(7, 'Fajar', '08123456794', 'Jl. Soekarno No. 10'),
(8, 'Gita', '08123456795', 'Jl. Yos Sudarso No. 15'),
(9, 'Hana', '08123456796', 'Jl. Trunojoyo No. 12'),
(10, 'Irfan', '08123456797', 'Jl. Sudirman No. 20'),
(11, 'Joko', '08123456798', 'Jl. MT. Haryono No. 18'),
(12, 'Kiki', '08123456799', 'Jl. Kemerdekaan No. 25'),
(13, 'Laila', '08123456800', 'Jl. Pasar No. 30'),
(14, 'Maya', '08123456801', 'Jl. Salemba No. 40'),
(15, 'Nina', '08123456802', 'Jl. Raya No. 50'),
(16, 'Oki', '08123456803', 'Jl. Veteran No. 60'),
(17, 'Putri', '08123456804', 'Jl. Malabar No. 70'),
(18, 'Qori', '08123456805', 'Jl. Anoa No. 80'),
(19, 'Rizky', '08123456806', 'Jl. Kencana No. 90'),
(20, 'Sinta', '08123456807', 'Jl. Permai No. 100'),
(21, 'Tina', '08123456808', 'Jl. Bambu No. 110');

-- --------------------------------------------------------

--
-- Struktur dari tabel `siswa_kelas`
--

CREATE TABLE `siswa_kelas` (
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `siswa_kelas`
--

INSERT INTO `siswa_kelas` (`id_siswa`, `id_kelas`) VALUES
(2, 1),
(2, 3),
(3, 1),
(3, 3),
(4, 1),
(4, 3),
(5, 1),
(5, 3),
(6, 1),
(6, 3),
(7, 1),
(7, 3),
(8, 1),
(8, 3),
(9, 1),
(9, 3),
(10, 1),
(10, 3),
(11, 1),
(11, 3),
(12, 2),
(12, 4),
(13, 2),
(13, 4),
(14, 2),
(14, 4),
(15, 2),
(15, 4),
(16, 2),
(16, 4),
(17, 2),
(17, 4),
(18, 2),
(18, 4),
(19, 2),
(19, 4),
(20, 2),
(20, 4),
(21, 2),
(21, 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `role` enum('admin','siswa','pengajar') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `foto_profil`, `role`) VALUES
(1, 'admin1', 'password123', NULL, 'admin'),
(2, 'siswa1', 'password123', NULL, 'siswa'),
(3, 'siswa2', 'password123', NULL, 'siswa'),
(4, 'siswa3', 'password123', NULL, 'siswa'),
(5, 'siswa4', 'password123', NULL, 'siswa'),
(6, 'siswa5', 'password123', NULL, 'siswa'),
(7, 'siswa6', 'password123', NULL, 'siswa'),
(8, 'siswa7', 'password123', NULL, 'siswa'),
(9, 'siswa8', 'password123', NULL, 'siswa'),
(10, 'siswa9', 'password123', NULL, 'siswa'),
(11, 'siswa10', 'password123', NULL, 'siswa'),
(12, 'siswa11', 'password123', NULL, 'siswa'),
(13, 'siswa12', 'password123', NULL, 'siswa'),
(14, 'siswa13', 'password123', NULL, 'siswa'),
(15, 'siswa14', 'password123', NULL, 'siswa'),
(16, 'siswa15', 'password123', NULL, 'siswa'),
(17, 'siswa16', 'password123', NULL, 'siswa'),
(18, 'siswa17', 'password123', NULL, 'siswa'),
(19, 'siswa18', 'password123', NULL, 'siswa'),
(20, 'siswa19', 'password123', NULL, 'siswa'),
(21, 'siswa20', 'password123', NULL, 'siswa'),
(22, 'pengajar1', 'password123', NULL, 'pengajar'),
(23, 'pengajar2', 'password123', NULL, 'pengajar'),
(24, 'pengajar3', 'password123', NULL, 'pengajar'),
(25, 'pengajar4', 'password123', NULL, 'pengajar'),
(26, 'pengajar5', 'password123', NULL, 'pengajar');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `assesmen`
--
ALTER TABLE `assesmen`
  ADD PRIMARY KEY (`id_assesmen`);

--
-- Indeks untuk tabel `kehadiran`
--
ALTER TABLE `kehadiran`
  ADD PRIMARY KEY (`id_siswa`,`id_pertemuan`),
  ADD KEY `id_pertemuan` (`id_pertemuan`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD KEY `id_matpel` (`id_matpel`),
  ADD KEY `id_pengajar` (`id_pengajar`);

--
-- Indeks untuk tabel `pelajaran`
--
ALTER TABLE `pelajaran`
  ADD PRIMARY KEY (`id_matpel`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indeks untuk tabel `pengajar`
--
ALTER TABLE `pengajar`
  ADD PRIMARY KEY (`id_pengajar`),
  ADD KEY `id_matpel` (`id_matpel`);

--
-- Indeks untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id_assesmen`,`id_siswa`,`id_kelas`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indeks untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  ADD PRIMARY KEY (`id_pertemuan`),
  ADD KEY `id_kelas` (`id_kelas`),
  ADD KEY `id_pengajar` (`id_pengajar`);

--
-- Indeks untuk tabel `request_kelas_privat`
--
ALTER TABLE `request_kelas_privat`
  ADD PRIMARY KEY (`id_request_privat`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_matpel` (`id_matpel`),
  ADD KEY `id_pengajar` (`id_pengajar`);

--
-- Indeks untuk tabel `request_kelas_reguler`
--
ALTER TABLE `request_kelas_reguler`
  ADD PRIMARY KEY (`id_request_reguler`),
  ADD KEY `id_siswa` (`id_siswa`),
  ADD KEY `id_pertemuan_lama` (`id_pertemuan_lama`),
  ADD KEY `id_pertemuan_baru` (`id_pertemuan_baru`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indeks untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`);

--
-- Indeks untuk tabel `siswa_kelas`
--
ALTER TABLE `siswa_kelas`
  ADD PRIMARY KEY (`id_siswa`,`id_kelas`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `assesmen`
--
ALTER TABLE `assesmen`
  MODIFY `id_assesmen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pelajaran`
--
ALTER TABLE `pelajaran`
  MODIFY `id_matpel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  MODIFY `id_pertemuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `request_kelas_privat`
--
ALTER TABLE `request_kelas_privat`
  MODIFY `id_request_privat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `request_kelas_reguler`
--
ALTER TABLE `request_kelas_reguler`
  MODIFY `id_request_reguler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kehadiran`
--
ALTER TABLE `kehadiran`
  ADD CONSTRAINT `kehadiran_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `kehadiran_ibfk_2` FOREIGN KEY (`id_pertemuan`) REFERENCES `pertemuan` (`id_pertemuan`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_matpel`) REFERENCES `pelajaran` (`id_matpel`) ON DELETE CASCADE,
  ADD CONSTRAINT `kelas_ibfk_2` FOREIGN KEY (`id_pengajar`) REFERENCES `pengajar` (`id_pengajar`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengajar`
--
ALTER TABLE `pengajar`
  ADD CONSTRAINT `pengajar_ibfk_1` FOREIGN KEY (`id_pengajar`) REFERENCES `user` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `pengajar_ibfk_2` FOREIGN KEY (`id_matpel`) REFERENCES `pelajaran` (`id_matpel`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_3` FOREIGN KEY (`id_assesmen`) REFERENCES `assesmen` (`id_assesmen`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  ADD CONSTRAINT `pertemuan_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE CASCADE,
  ADD CONSTRAINT `pertemuan_ibfk_2` FOREIGN KEY (`id_pengajar`) REFERENCES `pengajar` (`id_pengajar`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `request_kelas_privat`
--
ALTER TABLE `request_kelas_privat`
  ADD CONSTRAINT `request_kelas_privat_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_kelas_privat_ibfk_2` FOREIGN KEY (`id_matpel`) REFERENCES `pelajaran` (`id_matpel`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_kelas_privat_ibfk_3` FOREIGN KEY (`id_pengajar`) REFERENCES `pengajar` (`id_pengajar`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `request_kelas_reguler`
--
ALTER TABLE `request_kelas_reguler`
  ADD CONSTRAINT `request_kelas_reguler_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_kelas_reguler_ibfk_2` FOREIGN KEY (`id_pertemuan_lama`) REFERENCES `pertemuan` (`id_pertemuan`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_kelas_reguler_ibfk_3` FOREIGN KEY (`id_pertemuan_baru`) REFERENCES `pertemuan` (`id_pertemuan`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `user` (`id_user`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `siswa_kelas`
--
ALTER TABLE `siswa_kelas`
  ADD CONSTRAINT `siswa_kelas_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`) ON DELETE CASCADE,
  ADD CONSTRAINT `siswa_kelas_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
