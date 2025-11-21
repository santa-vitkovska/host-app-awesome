import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Welcome } from './pages/Welcome';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import type { AuthContextValue } from 'threadly-chat-module';
import 'threadly-chat-module/dist/threadly.css';

// Lazy load components for better performance
const ChatModule = lazy(() => import('threadly-chat-module').then(module => ({ default: module.Chat })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const Settings = lazy(() => import('./pages/Settings').then(module => ({ default: module.Settings })));
const Board = lazy(() => import('./pages/Board').then(module => ({ default: module.Board })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-gray-600">Loading...</div>
  </div>
);

// Root redirect component that checks auth state
const RootRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingFallback />;
  }
  
  // If logged in, go to chats; if not, go to signin
  return <Navigate to={user ? "/chats" : "/signin"} replace />;
};

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
    <Layout hideFooter fullHeight>
      <Suspense fallback={<div className="flex items-center justify-center h-full">Loading chat...</div>}>
        <ChatModule auth={chatAuth} />
      </Suspense>
    </Layout>
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
                  <Suspense fallback={<LoadingFallback />}>
                    <Board />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LoadingFallback />}>
                    <Settings />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<RootRedirect />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
