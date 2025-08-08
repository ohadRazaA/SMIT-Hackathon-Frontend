import React from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from "js-cookie"

const Dashboard = () => {
  const [logoImage, setLogoImage] = React.useState();
  const uploadImg = async () => {
    if (logoImage) {
      const formData = new FormData()
      formData.append("image", logoImage)
      const imageRes = await axios.post("http://localhost:5000/hello", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      });
      console.log(imageRes);
    }
  }

  return (
    <div>
      <Button variant="outlined" component="label">
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          name="logo"
          onChange={(e) => setLogoImage(e.target.files[0])}
        />
      </Button>
      <button onClick={uploadImg}>Add Image</button>
    </div>
  )
}

export default Dashboard