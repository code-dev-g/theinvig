import { React, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
    const [user] = useAuthState(authHandle);
    const [data, setData] = useState(null);
    const [exams, setExams] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const id = router.query;
  
    useEffect(() => {
      const callAPI = async () => {
        try {
          const email = user.email.replace('@', '%40');
          const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/admin/?adminEmail=${email}`, {
            method: 'GET',
          });
          const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/?examID=${id}`, {
            method: 'GET',
          });
          const responseData = await res.json();
          setData(responseData);
          const responseExam = await exam.json();
          setExams(responseExam);
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
  
    if (!data || !exams) {
      return (
        <Box>
          <h1>Loading...</h1>
        </Box>
      );
    }
  

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Exam Schedule</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>Upcomming Exams</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >
                    <ListItemText>
                        <strong>{value.name}</strong>
                        <Typography>{value.desc}</Typography>
                        <Typography>Strat Date: {value.start}</Typography>
                        <Typography>End Date: {value.end}</Typography>
                    </ListItemText>
                    </ListItem>
                ))}
                </List>
            </Grid>
            </Grid>
            <Grid item rowSpacing={45}></Grid>
            </Grid>
        </Box>
    );
};