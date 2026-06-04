# Setup & Deployment Guide / Panduan Setup & Deployment

This document provides detailed instructions on how to set up, configure, and deploy the Jarvis Personal Dashboard.
*Dokumen ini memberikan instruksi detail tentang cara memasang, mengonfigurasi, dan menyebarkan Dasbor Personal Jarvis.*

---

## 1. Firebase Configuration / Konfigurasi Firebase

### Step 1: Create a Firebase Project / Buat Proyek Firebase
- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click **Add Project** and follow the steps.
- *Buka Firebase Console, klik Tambah Proyek, dan ikuti langkah-langkahnya.*

### Step 2: Enable Services / Aktifkan Layanan
- **Authentication**: Enable Email/Password provider.
- **Firestore Database**: Create a database in "Production" or "Test" mode.
- **Storage**: Enable Firebase Storage for file uploads.
- *Aktifkan Authentication (Email/Password), Firestore Database, dan Firebase Storage.*

### Step 3: Get API Keys / Ambil API Keys
- Go to **Project Settings** > **General**.
- Under **Your apps**, click the `</>` icon to add a web app.
- Copy the `firebaseConfig` object values.
- *Buka Pengaturan Proyek > Umum. Di bagian Aplikasi Anda, klik ikon `</>` untuk menambah aplikasi web. Salin nilai dari objek firebaseConfig.*

---

## 2. GitHub API Setup / Setup API GitHub

To fetch dynamic stats (stars, commits, etc.), you need a Personal Access Token (PAT).
*Untuk mengambil statistik dinamis, Anda memerlukan Personal Access Token (PAT).*

1. Go to **GitHub Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
2. Generate a new token with `repo` and `user` scopes.
3. Copy the token.
4. *Buka Pengaturan GitHub > Pengaturan Developer > Personal access tokens. Buat token baru dengan scope `repo` dan `user`. Salin token tersebut.*

---

## 3. Environment Variables / Variabel Lingkungan

Create a `.env.local` file in the root directory and fill in the details:
*Buat file `.env.local` di direktori root dan isi detail berikut:*

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# GitHub
GITHUB_PAT=your_github_personal_access_token

# App Config
NEXT_PUBLIC_OWNER_EMAIL=your_admin_email@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 4. Deployment / Deployment

### Vercel (Recommended / Direkomendasikan)
1. Push your code to a GitHub repository.
2. Connect your repository to [Vercel](https://vercel.com).
3. Add all environment variables from `.env.local` to the Vercel project settings.
4. Click **Deploy**.
5. *Push kode Anda ke GitHub. Hubungkan repositori ke Vercel. Masukkan semua variabel lingkungan di pengaturan proyek Vercel. Klik Deploy.*

### Manual (VPS)
1. Install Node.js and NPM.
2. Run `npm install`.
3. Run `npm run build`.
4. Start the app with `npm start` or using a process manager like `pm2`.
5. *Install Node.js dan NPM. Jalankan npm install, lalu npm run build. Jalankan aplikasi dengan npm start atau gunakan pm2.*

---

## 5. Role-Based Access Control (RBAC)

To grant yourself Admin access:
1. Register an account on the website.
2. Go to the Firebase Console > Firestore.
3. Create a `users` collection.
4. Create a document with the **ID matching your Auth UID**.
5. Add a field `role: "owner"`.
6. *Daftarkan akun di website. Buka Firestore, buat koleksi `users`. Buat dokumen dengan ID yang sama dengan Auth UID Anda. Tambahkan field role: "owner".*
