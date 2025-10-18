import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiEndPoints, { BASE_URL } from "../../constants/apiEndpoints";
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../context api/AuthContext";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Box from "@mui/material/Box";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loader, setLoader } = useContext(AuthContext);
  const navigate = useNavigate('');

  const signup = async () => {
    try {
      setLoader(true);
      const res = await axios.post(`${BASE_URL}${apiEndPoints.signup}`, {
        firstName,
        lastName,
        email,
        password
      });
      setLoader(false);
      const type = res?.data?.data?.type;
      navigate('/otp-verification', { state: { email, page: "signup", type, id: res?.data?.data?._id } });
      console.log(res)
    } catch (error) {
      setError(error.response.data.message);
      setLoader(false);
    }
  }

  return (
    <Box sx={{ bgcolor: 'background.light' }} className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Sign Up</h2>
        <div className="space-y-4">
          <div className="!my-2">
            <Input
              variant={"outlined"}
              type="text"
              className="w-full !mb-2"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              label="First Name"
            />
          </div>
          <div className="!my-2">
            <Input
              variant={"outlined"}
              type="text"
              className="w-full !mb-2"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              label="Last Name"
            />
          </div>
          <div className="!my-2">
            <Input
              variant={"outlined"}
              type="email"
              className="w-full !mb-2"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
            />
          </div>
          <div className="!my-2">
            <Input
              variant={"outlined"}
              type="password"
              className="w-full !mb-2"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
            />
          </div>
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <div>
            <Button variant={"contained"} className="w-full flex justify-center items-center gap-2" onClick={signup} >
              Signup  {loader && <CircularProgress color="text.medium" size={20} />}
            </Button>
            <p className="text-center ">
              Already have an account <Link className="text-blue-400 hover:text-blue-600" to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Signup;