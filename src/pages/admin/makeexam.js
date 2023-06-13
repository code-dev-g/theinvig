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
    const [name, setName] = useState('');
    const [code, setDep] = useState('');
    const [fac, setFaculty] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    let course = {name: NaN, code: NaN, faculty: NaN,date: NaN,time: NaN};
    const handleClick = () => {
        course.name = name
        course.code = code
        course.faculty = fac
        course.date = date
        course.time = time
        return course
    };
  
    const handleNameChange = (event) => {
        setName(event.target.value);
        course.name = event.target.value;
    };
    const handleCodeChange = (event) => {
        setDep(event.target.value);
        course.code = event.target.value
    };
    const handleFacultyChange = (event) => {
        setFaculty(event.target.value);
        course.fac = event.target.value
    };
    const handleTimeChange = (event) => {
        setTime(event.target.value);
        course.time = event.target.value
      };
      const handleDateChange = (event) => {
        setDate(event.target.value);
        course.date = event.target.value
      };

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Add Exams</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ {paddingBottom: "20px", display: "flex", flexDirection: "column", alignItems: "space-between", marginBottom: "5"}}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography variant="h4" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>{data.name}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                    id="outlined"
                    value={name} 
                    onChange={handleNameChange}
                    label="Course Name"
                    type="outlined"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                    id="outlined"
                    value={code} 
                    onChange={handleCodeChange}
                    label="Course Code"
                    type="outlined"
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                    id="outlined-number"
                    value={fac} 
                    onChange={handleFacultyChange}
                    label="Number of Faculties"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                    id="outlined-time"
                    value={time} 
                    onChange={handleTimeChange}
                    label="Time"
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                    id="outlined-date"
                    value={date} 
                    onChange={handleDateChange}
                    label="Date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: "1000px"}}
                    variant="filled"
                    />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Button
                            type="button"
                            onClick={console.log(handleClick())}
                            variant="contained"
                            color="secondary"
                            style={ { marginBottom: "18px"}}
                            
                        >
                            Add
                        </Button>
                    </Grid>
                    </Grid>
                    </Grid>
            </Grid>
        </Box>
    );
};