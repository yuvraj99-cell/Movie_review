import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useState } from 'react';

const Product = ({_id,title,setId,thumbnail,director,releasedDate,artist,rating,review, handleClick, handleClose, userName,handleOpen, handleReviewClose, handleReviewOpen}) => {

 




function handleRating(){
    
 
if(userName){
  setId(_id)
  handleReviewOpen(_id)


}else{

  handleOpen();
}
}
  


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (  <>
    <Item>




<Card  >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={thumbnail}
          alt="movie img"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Card style={{'width':'80%', "textAlign":'left',}}>
          <Typography gutterBottom variant="body1" component="div">
          Movie Name:-<span> {title}</span>
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
          Date:- <span>{releasedDate}</span>
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Actors:- <span>{artist}</span>
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Director:- <span>{director}</span>
          </Typography>
          <div onClick={handleRating}>
          <Typography   gutterBottom variant="body1" component="div">
            Rating:-<span> {rating}/5 {rating==0 ? '' : rating==1 ? '⭐' : rating==2 ? '⭐ ⭐' : rating==3 ? '⭐ ⭐ ⭐' :  rating==4 ? '⭐ ⭐ ⭐ ⭐' :    rating==5 ? '⭐ ⭐ ⭐ ⭐ ⭐': ' '  }</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
           Review:- <span>{review}</span>
           
          </Typography>
          </div>  
          </Card>
        </CardContent>
      </CardActionArea>
    </Card>
     
    </Item>

   
    </>
  );
};

export default Product;
