import { React, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import Link from "next/link"
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
  const [user] = useAuthState(authHandle);
  const [exams, setExams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/`, {
          method: 'GET',
        });
        const responseExam = await exam.json();
        setExams(responseExam);
        console.log("exams: ",responseExam);
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

  if (!exams) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }


    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Exam List</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "green"}}>Current Exam</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.filter((value)=>{
                    return (Date.parse(value.startDate) < Date.now()) && (Date.parse(value.endDate) > Date.now());
                }).map((value) => (
                    <ListItem
                    key={value.id}
                    disableGutters
                    >
                    <Link
                href={{
                    pathname: '/faculty/viewexam',
                    query: value 
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                    <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Strat Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                        <Typography>Deadline: {value.deadline}</Typography>
                    </ListItemText>
                    </a></Link>
                    </ListItem>
                ))}
                </List>
            </Grid>
            </Grid>
            <Grid item rowSpacing={45}></Grid>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "red"}}>Upcomming Exam</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.filter((value)=>{
                    return (Date.parse(value.startDate) > Date.now()) && (Date.parse(value.endDate) > Date.now());
                }).map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >
                    <Link
                href={{
                    pathname: '/faculty/viewexam',
                    query: value 
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                    <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Strat Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                        <Typography>Deadline: {value.deadline}</Typography>
                    </ListItemText>
                    </a></Link>
                    </ListItem>
                ))}
                </List>
            </Grid>
            </Grid>
            <Grid item rowSpacing={45}></Grid>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "blue"}}>Past Exam</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.filter((value)=>{
                    return (Date.parse(value.startDate) < Date.now()) && (Date.parse(value.endDate) < Date.now());
                }).map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    ><Link
                href={{
                    pathname: '/faculty/viewexam',
                    query: value
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                    <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Strat Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                        <Typography>Deadline: {value.deadline}</Typography>
                    </ListItemText>
                    </a></Link>
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