import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            setLoader(true);
            const res = await axios.post(`${BASE_URL}${apiEndPoints.resetPassword}`, {
                email,
                otp,
                newPassword
            });

            if (res.data.status) {
                toast.success("Password reset successfully", {
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                navigate('/');
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

    return (
        <Box sx={{ bgcolor: 'background.light' }} className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white !p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-700 !mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            variant="outlined"
                            type="email"
                            className="w-full !my-2"
                            placeholder="john@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            label="Email"
                            required
                        />
                        <Input
                            variant="outlined"
                            type="text"
                            className="w-full !my-2"
                            placeholder="123456"
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                            label="OTP"
                            inputProps={{ maxLength: 6 }}
                            required
                        />
                        <Input
                            variant="outlined"
                            type="password"
                            className="w-full !my-2"
                            placeholder="••••••••"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            label="New Password"
                            required
                        />
                        <Input
                            variant="outlined"
                            type="password"
                            className="w-full !my-2"
                            placeholder="••••••••"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            label="Confirm Password"
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
                                Reset Password {loader && <CircularProgress color="text.medium" size={20} />}
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

export default ResetPassword;