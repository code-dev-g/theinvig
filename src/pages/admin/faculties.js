import { React,useState,useEffect } from "react";
import { useRouter } from 'next/router'
import {Box,Grid,Paper,Typography, Button, Stack,List,TextField, Avatar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from "react-firebase-hooks/auth";
import { authHandle } from "../../utils/firebase";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Link from 'next/link';
import { Delete } from "@mui/icons-material";

export default function schedule() {
    const [user] = useAuthState(authHandle);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const callAPI = async () => {
        try {
          const res = await fetch(`https://invig-api-m1-2xe7e.ondigitalocean.app/faculty/`, {
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
        <Box sx={{width: "200vh"}}>
            <Typography variant="h3" sx={{fontWeight: "bold" ,margin: "3rem 0rem", }}>Faculties</Typography>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                     <Button
                        type="button"
                        variant="contained"
                        href="/admin/addfaculty"
                        color="primary"
                        style={ { margin: "18px"}}
                     >Add</Button>
            </Grid>
            <Grid item xs={12} component={Paper} sx={{paddingBottom: "20px",width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginBottom: "180px" }}>
            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {data.map((value) => (
                    <ListItem
                    key={value.name}
                    disableGutters
                    >
                    <Link
                href={{
                    pathname: '/admin/facultydetails',
                    query: {email : `${value.facultyEmail}`}
                }}
                ><a style={{textDecoration: "none",color:"black",width:"98%"}}>
                    <ListItemText>
                      <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                          <Stack direction={'column'}>
                            <Avatar src={`${value.facultyImageURL}`}></Avatar>
                            <Typography variant="h5">{value.facultyName}</Typography>
                            <Typography variant="h6">{value.facultyEmail}</Typography>
                          </Stack>
                          <Stack direction={'column'}>
                          <Button
                        type="button"
                        href="faculty/myschedule"
                        variant="contained"
                        color="secondary"
                        
                        >View</Button>
                          </Stack>
                      </Stack>
                        <hr ></hr>
                    </ListItemText></a>
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