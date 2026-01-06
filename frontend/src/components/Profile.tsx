import { useEffect, useState } from 'react';
import { useNavigation, useNavigate, useLoaderData, Form, useActionData } from 'react-router-dom';
import type { ProfileResult } from '../actions/types';
import { useAuth } from '../contexts/authContext';
import type { Profile as ProfileData } from '../types';
import { toastSuccess } from '../utils/toast';
import FieldError from './form/FieldError';
import PageTitle from './PageTitle';

export default function Profile() {
  const initialProfileData = useLoaderData() as ProfileData;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData() as ProfileResult | undefined;
  const isSubmitting = navigation.state === 'submitting';
  const { logout } = useAuth();

  const serverProfile = actionData?.success ? actionData?.profileData : initialProfileData;
  const [profileData, setProfileData] = useState<ProfileData>(serverProfile);

  useEffect(() => {
    if (!actionData?.success || !actionData.profileData) return;

    if (actionData.profileData.emailUpdated) {
      sessionStorage.setItem('skipRedirectPath', 'true');
      logout();
      toastSuccess('Logged out successfully! Login again with updated email');
      navigate('/login');
    } else {
      toastSuccess('Your Profile details are saved successfully!');
    }
  }, [actionData, logout, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const h2Style = 'block text-2xl font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="max-w-6xl min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="My Profile" />

      <Form method="PUT" className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className={h2Style}>Personal Details</h2>
          <label className={labelStyle} htmlFor="name">
            Name
          </label>
          <input
            className={textFieldStyle}
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={profileData.name}
            onChange={handleInputChange}
            required
            minLength={5}
            maxLength={30}
          />
          <FieldError actionData={actionData} field="name" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              className={textFieldStyle}
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={profileData.email}
              onChange={handleInputChange}
              required
            />

            <FieldError actionData={actionData} field="email" />
          </div>

          <div>
            <label className={labelStyle} htmlFor="mobileNumber">
              Mobile Number
            </label>
            <input
              className={textFieldStyle}
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              placeholder="Your Mobile Number"
              required
              pattern="^\d{8,10}$"
              title="Mobile number must be between 8 and 10 digits"
              value={profileData.mobileNumber}
              onChange={handleInputChange}
            />
            <FieldError actionData={actionData} field="mobileNumber" />
          </div>
        </div>

        <div>
          <h2 className={h2Style}>Address Details</h2>
          <label className={labelStyle} htmlFor="street">
            Street
          </label>
          <input
            className={textFieldStyle}
            id="street"
            name="street"
            type="text"
            placeholder="Street details"
            value={profileData.street}
            onChange={handleInputChange}
            required
            minLength={5}
            maxLength={30}
          />
          <FieldError actionData={actionData} field="street" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle} htmlFor="city">
              City
            </label>
            <input
              className={textFieldStyle}
              id="city"
              name="city"
              type="text"
              placeholder="Your City"
              value={profileData.city}
              onChange={handleInputChange}
              required
              minLength={3}
              maxLength={30}
            />
            <FieldError actionData={actionData} field="city" />
          </div>

          <div>
            <label className={labelStyle} htmlFor="state">
              State
            </label>
            <input
              className={textFieldStyle}
              id="state"
              name="state"
              type="text"
              placeholder="Your State"
              value={profileData.state}
              onChange={handleInputChange}
              required
              minLength={2}
              maxLength={30}
            />
            <FieldError actionData={actionData} field="state" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle} htmlFor="postalCode">
              Postal Code
            </label>
            <input
              className={textFieldStyle}
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Your Postal Code"
              value={profileData.postalCode}
              onChange={handleInputChange}
              required
              pattern="^\d{5}$"
              title="Postal code must be exactly 5 digits"
            />
            <FieldError actionData={actionData} field="postalCode" />
          </div>

          <div>
            <label className={labelStyle} htmlFor="country">
              Country
            </label>
            <input
              className={textFieldStyle}
              id="country"
              name="country"
              type="text"
              placeholder="Your Country"
              value={profileData.country}
              onChange={handleInputChange}
              required
              minLength={3}
              maxLength={30}
            />
            <FieldError actionData={actionData} field="country" />
          </div>
        </div>
        <div className="text-center">
          <button
            className="px-6 py-2 mt-8 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  );
}
