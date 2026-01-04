import { useNavigation, Form } from 'react-router-dom';
import PageTitle from './PageTitle';

export default function Profile() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const labelStyle = 'block text-lg font-semibold text-primary dark:text-light mb-2';
  const h2Style = 'block text-2xl font-semibold text-primary dark:text-light mb-2';
  const textFieldStyle =
    'w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600 placeholder-gray-400 dark:placeholder-gray-300';

  return (
    <div className="max-w-[1152px] min-h-[852px] mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="My Profile" />

      <Form method="PUT" className="space-y-6 max-w-[768px] mx-auto">
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
            // value={profileData.name}
            // onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
            required
            minLength={5}
            maxLength={30}
          />
          {/* {actionData?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>
          )} */}
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
              // value={profileData.email}
              // onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
            {/* {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>
            )} */}
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
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              // value={profileData.mobileNumber}
              // onChange={(e) =>
              //   setProfileData((prev) => ({
              //     ...prev,
              //     mobileNumber: e.target.value,
              //   }))
              // }
              placeholder="Your Mobile Number"
            />
            {/* {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.mobileNumber}</p>
            )} */}
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
            // value={profileData.street}
            // onChange={(e) =>
            //   setProfileData((prev) => ({
            //     ...prev,
            //     street: e.target.value,
            //   }))
            // }
            required
            minLength={5}
            maxLength={30}
          />
          {/* {actionData?.errors?.street && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.street}</p>
          )} */}
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
              // value={profileData.city}
              // onChange={(e) =>
              //   setProfileData((prev) => ({
              //     ...prev,
              //     city: e.target.value,
              //   }))
              // }
              required
              minLength={3}
              maxLength={30}
            />
            {/* {actionData?.errors?.city && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.city}</p>
            )} */}
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
              required
              minLength={2}
              maxLength={30}
              placeholder="Your State"
              // value={profileData.state}
              // onChange={(e) =>
              //   setProfileData((prev) => ({
              //     ...prev,
              //     state: e.target.value,
              //   }))
              // }
            />
            {/* {actionData?.errors?.state && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.state}</p>
            )} */}
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
              // value={profileData.postalCode}
              // onChange={(e) =>
              //   setProfileData((prev) => ({
              //     ...prev,
              //     postalCode: e.target.value,
              //   }))
              // }
              required
              pattern="^\d{5}$"
              title="Postal code must be exactly 5 digits"
            />
            {/* {actionData?.errors?.postalCode && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.postalCode}</p>
            )} */}
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
              required
              minLength={3}
              maxLength={30}
              placeholder="Your Country"
              // value={profileData.country}
              // onChange={(e) =>
              //   setProfileData((prev) => ({
              //     ...prev,
              //     country: e.target.value,
              //   }))
              // }
            />
            {/* {actionData?.errors?.country && (
              <p className="text-red-500 text-sm mt-1">{actionData.errors.country}</p>
            )} */}
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
