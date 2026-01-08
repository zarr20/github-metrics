# GitHub Metrics

Proyek ini dibuat untuk menghasilkan metrics GitHub profil kamu secara otomatis menggunakan GitHub Actions.

## Fitur

- **Update Otomatis**: Metrics diperbarui setiap hari pada jam 00:00.
- **Isocalendar**: Menampilkan kalender aktivitas isometrik.
- **Languages**: Menampilkan bahasa pemrograman yang paling sering digunakan.
- **Habits**: Menampilkan kebiasaan coding.

## Cara Penggunaan

### 1. Buat Personal Access Token (PAT)

Kamu perlu membuat GitHub Personal Access Token agar action ini bisa mengakses data profilmu.

1. Buka [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens).
2. Klik **Generate new token (classic)**.
3. Beri nama token (contoh: `METRICS_TOKEN`).
4. Pilih scope/permissions berikut:
    - `public_repo`
    - `read:user`
    - `read:org`
    - `repo` (jika ingin menyertakan repo private)
5. Klik **Generate token** dan **copy** token tersebut.

### 2. Tambahkan Secret ke Repository

1. Buka tab **Settings** di repository ini.
2. Pilih menu **Secrets and variables** > **Actions**.
3. Klik tombol **New repository secret**.
4. Isi **Name** dengan `METRICS_TOKEN`.
5. Isi **Secret** dengan token yang sudah kamu copy tadi.
6. Klik **Add secret**.

### 3. Jalankan Workflow

Workflow akan berjalan otomatis setiap hari. Namun, kamu bisa menjalankannya secara manual untuk pertama kali:

1. Buka tab **Actions**.
2. Pilih workflow **Metrics**.
3. Klik tombol **Run workflow**.

Setelah workflow selesai, sebuah file gambar metrics (biasanya `github-metrics.svg` atau yang dikonfigurasi) akan muncul di branch kamu (atau branch output jika dikonfigurasi berbeda).

## Konfigurasi

Kamu bisa mengubah konfigurasi metrics di file `.github/workflows/metrics.yml`. Lihat dokumentasi lengkap [lowlighter/metrics](https://github.com/lowlighter/metrics) untuk opsi plugin lainnya.

## Deployment ke Vercel

Project ini sudah dikonfigurasi agar bisa dideploy dengan mudah ke Vercel untuk menampilkan metrics kamu dalam halaman web yang rapi.

1.  Buka [Vercel](https://vercel.com) dan login.
2.  Klik **Add New...** > **Project**.
3.  Import repository GitHub ini.
4.  Klik **Deploy**.
5.  Selesai! Vercel akan memberikan URL (contoh: `https://github-metrics-kamu.vercel.app`) yang menampilkan metrics kamu.

Setiap kali GitHub Actions memperbarui file `public/github-metrics.svg`, Vercel akan otomatis mendeteksi perubahan dan melakukan redeploy (atau sekadar menyajikan file statis terbaru jika tidak ada build step).

## Penggunaan API Dinamis

Project ini juga menyediakan endpoint API untuk menghasilkan metrics secara dinamis dengan parameter custom.

**Endpoint:** `https://your-vercel-app.vercel.app/api`

**Contoh Penggunaan:**

-   **Default:**
    `https://your-vercel-app.vercel.app/api?username=your-github-username`
-   **Dengan Plugin Tambahan (Misal: Stars):**
    `https://your-vercel-app.vercel.app/api?username=your-github-username&plugin_stars=yes`
-   **Mengubah Base:**
    `https://your-vercel-app.vercel.app/api?username=your-github-username&base=header`

Pastikan kamu telah menambahkan Environment Variable `METRICS_TOKEN` di dashboard Vercel (Settings > Environment Variables).

