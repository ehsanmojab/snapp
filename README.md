# 🚗 Snapp Admin Panel

A full-stack web application for managing Snapp ride-hailing service operations with Vue.js frontend and Express.js backend.

## ✨ Features

### 👥 User Management

- Passenger information and trip history
- Driver profiles and performance metrics
- Multi-role authentication (Admin, Driver, User)

### 🚕 Trip Management

- Real-time trip tracking
- Completed trip records
- Discount and payment analytics
- Driver trip history

### 📊 Analytics & Reports

- Most frequent passenger requests
- Driver performance ratings
- Revenue and discount reports
- Active/inactive driver monitoring

## 🛠️ Tech Stack

**Frontend:**

- Vue.js 3 + Composition API
- Vite build tool
- Modern CSS with responsive design

**Backend:**

- Express.js server
- MySQL database
- RESTful API architecture

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/snapp-admin-panel.git
cd snapp-admin-panel
```

2. **Install dependencies**

```bash
npm install
```

3. **Database Setup**

- Create MySQL database named snapp
- Update database credentials in server.js

4. **Run the application**

```bash
# Start backend server (Port 3000)
node server.js

# Start frontend development server (Port 5173)
npm run dev
```

5. **Access the application**

- Open http://localhost:5173

- Login credentials:

-- Admin: admin / admin

--- Driver: driver / driver

-- User: user / user

## 📁 Project Structure

snapp-admin-panel/
├── src/ # Vue.js frontend source
│ ├── components/ # Reusable Vue components
│ ├── assets/ # Styles and static files
│ └── main.js # Vue application entry point
├── server.js # Express backend server
├── package.json # Project dependencies
└── vite.config.js # Vite configuration

## 🔌 API Endpoints

<table>
    <thead>
        <tr>
            <th><span>Endpoint</span></th>
            <th><span>Method</span></th>
            <th><span>Description</span></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>/api/drivers</code></td>
            <td><span>GET</span></td>
            <td><span>Get all drivers</span></td>
        </tr>
        <tr>
            <td><code>/api/trips</code></td>
            <td><span>GET</span></td>
            <td><span>Get all trips</span></td>
        </tr>
        <tr>
            <td><code>/api/passenger</code></td>
            <td><span>POST</span></td>
            <td><span>Get passenger trips by date range</span></td>
        </tr>
        <tr>
            <td><code>/api/drivertrip</code></td>
            <td><span>POST</span></td>
            <td><span>Get driver trips by date range</span></td>
        </tr>
        <tr>
            <td><code>/api/discounttrip</code></td>
            <td><span>POST</span></td>
            <td><span>Get discount trip reports</span></td>
        </tr>
    </tbody>
</table>

## 👥 User Roles

- Admin: Full access to all features and analytics
- Driver: Access to personal trip history and performance
- User: View personal trip history and information

## 🛠️ Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📄 License

This project is licensed under the MIT License.
