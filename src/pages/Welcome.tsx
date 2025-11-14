import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Welcome = () => {
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

