# Live Vehicle Service Operations Dashboard   172.31.11.23

A production-style live operations dashboard for managing vehicle service bookings, mechanics, customers, and service performance.

The dashboard provides real-time operational visibility through KPIs, analytics charts, booking management, mechanic information, customer information, and Server-Sent Events (SSE) for live booking status updates.

---

## 🚀 Live Project

- Frontend: Coming soon
- Backend API: Coming soon
- GitHub: https://github.com/AdityakumarGits/live-operations-dashboard

---

## 📌 Features

### Dashboard

- Total bookings
- Today's bookings
- Completed bookings
- Pending bookings
- Cancelled bookings
- Total revenue
- Active mechanics
- New customers
- Booking trends
- Revenue trends
- Booking status distribution
- Service category breakdown
- Recent bookings

### Booking Management

- View all bookings
- Search bookings by booking ID
- Filter bookings by status
- Sort bookings by date
- Sort bookings by amount
- Ascending and descending sorting
- Pagination
- View booking details
- Update booking status

### Mechanics

- View all mechanics
- Mechanic availability status
- Jobs completed
- Current booking information

### Customers

- View all customers
- Customer name
- Email
- Phone
- Joined date

### Analytics

- Bookings over time
- Revenue over time
- Booking status distribution
- Service category breakdown

### Real-Time Updates

The dashboard uses Server-Sent Events (SSE) to receive booking status updates without requiring a full page refresh.

Flow:

Browser → SSE Connection → Express Server → Booking Status Update → Dashboard Refresh

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- TypeScript
- Mongoose
- Zod
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas

### Real-Time Communication

- Server-Sent Events (SSE)

### Deployment

- Frontend: Vercel
- Backend: AWS
- Database: MongoDB Atlas

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │      React App      │
                    │  TypeScript + Vite  │
                    └──────────┬──────────┘
                               │
                         Axios REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Server    │
                    │    TypeScript       │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
        ┌──────────────────┐       ┌──────────────────┐
        │   MongoDB Atlas  │       │    SSE Service   │
        │                  │       │                  │
        │ Bookings         │       │ Live Updates     │
        │ Customers        │       │                  │
        │ Mechanics        │       └────────┬─────────┘
        │ Vehicles         │                │
        │ Services         │                │
        └──────────────────┘                ▼
                                    React Dashboard