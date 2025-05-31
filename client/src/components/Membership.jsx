import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';

export default function Membership() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User Data:', user);

    try {
      const response = await axios.post(`${baseUrl}/users`, user);
      console.log(response.status);

      if (response.status === 201) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response.status === 400) {
        setError('User Already Exists');
      }
    }

    setUser({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Stay Connected With Us!</h1>
          <p className="text-gray-600 mt-2">Fill in your details to get updates</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:shadow-md capitalize placeholder-gray-400"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:shadow-md placeholder-gray-400"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out hover:shadow-md placeholder-gray-400"
              placeholder="e.g. 123-456-7890"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-3 rounded-md font-semibold hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            Join Now
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 mt-4 text-center font-medium bg-green-50 py-2 rounded-md">
            Submitted successfully!
          </p>
        )}
        {error && (
          <p className="text-red-600 mt-4 text-center font-medium bg-red-50 py-2 rounded-md">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}