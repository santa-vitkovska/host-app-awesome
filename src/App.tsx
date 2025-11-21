import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Board } from './pages/Board';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import type { AuthContextValue } from 'threadly-chat-module';
import 'threadly-chat-module/dist/threadly.css';

// Lazy load the chat module
const ChatModule = lazy(() => import('threadly-chat-module').then(module => ({ default: module.Chat })));

// Wrapper component to convert host auth to chat module format
const ChatWrapper = () => {
  const auth = useAuth();
  
  // Convert Firebase User to AuthUser format
  const chatAuth: AuthContextValue = {
    user: auth.user ? {
      uid: auth.user.uid,
      email: auth.user.email,
      displayName: auth.user.displayName,
      photoURL: auth.user.photoURL,
    } : null,
    loading: auth.loading,
  };

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading chat...</div>}>
      <ChatModule auth={chatAuth} />
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/chats"
              element={
                <ProtectedRoute>
                  <ChatWrapper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:chatId"
              element={
                <ProtectedRoute>
                  <ChatWrapper />
                </ProtectedRoute>
              }
            />
            <Route
              path="/board/:boardId"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/welcome" replace />} />
            <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
