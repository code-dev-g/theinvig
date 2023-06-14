import { React, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
    const [user] = useAuthState(authHandle);
    const [data, setData] = useState(null);
    const [exams, setExams] = useState(null);
    const [courses, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const id = router.query;
  
    useEffect(() => {
      const callAPI = async () => {
        try {
          const email = user.email.replace('@', '%40');
          const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/admin/?adminEmail=${email}`, {
            method: 'GET',
          });
          const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/test/`, {
            method: 'GET',
          });
          const course = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/course/`, {
            method: 'GET',
          });
          const responseData = await res.json();
          setData(responseData);
          const responseExam = await exam.json();
          setExams(responseExam);
          const responseCourse = await course.json();
          setCourse(responseCourse);
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
  
    if (!data || !exams || !courses ) {
      return (
        <Box>
          <h1>Loading...</h1>
        </Box>
      );
    }

    const getcoursedetails = (value) => {
      for (let index = 0; index < courses.length; index++) {
        const element = courses[index];
        if (element.id == value.courseId)
        {
          return element.courseName;
        }
      }
    }

    const generate = () => {
// generate logic
    }

    const deletefac = () => {
// deletefac
    }

    const addfac = () => {
// addfac
    }
  

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Exam Schedule</Typography>
            <Grid container spacing={3}>
            <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
                    <Button
                        type="button"
                        onClick={deletefac}
                        variant="contained"
                        color="primary"
                        style={{ margin: "18px"}}
                        
                    >
                        Delete Course
                    </Button>
            
                    <Button
                        type="button"
                        onClick={addfac}
                        variant="contained"
                        color="secondary"
                        style={{ margin: "18px"}}
                        
                    >
                        Add Course
                    </Button>

                    <Button
                        type="button"
                        onClick={generate}
                        variant="contained"
                        color="success"
                        style={{ margin: "18px"}}
                        
                    >
                        Generate
                    </Button>
            </Grid>
            <Grid item xs={12} component={Paper} style={ { display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>{id.exam}</h2>
            <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {exams.filter(
                  (value) => {
                      return (value.examId == id.id);
                  }
                ).map((value) => (
                    <ListItem
                    key={value.id}
                    disableGutters
                    >
                    <ListItemText>
                        <strong>{getcoursedetails(value)}</strong>
                        <Typography>Date: {value.date}</Typography>
                        <Typography>Time: {value.time}</Typography>
                        <Typography>Faculty Required: {value.requiredFaculties}</Typography>
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