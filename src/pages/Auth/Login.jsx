import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiEndPoints, { BASE_URL } from "../../constants/apiEndpoints";
import Cookies from "js-cookie"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoints.login}`, {
        email,
        password
      });
      if (!res.data.status) {
        console.log("error", res.data.message)
        throw res.data.message
      }
      Cookies.set("token", res.data.token);
      navigate('/dashboard  ');

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Login</h2>
        <div className="space-y-4">
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
            <p className="text-red-700 !mt-1">{error}</p>
          </div>
          <div>
            <button className="w-full bg-orange-400 text-white !py-2 !my-4 rounded-lg hover:bg-orange-500 transition cursor-pointer" onClick={login}>
              Login
            </button>
            <p className="text-center ">
              Don't have an account? <Link className="text-blue-400 hover:text-blue-600" to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;