# 🔐 CredCrypt – Secure Credential Management System

<div align="center">

![CredCrypt Banner](public/logo.png)

# **CredCrypt**

### **Your Credentials, Unbreakably Secure**

*A modern, security-first credential management platform built with Next.js, TypeScript, MongoDB, and AES-256 encryption.*

---

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

# 📖 Overview

**CredCrypt** is a cloud-based credential management platform designed with a **security-first architecture**.

Instead of storing credentials in plain text, every credential is encrypted using **AES-256 encryption** before being saved to the database.

Unlike traditional password managers, **your Master Key is never stored on the server**.

Only **you** possess the key capable of decrypting your credentials.

This means:

* 🔒 Even the server cannot read your passwords.
* 🔑 Only you control your encryption key.
* ☁️ Your encrypted vault stays safely stored in the cloud.
* 🛡️ Your sensitive data remains protected even if the database is compromised.

---

# ✨ Features

## 🔐 Security

* AES-256 Encryption
* Zero-Knowledge Architecture
* Master Key Authentication
* Secure Credential Reveal
* Password Reset Protection
* Secure Account Deletion
* Activity Verification
* Session-based Authentication
* Protected API Routes

---

## ☁️ Credential Management

* Store unlimited credentials
* Add new credentials
* Update credentials
* Delete credentials
* Search credentials instantly
* View encrypted credentials
* Reveal credentials securely
* Responsive dashboard
* Cloud synchronization

---

## 👤 User Features

* Google OAuth Login
* Secure Registration
* Update Profile
* Change Password
* Delete Account
* Upload Avatar
* Responsive Sidebar
* Dark / Light UI
* Mobile Friendly

---

# 🛡️ Security Architecture

CredCrypt follows a **Zero-Knowledge Security Model**.

```
        User
          │
          ▼
  Master Password
          │
          ▼
Generate Encryption Key
          │
          ▼
Encrypt Credentials (AES-256)
          │
          ▼
Store Encrypted Data
          │
          ▼
MongoDB Database
```

### Important

✅ Master Key never leaves the client.

✅ Server never stores your Master Key.

✅ Credentials are stored only after encryption.

✅ Server cannot decrypt stored credentials.

---

# 🚀 Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Lucide React
* Zustand
* Axios

---

## Backend

* Node.js
* Next.js API Routes
* MongoDB
* Mongoose

---

## Authentication

* NextAuth.js
* Google OAuth
* JWT Sessions

---

## Security

* AES-256 Encryption
* bcryptjs
* Environment Variables
* Protected API Routes
* Session Validation

---

# 📦 Installation

## Prerequisites

* Node.js v18+
* MongoDB Atlas
* Google Cloud OAuth Credentials
* npm / pnpm / yarn

---

## 1. Clone Repository

```bash
git clone https://github.com/MdMehrabHasanSompod/credcrypt.git

cd credcrypt
```

---

## 2. Install Dependencies

```bash
npm install
```

or

```bash
yarn
```

or

```bash
pnpm install
```

---

## 3. Configure Environment Variables

Create

```
.env.local
```

```env
# MongoDB
MONGODB_URI=

MONGODB_DB_NAME=credcrypt

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

NODE_ENV=development
```

---

## 4. Start Development Server

```bash
npm run dev
```

or

```bash
pnpm dev
```

---

## 5. Open

```
http://localhost:3000
```

---

# 📂 Project Structure

```
credcrypt/

│

├── app/

│   ├── api/

│   │   ├── auth/

│   │   ├── user/

│   │   └── ...

│

│   ├── login/

│   ├── register/

│   ├── user/

│   │   ├── dashboard/

│   │   ├── settings/

│   │   ├── reset-password/

│   │   └── delete-account/

│

│   ├── privacy-policy/

│   ├── helpline/

│   ├── layout.tsx

│   └── page.tsx

│

├── components/

│   ├── AddCredential.tsx

│   ├── Navbar.tsx

│   ├── Footer.tsx

│   ├── UserSidebar.tsx

│   ├── AvatarDropdown.tsx

│   ├── AllCredentials.tsx

│   └── modals/

│

├── lib/

│   ├── dbConnect.ts

│   └── utils.ts

│

├── models/

│   ├── User.ts

│   └── Credential.ts

│

├── stores/

│   ├── user.store.ts

│   └── credentials.store.ts

│

├── types/

│

├── utils/

│

├── public/

│

├── package.json

├── next.config.js

├── tailwind.config.js

└── README.md
```

---

# 🔑 How Encryption Works

```
User Credential

        │

        ▼

Enter Master Key

        │

        ▼

Generate AES Key

        │

        ▼

Encrypt Credential

        │

        ▼

Store Cipher Text

        │

        ▼

MongoDB
```

When revealing:

```
Encrypted Credential

        │

        ▼

Enter Master Key

        │

        ▼

Decrypt AES Cipher

        │

        ▼

Original Password
```

---

# 📱 Application Pages

## Public Pages

* Home
* Login
* Register
* Privacy Policy
* Helpline

---

## Protected Pages

* Dashboard
* Settings
* Reset Password
* Delete Account

---

# 🔥 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/post-login
```

---

## User

```
PATCH /api/user/update-user

PATCH /api/user/reset-password

DELETE /api/user/delete-account
```

---

## Credentials

```
POST /api/user/add-credential

PATCH /api/user/update-credential

DELETE /api/user/delete-credential

POST /api/user/reveal-credential
```

---

# 📸 Screenshots

You can place screenshots here.

```
README Assets/

home.png

dashboard.png

settings.png

credential.png

mobile.png
```

---

# 🚀 Deployment

## Build

```bash
npm run build
```

---

## Start Production

```bash
npm start
```

---

## Production Environment Variables

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=https://your-domain.com

NEXT_PUBLIC_BASE_URL=https://your-domain.com

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=
```

---

# 📌 Future Improvements

* Two-Factor Authentication (2FA)
* Passkey Authentication
* Password Generator
* Password Strength Analyzer
* Credential Categories
* Import / Export Vault
* Browser Extension
* Secure Notes
* Shared Vaults
* Audit Logs
* Password Breach Detection
* Offline Mode
* Mobile App
* Email Verification
* Biometric Unlock

---

# 🤝 Contributing

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit changes

```bash
git commit -m "Add amazing feature"
```

4. Push

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 👨‍💻 Developer

**Md. Mehrab Hasan Sompod**

MVIOT-PV

GitHub:

```
https://github.com/MdMehrabHasanSompod
```

Email:

```
cemhaninc.org@gmail.com
```

---

# 🙏 Acknowledgements

Special thanks to:

* Next.js
* React
* MongoDB
* Mongoose
* Tailwind CSS
* NextAuth.js
* Lucide React
* Vercel

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you like this project:

⭐ Star the repository

🍴 Fork it

🐛 Report issues

💡 Suggest new features

---

<div align="center">

# 🔐 CredCrypt

### Your Credentials, Unbreakably Secure.

Built with ❤️ by **Md. Mehrab Hasan Sompod (MVIOT-PV)**

</div>
