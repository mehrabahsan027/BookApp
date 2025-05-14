import React from 'react';
import axios from 'axios';

export default function RequestBook() {
  const [reqBook, setReqBook] = React.useState({
    title: '',
    author: '',
    yourEmail: ''
  });

  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

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
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      
        const response = axios.post('http://localhost:3000/add-book', reqBook)
        .then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.error('Error:', error);
        })
 
      setSubmitted(true);

      setTimeout(()=> {
        setSubmitted(false);
      },2000)
      // Reset form
      setReqBook({ title: '', author: '', yourEmail: '' });
    } else {
      setSubmitted(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Request a Book</h2>
        {submitted && (
          <div className="mb-4 text-green-600 text-center font-medium">
            Request submitted successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Book Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={reqBook.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author */}
          <div className="mb-4">
            <label htmlFor="author" className="block font-medium mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={reqBook.author}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.author ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
              }`}
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="yourEmail" className="block font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="yourEmail"
              name="yourEmail"
              value={reqBook.yourEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                errors.yourEmail ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
              }`}
            />
            {errors.yourEmail && <p className="text-red-500 text-sm mt-1">{errors.yourEmail}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white font-medium py-2 rounded hover:bg-red-800 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}
