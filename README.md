# iOS Auth Chat Test App

A modern React Native chat application built with Expo, featuring user authentication and real-time messaging capabilities.

## 📱 Overview

This is a cross-platform mobile chat application that demonstrates modern React Native development practices with authentication, real-time messaging, and a clean user interface. The app is built using Expo Router for navigation and Supabase for backend services.

## ✨ Features

### 🔐 Authentication
- **Email/Password Authentication**: Users can sign up and sign in using email and password
- **Session Management**: Automatic session refresh and persistence
- **Secure Storage**: User sessions are securely stored using AsyncStorage
- **Auto-refresh**: Sessions automatically refresh when the app is active

### 💬 Real-time Chat
- **Live Messaging**: Real-time message updates using Supabase real-time subscriptions
- **Message History**: Persistent message storage and retrieval
- **User Attribution**: Messages show sender email and timestamp
- **Pull-to-Refresh**: Manual message refresh capability

### 🎨 User Interface
- **Modern Design**: Clean, iOS-inspired interface with proper spacing and typography
- **Dark/Light Theme Support**: Adaptive theming based on system preferences
- **Responsive Layout**: Optimized for different screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **Keyboard Handling**: Proper keyboard avoidance and dismissal

### 📱 Navigation
- **Tab-based Navigation**: Bottom tab navigation with Home and Chat screens
- **Modal Support**: Modal presentation capabilities
- **Deep Linking**: Expo Router integration for navigation

## 🛠 Technology Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe development
- **React Native Elements**: UI component library

### Backend & Services
- **Supabase**: Backend-as-a-Service for authentication and database
- **PostgreSQL**: Database for message storage
- **Real-time Subscriptions**: Live data synchronization

### Development Tools
- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Expo CLI**: Development and build tools

## 🏗 Project Structure

```
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   └── chat.tsx       # Chat screen
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Modal screen
├── components/            # Reusable UI components
│   ├── Auth.tsx           # Authentication component
│   ├── MessageBubble.tsx  # Individual message display
│   ├── MessageInput.tsx   # Message input component
│   └── ui/                # UI component library
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state management
├── hooks/                 # Custom React hooks
│   ├── useMessages.ts     # Message management hook
│   └── useColors.ts       # Theme color management
├── types/                 # TypeScript type definitions
│   └── chat.ts            # Chat-related types
├── utils/                 # Utility functions
│   └── supabase.ts        # Supabase client configuration
└── constants/             # App constants
    ├── colors.ts          # Color definitions
    └── theme.ts           # Theme configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ios-auth-chat-test-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Create a `messages` table with the following schema:
     ```sql
     CREATE TABLE messages (
       id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
       content TEXT NOT NULL,
       user_id UUID REFERENCES auth.users(id),
       user_email TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );
     ```
   - Enable Row Level Security (RLS) and create policies for authenticated users

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📱 How It Works

### Authentication Flow
1. **Initial Load**: App checks for existing authentication session
2. **Sign Up/Sign In**: Users can create new accounts or sign in with existing credentials
3. **Session Management**: Supabase handles token refresh and session persistence
4. **Protected Routes**: Chat functionality is only available to authenticated users

### Chat Functionality
1. **Message Loading**: App fetches existing messages from Supabase database
2. **Real-time Updates**: Supabase real-time subscriptions listen for new messages
3. **Message Sending**: New messages are inserted into the database
4. **UI Updates**: Interface automatically updates when new messages arrive

### Data Flow
```
User Input → MessageInput → Supabase Database → Real-time Subscription → UI Update
```

## 🔧 Configuration

### Supabase Setup
The app requires a properly configured Supabase project with:
- Authentication enabled
- A `messages` table with appropriate schema
- Row Level Security policies for data access
- Real-time subscriptions enabled

### Environment Variables
- `EXPO_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_KEY`: Your Supabase anonymous key

## 📝 Available Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the app on Android emulator
- `npm run ios`: Start the app on iOS simulator
- `npm run web`: Start the app in web browser
- `npm run lint`: Run ESLint for code quality checks

## 🎯 Key Features Explained

### Real-time Messaging
The app uses Supabase's real-time capabilities to provide instant message updates. When a user sends a message, it's immediately broadcast to all connected clients without requiring manual refresh.

### Authentication Security
User authentication is handled securely through Supabase Auth, which provides:
- Secure password hashing
- JWT token management
- Session persistence
- Automatic token refresh

### Responsive Design
The interface adapts to different screen sizes and orientations, providing an optimal experience across various devices.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Expo documentation](https://docs.expo.dev/)
2. Review the [Supabase documentation](https://supabase.com/docs)
3. Open an issue in this repository

---

Built with ❤️ using React Native, Expo, and Supabase