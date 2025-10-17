import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from './Button';

export default function Cards({children, title = 'Hello guys', description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, ill', onClick = ()=>{} }) {
  return (
    <Card onClick={onClick} sx={{ maxWidth: 345, m: 3, cursor: 'pointer' }}>      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography >
          {description}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
