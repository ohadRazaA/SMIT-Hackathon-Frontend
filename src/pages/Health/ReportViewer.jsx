import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Language as LanguageIcon,
  Assessment as AssessmentIcon,
  Medication as MedicationIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useFetchData } from '../../hooks/useFetchData';
import apiEndPoints, { BASE_URL } from '../../constants/apiEndpoints';
import Cookies from 'js-cookie';

const ReportViewer = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [language, setLanguage] = useState('english');

  const { data, isLoading, error } = useFetchData(
    `file-insights-${fileId}`,
    `${BASE_URL}${apiEndPoints.getFileInsights}/${fileId}`,
    {},
    { Authorization: `Bearer ${Cookies.get('token')}` },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'urdu' : 'english');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading report...</Typography>
      </Box>
    );
  }

  if (error || !data?.data) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load report. Please try again.
        </Alert>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const file = data.data;
  const insights = file.aiInsightId;

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'success';
      case 'high': return 'error';
      case 'low': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircleIcon />;
      case 'high':
      case 'low':
      case 'critical': return <WarningIcon />;
      default: return <AssessmentIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {file.originalName}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip 
              label={file.reportType.replace(/_/g, ' ').toUpperCase()} 
              color="primary" 
            />
            <Chip 
              label={new Date(file.reportDate).toLocaleDateString()} 
              variant="outlined" 
            />
            {file.isProcessed && (
              <Chip 
                label="AI Analyzed" 
                color="success" 
              />
            )}
          </Box>
        </Box>
        {insights && (
          <Button
            startIcon={<LanguageIcon />}
            onClick={toggleLanguage}
            variant="outlined"
          >
            {language === 'english' ? 'اردو' : 'English'}
          </Button>
        )}
      </Box>

      {/* File Preview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Report Preview
          </Typography>
          {file.fileType === 'pdf' ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                PDF Document
              </Typography>
              <Button 
                variant="contained" 
                href={file.fileUrl} 
                target="_blank"
                sx={{ mt: 2 }}
              >
                View PDF
              </Button>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <img 
                src={file.fileUrl} 
                alt="Report" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '500px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Tabs */}
      {insights ? (
        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Summary" />
              <Tab label="Vitals" />
              <Tab label="Medications" />
              <Tab label="Recommendations" />
            </Tabs>
          </Box>

          <CardContent>
            {/* Summary Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  AI Summary ({language === 'english' ? 'English' : 'اردو'})
                </Typography>
                <Typography variant="body1" paragraph>
                  {language === 'english' ? insights.englishSummary : insights.urduSummary}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Confidence: {(insights.confidence * 100).toFixed(1)}%
                </Typography>
              </Box>
            )}

            {/* Vitals Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Extracted Vitals
                </Typography>
                {insights.extractedData?.vitals?.length > 0 ? (
                  <Grid container spacing={2}>
                    {insights.extractedData.vitals.map((vital, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined">
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {getStatusIcon(vital.status)}
                              <Typography variant="h6" sx={{ ml: 1 }}>
                                {vital.name}
                              </Typography>
                            </Box>
                            <Typography variant="h4" color="primary.main" gutterBottom>
                              {vital.value} {vital.unit}
                            </Typography>
                            <Chip 
                              label={vital.status.toUpperCase()} 
                              color={getStatusColor(vital.status)}
                              size="small"
                            />
                            {vital.normalRange && (
                              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                Normal: {vital.normalRange}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography color="text.secondary">
                    No vitals extracted from this report
                  </Typography>
                )}
              </Box>
            )}

            {/* Medications Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Medications
                </Typography>
                {insights.extractedData?.medications?.length > 0 ? (
                  <List>
                    {insights.extractedData.medications.map((med, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <MedicationIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={med.name}
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                Dosage: {med.dosage}
                              </Typography>
                              <Typography variant="body2">
                                Frequency: {med.frequency}
                              </Typography>
                              {med.duration && (
                                <Typography variant="body2">
                                  Duration: {med.duration}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="text.secondary">
                    No medications found in this report
                  </Typography>
                )}
              </Box>
            )}

            {/* Recommendations Tab */}
            {activeTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Recommendations & Concerns
                </Typography>
                
                {insights.extractedData?.recommendations?.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom color="success.main">
                      Recommendations:
                    </Typography>
                    <List>
                      {insights.extractedData.recommendations.map((rec, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" />
                          </ListItemIcon>
                          <ListItemText primary={rec} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {insights.extractedData?.concerns?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom color="warning.main">
                      Concerns:
                    </Typography>
                    <List>
                      {insights.extractedData.concerns.map((concern, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <WarningIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText primary={concern} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {(!insights.extractedData?.recommendations?.length && 
                  !insights.extractedData?.concerns?.length) && (
                  <Typography color="text.secondary">
                    No specific recommendations or concerns identified
                  </Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      ) : file.processingError ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <WarningIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom color="error.main">
              AI Analysis Failed
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {file.processingError}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please try uploading the report again or contact support if the issue persists.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              AI Analysis in Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your report is being analyzed. This may take a few minutes.
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
              Please refresh the page in a few minutes to see the results.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ReportViewer;
