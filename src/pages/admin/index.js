import { React, useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText, Grid, Paper, Typography, Button, Stack, Avatar } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Dashboard = () => {
  const [user] = useAuthState(authHandle);
  const [data, setData] = useState(null);
  const [exams, setExams] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [gencount, setCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const email = user.email.replace('@', '%40');
        const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/admin/?adminEmail=${email}`, {
          method: 'GET',
        });
        const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/`, {
          method: 'GET',
        });
        const fac = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/`, {
          method: 'GET',
        });
        const responseData = await res.json();
        setData(responseData);
        const responseExam = await exam.json();
        setExams(responseExam);
        const responseFac = await fac.json();
        setFaculty(responseFac);
        var count = 0;
        for (let index = 0; index < exam.length; index++) {
          const element = exam[index];
          if (Date(element.deadline) < Date()) {
            count++;
          }
        }
        setCount(count)
      } catch (err) {
        setError(err);
      }
    };

    if (user) {
      setCount(0)
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

  if (!data || !exams || !faculty) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "200vh" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" sx={{ fontWeight: "bold", margin: "2rem 0rem" }}>Admin Dashboard</Typography>
        </Grid>
        <Grid item>
          <a href="/admin/profile">
          <Avatar alt="Remy Sharp" src={`${data.adminImageURL}`} />
          </a>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} component={Paper} style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "5" }}>
          <h1>Hello! {data.adminName}</h1>
          <Stack spacing={15} style={{ marginBottom: '18px' }} direction="row" >
          <Stack>
                <Typography variant="h6">{faculty.length}</Typography>
                <Typography variant="caption">Total Faculties</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">{exams.length}</Typography>
                <Typography variant="caption">Schedules</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">{gencount}</Typography>
                <Typography variant="caption">Generated</Typography>
                </Stack>

                <Stack>
                <Typography variant="h6">{exams.length - gencount}</Typography>
                <Typography variant="caption">Pending</Typography>
                </Stack>
            </Stack>
          <Stack spacing={3} direction="row">
              <Button
                        type="button"
                        href="admin/faculties"
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "18px"}}
                        
                    >
                        View Faculty
                    </Button>
                
                    <Button
                            type="button"
                            href="admin/newexam"
                            variant="contained"
                            color="primary"
                            style={ { marginBottom: "18px"}}
                            
                        >
                            Upload Time Table
                        </Button>
          </Stack>
        </Grid>
        <Grid item rowSpacing={45}></Grid>
        <Grid item xs={12} component={Paper} style={{ display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5" }}>
          <h2>Schedules</h2>
          <Grid>
            <Stack></Stack>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {exams.map((value) => (
                <ListItem key={value.id} disableGutters>
                  <Link
                href={{
                    pathname: '/admin/viewexam',
                    query: {id: `${value.id}`, exam: `${value.examName}`} 
                }}
                ><a style={{textDecoration: "none",color:"black"}}>
                      <ListItemText>
                        <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Start Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                      </ListItemText>
                      </a></Link>
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
