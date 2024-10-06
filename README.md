# Drone Management System

## 📌 Introduction

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

The Drone Management System is a web application that allows users to manage drones, missions, and flight logs. Users can create missions, start and stop simulations, and generate flight logs, which can be downloaded as PDFs. This application leverages MongoDB for data storage and is built with Node.js and Express.

## 🚀 Features

- User authentication and authorization.
- Create, read, update, and delete (CRUD) operations for drones and missions.
- Start and stop mission simulations.
- Generate and download PDF reports for flight logs.
- Data validation and error handling.

## 👨‍💻 Tech Stack Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- PDFKit

## Folder Structure

```bash
drone-management-system
│
├── src
│   ├── config
│   │    └── db.js
│   │
│   ├── controllers
│   │    ├── authController.js
│   │    ├── droneController.js
│   │    ├── flightLogController.js
│   │    └── missionController.js
│   │
│   ├── middleware
│   │    └── authMiddleware.js
│   │
│   ├── models
│   │    ├── Drone.js
│   │    ├── flightLog.js
│   │    ├── Mission.js
│   │    └── User.js
│   │
│   └── routes
│        ├── authRoutes.js
│        ├── droneRoutes.js
│        ├── flightLogRoutes.js
│        └── missionRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 🛠️ Installation Steps

Star and Fork the Repo 🌟 and this will keep us motivated.

1. Clone the repository

```bash
git clone https://github.com/subhashdippu/FlytBase.git
```

2. Change the working directory

```bash
cd FlytBase
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
nodemon start
```
