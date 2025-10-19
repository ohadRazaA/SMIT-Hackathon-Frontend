import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Avatar,
  Button
} from '@mui/material';
import {
  Upload as UploadIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  LocalHospital as HospitalIcon
} from '@mui/icons-material';
import { useFetchData } from '../../hooks/useFetchData';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Cookies from 'js-cookie';

const TimelineView = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: 'all',
    startDate: '',
    endDate: ''
  });

  const { data, isLoading, error, refetch } = useFetchData(
    'health-timeline',
    `${BASE_URL}${apiEndPoints.getTimeline}`,
    filters,
    { Authorization: `Bearer ${Cookies.get('token')}` },
    {
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
    }
  );

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTimelineIcon = (item) => {
    if (item.type === 'file') {
      return <UploadIcon />;
    } else if (item.type === 'vital') {
      return <AssessmentIcon />;
    }
    return <HospitalIcon />;
  };

  const getTimelineColor = (item) => {
    if (item.type === 'file') {
      return item.isProcessed ? 'success' : 'warning';
    } else if (item.type === 'vital') {
      switch (item.status) {
        case 'normal': return 'success';
        case 'high': return 'error';
        case 'low': return 'warning';
        case 'critical': return 'error';
        default: return 'primary';
      }
    }
    return 'primary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading health timeline...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        Failed to load health timeline. Please try again.
      </Alert>
    );
  }

  const timelineData = data?.data || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        Health Timeline
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  label="Type"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="file">Reports</MenuItem>
                  <MenuItem value="vital">Vitals</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Custom Timeline */}
      {timelineData.length > 0 ? (
        <Box sx={{ position: 'relative' }}>
          {timelineData.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 3, position: 'relative' }}>
              {/* Timeline Line */}
              {index < timelineData.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: 24,
                    top: 48,
                    bottom: -24,
                    width: 2,
                    bgcolor: 'divider',
                    zIndex: 1
                  }}
                />
              )}
              
              {/* Timeline Dot */}
              <Box sx={{ position: 'relative', zIndex: 2, mr: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: getTimelineColor(item) + '.main',
                    color: 'white',
                    width: 48,
                    height: 48,
                    boxShadow: 2
                  }}
                >
                  {getTimelineIcon(item)}
                </Avatar>
              </Box>
              
              {/* Timeline Content */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                {/* Date Header */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(item.readingDate || item.reportDate)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatTime(item.readingDate || item.reportDate)}
                  </Typography>
                </Box>
                
                {/* Content Card */}
                <Card 
                  sx={{ 
                    cursor: item.type === 'file' ? 'pointer' : 'default',
                    '&:hover': item.type === 'file' ? { 
                      boxShadow: 3,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    } : {}
                  }}
                  onClick={() => {
                    if (item.type === 'file') {
                      navigate(`/report/${item._id}`);
                    }
                  }}
                >
                  <CardContent>
                    {item.type === 'file' ? (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {item.originalName}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={item.reportType.replace(/_/g, ' ').toUpperCase()} 
                            size="small" 
                            color="primary" 
                          />
                          {item.isProcessed ? (
                            <Chip 
                              label="AI Analyzed" 
                              size="small" 
                              color="success" 
                            />
                          ) : item.processingError ? (
                            <Chip 
                              label="Analysis Failed" 
                              size="small" 
                              color="error" 
                            />
                          ) : (
                            <Chip 
                              label="Processing..." 
                              size="small" 
                              color="warning" 
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Uploaded on {formatDate(item.uploadedAt)}
                        </Typography>
                        {item.aiInsightId && (
                          <Typography variant="caption" color="success.main" display="block">
                            ✓ AI Summary Available
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {item.vitalType.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="h4" color="primary.main" gutterBottom>
                          {item.value} {item.unit}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={item.status?.toUpperCase() || 'NORMAL'} 
                            size="small" 
                            color={getTimelineColor(item)}
                          />
                          {item.isFromReport && (
                            <Chip 
                              label="From Report" 
                              size="small" 
                              color="info" 
                            />
                          )}
                        </Box>
                        {item.notes && (
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {item.notes}
                          </Typography>
                        )}
                        {item.normalRange && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            Normal range: {item.normalRange}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <HospitalIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No health data found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Start by uploading a medical report or adding manual vitals
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                startIcon={<UploadIcon />}
                onClick={() => navigate('/upload-report')}
              >
                Upload Report
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={() => navigate('/add-vitals')}
              >
                Add Vitals
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default TimelineView;
