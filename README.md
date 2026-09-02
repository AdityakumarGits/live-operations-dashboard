🚗 Live Vehicle Service Operations Dashboard

A production-style Live Vehicle Service Operations Dashboard built for the Instant Mechanic Full Stack Developer Internship assignment.

The dashboard is designed for an operations team to monitor bookings, mechanics, customers, revenue, and live booking-status changes from a single interface.

🌐 Live Demo

Frontend: https://live-operations-dashboard-rcbuyhzi6-adityakumar-s-project.vercel.app/

Bookings: https://live-operations-dashboard-rcbuyhzi6-adityakumar-s-project.vercel.app/bookings

Backend: https://live-operations-dashboard-1.onrender.com

GitHub: https://github.com/AdityakumarGits/live-operations-dashboard

Note: The backend HTTPS URL currently uses a Cloudflare Quick Tunnel to expose the AWS EC2 API over HTTPS for the live demo. Quick Tunnel URLs are temporary and require the tunnel process to remain running.

✨ Features

📊 Dashboard Overview

Total bookings

Today's bookings

Completed bookings

Pending bookings

Cancelled bookings

Total revenue

Active mechanics

New customers

📈 Analytics

Bookings over time

Revenue over time

Booking status distribution

Service/category breakdown

📋 Booking Management

Professional booking table

Booking ID

Customer

Vehicle

Service

Mechanic

Status

Amount

Date/time

Search

Status filtering

Sorting

Pagination

Booking detail page

Booking status updates

🔧 Mechanics

Mechanic name

Current status

Jobs completed

Current/last booking

👥 Customers

Customer information

Contact details

Customer booking information

⚡ Live Updates

The application uses Server-Sent Events (SSE) for live booking updates.

Example:

PENDING
↓
ASSIGNED
↓
ON_THE_WAY
↓
COMPLETED

When a booking status changes, connected dashboard clients receive the update without requiring a complete page reload.

🛠️ Tech Stack

Frontend

React

TypeScript

Vite

Tailwind CSS

React Router

Axios

Recharts

Lucide React

Backend

Node.js

Express.js

TypeScript

Mongoose

Zod

Axios

CORS

dotenv

Server-Sent Events

Database

MongoDB Atlas

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Source Code: GitHub

🏗️ Architecture

┌─────────────────────────────┐
│       React Frontend        │
│  Vite + TypeScript + Tailwind│
└──────────────┬──────────────┘
│
│ REST API
│ Axios
▼
┌─────────────────────────────┐
│     Node.js + Express API   │
│         TypeScript          │
├─────────────────────────────┤
│ Controllers                 │
│ Services                    │
│ Validation                  │
│ SSE                         │
└──────────────┬──────────────┘
│
│ Mongoose
▼
┌─────────────────────────────┐
│        MongoDB Atlas        │
│                             │
│ Customers                   │
│ Vehicles                    │
│ Mechanics                   │
│ Services                    │
│ Bookings                    │
└─────────────────────────────┘

Request Flow

User
↓
React UI
↓
Axios
↓
Express API
↓
Controller
↓
Service Layer
↓
Mongoose
↓
MongoDB Atlas

For live updates:

Booking Status Update
↓
Backend
↓
SSE Broadcast
↓
Connected Frontend Clients
↓
Dashboard Refresh

📁 Project Structure

live-operations-dashboard/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   └── layout/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md

🗄️ Database Design

The backend uses MongoDB with the following main collections:

Customer

Customer
├── name
├── email
└── phone

Vehicle

Vehicle
├── customerId
├── registrationNumber
├── brand
├── model
└── year

Mechanic

Mechanic
├── name
├── phone
├── status
├── jobsCompleted
└── currentBookingId

Service

Service
├── name
├── category
└── basePrice

Booking

Booking
├── bookingNumber
├── customerId
├── vehicleId
├── serviceId
├── mechanicId
├── status
├── amount
└── scheduledAt

Seed Data

The project includes realistic sample data:

500 bookings

50 customers

100 vehicles

20 mechanics

8 services

Multiple service categories

Multiple booking statuses

Different booking dates and amounts

🔌 API Documentation

Dashboard

GET /api/dashboard

Returns dashboard KPIs and analytics data.

Bookings

GET /api/bookings

Returns paginated bookings.

Supported query parameters include:

search
status
sortBy
sortOrder
page
limit

Example:

GET /api/bookings?status=PENDING&page=1&limit=10

Get Booking

GET /api/bookings/

Returns detailed information about a booking.

Update Booking Status

PATCH /api/bookings//status

Request body:

{
"status": "COMPLETED"
}

Supported statuses:

PENDING
ASSIGNED
ON_THE_WAY
COMPLETED
CANCELLED

Mechanics

GET /api/mechanics

Returns mechanics and their current operational status.

Customers

GET /api/customers

Returns customer information.

Live Updates

GET /api/updates

Establishes a Server-Sent Events connection for live dashboard updates.

Example event:

