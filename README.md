# Hall Management System

A comprehensive web application for managing university hall dining operations, built with Next.js, TypeScript, and Material-UI.

## 🚀 Features

- **Multi-role Authentication**: Student, Manager, Moderator, Admin, and Super Admin roles
- **Dashboard Management**: Role-based dashboards with different functionalities
- **Dining Management**: Complete dining hall operations management
- **Meal Overview**: Student meal tracking and management
- **Real-time Notifications**: Toast notifications using Sonner
- **Form Management**: Advanced form handling with React Hook Form and Zod validation
- **State Management**: Redux Toolkit for global state management
- **PDF Generation**: Export functionality using jsPDF and html2canvas
- **Responsive Design**: Modern UI with Material-UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v6
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + React Redux
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Authentication**: JWT with jwt-decode
- **Notifications**: Sonner
- **Date Handling**: date-fns, dayjs
- **PDF Generation**: jsPDF, html2canvas
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (withDashboardLayout)/  # Dashboard layout wrapper
│   ├── (withCommonLayout)/     # Common layout wrapper
│   ├── dashboard/              # Dashboard pages
│   │   ├── manager/           # Manager-specific pages
│   │   ├── moderator/         # Moderator-specific pages
│   │   ├── student/           # Student-specific pages
│   │   ├── admin/             # Admin-specific pages
│   │   ├── superAdmin/        # Super Admin-specific pages
│   │   └── validation/        # Validation pages
│   ├── login/                 # Authentication pages
│   ├── register/              # Registration pages
│   └── [role]/                # Dynamic role-based routing
├── components/               # Reusable components
│   ├── Dashboard/            # Dashboard-specific components
│   ├── Dining/               # Dining management components
│   ├── Form/                 # Form components
│   ├── MealOverview/         # Meal tracking components
│   ├── Post/                 # Post-related components
│   ├── Shared/               # Shared/common components
│   └── UI/                   # UI components
├── redux/                    # Redux store and slices
├── services/                 # API services and actions
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── helpers/                  # Helper functions
├── lib/                      # Library configurations
├── constant/                 # Constants and configurations
└── assets/                   # Static assets
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Development Environment
NEXT_PUBLIC_BACKEND_BASE_API_URL=http://localhost:5000/api/v1

# Production Environment
NEXT_PUBLIC_API_BASE_URL_LIVE=https://your-production-api.com/api/v1

# Node Environment
NODE_ENV=development
```

### Environment Variables Explanation

- `NEXT_PUBLIC_BACKEND_BASE_API_URL`: Backend API URL for development
- `NEXT_PUBLIC_API_BASE_URL_LIVE`: Backend API URL for production
- `NODE_ENV`: Environment mode (development/production)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd hall_management_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🔐 Authentication & Roles

The application supports five user roles:

- **Super Admin**: Full system access and administrative control
- **Admin**: Administrative access for system management
- **Manager**: Full access to dining hall management and operations
- **Moderator**: Limited administrative access for oversight
- **Student**: Access to meal overview and personal dining information

## 🔑 Login Credentials

### Demo Accounts

For testing purposes, you can use the following demo accounts:

#### 👨‍🎓 Student Account
```
Email: [To be added]
Password: [To be added]
```

#### 👨‍💼 Manager Account
```
Email: [To be added]
Password: [To be added]
```

#### 👨‍⚖️ Moderator Account
```
Email: [To be added]
Password: [To be added]
```

#### 👨‍💻 Admin Account
```
Email: [To be added]
Password: [To be added]
```

#### 🔧 Super Admin Account
```
Email: [To be added]
Password: [To be added]
```

### ⚠️ Important Notes

- **Development Environment**: These credentials work with the development backend
- **Production**: Use real credentials provided by your system administrator
- **Password Security**: Change default passwords in production environments
- **Role-based Access**: Each role has different permissions and dashboard access

### 🔄 Password Change

If you're required to change your password on first login:
1. Login with your credentials
2. You'll be redirected to the password change page
3. Set a new secure password
4. Continue to your dashboard

## 🎨 UI Components

The application uses Material-UI (MUI) components with custom styling:

- **Data Grid**: For tabular data display
- **Date Pickers**: For date and time selection
- **Form Components**: Integrated with React Hook Form
- **Icons**: Material-UI icons and React Icons
- **Notifications**: Toast notifications with Sonner

## 📊 State Management

- **Redux Toolkit**: For global state management
- **RTK Query**: For API state management and caching
- **React Hook Form**: For form state management

## 🔧 Development

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety and IntelliSense
- **Prettier**: Code formatting (if configured)

### File Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Pages: kebab-case (e.g., `meal-overview.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.1.0** - Initial release with basic functionality
- More versions to be added as the project evolves

---

**Built with ❤️ using Next.js, TypeScript, and Material-UI**
