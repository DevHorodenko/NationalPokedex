# National Pokédex Frontend

A modern, responsive React frontend application for the National Pokédex API. Built with React 18, Tailwind CSS, and modern web technologies.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Authentication**: Complete login/register system with JWT
- **Pokémon Management**: Browse, search, and manage Pokémon collections
- **Real-time Search**: Debounced search with instant results
- **Type Filtering**: Filter Pokémon by type
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode Ready**: Built with dark mode support in mind
- **Performance Optimized**: React Query for efficient data fetching
- **Accessibility**: WCAG compliant components

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **React Router 6** - Client-side routing
- **React Query** - Server state management
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

## 📋 Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend API running (see main README)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

### 3. Start Development Server

```bash
npm start
```

The application will start on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── api/               # API client and functions
│   │   ├── client.js      # Axios configuration
│   │   ├── auth.js        # Authentication API
│   │   └── pokemon.js     # Pokémon API
│   ├── components/        # Reusable components
│   │   ├── Auth/         # Authentication components
│   │   ├── Layout/       # Layout components
│   │   ├── Pokemon/      # Pokémon-specific components
│   │   └── UI/           # Generic UI components
│   ├── contexts/         # React contexts
│   │   └── AuthContext.js # Authentication context
│   ├── pages/            # Page components
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tailwind.config.js    # Tailwind configuration
└── README.md
```

## 🎨 Design System

### Colors

The application uses a custom color palette:

- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Pokémon Types**: Custom colors for each Pokémon type
- **Gray Scale**: Standard gray palette for text and backgrounds

### Components

All components follow a consistent design pattern:

- **Cards**: White background with subtle shadows
- **Buttons**: Primary (blue) and secondary (gray) variants
- **Forms**: Consistent input styling with focus states
- **Type Badges**: Color-coded badges for Pokémon types

## 🔐 Authentication

The frontend implements a complete authentication system:

- **JWT Token Management**: Automatic token storage and refresh
- **Protected Routes**: Route protection based on authentication status
- **User Context**: Global user state management
- **Form Validation**: Comprehensive form validation with React Hook Form

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Features

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Automatic code splitting with React Router
- **Image Optimization**: Optimized image loading with fallbacks
- **Debounced Search**: Performance-optimized search functionality

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🔧 Configuration

### API Configuration

The frontend connects to the backend API. Update the API URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

### Tailwind Configuration

Custom Tailwind configuration includes:

- Custom color palette
- Pokémon type colors
- Custom animations
- Responsive breakpoints

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend is running on the correct port
   - Check CORS configuration in the backend
   - Verify API URL in `.env`

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for version conflicts in package.json

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the main project README
- Review the API documentation
- Open an issue on GitHub 