-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Nov 2024 pada 17.02
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
(1, 'Assesmen Bulanan Desember', 'bulanan', '2024-12-01'),
(2, 'UTS Desember', 'uts', '2024-12-15');

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
(3, 2, 'tidak_hadir');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `id_matpel` int(11) NOT NULL,
  `nama_kelas` varchar(255) NOT NULL,
  `tipe` enum('reguler','privat') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `id_matpel`, `nama_kelas`, `tipe`) VALUES
(1, 1, 'Kelas A', 'reguler'),
(2, 2, 'Kelas A', 'reguler'),
(3, 3, 'Kelas Privat C', 'privat');

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
(3, 'Kimia');

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
(1, 2, 'reguler', 'transfer', 500000.00, '2024-11-21', NULL, '2024-11-25', 'pending', 'https://templates.invoicehome.com/receipt-template-us-neat-750px.png'),
(2, 3, 'privat', 'cash', 750000.00, '2024-11-21', NULL, '2024-11-30', 'lunas', NULL);

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
(4, 1, 'Pengajar Matematika', '081234567892'),
(5, 2, 'Pengajar Fisika', '081234567893');

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
(1, 2, 1, 85),
(2, 3, 2, 78.5);

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
(1, 1, 4, '2024-11-20 10:00:00'),
(2, 2, 5, '2024-11-21 14:00:00');

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
  `status_request` enum('pending','accepted','rejected') DEFAULT 'pending',
  `tanggal_request` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request_kelas_privat`
--

INSERT INTO `request_kelas_privat` (`id_request_privat`, `id_siswa`, `id_matpel`, `id_pengajar`, `waktu_kelas`, `status_request`, `tanggal_request`) VALUES
(1, 2, 3, 4, '2024-11-22 09:00:00', 'pending', '2024-11-21'),
(2, 3, 1, 5, '2024-11-23 13:00:00', 'accepted', '2024-11-21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `request_kelas_reguler`
--

CREATE TABLE `request_kelas_reguler` (
  `id_request_reguler` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_pertemuan_lama` int(11) NOT NULL,
  `id_pertemuan_baru` int(11) NOT NULL,
  `status_request` enum('pending','accepted','rejected') DEFAULT 'pending',
  `tanggal_request` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `request_kelas_reguler`
--

INSERT INTO `request_kelas_reguler` (`id_request_reguler`, `id_siswa`, `id_pertemuan_lama`, `id_pertemuan_baru`, `status_request`, `tanggal_request`) VALUES
(1, 2, 2, 1, 'accepted', '2024-11-21'),
(2, 3, 1, 2, 'pending', '2024-11-21');

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
('KOh184DTikX_K6mO_PQZwTORResokMsB', 1732290649, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-11-22T15:50:24.131Z\",\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id_user\":1,\"username\":\"admin1\",\"role\":\"admin\"}}');

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
(2, 'Siswa A', '081234567890', 'Jl. Contoh No.1'),
(3, 'Siswa B', '081234567891', 'Jl. Contoh No.2');

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
(3, 2);

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
(4, 'pengajar1', 'password123', NULL, 'pengajar'),
(5, 'pengajar2', 'password123', NULL, 'pengajar');

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
  ADD KEY `id_matpel` (`id_matpel`);

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
  MODIFY `id_assesmen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pelajaran`
--
ALTER TABLE `pelajaran`
  MODIFY `id_matpel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  MODIFY `id_pertemuan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `request_kelas_privat`
--
ALTER TABLE `request_kelas_privat`
  MODIFY `id_request_privat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `request_kelas_reguler`
--
ALTER TABLE `request_kelas_reguler`
  MODIFY `id_request_reguler` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_matpel`) REFERENCES `pelajaran` (`id_matpel`) ON DELETE CASCADE;

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
