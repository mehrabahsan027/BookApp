import React from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';

export default function RequestBook() {
  const [reqBook, setReqBook] = React.useState({
    title: '',
    author: '',
    yourEmail: '',
    date: new Date(),
  });

  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  // Email regex for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!reqBook.title.trim()) newErrors.title = 'Title is required';
    if (!reqBook.author.trim()) newErrors.author = 'Author is required';
    if (!reqBook.yourEmail.trim()) {
      newErrors.yourEmail = 'Email is required';
    } else if (!emailRegex.test(reqBook.yourEmail)) {
      newErrors.yourEmail = 'Enter a valid email';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReqBook((prev) => ({
      ...prev,
      [	name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${baseUrl}/add-book`, reqBook);
        console.log(response.status);
        setSubmitted(true);

        // Reset form
        setReqBook({ title: '', author: '', yourEmail: '' });

        setTimeout(() => {
          setSubmitted(false);
        }, 2000);
      } catch (error) {
        console.error('Error:', error.response.status);
        if (error.response.status === 400) {
          setError('Book already exists or something went wrong');
        }
      }
    } else {
      setSubmitted(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Request a Book</h2>
        {submitted && (
          <div className="mb-4 text-green-600 text-center font-medium bg-green-50 py-2 rounded-md">
            Request submitted successfully!
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 text-center font-medium bg-red-50 py-2 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-1 text-gray-700">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={reqBook.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out hover:shadow-md placeholder-gray-400`}
              placeholder="Enter book title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block font-medium mb-1 text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={reqBook.author}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.author ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out hover:shadow-md placeholder-gray-400`}
              placeholder="Enter author name"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="yourEmail" className="block font-medium mb-1 text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              id="yourEmail"
              name="yourEmail"
              value={reqBook.yourEmail}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.yourEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all duration-200 ease-in-out hover:shadow-md placeholder-gray-400`}
              placeholder="your@email.com"
            />
            {errors.yourEmail && <p className="text-red-500 text-sm mt-1">{errors.yourEmail}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white font-medium py-3 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}