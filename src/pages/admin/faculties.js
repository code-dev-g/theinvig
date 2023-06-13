import { React,useState,useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,Grid,Paper,Typography, Button, Stack,List,TextField, Avatar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Link from 'next/link';

export default function schedule() {
    const [user] = useAuthState(authHandle);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const callAPI = async () => {
        try {
          const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/`, {
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
    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Faculties</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} sx={{paddingBottom: "20px",width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginBottom: "180px" }}>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {data.map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >

                    <ListItemText>
                        <Avatar src={`${value.facultyImageURL}`}></Avatar>
                        <strong>{value.facultyName}</strong>
                        <Typography>{value.facultyEmail}</Typography>
                        <Typography>{value.facultyPhoneNumber}</Typography>
                        <Typography>{value.department}</Typography>
                    </ListItemText>
                    
                    </ListItem>
                ))}
                </List>
            </Grid>
            <Grid item rowSpacing={45}><Grid item></Grid></Grid>
            </Grid>
        </Box>
    );
};