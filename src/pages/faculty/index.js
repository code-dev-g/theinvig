import {React,useState,useEffect} from "react";
import {Box,List,Grid, Paper,Typography, Button, Stack,Avatar} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Router } from 'next/router';

import Link from 'next/link';


const Dashboard = () => { 
    const [user] = useAuthState(authHandle);
  const [data, setData] = useState(null);
  const [exams, setExams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const email = user.email.replace('@', '%40');
        const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/?facultyEmail=${email}`, {
          method: 'GET',
        });
        const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/`, {
          method: 'GET',
        });
        const responseData = await res.json();
        setData(responseData);
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

  if (!data || !exams) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }

    return (
        <Box sx={{width: "200vh"}}>
            <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
            <Grid item>
                <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Faculty Dashboard</Typography>
            </Grid>
            <Grid item>
            <a href="/admin/profile">
            <Avatar alt="Remy Sharp" src={`${data.facultyImageURL}`} />
            </a>
            </Grid>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "5"} }>
            <h1>Hello! {data.facultyName}</h1>
            <Stack spacing={3} direction="row">
            <Link
                href={{
                    pathname: '/faculty/myschedule',
                    query: {id: user.email} ,
                }}
                >
                <a><Button
                        type="button"
                        href="faculty/myschedule"
                        variant="contained"
                        color="primary"
                        style={ { marginBottom: "18px"}}
                        
                    >
                        View My Schedule
                    </Button></a></Link>
                <Button
                        type="button"
                        href="faculty/myexams"
                        variant="contained"
                        color="primary"
                        style={ { marginBottom: "18px"}}
                    >
                        View Exams
                    </Button>
                </Stack>
            </Grid>
            <Grid item rowSpacing={45}></Grid>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>Responses Pending</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.map((value) => (
                    <ListItem
                    key={value.id}
                    disableGutters
                    >
                        <Link
                href={{
                    pathname: '/faculty/slotselection',
                    query: {id: value.id}
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                        <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Strat Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                        <hr></hr>
                    </ListItemText>
                    </a>
                    </Link>
                    
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

export default Dashboard;
