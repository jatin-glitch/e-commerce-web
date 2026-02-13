# E-commerce Full Stack Application

A modern e-commerce platform built with React, Node.js, and MongoDB featuring user authentication, product management, shopping cart, and payment processing.

## 🚀 Features

### Frontend (React + Vite)
- **React 18** with hooks and context API
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Axios** for API communication
- **TailwindCSS** for utility-first styling
- **Responsive Design** with mobile-first approach

### Backend (Node.js + Express)
- **Express.js** server with middleware
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with HTTP-only cookies
- **Role-based Access** (User/Admin)
- **RESTful APIs** for CRUD operations

### Key Features
- **User Authentication** (Signup, Login, Logout)
- **Product Catalog** with image uploads
- **Shopping Cart** with localStorage persistence
- **Order Management** with status tracking
- **Payment Processing** (COD + Mock JazzCash)
- **Admin Dashboard** for product and order management
- **Image Serving** from local storage
- **Mobile Responsive** design throughout

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- TailwindCSS
- JavaScript ES6+

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer (for file uploads)

### Development Tools
- npm
- Git
- VS Code (recommended)

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- MongoDB 4.4+
- Git

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd e-commerce

# Install dependencies
npm install

# Environment setup
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
npm run dev
```

### Environment Variables
See `.env.example` files in both `backend/` and `frontend/` directories for required environment variables.

## 🚀 Deployment

### Production Deployment
The application is configured for easy deployment to platforms like:
- **Vercel** (Frontend)
- **Render** (Backend)
- **Netlify** (Frontend)
- **Heroku** (Backend)
- **DigitalOcean** (Full stack)

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📱 Project Structure

```
e-commerce/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── pages/
│   ├── public/
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**
