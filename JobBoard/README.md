# 💼 Job Board — MERN Stack Job Portal

A full-stack Job Portal where **Employers** can post jobs and **Candidates** can apply with resumes, track application status, and receive email notifications.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)

---

## ✨ Features

### 🔐 Authentication
- Signup / Login with **JWT + Cookies**
- **Role-based access** — Employer & Candidate

### 🧑‍💼 Employer
- Post, Edit & Delete jobs
- View all applicants per job
- Accept / Reject applications
- Dashboard with stats overview

### 👨‍💻 Candidate
- Browse all available jobs
- Apply with **resume upload (PDF)**
- Track application status in real-time

### 📄 Resume Handling
- Upload resumes via **Cloudinary**
- View & download resumes directly

### 📧 Email Notifications
- Email sent when application is submitted
- Email sent when status changes to **Accepted** or **Rejected**

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| Axios | HTTP Requests |
| React Router | Client-side Routing |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database |
| JWT + Cookies | Authentication |
| Multer + Cloudinary | File Upload |
| Nodemailer | Email Notifications |

---

