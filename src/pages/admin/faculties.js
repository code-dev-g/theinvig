import { React,useState } from "react";
import { useRouter } from 'next/router'
import {Box,Grid,Paper,Typography, Button, Stack,List,TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Link from 'next/link';

export default function schedule() {
    const router = useRouter();
    const data = router.query;
    
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
    const [value, setValue] = useState('');

    const handleClick = () => {
      console.log(value);
    };
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const faculties = [
        {
            name: "Dharshita",
            email: "dharshita@topper.com",
        },
        {
            name: "Dharshita",
            email: "dharshita@topper.com",
        },
        {
            name: "Dharshita",
            email: "dharshita@topper.com",
        },
        {
            name: "Dharshita",
            email: "dharshita@topper.com",
        },
    ];

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Faculties</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ {paddingBottom: "20px", display: "flex", flexDirection: "row", alignItems: "baseline", marginBottom: "5"}}>
            <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
                    <Grid item >
                        
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center">

                    <Grid item>
                    <TextField
                    id="filled-search"
                    value={value} 
                    onChange={handleChange}
                    label="Search field"
                    type="search"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item>
                    <Button variant="contained" onClick={handleClick}>Search</Button>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item sx={{margin: 5}}>
                        <Button variant="contained" onClick={console.log("Add Faculty")}>Add</Button>
                    </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} component={Paper} sx={{paddingBottom: "20px",width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginBottom: "180px" }}>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {faculties.map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >
                        <Link
                href={{
                    pathname: '/admin/facultydetails',
                    query: value 
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                    <ListItemText>
                        <strong>{value.name}</strong>
                        <Typography>{value.email}</Typography>
                    </ListItemText>
                    </a>
                    </Link>
                    </ListItem>
                ))}
                </List>
            </Grid>
            <Grid item rowSpacing={45}><Grid item></Grid></Grid>
            </Grid>
        </Box>
    );
};