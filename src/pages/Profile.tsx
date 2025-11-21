import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../lib/firebase/firestore';
import { Avatar } from '../components/Avatar';

export const Profile = () => {
  const { user, profile, loading: authLoading, refreshProfile, signout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [status, setStatus] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Track initial state to detect changes
  const [initialDisplayName, setInitialDisplayName] = useState('');
  const [initialStatus, setInitialStatus] = useState('');

  // Load profile data when it's available
  useEffect(() => {
    if (profile) {
      const profileDisplayName = profile.displayName || '';
      const profileStatus = profile.status || '';
      setDisplayName(profileDisplayName);
      setStatus(profileStatus);
      setAvatarUrl(profile.avatar);
      // Set initial state when profile loads
      setInitialDisplayName(profileDisplayName);
      setInitialStatus(profileStatus);
    } else if (user && !authLoading) {
      // If user exists but no profile yet, use auth user data
      const userDisplayName = user.displayName || '';
      setDisplayName(userDisplayName);
      setAvatarUrl(user.photoURL || undefined);
      // Set initial state
      setInitialDisplayName(userDisplayName);
      setInitialStatus('');
    }
  }, [profile, user, authLoading]);

  // Check if form has changes
  const hasChanges = 
    displayName.trim() !== initialDisplayName.trim() || 
    status.trim() !== initialStatus.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage(null);

    try {
      const updateData: { displayName: string; status: string } = {
        displayName: displayName.trim(),
        status: status.trim(),
      };

      await updateUserProfile(user.uid, updateData);
      // Refresh profile from context
      await refreshProfile();
      // Update initial state to reflect saved changes
      setInitialDisplayName(displayName.trim());
      setInitialStatus(status.trim());
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      navigate('/signin');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to logout' });
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Please sign in to view your profile.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        
        <div className="bg-white rounded-lg shadow p-4">
          {message && (
            <div
              className={`mb-3 p-2 rounded-md text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar
              </label>
              <div className="flex items-center gap-3">
                <Avatar src={avatarUrl} alt={displayName || user.email || 'User'} size="lg" />
                <p className="text-sm text-gray-500">
                  {avatarUrl ? 'Your avatar is set from your Google account.' : 'Your avatar will show your initials.'}
                </p>
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your display name"
                disabled={saving}
                required
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <textarea
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="What's on your mind?"
                disabled={saving}
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                disabled
                readOnly
              />
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
              <button
                type="submit"
                disabled={saving || !displayName.trim() || !hasChanges}
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

