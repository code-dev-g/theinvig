import { React } from "react";
import { useRouter } from 'next/router'
import {Box,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
    const router = useRouter();
    const data = router.query;
    
    const deletefaculty = () => {
        console.log("Delete",data.name);
      };

    //     const [ user ] = useAuthState( authHandle );
    // console.log(user)
    // if ( user == null ) { 
    //     return (
    //         <Box>
    //             <h1>Please login first</h1>
    //         </Box>
    //     );
    // }
    // console.log( user.uid );
    return (
        <Box sx={{width: "200vh"}}>
            <h1>Faculty Details</h1>
            <Grid container spacing={3}>
            <Grid item xs={12} style={ {display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15"}}>
            <img
                height="300px"
                width={'auto'}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Charles-Leclerc.jpg/330px-Charles-Leclerc.jpg"
                alt={data.name}
                />
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
            </Grid>
            <Grid item xs={12} component={Paper} spacing={2} style={ {display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "15"}}>
            
            <Typography gutterBottom variant="h6" component="div">
                Email: 
            <Typography component="div">
                {data.email}
            </Typography>
            </Typography>
            
            <Typography gutterBottom variant="h6" component="div">
                Email: 
            <Typography component="div">
                {data.email}
            </Typography>
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
                Email: 
            <Typography component="div">
                {data.email}
            </Typography>
            </Typography>

            <Typography gutterBottom variant="h6" component="div">
                Email: 
            <Typography component="div">
                {data.email}
            </Typography>
            </Typography>
            </Grid>
            <Grid item rowspacing={2} style={ {display: "flex", flexDirection: "row", alignItems: "end", marginBottom: "15"}}>
                        <Button
                        type="button"
                        onClick={deletefaculty}
                        variant="contained"
                        color="primary"
                        style={ { marginBottom: "18px"}}
                    >Delete</Button>
            </Grid>
            </Grid>
        </Box>
    );
};