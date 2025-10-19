import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { useFetchData } from '../../hooks/useFetchData'
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints'
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import { 
  Upload as UploadIcon, 
  Add as AddIcon, 
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  LocalHospital as HospitalIcon,
  Analytics as AnalyticsIcon,
  HealthAndSafety as HealthIcon,
  Favorite as FavoriteIcon,
  MonitorHeart as MonitorHeartIcon,
  Bloodtype as BloodtypeIcon,
  Thermostat as ThermostatIcon,
  Scale as ScaleIcon,
  Speed as SpeedIcon
} from '@mui/icons-material'

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchData(
    'dashboard-data',
    `${BASE_URL}${apiEndPoints.getDashboard}`,
    {},
    { Authorization: `Bearer ${Cookies.get("token")}` },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <Box className='!my-5 flex items-center justify-center gap-4'>
        <CircularProgress /> 
        <Typography>Loading your health data...</Typography>
      </Box>
    );
  }

  const dashboardData = data?.data || {};

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
        HealthMate Dashboard
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/upload-report')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Upload Report</Typography>
              <Typography variant="body2" color="text.secondary">
                Upload medical reports and get AI analysis
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/add-vitals')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Add Vitals</Typography>
              <Typography variant="body2" color="text.secondary">
                Manually add blood pressure, sugar, weight
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/timeline')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <TimelineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Health Timeline</Typography>
              <Typography variant="body2" color="text.secondary">
                View all your health data chronologically
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <AssessmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Profile</Typography>
              <Typography variant="body2" color="text.secondary">
                Update your health profile and preferences
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Health Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <HospitalIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {dashboardData.recentFiles?.length || 0}
              </Typography>
              <Typography variant="body2">
                Medical Reports
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.light', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AnalyticsIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {dashboardData.recentVitals?.length || 0}
              </Typography>
              <Typography variant="body2">
                Vitals Recorded
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.light', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {dashboardData.vitalsSummary?.length || 0}
              </Typography>
              <Typography variant="body2">
                Health Metrics
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.light', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <HealthIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" gutterBottom>
                {dashboardData.recentFiles?.filter(f => f.isProcessed).length || 0}
              </Typography>
              <Typography variant="body2">
                AI Analyzed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <AssessmentIcon sx={{ mr: 1 }} />
                Recent Reports
              </Typography>
              {dashboardData.recentFiles?.length > 0 ? (
                dashboardData.recentFiles.map((file, index) => (
                  <Box key={index} sx={{ 
                    p: 2, 
                    mb: 1, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' }
                  }} onClick={() => navigate(`/report/${file._id}`)}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          {file.originalName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {file.reportType.replace(/_/g, ' ').toUpperCase()} • {new Date(file.reportDate).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {file.isProcessed ? (
                            <Chip 
                              label="AI Analysis Complete" 
                              color="success" 
                              size="small" 
                              icon={<CheckCircleIcon />}
                            />
                          ) : file.processingError ? (
                            <Chip 
                              label="Analysis Failed" 
                              color="error" 
                              size="small" 
                              icon={<WarningIcon />}
                            />
                          ) : (
                            <Chip 
                              label="Processing..." 
                              color="warning" 
                              size="small" 
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary" gutterBottom>
                    No reports uploaded yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<UploadIcon />}
                    onClick={() => navigate('/upload-report')}
                    size="small"
                  >
                    Upload First Report
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Vitals */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ mr: 1 }} />
                Recent Vitals
              </Typography>
              {dashboardData.recentVitals?.length > 0 ? (
                dashboardData.recentVitals.slice(0, 5).map((vital, index) => (
                  <Box key={index} sx={{ 
                    p: 2, 
                    mb: 1, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          {vital.vitalType.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {vital.value} {vital.unit}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(vital.readingDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip 
                        label={vital.status?.toUpperCase() || 'NORMAL'} 
                        color={
                          vital.status === 'normal' ? 'success' : 
                          vital.status === 'high' || vital.status === 'low' ? 'warning' : 
                          'error'
                        }
                        size="small"
                      />
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <AddIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary" gutterBottom>
                    No vitals recorded yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/add-vitals')}
                    size="small"
                  >
                    Add First Vital
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Health Insights & Analytics */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Health Trends Visualization */}
        {dashboardData.vitalsSummary?.length > 0 && (
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  Health Trends Overview
                </Typography>
                <Grid container spacing={2}>
                  {dashboardData.vitalsSummary.map((vital, index) => {
                    const getVitalIcon = (vitalType) => {
                      switch (vitalType) {
                        case 'blood_pressure': return <MonitorHeartIcon />;
                        case 'blood_sugar': return <BloodtypeIcon />;
                        case 'weight': return <ScaleIcon />;
                        case 'height': return <ScaleIcon />;
                        case 'temperature': return <ThermostatIcon />;
                        case 'heart_rate': return <FavoriteIcon />;
                        case 'oxygen_saturation': return <SpeedIcon />;
                        case 'cholesterol': return <BloodtypeIcon />;
                        default: return <AssessmentIcon />;
                      }
                    };

                    const getVitalColor = (vitalType, value) => {
                      // Simple health status logic
                      if (vitalType === 'blood_pressure') {
                        const [systolic, diastolic] = value.split('/').map(Number);
                        if (systolic > 140 || diastolic > 90) return 'error';
                        if (systolic > 120 || diastolic > 80) return 'warning';
                        return 'success';
                      }
                      if (vitalType === 'blood_sugar') {
                        const sugar = parseFloat(value);
                        if (sugar > 140) return 'error';
                        if (sugar > 100) return 'warning';
                        return 'success';
                      }
                      return 'primary';
                    };

                    return (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper 
                          elevation={1} 
                          sx={{ 
                            p: 2, 
                            textAlign: 'center',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': { 
                              boxShadow: 2,
                              transform: 'translateY(-2px)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: getVitalColor(vital._id, vital.latestValue) + '.light',
                              color: getVitalColor(vital._id, vital.latestValue) + '.main',
                              mx: 'auto',
                              mb: 1
                            }}
                          >
                            {getVitalIcon(vital._id)}
                          </Avatar>
                          <Typography variant="subtitle2" gutterBottom color="text.secondary">
                            {vital._id.replace(/_/g, ' ').toUpperCase()}
                          </Typography>
                          <Typography 
                            variant="h5" 
                            color={getVitalColor(vital._id, vital.latestValue) + '.main'} 
                            gutterBottom
                            sx={{ fontWeight: 'bold' }}
                          >
                            {vital.latestValue} 
                            {vital._id === 'blood_pressure' ? ' mmHg' : 
                             vital._id === 'blood_sugar' ? ' mg/dL' :
                             vital._id === 'weight' ? ' kg' :
                             vital._id === 'height' ? ' cm' :
                             vital._id === 'temperature' ? '°F' :
                             vital._id === 'heart_rate' ? ' bpm' :
                             vital._id === 'oxygen_saturation' ? '%' :
                             vital._id === 'cholesterol' ? ' mg/dL' : ''}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Latest: {new Date(vital.latestDate).toLocaleDateString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Total readings: {vital.count}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Quick Health Tips */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <HealthIcon sx={{ mr: 1 }} />
                Health Tips
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.light' }}>
                      <CheckCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Regular Monitoring"
                    secondary="Track your vitals consistently for better health insights"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.light' }}>
                      <UploadIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Upload Reports"
                    secondary="Get AI-powered analysis of your medical reports"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.light' }}>
                      <TimelineIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="View Timeline"
                    secondary="See your health journey over time"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <AssessmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary="Stay Informed"
                    secondary="Keep your health profile updated for better insights"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;