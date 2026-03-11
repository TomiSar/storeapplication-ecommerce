import { useEffect, useState } from 'react';
import { apiClient } from '../../api/apiClient';
import type { Profile } from '../../types/profile';
import { formatUserRoles } from '../../utils/helpers';
import { toastError, toastSuccess } from '../../utils/toast';
import PageTitle from '../PageTitle';
type ProfileWithRoles = Profile & { roles: string };

export default function AdminUserRoles() {
  const [users, setUsers] = useState<ProfileWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [granting, setGranting] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => toastError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const handleGrantAdmin = async (email: string) => {
    setGranting(email);
    try {
      await apiClient.post('/admin/grant-admin', { email });
      toastSuccess('Admin role granted!');
      setUsers((users) =>
        users.map((user) =>
          user.email === email
            ? {
                ...user,
                roles: user.roles.includes('ROLE_ADMIN') ? user.roles : user.roles + ',ROLE_ADMIN',
              }
            : user,
        ),
      );
    } catch {
      toastError('Failed to grant admin role');
    } finally {
      setGranting(null);
    }
  };

  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary dark:bg-darkbg">
      <PageTitle title="Admin: User Roles Management" />
      {loading ? (
        <p className="text-center text-xl text-primary dark:text-lighter">Loading users...</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="w-full mt-4 table-fixed border-collapse border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-primary dark:bg-light text-lighter dark:text-primary">
                <th className="w-1/4 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Name
                </th>
                <th className="w-1/4 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Email
                </th>
                <th className="w-1/4 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Mobile
                </th>
                <th className="w-1/4 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Roles
                </th>
                <th className="w-1/4 border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="bg-white dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-lighter border border-gray-200 dark:border-gray-700"
                >
                  <td className="border px-4 py-2 wrap-break-word">{user.name}</td>
                  <td className="border px-4 py-2 wrap-break-word">{user.email}</td>
                  <td className="border px-4 py-2 wrap-break-word">{user.mobileNumber}</td>
                  <td className="border px-4 py-2 wrap-break-word">
                    {formatUserRoles(user.roles)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {user.roles.includes('ROLE_ADMIN') ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Admin
                      </span>
                    ) : (
                      <button
                        className="bg-primary text-white px-4 py-1 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        onClick={() => handleGrantAdmin(user.email)}
                        disabled={granting === user.email}
                      >
                        {granting === user.email ? 'Granting...' : 'Grant Admin'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
