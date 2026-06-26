# 🔐 CredCrypt – Secure Credential Management System

<div align="center">

![CredCrypt Banner](public/logo.png)

# **CredCrypt**

### **Your Credentials, Unbreakably Secure**

*A modern, security-first credential management platform built with Next.js, TypeScript, MongoDB, and AES-256 encryption algorithm.*

---

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=auth0&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

</div>

---

# 📖 Overview

**CredCrypt** is a next-generation credential management system designed with security-first principles. Built by **MVIOT-PV**, it combines enterprise-grade encryption with an intuitive user experience.

Our mission is to make credential security accessible to everyone, from individual users to large enterprises. With CredCrypt, you never have to worry about your sensitive data falling into the wrong hands.

*Unlike traditional systems that store credentials locally, CredCrypt provides a secure cloud-based solution. Even if you accidentally delete your local files or reboot your system, your credentials remain safe and accessible from anywhere, anytime. Your data is never lost*.

This means:

* 🔒 Even the server cannot read your passwords.
* 🔑 Only you control the encryption.
* ☁️ Your encrypted credential stays safely stored in the cloud.
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

✅ Your credentials remain encrypted at all times. Even if someone gains access to your account or the database, they cannot decrypt your credentials without your Master Key.

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
* CryptoJS
* Cloudinary
* MongoDB
* Mongoose
* Redis

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
* Upstash Redis 
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
MONGODB_CONNECTION_URI=

# NextAuth
AUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#CryptoJS
VAULT_SECRET= Any Random Text

#Upstash_Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

#Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

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
├── public/
│   ├── logo.png
│   └── mviot_logo.png
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── user/
│   │   ├── contact-support/
│   │   ├── login/
│   │   ├── privacy-policy/
│   │   ├── register/
│   │   ├── user/
│   │   │   ├── dashboard/
│   │   │   ├── delete-account/
│   │   │   ├── reset-password/
│   │   │   ├── setup-master-key/
│   │   │   └── setup-password/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── assets/
│   │   ├── assets.ts
│   │   └── google.png
│   │
│   ├── components/
│   │   ├── providers/
│   │   ├── Dashboard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── UserSidebar.tsx
│   │   ├── AddCredential.tsx
│   │   ├── AllCredentials.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── cloudinary.ts
│   │   ├── crypto.ts
│   │   ├── db.ts
│   │   └── redis.ts
│   │
│   ├── models/
│   │   ├── credential.model.ts
│   │   └── user.model.ts
│   │
│   ├── stores/
│   │   ├── credentials.store.ts
│   │   ├── dashboardMenu.store.ts
│   │   └── user.store.ts
│   │
│   ├── types/
│   └── utils/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
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

Original Credential Value
```

---

# 📱 Application Pages

## Public Pages

* Home
* Login
* Register
* Privacy Policy
* Contact Support

---

## Protected Pages

* Dashboard
* Settings
* Reset Password
* Set Up Master Key
* Delete Account

## Middleware

 * Proxy.ts

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
GET /api/user/get-user

GET /api/user/get-master-key

PATCH /api/user/update-user

PATCH /api/user/confirm-master-key

PATCH /api/user/reset-password

PATCH /api/user/setup-password

DELETE /api/user/delete-account
```

---

## Credentials

```
GET /api/user/get-credentials

POST /api/user/add-credential

POST /api/user/verify-update-request

POST /api/user/verify-delete-request

PATCH /api/user/update-credential

DELETE /api/user/delete-credential

```

---

# 🚀 📌 Future Improvements

* Two-Factor Authentication (2FA)
* Import / Export Vault
* Browser Extension
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
mdmehrabhasansompod@gmail.com
```

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
