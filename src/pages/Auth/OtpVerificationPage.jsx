import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-toastify';

const OtpVerificationPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const location = useLocation()
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
            setError('');
        }
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('OTP must be exactly 6 digits.');
            setSuccess(false);
        } else {
            try {
                // setError('');
                // setSuccess(true);
                // Here you can make an API call to verify the OTP
                const api = `${BASE_URL}${apiEndPoints.verifyOTP}`;
                const body = {
                    email: location?.state?.email,
                    otp: otp,
                    id: location?.state?.id
                }

                const res = await axios.post(api, body)
                if (res.data.status) {
                    location?.state?.type === 'admin' ? navigate('/admin-dashboard') : navigate('/dashboard');
                    toast.success("USER VERIFIED", {
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    console.log('Verifying OTP:', otp);
                    console.log('Response:', res.data.token);
                    Cookies.set('token', res.data.token);

                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                setError('Failed to verify OTP. Please try again.');
                setSuccess(false);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    OTP Verification
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Enter the 6-digit OTP sent to your email or phone.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Input
                                fullWidth
                                label="Enter OTP"
                                value={otp}
                                onChange={handleChange}
                                inputProps={{ maxLength: 6, inputMode: 'numeric' }}
                                error={!!error}
                            />
                        </Grid>

                        {error && (
                            <Grid item size={{ xs: 12 }}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}

                        {success && (
                            <Grid item size={{ xs: 12 }}>
                                <Alert severity="success">OTP Verified Successfully!</Alert>
                            </Grid>
                        )}

                        <Grid item size={{ xs: 12 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={otp.length !== 6}
                                onClick={handleSubmit}
                            >Verify OTP</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default OtpVerificationPage;