import { React, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,List,Grid, Paper,Typography, Button, Stack} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function schedule() {
    const [user] = useAuthState(authHandle);
    const [exams, setExams] = useState(null);
    const [courses, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const id = router.query;
  
    useEffect(() => {
      const callAPI = async () => {
        try {
          const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/test/`, {
            method: 'GET',
          });
          const course = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/course/`, {
            method: 'GET',
          });
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
  
    if (!exams || !courses ) {
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
  

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "2rem 0rem", }}>Exam Schedule</Typography>
            <Grid container spacing={3}>
            
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