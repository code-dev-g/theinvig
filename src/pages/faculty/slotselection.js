import { React } from "react";
import { useRouter } from 'next/router'
import {Box,Grid, Paper,Typography, Button, Stack,List} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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

    const subjects = [
        {
            name: "Maths",
            code: "19CSE123",
            date: Date().substring(0,15),
            time: Date().substring(16),
        },
        {
            name: "Maths",
            code: "19CSE123",
            date: Date().substring(0,15),
            time: Date().substring(16),
        },
        {
            name: "Maths",
            code: "19CSE123",
            date: Date().substring(0,15),
            time: Date().substring(16),
        },
    ];

    function yes(code) {
        console.log("yes for ",{code});
    }

    function no(code) {
        console.log("yes for ",{code});
    }

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Slot Selection</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ {paddingBottom: "20px", display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>{data.name}<br/>{data.desc}</h2>
            <Stack spacing={15} direction="row" >
                <Stack>
                    <Typography variant="caption">Number of subjects</Typography>
                    <Typography variant="h6">10</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">Start Date</Typography>
                    <Typography variant="h6">{data.start}</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">End Date</Typography>
                    <Typography variant="h6">{data.end}</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">Minimum Required</Typography>
                    <Typography variant="h6">20</Typography>
                </Stack>
                
                <Button
                        type="button"
                        href="faculty/myschedule"
                        variant="contained"
                        color="secondary"
                        style={ { marginBottom: "18px"}}
                        
                    >
                        Download
                    </Button>
                <Button
                        type="button"
                        href="faculty/myexams"
                        variant="contained"
                        color="secondary"
                        style={ { marginBottom: "18px"}}
                    >
                        Submit
                    </Button>
                </Stack>
            </Grid>
            <Grid item></Grid>
            <Grid item xs={12} component={Paper} sx={{paddingBottom: "20px",width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginBottom: "180px" }}>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {subjects.map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >
                    <ListItemText>
                        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
                        <Grid>
                        <strong>{value.name}</strong>
                        <Typography>{value.code}</Typography>
                        <Typography>Date: {value.date}</Typography>
                        <Typography>Time: {value.time}</Typography>
                        </Grid>
                        <Grid>
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                style={{marginBottom:"18px"}}
                            >
                                Yes
                            </Button>
                        <br></br>

                         <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                        >
                            No
                        </Button>
                        </Grid>
                        </Stack>
                        <hr width={1500}/>
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