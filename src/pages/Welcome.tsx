import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export const Welcome = () => {
  const { user } = useAuth();
  const [likeState, setLikeState] = useState<'default' | 'hovered' | 'clicked'>('default');
  const [dislikeState, setDislikeState] = useState<'default' | 'hovered' | 'clicked'>('default');

  // If user is logged in, show different content
  if (user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Glad to see you here!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              How are you enjoying the app so far?
            </p>
            <div className="flex justify-center space-x-6">
              {/* Like Button */}
              <button
                type="button"
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200
                  ${likeState === 'clicked' 
                    ? 'bg-green-500 scale-95 shadow-lg' 
                    : likeState === 'hovered'
                    ? 'bg-green-100 scale-110 shadow-md'
                    : 'bg-gray-100 hover:bg-green-100 scale-100 shadow-sm'
                  }
                `}
                onMouseEnter={() => setLikeState('hovered')}
                onMouseLeave={() => setLikeState(likeState === 'clicked' ? 'clicked' : 'default')}
                onClick={() => setLikeState('clicked')}
                aria-label="Like"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${
                    likeState === 'clicked' 
                      ? 'text-white' 
                      : likeState === 'hovered'
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </button>

              {/* Dislike Button */}
              <button
                type="button"
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200
                  ${dislikeState === 'clicked' 
                    ? 'bg-red-500 scale-95 shadow-lg' 
                    : dislikeState === 'hovered'
                    ? 'bg-red-100 scale-110 shadow-md'
                    : 'bg-gray-100 hover:bg-red-100 scale-100 shadow-sm'
                  }
                `}
                onMouseEnter={() => setDislikeState('hovered')}
                onMouseLeave={() => setDislikeState(dislikeState === 'clicked' ? 'clicked' : 'default')}
                onClick={() => setDislikeState('clicked')}
                aria-label="Dislike"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-8 w-8 ${
                    dislikeState === 'clicked' 
                      ? 'text-white' 
                      : dislikeState === 'hovered'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Default welcome screen for non-logged-in users
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Threadly
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your modern chat and collaboration platform
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signin"
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gray-200 text-gray-900 hover:bg-gray-300 px-6 py-3 rounded-md text-lg font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

