export const BASE_URL = `https://smit-hackathon-backend-sable.vercel.app/api`;
// export const BASE_URL = `http://localhost:5000/api`;
const apiEndPoints = {
    // Auth endpoints
    login: "/auth/login",
    signup: "/auth/signup",
    me: "/auth/me",
    verifyOTP: "/auth/otp-verify",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    
    // Health endpoints
    uploadReport: "/health/upload-report",
    addVitals: "/health/add-vitals",
    getTimeline: "/health/timeline",
    getFileInsights: "/health/file",
    getDashboard: "/health/dashboard",
    updateProfile: "/health/profile",
    
    // Legacy
    uploadImg: "/image/upload"
}

export default apiEndPoints;