import Typography from '@material-ui/core/Typography';
import useStyles from './loginPage-jss';
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import CustomerLogin from '../../Forms/CustomerLogin/CustomerLogin';
import React, { useContext } from 'react';
import Link from 'next/link';
import LoginRedirectContext from '../../../contexts/LoginRedirectContext';
import querystring from 'querystring';



export default function LoginPage(props){

    const theme = useTheme();
    const classes = useStyles(theme);
    const context = useContext(LoginRedirectContext);

    const queryParameters = {
        redirect_uri: context.redirect_uri ? context.redirect_uri : "/",
        isRemembered: true
    }
    let url = `/register?${querystring.stringify(queryParameters)}`
    const Logo = (
      <span><img src="/mercury-icon.png" style={{width: "30px", margin: "3px 0 0 3px"}} /></span>
    );

    return(
        <div className={classes.container} >
            <div className={classes.branding} >
                {Logo}
                <Typography variant="h6" noWrap>
                    Mercury Mart
                </Typography>
            </div>
            
            <div className={classes.formContainer}>
                <CustomerLogin />
                <div className={classes.linkDivider} >
                    <h5>New to Mercury Mart?</h5>
                </div>
               <Link href={url} passHref>
                <Button 
                        variant="contained" 
                        fullWidth
                        component="a"
                    >
                        Create your mercury account
                    </Button>
               </Link>
               
            </div>
        </div>
    )
}