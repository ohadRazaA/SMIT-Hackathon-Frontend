import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context api/AuthContext';

const AddVitals = () => {
  const navigate = useNavigate();
  const { setLoader } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    vitalType: '',
    value: '',
    unit: '',
    readingDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const vitalTypes = [
    { value: 'blood_pressure', label: 'Blood Pressure', unit: 'mmHg', example: '120/80' },
    { value: 'blood_sugar', label: 'Blood Sugar', unit: 'mg/dL', example: '95' },
    { value: 'weight', label: 'Weight', unit: 'kg', example: '70' },
    { value: 'height', label: 'Height', unit: 'cm', example: '170' },
    { value: 'temperature', label: 'Temperature', unit: '°F', example: '98.6' },
    { value: 'heart_rate', label: 'Heart Rate', unit: 'bpm', example: '72' },
    { value: 'oxygen_saturation', label: 'Oxygen Saturation', unit: '%', example: '98' },
    { value: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL', example: '180' },
    { value: 'other', label: 'Other', unit: '', example: 'Custom value' }
  ];

  const selectedVital = vitalTypes.find(v => v.value === formData.vitalType);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vitalType || !formData.value || !formData.unit) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setLoader(true);

      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.addVitals}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        }
      );

      if (response.data.status) {
        toast.success('Vitals added successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Add vitals error:', error);
      toast.error(error.response?.data?.message || 'Failed to add vitals. Please try again.');
    } finally {
      setIsSubmitting(false);
      setLoader(false);
    }
  };

  const resetForm = () => {
    setFormData({
      vitalType: '',
      value: '',
      unit: '',
      readingDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Add Manual Vitals
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Vital Type */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Vital Type</InputLabel>
                  <Select
                    value={formData.vitalType}
                    onChange={(e) => {
                      const selected = vitalTypes.find(v => v.value === e.target.value);
                      handleInputChange('vitalType', e.target.value);
                      handleInputChange('unit', selected?.unit || '');
                    }}
                    label="Vital Type"
                  >
                    {vitalTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Value and Unit */}
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Value"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  placeholder={selectedVital?.example || 'Enter value'}
                  helperText={selectedVital?.example ? `Example: ${selectedVital.example}` : ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  disabled={selectedVital?.unit !== ''}
                />
              </Grid>

              {/* Reading Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reading Date"
                  type="date"
                  value={formData.readingDate}
                  onChange={(e) => handleInputChange('readingDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes about this reading..."
                />
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={isSubmitting || !formData.vitalType || !formData.value}
                    sx={{ minWidth: 120 }}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Vitals'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card sx={{ mt: 3, bgcolor: 'background.light' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Track Your Health:
          </Typography>
          <Typography variant="body2" paragraph>
            • Add regular readings like blood pressure, sugar, weight
          </Typography>
          <Typography variant="body2" paragraph>
            • Keep track of your health trends over time
          </Typography>
          <Typography variant="body2" paragraph>
            • View all your data in the health timeline
          </Typography>
          <Typography variant="body2">
            • Get insights from your health patterns
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddVitals;
