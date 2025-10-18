// export const BASE_URL = `https://smit-hackathon-backend-sable.vercel.app/api`;
export const BASE_URL = `http://localhost:5000/api`;
const apiEndPoints = {
    login: "/auth/login",
    signup: "/auth/signup",
    me: "/auth/me",
    verifyOTP: "/auth/otp-verify",
    uploadImg: "/image/upload"
}

export default apiEndPoints;