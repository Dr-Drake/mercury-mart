import Head from 'next/head';
import React from "react";
import StoreNavBar from '../components/NavBar/StoreNavBar/StoreNavBar';
import CartPage from '../components/Store/CartPage/CartPage';
import RegistrationPage from '../components/Store/RegistrationPage/RegistrationPage';
import { initializeStore } from '../redux/store';
import { Provider } from 'react-redux';
import Error from "next/error";
import { useCookies } from "react-cookie";
import RedirectContext from '../contexts/RedirectContext';

export default function Register(props){

    if (!props.query || !props.query.redirect_uri || !props.query.isRemembered){
        
        return (
            <Error statusCode={404} />
        )
    } else{

        return(
            <React.Fragment>
                <Head>
                    <title>Mecury Mart</title>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link rel="icon" href="/mercury-icon.png"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                </Head>
                
                <RedirectContext.Provider value={props.query}>
                    <RegistrationPage />
                </RedirectContext.Provider>
            
            </React.Fragment>
        
        )
    }
}


export async function getServerSideProps(context){

    return {
        props:{
            query: context.query
        }
    }
}