import "./App.css";
import Product from "./Product";
import { Container, Box } from "@mui/system";
import { Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import  api  from "./Api_url";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));
const ProductList = () => {
  const [id,setId]=useState('')
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const handleReviewOpen = () => setReviewOpen(true);
  const handleReviewClose = () => setReviewOpen(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[userName,setUserName]=useState("");
  const[rating,setRating]=useState("");
  const[review,setReview]=useState("");

 

  const classes = useStyles();



  const getProducts = async () => {
    const res = await axios.get("/products");
    console.log(res.data);
    setProducts(res.data);
  };

  const handleClick = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    console.log(res.data);
    if (res.data._id) {
      setProducts(products.filter((p) => p._id !== res.data._id));
    }
  
  };
 
function handleLogin(){
  handleClose()
  handleLoginOpen();

}


  const handleSubmit = (e) => {
    e.preventDefault();
   
    try {
     axios.post(`${api}/users/signUp`,{
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
   
      alert('Sign-Up Successful')
    } catch (error) {
     alert('Please fill right credentials')
    }
   
    handleClose();
    handleLoginOpen();
  };


 function handleReview(e){
  e.preventDefault();
   
  try {
   axios.patch(`${api}/products/review/${id}`,{
      rating: rating,
      review: review
    })
 
    alert('Data has been updated')
  } catch (error) {
   alert('Please fill valid credentials')
  }
 
  handleReviewClose();
  getProducts();
 
 }

  const handleUserLogin =async (e) => {
    e.preventDefault();
   
    try {
    const UserDetails= axios.post(`${api}/users/logIn`,{
        email: email,
        password: password
      })
      const userData= await UserDetails;
     setUserName(userData?.data[0]?.firstName+ ' ' +userData?.data[0]?.lastName) 
    console.log(userData,'hello');
     alert('Log-In Successful')
    } catch (error) {
      alert('Invalid-User')
    }
   
    handleLoginClose();
   // handleReviewOpen()
  };

  useEffect(() => {
    getProducts();
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "5px solid white",
    boxShadow: 24,
    p: 4,
    borderRadius:'12px'
    
  };

  return (
    <>
      <div className="cn">
       <div> 
        <Box
          fontSize="6em"
          color="white"
          borderRadius="15px"
          margin="5px"
          bgcolor="lightblue"
          fontWeight="300"
          display="flex"
          justifyContent="center"
        
        >
          Movies List
        </Box>
        <div  className="userName">
        <span>{userName?`🤵🏻‍♂️ ${userName}`:null}</span>
        </div>
        </div>

        <Container>
          <div>
            
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className={classes.root} onSubmit={handleSubmit}>
                  <TextField
                    label="First Name"
                    variant="filled"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    label="Last Name"
                    variant="filled"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div>
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Signup
                    </Button>
                    
                  </div>
                  <Button onClick={handleLogin} variant="outlined" >
                     Already have an account ?
                    </Button>
                </form>
              </Box>
            </Modal>
          </div>


          <div>
            
            <Modal
              open={loginOpen}
              onClose={handleLoginClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className={classes.root} onSubmit={handleUserLogin}>
                 
                  <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div>
                    <Button variant="contained" onClick={handleLoginClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                    
                  </div>
                  
                </form>
              </Box>
            </Modal>
          </div>


          <div>
            
            <Modal
              open={reviewOpen}
              onClose={handleReviewClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className={classes.root} onSubmit={handleReview}>
                 
                  <TextField
                    label="Rating"
                    variant="filled"
                    type="number"
                    min='0'
                    max='5'
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <TextField
                    label="Review"
                    variant="filled"
                    type="text"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  <div>
                    <Button variant="contained" onClick={handleReviewClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                     Submit
                    </Button>
                    
                  </div>
                  
                </form>
              </Box>
            </Modal>
          </div>

          <Box
            mt="1.5em"
            sx={{
              display: "grid",
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {products.map((product, index) => (
              <Product
                {...product}
                key={index}
                handleClick={handleClick}
                handleOpen={handleOpen}
                handleClose={handleClose}
                handleReviewOpen={handleReviewOpen}
                handleReviewClose={ handleReviewClose}
                userName={userName}
                setId={setId}
               

              ></Product>
            ))}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ProductList;
