import React from "react";
import {Box,List,Grid, Paper,Typography, Button, Stack,Avatar} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Router } from 'next/router';

import Link from 'next/link';


const Dashboard = () => { 
    const [ user ] = useAuthState( authHandle );
    console.log(user)
    if ( user == null ) { 
        return (
            <Box>
                <h1>Please login first</h1>
            </Box>
        );
    }
    console.log( user.uid );
    // const user = {name:"Dharshita"}
    const exams = [{
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023).substring(0,15),
                    end: Date(1-7-2023).substring(0,15),
                },
                {
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023).substring(0,15),
                    end: Date(1-7-2023).substring(0,15),
                },
                {
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023).substring(0,15),
                    end: Date(1-7-2023).substring(0,15),
                },
        ];



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
            <a href="/faculty/profile">
            <Avatar alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Charles-Leclerc.jpg/330px-Charles-Leclerc.jpg" />
            </a>
            </Grid>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "5"} }>
            <h1>Hello! {user.name}</h1>
            <Stack spacing={3} direction="row">
            <Link
                href={{
                    pathname: '/faculty/myschedule',
                    query: user 
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
                    key={value.name}
                    disableGutters
                    >
                        <Link
                href={{
                    pathname: '/faculty/slotselection',
                    query: value 
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                        <strong>{value.name}</strong>
                        <Typography>{value.desc}</Typography>
                        <Typography>Strat Date: {value.start}</Typography>
                        <Typography>End Date: {value.end}</Typography>
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
