import Head from 'next/head';
import React from "react";
import LoginPage from '../components/Store/LoginPage/LoginPage'
import { initializeStore } from '../redux/store';
import { Provider } from 'react-redux';
import parseCookies from "../utils/parseCookies";
import redirect from "../utils/redirect";
import LoginRedirectContext from '../contexts/LoginRedirectContext'

export default function StoreLogin(props){
    const defaultValue = {
      redirect_uri: null
    }
    return(
        <React.Fragment>
            <Head>
                <title>Mercury Mart Login</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" href="/mercury-icon.png"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>
            
            <LoginRedirectContext.Provider value={props.query ? props.query : defaultValue}>
                <LoginPage />
            </LoginRedirectContext.Provider>
        </React.Fragment>

       
    )
}

export async function getServerSideProps(context){

  return {
      props:{
          query: context.query
      }
  }
}