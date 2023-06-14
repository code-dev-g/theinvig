import { React,useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {Box,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { deleteUser } from "firebase/auth";

export default function schedule() {
    const router = useRouter();
    const id = router.query;
    const [user] = useAuthState(authHandle);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    console.log(id)
    useEffect(() => {
      const callAPI = async () => {
        try {
            const email = await id.email.replace('@', '%40');
            console.log(email)
            const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/?facultyEmail=${email}`, {
            method: 'GET',
          });
          const responseData = await res.json();
          setData(responseData);
        } catch (err) {
          setError(err);
        }
      };
  
      if (user) {
        callAPI();
      }
    }, [user]);
  
    if (user == null) {
      return (
        <Box>
          <h1>Please login first</h1>
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box>
          <h1>Caught an error: {error.message}</h1>
        </Box>
      );
    }
  
    if (!data) {
      return (
        <Box>
          <h1>Loading...</h1>
        </Box>
      );
    }

    const deleteFaculty = async () => { //not working
        try {
            const email = data.facultyEmail.replace('@', '%40');
            const response = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/${email}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              router.push('/admin/faculties')
            } else {
              // Handle non-successful response
              console.error('Failed to delete resource.');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
    };
    
    const editFaculty = async () => {
        //edit please do edit
    }

    return (
        <Box sx={{width: "200vh"}}>
            <h1>Faculty Details</h1>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                
            </Grid>
            <Grid item xs={12} style={ {display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15"}}>
            <img
                height="300px"
                width={'auto'}
                src={`${data.facultyImageURL}`}
                alt={data.facultyName}
                />
                <Typography gutterBottom variant="h5" component="div">
                    {data.facultyName}
                </Typography>
            </Grid>
            <Grid item xs={12} component={Paper} spacing={2} style={ {display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "15"}}>
            <Stack direction={'row'} justifyContent={'space-around'}>
                <Stack direction={'column'} style={{margin: 25}}>
                <Typography gutterBottom variant="h6" component="div">
                    Email: 
                <Typography component="div">
                    {data.facultyEmail}
                </Typography>
                </Typography>
                
                <Typography gutterBottom variant="h6" component="div">
                    Phone: 
                <Typography component="div">
                    {data.facultyPhoneNumber}
                </Typography>
                </Typography>
                </Stack>
                <Stack direction={'column'} style={{margin: 25}}>
                <Typography gutterBottom variant="h6" component="div">
                    Department: 
                <Typography component="div">
                    {data.department}
                </Typography>
                </Typography>
                
                <Typography gutterBottom variant="h6" component="div">
                    Designation: 
                <Typography component="div">
                    {data.designation}
                </Typography>
                </Typography>
                </Stack>
                <Stack direction={'column'} style={{margin: 25}}>
                <Typography gutterBottom variant="h6" component="div">
                    Group: 
                <Typography component="div">
                    {data.group}
                </Typography>
                </Typography>
                
                <Typography gutterBottom variant="h6" component="div">
                    Invigilation Hours: 
                <Typography component="div">
                    {data.invigilationHours}
                </Typography>
                </Typography>
                </Stack>
                </Stack>
            
            </Grid>
            <Grid item rowspacing={2} style={ {display: "flex", flexDirection: "row", alignItems: "end", marginBottom: "15"}}>
                        <Button
                        type="button"
                        onClick={deleteFaculty}
                        variant="contained"
                        color="primary"
                        style={ { margin: "18px"}}
                    >Delete</Button>
                        <Button
                        type="button"
                        onClick={editFaculty}
                        variant="contained"
                        color="primary"
                        style={ { margin : "18px"}}
                    >Edit</Button>
                    
            </Grid>
            </Grid>
        </Box>
    );
};