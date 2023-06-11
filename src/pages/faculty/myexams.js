import { React } from "react";
import { useRouter } from 'next/router'
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
    const router = useRouter();
    const data = router.query;
    
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
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Exam List</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "green"}}>Current Exam</h2>
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
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "red"}}>Upcomming Exam</h2>
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
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", marginBottom: "5"}}>
            <h2 style={{color: "blue"}}>Past Exam</h2>
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