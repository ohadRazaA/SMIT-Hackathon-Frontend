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
  LinearProgress,
  Alert
} from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context api/AuthContext';

const UploadReport = () => {
  const navigate = useNavigate();
  const { setLoader } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    reportType: '',
    reportDate: new Date().toISOString().split('T')[0]
  });
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const reportTypes = [
    { value: 'blood_test', label: 'Blood Test' },
    { value: 'urine_test', label: 'Urine Test' },
    { value: 'xray', label: 'X-Ray' },
    { value: 'ct_scan', label: 'CT Scan' },
    { value: 'mri', label: 'MRI' },
    { value: 'ecg', label: 'ECG' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'other', label: 'Other' }
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or image file (JPEG, PNG)');
        return;
      }
      
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    
    if (!formData.reportType) {
      toast.error('Please select a report type');
      return;
    }

    try {
      setIsUploading(true);
      setLoader(true);
      
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('reportType', formData.reportType);
      uploadData.append('reportDate', formData.reportDate);

      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.uploadReport}`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Cookies.get('token')}`
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        }
      );

      if (response.data.status) {
        toast.success('Report uploaded successfully! AI analysis will be available shortly.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setLoader(false);
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Upload Medical Report
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* File Upload */}
            <Box sx={{ mb: 3 }}>
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  sx={{ width: '100%', py: 2, mb: 2 }}
                >
                  {file ? file.name : 'Choose File (PDF or Image)'}
                </Button>
              </label>
              
              {file && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </Alert>
              )}
              
              {isUploading && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Uploading... {uploadProgress}%
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Report Type */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={formData.reportType}
                onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
                label="Report Type"
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Report Date */}
            <TextField
              fullWidth
              label="Report Date"
              type="date"
              value={formData.reportDate}
              onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={!file || !formData.reportType || isUploading}
              sx={{ py: 1.5 }}
            >
              {isUploading ? 'Uploading...' : 'Upload Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card sx={{ mt: 3, bgcolor: 'background.light' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            How it works:
          </Typography>
          <Typography variant="body2" paragraph>
            1. Upload your medical report (PDF or image)
          </Typography>
          <Typography variant="body2" paragraph>
            2. Our AI will analyze the content automatically
          </Typography>
          <Typography variant="body2" paragraph>
            3. Get easy-to-understand summaries in English and Urdu
          </Typography>
          <Typography variant="body2">
            4. View your health timeline with all reports
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadReport;
