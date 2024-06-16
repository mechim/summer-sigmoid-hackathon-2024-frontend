import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';

export default function MyTinderCard({type, title, image, text, prefs}) {
  return (
    type != 'prefs'? 
    <Card sx={{ width:300, height: 400, borderRadius: 3, backgroundColor: 'lightgray'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
   :
  <Card sx={{ width:300, height: 400, borderRadius: 3, backgroundColor: 'lightgray'}}>

  <CardActionArea>
    
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        
        What is more important? <b>{prefs[0]}</b> or <b>{prefs[1]}</b>
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {text}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>
  );
}