import React, { useState } from 'react';
import axios from 'axios';

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

    // Here you can send the user data to your server
    try {
      const response = await axios.post('http://localhost:3000/users', user);
      // You can use response here
      console.log(response.status);

      if(response.status === 201) {
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
    

    // Reset form after submission
    setUser({
      name: '',
      email: '',
      phone: '',
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
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
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize"
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
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 123-456-7890"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-md font-semibold hover:bg-red-800 transition duration-200"
          >
            Join Now
          </button>
        </form>
        {submitted &&  <p className='text-green-800 mt-3 text-center'>Submitted...</p>}
        {error && <p className='text-red-800 mt-3 text-center'>{error}</p>}
      </div>
    </section>
  );
}
