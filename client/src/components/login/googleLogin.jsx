import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import Button from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import Iconify from '../iconify/iconify';

function GoogleSignInButton() {

    const theme = useTheme();

    const router = useRouter();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            console.log(result.user);
            console.log(getAuth());
            router.push('/');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={signInWithGoogle}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30"  sx={{ mr: 1 }}/>
              Sign in with Google
        </Button>
    );
}

export default GoogleSignInButton;