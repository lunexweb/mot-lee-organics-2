# Motlee Organic Nexus

## Project Overview

Motlee Organic Nexus is a comprehensive platform for premium organic products and health solutions. This application provides a modern, user-friendly interface for browsing, managing, and purchasing organic products with advanced features for both customers and administrators.

## Features

- **Product Catalog**: Browse and search through a wide range of organic products
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Comprehensive admin panel for product and user management
- **IBO Dashboard**: Independent Business Owner portal for commission tracking
- **Analytics**: Detailed analytics and reporting features
- **Commission Management**: Advanced commission tracking and management system

## Technologies Used

This project is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks and context
- **Routing**: React Router for navigation

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_REPOSITORY_URL>
cd motlee-organic-nexus
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   └── ProductCard.tsx # Product display component
├── pages/              # Application pages
│   ├── AdminDashboard.tsx
│   ├── IboDashboard.tsx
│   ├── Products.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and data
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The application can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Contact

For questions or support, please contact the development team.