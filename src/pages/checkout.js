import Head from 'next/head';
import React from "react";
import StoreNavBar from '../components/NavBar/StoreNavBar/StoreNavBar';
import CartPage from '../components/Store/CartPage/CartPage';
import CheckoutPage from '../components/Store/CheckoutPage/CheckoutPage';
import { initializeStore } from '../redux/store';
import { Provider } from 'react-redux';
import parseCookies from "../utils/parseCookies";
import addCookies from "../utils/setCookies";
import redirect from "../utils/redirect";
import { useCookies } from "react-cookie";
import { useProduct, useCart } from '../hooks/dataFetch'
import jwt from "jsonwebtoken";
import axios from 'axios';
import querystring from 'querystring';
import Router from "next/router";

export default function Checkout(props){

    const [cookie, setCookie, removeCookie] = useCookies();

    React.useEffect(()=>{
        if (!props.isRemembered){
          setTimeout(()=>{
            removeCookie("mercmart_customer")
            removeCookie("mercmart_showRemember")
            //removeCookie("mercmart_name")

          }, 60 * 10 * 1000);
        }

        setTimeout(()=>{
            removeCookie("mercmart_customer")
            removeCookie("mercmart_showRemember")
            //removeCookie("mercmart_name")
        }, props.tokenExp)


    })

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
            
            <StoreNavBar />
            <Provider store={initializeStore()}>
                <CheckoutPage />
            </Provider>
        </React.Fragment>
       
    )
}

export async function getServerSideProps(context){
    
    const data = parseCookies(context.req);
    let redirectUrl = context.req ? context.req.host : '';
    let qParams = context.query ? '&unexpectedError=true': '?unexpectedError=true'
    let loginQparams = {
        redirect_uri: "/checkout"
    }
    let target = redirectUrl + qParams;
  
    try{
        // Check if token is in cookie
        if (data['mercmart_customer']){
            console.log(data['mercmart_customer'])
            let decoded = jwt.decode(data['mercmart_customer']);
            return { 
                props: {  
                    tokenExp: (decoded.exp - decoded.iat) * 1000,
                    isRemembered: data['mercmart_showRemember']  // If stay signed in is selected
                },
            }
        }
        
        // No user -- redirect
        redirect(context.res, `/login?${querystring.stringify(loginQparams)}`);
        return {props:{custom: "no user"}}
  
    }catch(err){
  
      // Unexpected error -- redirect
      console.log(err)
      if (context.req){
        redirect(context.res, target);
      } else {
        Router.back();
      }
      
      return {props:{ err: "Unexpected error"}}
    }
}