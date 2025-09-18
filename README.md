# Picture App - Angular Frontend

A responsive Angular application for sharing and managing pictures with user authentication, comments, and likes functionality.

This is a learning project created as part of an Angular course. The backend is provided from: https://gitlab.com/jeandemel-formations/hb-cda-2025/projets/projet-angular

## 🚀 Features

- **User Authentication**: Registration, login/logout with HTTP Basic Auth and cookies
- **Picture Management**: Upload, view, and browse images with pagination
- **Social Features**: Like/unlike pictures and add comments
- **User Profiles**: View user profiles and their published pictures
- **Responsive Design**: Bootstrap-based responsive UI
- **Modern Angular**: Built with Angular 20+ using standalone components and signals

## 🛠️ Technologies

- **Angular 20.2+** with standalone components
- **TypeScript** with strict typing
- **Bootstrap** for responsive styling
- **RxJS** for reactive programming
- **Angular Signals** for state management
- **HTTP Basic Authentication** with session cookies

## 📋 Prerequisites

- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)
- Backend server running on `http://localhost:8081`

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd picture-app-eval
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

## 📚 Available Scripts

- `ng serve` - Start development server
- `ng build` - Build the project for production
- `ng test` - Run unit tests
- `ng lint` - Run linting

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Feature components
│   │   ├── home-page/       # Main picture gallery
│   │   ├── picture-details/ # Picture view with comments
│   │   ├── add-picture/     # Picture upload form
│   │   ├── login-page/      # User authentication
│   │   ├── register-page/   # User registration
│   │   └── profile-page/    # User profile
│   ├── services/            # API services
│   │   ├── picture-api.ts   # Picture operations
│   │   ├── comment-api.ts   # Comment operations
│   │   └── toast-notification.ts
│   ├── authentication/      # Auth service
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   └── shared/             # Shared components
```

## 🔧 API Integration

The application integrates with a Spring Boot backend that provides:

- **Authentication**: HTTP Basic Auth with session cookies
- **Picture Management**: CRUD operations for pictures
- **File Upload**: Multipart form data upload
- **Comments**: CRUD operations for picture comments
- **Likes**: Toggle like/unlike functionality

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Spinners and skeleton screens
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback
- **Pagination**: Navigate through picture collections
- **Authentication Guards**: Protected routes for authenticated users

## 🔒 Security Features

- **HTTP Basic Authentication** with secure session cookies
- **Route Guards** for protected pages
- **Automatic 401 handling** with redirect to login

## 🧪 Testing

Run the test suite:
```bash
ng test
```

## 🏗️ Building for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 🤝 Contributing

This is a learning project. Feel free to explore and experiment with the code.

## 📄 License

This project is for educational purposes.
