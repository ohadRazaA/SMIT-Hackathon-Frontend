import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import apiEndPoints, { BASE_URL } from "../../constants/apiEndpoints";
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../context api/AuthContext";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { loader, setLoader } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await axios.post(`${BASE_URL}${apiEndPoints.forgotPassword}`, {
        email
      });
      
      if (res.data.status) {
        setSuccess(true);
        toast.success("Password reset OTP sent to your email", {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong", {
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } finally {
      setLoader(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ bgcolor: 'background.light' }} className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600 !mb-4">Check Your Email</h2>
          <p className="text-gray-600 !mb-4">
            We've sent a password reset OTP to your email address.
          </p>
          <Link className="text-blue-400 hover:text-blue-600" to="/reset-password">
            Go to Reset Password
          </Link>
        </div>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.light' }} className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              variant="outlined"
              type="email"
              className="w-full !my-2 focus:!outline-none focus:!ring-2 focus:!ring-orange-400"
              placeholder="john@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
              required
            />
            <p className="text-red-700 text-sm font-medium">{error}</p>
            <div>
              <Button 
                type="submit"
                variant="contained" 
                className="w-full flex justify-center items-center gap-2"
                disabled={loader}
              >
                Send Reset OTP {loader && <CircularProgress color="text.medium" size={20} />}
              </Button>
              <p className="text-center !mt-4">
                Remember your password? <Link className="text-blue-400 hover:text-blue-600" to="/">Login</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default ForgotPassword;