import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button, Rating } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function MyTinderCard({ type, title, image, text, prefs }) {
  return (
    type != 'prefs' ?
      <Card sx={{ width: 300, height: 450, borderRadius: 3, backgroundColor: '#ffdee7' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="320"
            // sx={{transform: 'scale(1.25)'}}
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{color: "#000",
          fontFamily: "Brush Script MT, cursive",}}>
              <b>{title}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
              <b style={{color:"#000"}}>{text[0]} : </b> <Rating
                value={text[1] / 2}
                readOnly
                precision={0.1}
                icon={<StarIcon fontSize="small" style={{color:'#000'}}/>}
                emptyIcon={<StarBorderIcon fontSize="small" style={{color:'#000'}} />}
              // style={{marginBottom: }}
              />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      :
      <Card sx={{
        width: 300,
        height: 400,
        borderRadius: 3,
        backgroundColor: "#ffdee7",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>

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