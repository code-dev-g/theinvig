import { React,useState,useEffect } from "react";
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
    const [user] = useAuthState(authHandle);
    const [name, setName] = useState('');
    const [dep, setDep] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    var click = false;

    let exam = {name: NaN, dep: NaN, start: NaN,end: NaN};
    const handleClick = () => {
        exam.name = name
        exam.dep = dep
        exam.start = start
        exam.end = end
        click = true;
        return exam
    };
    
    useEffect(() => {
        const callAPI = async () => {
            try {
              const response = await fetch('https://invig-api-m1-2xe7e.ondigitalocean.app/exam/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(exam), // Replace with your payload
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
              } else {
                console.error('Request failed:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Request error:', error);
            }
          };
            
    
        if (click) {
            callAPI();
          }
      }, [exam]);
    
      if (user == null) {
        return (
          <Box>
            <h1>Please login first</h1>
          </Box>
        );
      }
  
    const handleNameChange = (event) => {
        setName(event.target.value);
        exam.name = event.target.value;
    };
    const handleDepChange = (event) => {
        setDep(event.target.value);
        exam.dep = event.target.value
    };
    const handleStartChange = (event) => {
        setStart(event.target.value);
        exam.start = event.target.value
    };
    const handleEndChange = (event) => {
        setEnd(event.target.value);
        exam.end = event.target.value
      };

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Upload Schedule</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ {paddingBottom: "20px", display: "flex", flexDirection: "column", alignItems: "space-between", marginBottom: "5"}}>
                    <Grid container spacing={2}>
                    <Grid item direction="row" justifyContent="space-between" alignItems="center" style={{display: "flex",flexDirection: "row"}}>
                    <Grid container spacing={14} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant={'h5'}>Name: </Typography>
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined"
                    value={name} 
                    onChange={handleNameChange}
                    label="Name"
                    type="outlined"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item direction="row" justifyContent="space-between" alignItems="center" style={{display: "flex",flexDirection: "row"}}>
                    <Grid container spacing={6} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                    <Typography variant={'h5'}>Department: </Typography>
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined"
                    value={dep} 
                    onChange={handleDepChange}
                    label="Department"
                    type="outlined"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item direction="row" justifyContent="space-between" alignItems="center">
                    <Grid container spacing={8.5} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                    <Typography variant={'h5'}>Start Date: </Typography>
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined"
                    value={start} 
                    onChange={handleStartChange}
                    label=""
                    type="date"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item direction="row" justifyContent="space-between" alignItems="center" >
                    <Grid container spacing={10} direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                    <Typography variant={'h5'}>End Date: </Typography>
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined"
                    value={end} 
                    onChange={handleEndChange}
                    label=""
                    type="date"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Link
                    href={{
                        pathname: '/admin/makeexam',
                        query: handleClick()
                    }}
                    >
                    <a><Button
                            type="button"
                            onClick={console.log(exam)}
                            variant="contained"
                            color="primary"
                            style={ { marginBottom: "18px"}}
                            
                        >
                            Submit
                        </Button></a></Link>
                    </Grid>
                    </Grid>
                    </Grid>
            </Grid>
        </Box>
    );
};