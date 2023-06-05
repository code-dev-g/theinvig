import { authHandle } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typography, Box, Button, Link, Grid } from "@mui/material";

export default function Home () {
  const [ user, loading, error ] = useAuthState( authHandle );
  return (
    <>
      <Box sx={ { display: "flex", flexDirection: "column", m: "4rem" } }>
        <Typography variant="h4" sx={ { textAlign: "center", fontWeight: "bold" } }>
          Hello there! Welcome to TheInvigilator
        </Typography>
        <Link href='/signin'>
          <Button variant="contained">Login</Button>
        </Link>
      </Box>
    </>
  );
}