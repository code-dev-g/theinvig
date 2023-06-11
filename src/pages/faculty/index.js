import React from "react";
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { BorderLeft } from "@mui/icons-material";

const Dashboard = () => { 
    //const [ user ] = useAuthState( authHandle );
    // console.log(user)
    // if ( user == null ) { 
    //     return (
    //         <Box>
    //             <h1>Please login first</h1>
    //         </Box>
    //     );
    // }
    // console.log( user.uid );
    const user = {name:"Dharshita"}
    const exams = [{
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023),
                    end: Date(1-7-2023),
                },
                {
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023),
                    end: Date(1-7-2023),
                },
                {
                    name: "Midterm",
                    desc: "This is a midterm exam",
                    start:  Date(10-6-2023),
                    end: Date(1-7-2023),
                },
        ];

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Faculty Dashboard</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "5"} }>
            <h1>Hello! {user.name}</h1>
            <Stack spacing={3} direction="row">
                <Button
                        type="button"
                        href="faculty/myschedule"
                        variant="contained"
                        color="primary"
                        style={ { marginBottom: "18px"}}
                    >
                        View My Schedule
                    </Button>
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
                    <ListItemText>
                        <Grid>
                        <strong>{value.name}</strong>
                        <Typography>{value.desc}</Typography>
                        <Typography>Strat Date: {value.start}</Typography>
                        <Typography>End Date: {value.end}</Typography>
                        </Grid>
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

export default Dashboard;
