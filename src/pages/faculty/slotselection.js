import { React,useEffect,useState } from "react";
import { useRouter } from 'next/router'
import {Box,Grid, Paper,Typography, Button, Stack,List} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function schedule() {
    const router = useRouter();
    const id = router.query;
    const [user] = useAuthState(authHandle);
    const [exams, setExams] = useState(null);
    const [courses, setCourse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      const callAPI = async () => {
        try {
          const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/?examID=${id.id}`, {
          method: 'GET',
        });
          const course = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/course`, {
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
  
    if (!exams || !courses) {
      return (
        <Box>
          <h1>Loading...</h1>
        </Box>
      );
    }
    console.log(exams)
    function yes(code) {
        console.log("yes for ",{code});
    }

    function no(code) {
        console.log("no for ",{code});
    }

    return (
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Slot Selection</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} component={Paper} style={ {paddingBottom: "20px", display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5"}}>
            <h2>{exams.examName}<br/>{exams.department}</h2>
            <Stack spacing={15} direction="row" >
                <Stack>
                    <Typography variant="caption">Number of subjects</Typography>
                    <Typography variant="h6">{exams.numberOfCourses}</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">Start Date</Typography>
                    <Typography variant="h6">{exams.startDate}</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">End Date</Typography>
                    <Typography variant="h6">{exams.endDate}</Typography>
                </Stack>

                <Stack>
                    <Typography variant="caption">Minimum Required</Typography>
                    <Typography variant="h6">{exams.numberOfResponses}</Typography>
                </Stack>
                
                </Stack>
            </Grid>
            <Grid item></Grid>
            <Grid item xs={12} component={Paper} sx={{paddingBottom: "20px",width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginBottom: "180px" }}>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                {courses.map((value) => (
                    <ListItem
                    key={value.courseName}
                    disableGutters
                    >
                    <ListItemText>
                        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
                        <Grid>
                        <strong>{value.courseName}</strong>
                        <Typography>{value.department}</Typography>
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
            </Grid>
        </Box>
    );
};