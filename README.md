# EcoKids Adventure

An interactive web application that teaches kids about environmental responsibility through fun challenges and activities.

## Features

- 🎮 Interactive environmental challenges
- 📊 Progress tracking and achievements
- 🌱 Educational content about sustainability
- 👥 User profiles and leaderboards
- 🏆 Badges and rewards
- 📱 Responsive design for all devices

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- Firebase account (for backend services)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecokids-adventure
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google)
   - Create a Firestore database
   - Set up Storage for file uploads
   - Create a `.env` file in the root directory with your Firebase config:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket.appspot.com
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     REACT_APP_ADMIN_UID=your-admin-uid
     ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The app will be available at http://localhost:3000

## Deployment

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Option 2: Netlify

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to Netlify

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  ├── contexts/        # React contexts
  ├── services/        # API and service layers
  ├── assets/          # Images, icons, etc.
  ├── App.js           # Main App component
  └── index.js         # App entry point
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
