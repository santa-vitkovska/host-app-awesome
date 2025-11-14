import { Layout } from '../components/Layout';

export const Profile = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Profile
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-12">
            User profile will be implemented here
          </p>
        </div>
      </div>
    </Layout>
  );
};

