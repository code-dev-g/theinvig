import { React,useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {Box,Grid, Paper,Typography, Button, Stack, TextField} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

export default function schedule() {
    const [user] = useAuthState(authHandle);

    const [formData, setFormData] = useState({
        "id": "64887c8fe35d9dbd54c0ed9e",
        "facultyName": "testfaculty1",
        "facultyEmail": "testfaculty1@gmail.com",
        "facultyImageURL": "https://st3.depositphotos.com/1011434/13157/i/600/depositphotos_131572502-stock-photo-happy-woman-smiling.jpg",
        "facultyPhoneNumber": "1234567890",
        "department": "XYZ",
        "designation": "Professor",
        "group": 1,
        "invigilationHours": 0
      });
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Reset form data
            setFormData({
                facultyName: '',
                facultyEmail: '',
            });
            console.log('Resource created successfully.');
          } else {
            // Handle non-successful response
            conso('Failed to create resource.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

    if (user == null) {
      return (
        <Box>
          <h1>Please login first</h1>
        </Box>
      );
      }

    return (
        <Box sx={{width: "200vh"}}>
            <h1>Add Faculty</h1>
            <Grid container spacing={3}>
            <form onSubmit={handleSubmit}>
            <Grid item xs={12} component={Paper} spacing={2} style={ {display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15"}}>
                <Stack direction={'column'} style={{margin: 25,width: 1500}}>
                <Typography gutterBottom variant="h6" component="div">
                    Name:  <TextField type="text" name="name" value={formData.facultyName} onChange={handleChange} />
                </Typography>
                
                <Typography gutterBottom variant="h6" component="div">
                    Email:  <TextField type="email" name="email" value={formData.facultyEmail} onChange={handleChange} />
                </Typography>
                </Stack>
            
            </Grid>
            <Grid item rowspacing={2} style={ {display: "flex", flexDirection: "row", alignItems: "end", marginBottom: "15"}}>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={ { margin: "18px"}}
                    >Add</Button>
            </Grid>
            </form>
            </Grid>
            
        </Box>
    );
};