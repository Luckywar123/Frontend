# Panduan Repositori Github

## Membuat Halaman

1. **Organisasi File**: Setiap halaman yang dibuat harus ditempatkan di direktori `/pages`.

2. **Struktur File**: Setiap halaman harus memiliki folder sendiri, berisi:
   - `index.js`: mengekspor file JSX.
   - `[NamaHalaman].jsx`: berisi konten dari halaman tersebut.
   - `style.module.css`: berisi gaya/styling untuk halaman tersebut.

3. **Mengekspor Halaman**: Setelah membuat folder halaman, pastikan untuk mengekspor folder tersebut di file `index.js` yang berada di direktori `/pages`.

4. **Routing Halaman**: Setelah mengekspor halaman, tambahkan pernyataan impor untuk halaman tersebut di `app.js` dan tambahkan route yang sesuai sesuai kebutuhan.

5. **Konvensi Penamaan File**: Nama file harus diawali dengan huruf kapital (misalnya, `DaftarToko`).

6. **Konvensi Penamaan Folder**: Nama folder harus dalam huruf kecil. Jika nama folder terdiri dari dua kata, mereka harus dipisahkan dengan tanda hubung (misalnya, `daftar-toko`).

7. **Memanggil Halaman di app.js**: Halaman harus dipanggil sesuai nama file dan route harus cocok dengan nama folder (misalnya, `<Route path="/daftar-toko" element={<DaftarToko />} />`).

## Melakukan Perubahan

1. **Pembuatan Cabang**: Setiap pengembang harus membuat cabang baru untuk setiap perubahan yang mereka buat. Nama cabang harus mengikuti template pada poin 2.

2. **Template Penamaan Cabang**: Cabang harus diberi nama `[Nama Pengembang]_[Nama Halaman]_[Nomor Perubahan]` (misalnya, `robby_DaftarToko_1`).

3. **Template Penamaan Commit**: Pesan commit harus mengikuti template `[Nama Developer]_[Nama Perubahan/Fitur]_[Tanggal Perubahan]` (misalnya, `Robby_DaftarTokoFiturLengkap_27072023`).

4. **Aturan Tambahan**: isi deskripsinya adalah menjelaskan apa saja perubahan yg dilakukan

5. **Aturan Tambahan**: selalu pull main sebelum merge req dan berkabar setelah merge req

Patuhi aturan dan konvensi ini untuk memastikan kerjasama yang lancar dan komunikasi yang jelas dalam tim. Selamat coding!
