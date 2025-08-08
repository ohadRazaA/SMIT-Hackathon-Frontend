import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiEndPoints, { BASE_URL } from "../../constants/apiEndpoints";


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate('');

  const signup = async () => {
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoints.signup}`, {
        firstName,
        lastName,
        email,
        password
      });
      navigate('/login');
      console.log(res)
    } catch (error) {
      setError('Email already exist')
    }
  }


  
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Sign Up</h2>
        <div className="space-y-4">
          <div className="!my-2">
            <label className="block text-gray-600 text-sm !mb-1">First Name</label>
            <input
              type="text"
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="!my-2">
            <label className="block text-gray-600 text-sm !mb-1">Last Name</label>
            <input
              type="text"
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="!my-2">
            <label className="block text-gray-600 text-sm !mb-1">Email</label>
            <input
              type="email"
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="!my-2">
            <label className="block text-gray-600 text-sm !mb-1">Password</label>
            <input
              type="password"
              className="w-full !p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <div>
            <button className="w-full bg-orange-400 text-white !my-4 !py-2 rounded-lg hover:bg-orange-500 transition cursor-pointer" onClick={signup}>
              Sign Up
            </button>
            <p className="text-center ">
              Already have an account <Link className="text-blue-400 hover:text-blue-600" to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
