import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const ChatRoom = () => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Chat Room
        </h1>
        <p className="text-gray-600">
          Chat with user: <span className="font-semibold">{userId}</span>
        </p>
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-12">
            Chat interface will be implemented here
          </p>
        </div>
      </div>
    </Layout>
  );
};

