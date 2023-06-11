import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as Yup from "yup";
import { authHandle, storeHandle } from "../utils/firebase";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { doc, getDoc } from "firebase/firestore";

const defaultTheme = createTheme();

const ForgotPasswordPage = () => {
    const formik = useFormik( {
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object( {
            email: Yup.string()
                .email( "Invalid email address" )
                .required( "Email address is required" ),
        } ),
        onSubmit: async ( values, { setSubmitting, setFieldError } ) => {
            const { email } = values;
            try {
                await signInWithEmailAndPassword( authHandle, email );
    
                const user = authHandle.currentUser;

            } catch ( error ) {
                console.error( error );
                setFieldError( "email", error.message );
            }
    
            setSubmitting( false );
        },
    } );

    function Send() {
        router.push( '/' );
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '91vh',width: '213vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={3} square>
        <Box>
            <form onSubmit={ formik.handleSubmit } style={ { display: "flex", flexDirection: "column", alignItems: "center"} }>
                <Typography variant="h3" style={ { marginTop: "160px",marginBottom: "16px"} }>Forgot Password</Typography>
                <TextField
                    id="email"
                    name="email"
                    label="Email address"
                    variant="outlined"
                    style={ { marginBottom: "18px",width: "300px"} }
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    onBlur={ formik.handleBlur }
                    error={ formik.touched.email && Boolean( formik.errors.email ) }
                    helperText={ formik.touched.email && formik.errors.email }
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={ { marginBottom: "18px"}}
                    disabled={ formik.isSubmitting }
                >
                    Send
                </Button>
            </form>
        </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
