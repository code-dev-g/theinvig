import React from "react";
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
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
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Admin Dashboard</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "5"} }>
            <h1>Hello! {user.displayName}</h1>
            <Stack spacing={15} style={{marginBottom: '18px'}} direction="row" >
                <Stack>
                <Typography variant="h6">20</Typography>
                <Typography variant="caption">Total Faculties</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">16</Typography>
                <Typography variant="caption">Schedules</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">10</Typography>
                <Typography variant="caption">Generated</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">4</Typography>
                <Typography variant="caption">Pending</Typography>
                </Stack>
            </Stack>
            <Stack spacing={3} direction="row">
            <Link
                href={{
                    pathname: "admin/faculties",
                    query: user 
                }}
                >
                <a><Button
                        type="button"
                        href="admin/faculties"
                        variant="contained"
                        color="primary"
                        style={ { marginBottom: "18px"}}
                        
                    >
                        View Faculty
                    </Button></a></Link>
                
                    <Link
                    href={{
                        pathname: "admin/newexam",
                        query: user 
                    }}
                    >
                    <a><Button
                            type="button"
                            href="admin/newexam"
                            variant="contained"
                            color="primary"
                            style={ { marginBottom: "18px"}}
                            
                        >
                            Upload Time Table
                        </Button></a></Link>
                </Stack>
            </Grid>
            <Grid item rowSpacing={45}></Grid>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>Schedules</h2>
            <Grid>
            <Stack></Stack>
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
