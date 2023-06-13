import { React, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import { API_URL } from "../../../api";

export default function Schedule() {
  const [user] = useAuthState(authHandle);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const email = user.email.replace('@', '%40');
        const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/?facultyEmail=${email}`, {
          method: 'GET',
        });
        const responseData = await res.json();
        setData(responseData);
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

  if (!data) {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "200vh" }}>
      <h1>Faculty Profile</h1>
      <Grid container spacing={3}>
                <Grid container spacing={ 3 }>
                    <Grid item xs={ 12 } style={ { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "15" } }>
                        <img
                            height="300px"
                            width={ 'auto' }
                            src={`${data.facultyImageURL}`}
                            alt={ data.facultyName }
                        />
                        <Typography gutterBottom variant="h5" component="div">
                            { data.facultyName }
                        </Typography>
                    </Grid>
                    <Grid item xs={ 12 } component={ Paper } spacing={ 2 } style={ { display: "flex", flexDirection: "column", alignItems: "unset", marginBottom: "15" } }>
    
                        <Typography gutterBottom variant="h6" component="div">
                            Email:
                            <Typography component="div">
                                { data.facultyEmail }
                            </Typography>
                        </Typography>
    
                        <Typography gutterBottom variant="h6" component="div">
                            Phone:
                            <Typography component="div">
                                { data.facultyPhoneNumber }
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Box>
)};