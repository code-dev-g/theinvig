import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Box, List, Grid, Paper, Typography, Button, Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

export default function Schedule() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(authHandle);
  const [data, setData] = useState(null);
  const [exams, setExams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
          const email = user.email.replace('@', '%40');
          const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/?facultyEmail=${email}`, {
            method: 'GET',
          });
          const exam = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/exam/`, {
            method: 'GET',
          });
          const responseData = await res.json();
          setData(responseData);
          const responseExam = await exam.json();
          setExams(responseExam);
      } catch (err) {
        setError(err);
      }
    };

    if (user) {
      callAPI();
    }
  }, [user, id]);

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

  if (!data || !exams) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "200vh" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", margin: "2rem 0rem" }}>{data.facultyName}'s Exam Schedule</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} component={Paper} style={{ display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "5" }}>
          <h2>Upcoming Exams</h2>
          <Grid>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {exams.map((value) => (
                <ListItem
                  key={value.id}
                  disableGutters
                >
                  <Link
                    href={{
                      pathname: '/faculty/slotselection',
                      query: { id: value.id },
                    }}
                    passHref
                  >
                    <a style={{ textDecoration: "none", color: "black" }}>
                      <ListItemText>
                        <strong>{value.examName}</strong>
                        <Typography>{value.department}</Typography>
                        <Typography>Start Date: {value.startDate}</Typography>
                        <Typography>End Date: {value.endDate}</Typography>
                      </ListItemText>
                    </a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
