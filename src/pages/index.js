import { authHandle } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { Typography, Box, Button, Item,Grid } from "@mui/material";

export default function Home() {
	const [user, loading, error] = useAuthState(authHandle);
	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <div>{error}</div>;
	}
	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "column", m: "4rem"}}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={12}>
          <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" ,m: "4rem" }}>
        		Invigilation Management System
          </Typography>
          </Grid>

          <Grid item xs={6} md={4}>
          </Grid>
          <Grid item xs={6} md={4}>
          <Box sx={{ textAlign: "center", fontWeight: "bold"}}>
            <Button href = "/signin" variant="contained" fullWidth>Admin Signin</Button>
          </Box>
          </Grid>
          <Grid item xs={6} md={4}>
          </Grid>

          <Grid item xs={6} md={4}>
          </Grid>
          <Grid item xs={6} md={4}>
          <Box sx={{ textAlign: "center", fontWeight: "bold"}}>
            <Button href = "/signin" variant="contained" fullWidth>Login Signin</Button>
          </Box>
          </Grid>
          <Grid item xs={6} md={4}>
          </Grid>

        </Grid>
			</Box>
		</>
	);
}