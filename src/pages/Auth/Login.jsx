import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiEndPoints, { BASE_URL } from "../../constants/apiEndpoints";
import Cookies from "js-cookie"
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../context api/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loader, setLoader } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoader(true);
      const res = await axios.post(`${BASE_URL}${apiEndPoints.login}`, {
        email,
        password
      });
      if (!res.data.status) {
        console.log("error", res.data.message)
        throw res.data.message
      }
      console.log(res.data);
      setLoader(false);

      const type = res?.data?.data?.type;
      if (!res.data.isVerified || res.data.data.TwoFAEnabled) {
        navigate('/otp-verification', { state: { email, page: "login", type, id: res?.data?.data?._id } });
      }

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      toast.error(error.response.data.message, {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      setLoader(false);
    }
  };


  return (
    <Box sx={{ bgcolor: 'background.light' }} className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Login</h2>
        <div className="space-y-4">
          <Input
            variant={"outlined"}
            type="email"
            className="w-full !my-2 focus:!outline-none focus:!ring-2 focus:!ring-orange-400"
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
          />
          <div className="!my-2">
            <Input
              variant={"outlined"}
              type="password"
              className="w-full"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
            />
            <p className="text-red-700 !mt-1">{error}</p>
          </div>
          <div>
            <Button variant={"contained"} className="w-full flex justify-center items-center gap-2" onClick={login} >
              Login  {loader && <CircularProgress color="text.medium" size={20} />}
            </Button>
            <p className="text-center ">
              Don't have an account? <Link className="text-blue-400 hover:text-blue-600" to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Login;