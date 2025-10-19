import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { Save as SaveIcon, Person as PersonIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context api/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { setLoader } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    preferences: {
      language: 'both',
      notifications: true
    }
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}${apiEndPoints.me}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );

      if (response.data.status) {
        const userData = response.data.data;
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
          gender: userData.gender || '',
          bloodType: userData.bloodType || '',
          medicalHistory: userData.medicalHistory ? userData.medicalHistory.join(', ') : '',
          allergies: userData.allergies ? userData.allergies.join(', ') : '',
          emergencyContact: {
            name: userData.emergencyContact?.name || '',
            phone: userData.emergencyContact?.phone || '',
            relationship: userData.emergencyContact?.relationship || ''
          },
          preferences: {
            language: userData.preferences?.language || 'both',
            notifications: userData.preferences?.notifications !== false
          }
        });
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setLoader(true);
      
      // Convert comma-separated strings to arrays
      const submitData = {
        ...formData,
        medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',').map(item => item.trim()).filter(item => item) : [],
        allergies: formData.allergies ? formData.allergies.split(',').map(item => item.trim()).filter(item => item) : []
      };

      const response = await axios.put(
        `${BASE_URL}${apiEndPoints.updateProfile}`,
        submitData,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );

      if (response.data.status) {
        toast.success('Profile updated successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
      setLoader(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading profile...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Health Profile
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ mr: 1 }} />
              Personal Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  type="email"
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Blood Type</InputLabel>
                  <Select
                    value={formData.bloodType}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    label="Blood Type"
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Medical Information */}
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Medical Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Medical History"
                  multiline
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  placeholder="Enter your medical history (comma-separated)"
                  helperText="Separate multiple conditions with commas"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Allergies"
                  multiline
                  rows={2}
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="Enter your allergies (comma-separated)"
                  helperText="Separate multiple allergies with commas"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Emergency Contact */}
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Emergency Contact
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Preferences */}
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Preferences
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Language Preference</InputLabel>
                  <Select
                    value={formData.preferences.language}
                    onChange={(e) => handleInputChange('preferences.language', e.target.value)}
                    label="Language Preference"
                  >
                    <MenuItem value="english">English Only</MenuItem>
                    <MenuItem value="urdu">Urdu Only</MenuItem>
                    <MenuItem value="both">Both English & Urdu</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Notifications</InputLabel>
                  <Select
                    value={formData.preferences.notifications ? 'enabled' : 'disabled'}
                    onChange={(e) => handleInputChange('preferences.notifications', e.target.value === 'enabled')}
                    label="Notifications"
                  >
                    <MenuItem value="enabled">Enabled</MenuItem>
                    <MenuItem value="disabled">Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isSaving}
                size="large"
                sx={{ minWidth: 150 }}
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card sx={{ mt: 3, bgcolor: 'background.light' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Why update your health profile?
          </Typography>
          <Typography variant="body2" paragraph>
            • Helps AI provide more accurate analysis of your reports
          </Typography>
          <Typography variant="body2" paragraph>
            • Enables better tracking of your health trends over time
          </Typography>
          <Typography variant="body2" paragraph>
            • Ensures emergency contacts are available when needed
          </Typography>
          <Typography variant="body2">
            • Customizes your experience based on your preferences
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
