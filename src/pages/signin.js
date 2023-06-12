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

import { API_URL } from '../../api';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide () {
    const handleSubmit = ( event ) => {
        event.preventDefault();
        const data = new FormData( event.currentTarget );
        console.log( {
            email: data.get( 'email' ),
            password: data.get( 'password' ),
        } );
    };

    const formik = useFormik( {
        initialValues: {
            email: "",
            password: "",
            type: "faculty",
        },
        validationSchema: Yup.object( {
            email: Yup.string()
                .email( "Invalid email address" )
                .required( "Email address is required" ),
            password: Yup.string()
                .min( 6, "Password must be at least 6 characters" )
                .required( "Password is required" ),
            type: Yup.string().required(),
        } ),
        onSubmit: async ( values, { setSubmitting, setFieldError } ) => {
            const { email, password, type } = values;

            console.log( type );

            try {
                alert("Here")

                await signInWithEmailAndPassword( authHandle, email, password );

                const user = authHandle.currentUser;

                const docRef = doc( storeHandle, "usertype", user.uid );
                const docSnap = await getDoc( docRef );

                if ( docSnap.exists() ) {
                    console.log( "Document data:", docSnap.data() );
                    if ( docSnap.data().type === type ) {
                        if ( type === "faculty" ) {
                            router.push( '/faculty/' );
                        }
                    }
                    else {
                        signOut( authHandle );
                        alert( "You are not authorized to access this page" );
                    }
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log( "No such document!" );
                }

                router.push('/');
            } catch ( error ) {
                console.error( error );
                setFieldError( "email", error.message );
            }

            setSubmitting( false );
        },
    } );

    return (
        <ThemeProvider theme={ defaultTheme }>
            <Grid container component="main" sx={ { height: '91vh', width: '213vh' } }>
                <CssBaseline />
                <Grid
                    item
                    xs={ false }
                    sm={ 4 }
                    md={ 5 }
                    sx={ {
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: ( t ) =>
                            t.palette.mode === 'light' ? t.palette.grey[ 50 ] : t.palette.grey[ 900 ],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    } }
                />
                <Grid item xs={ 12 } sm={ 8 } md={ 7 } component={ Paper } elevation={ 3 } square>
                    <Box>
                        <form onSubmit={ formik.handleSubmit } style={ { display: "flex", flexDirection: "column", alignItems: "center" } }>
                            <Typography variant="h3" style={ { marginTop: "160px", marginBottom: "16px" } }>Sign In</Typography>
                            <TextField
                                id="email"
                                name="email"
                                label="Email address"
                                variant="outlined"
                                style={ { marginBottom: "18px", width: "300px" } }
                                value={ formik.values.email }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                error={ formik.touched.email && Boolean( formik.errors.email ) }
                                helperText={ formik.touched.email && formik.errors.email }
                            />
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                style={ { marginBottom: "18px", width: "300px" } }
                                value={ formik.values.password }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                error={ formik.touched.password && Boolean( formik.errors.password ) }
                                helperText={ formik.touched.password && formik.errors.password }
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={ { marginBottom: "18px" } }
                                disabled={ formik.isSubmitting }
                            >
                                Sign In
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                style={ { marginBottom: "18px", width: "300px" } }
                                onClick={ () => {
                                    router.push( '/forgotpassword' );
                                } }
                            >
                                Forgot password?
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}