BOOKING_STATUS_UPDATED

⚙️ Environment Variables

Backend

Create:

server/.env

Example:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

Frontend

Create:

Client/.env

Example:

VITE_API_URL=http://localhost:5000/api

For the deployed frontend:

VITE_API_URL=https://live-operations-dashboard-1.onrender.com/api

Never commit .env files or database credentials to GitHub.

🚀 Local Setup

Clone the repository

git clone https://github.com/AdityakumarGits/live-operations-dashboard.git
cd live-operations-dashboard

Backend Setup

cd server
npm install

Create .env:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

Build:

npm run build

Start:

npm start

For development:

npm run dev

Seed Database

From the server directory:

npm run seed

This creates the sample customers, vehicles, mechanics, services, and bookings.

Frontend Setup

Open another terminal:

cd Client
npm install

Create .env:

VITE_API_URL=http://localhost:5000/api

Run:

npm run dev

The frontend will be available at:

http://localhost:5173

📦 Production Build

Frontend

cd Client
npm run build

The production files are generated in:

Client/dist

Backend

cd server
npm run build

The compiled backend is generated in:

server/dist

☁️ Deployment

Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Production URL:

https://live-operations-dashboard-rcbuyhzi6-adityakumar-s-project.vercel.app/

The Vercel project uses:

Root Directory: Client
Build Command: npm run build
Output Directory: dist

The frontend receives the backend URL through:

VITE_API_URL

Backend — Render

The Node.js/Express backend is deployed on Render.

MongoDB Atlas is used as the production database.

The production backend is publicly accessible through Render over HTTPS.

🧪 Error & UX Handling

The application includes:

Loading states

Error states

Retry actions

Empty states

API error handling

Responsive layouts

Status indicators

Disabled actions when appropriate

Search/filter/pagination states

The goal was to make the application feel like an operations product rather than a static assignment UI.

🤖 AI Usage

AI tools were used as development assistants during the project.

ChatGPT was used for

Architecture discussions

API design

Debugging

TypeScript/React guidance

Backend implementation guidance

Database modeling discussions

Deployment troubleshooting

README/documentation assistance

Testing and debugging workflows

AI-generated suggestions were reviewed, adapted, tested, and integrated into the project. The implementation and deployment were manually verified.

The assignment explicitly permits AI usage, while expecting candidates to understand the submitted implementation.

💡 Engineering Decisions

Why MongoDB?

MongoDB provides a straightforward document-oriented model for customers, vehicles, mechanics, services, and bookings while allowing the dashboard to retrieve real backend/database data.

Why SSE?

Server-Sent Events are a good fit for this dashboard because updates primarily flow from the backend to connected operations clients. SSE provides live updates without requiring the complexity of a bidirectional WebSocket system.

Why Service Layer?

Business logic is separated from route/controller handling so that controllers remain focused on HTTP concerns while services handle database and application logic.

Why Zod?

Zod provides runtime validation for API input and helps prevent invalid booking status values from reaching the database.

📊 Example Operational Data

The seeded environment contains realistic operational data across:

Bookings       500
Customers       50
Vehicles       100
Mechanics       20
Services         8

Bookings contain different:

Statuses

Amounts

Dates

Services

Customers

Vehicles

Mechanics

This allows the dashboard analytics and filtering features to behave like a real operational system.

🔐 Security Notes

Environment variables are excluded from Git.

Database credentials are not stored in source code.

Backend CORS is restricted to the deployed frontend origin.

API inputs are validated before updates.

MongoDB credentials should be rotated if they are ever exposed.

🎯 Assignment Coverage

Requirement

Implementation

Modern frontend

React + TypeScript + Vite + Tailwind

Dashboard KPIs

✅

Analytics charts

✅

Booking table

✅

Search

✅

Filtering

✅

Sorting

✅

Pagination

✅

Mechanics page

✅

Customers page

✅

Booking detail

✅

Proper backend API

✅

Database-backed data

MongoDB Atlas

500+ bookings

500

50+ customers

50

20+ mechanics

20

Live updates

SSE

Vercel deployment

✅

Render backend

Render

GitHub repository

✅

Responsive UI

✅

Loading/error/empty states

✅

🏆 What I'm Most Proud Of

I am most proud of building the dashboard as a real backend-driven operations system rather than a static frontend assignment.

The application includes:

Real MongoDB-backed data

500 seeded bookings

REST APIs

Search/filter/sort/pagination

Booking detail and status management

Analytics

Render deployment

Vercel deployment

Server-Sent Events for live updates

Production-oriented error and loading states

The project also gave me practical experience in taking a full-stack application from development and debugging through deployment.

👨‍💻 Author

Aditya Kumar

GitHub:

https://github.com/AdityakumarGits

📄 Assignment

Built as part of the Full Stack Developer Internship — Live Vehicle Service Operations Dashboard assignment for Instant Mechanic.

The implementation focuses on the assignment's core requirements: product thinking, frontend quality, backend architecture, API