import Head from 'next/head';
import React from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import AdminNavBar from '../../components/NavBar/AdminNavBar/AdminNavBar';
import OrderPage from '../../components/Admin/OrderPage/OrderPage';
import dynamic from 'next/dynamic';
import jwt from "jsonwebtoken";
import parseCookies from "../../utils/parseCookies";
import redirect from "../../utils/redirect";
import { useCookies } from "react-cookie";


export default function AdminOrders(props){

    const [cookie, setCookie, removeCookie] = useCookies();

    React.useEffect(()=>{
        if (!props.isRemembered){
          setTimeout(()=>{
            removeCookie("mercmart_admin")
            removeCookie("mercmart_isRemembered")
            removeCookie("mercmart_name")

          }, 60 * 10 * 1000);
        }

        setTimeout(()=>{
            removeCookie("mercmart_admin")
            removeCookie("mercmart_isRemembered")
            removeCookie("mercmart_name")
        }, props.tokenExp)
    })

    return(
        <React.Fragment>
            <Head>
                <title>Mercury Mart Admin</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" href="/mercury-icon.png"></link>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>

            <div style={{display: "flex"}}>
                <AdminSidebar/>
                <div style={{width: "100%"}}>
                    <AdminNavBar user={props.user} />
                    <OrderPage />
                </div>
            </div>
        </React.Fragment>
       
    )
}

export async function getServerSideProps(context){
  
    const data = parseCookies(context.req);
  
    try{
        // Check if token is in cookie
        if (data['mercmart_admin']){
            let decoded = jwt.decode(data['mercmart_admin']);
            return { 
                props: { 
                    user: data["mercmart_name"], 
                    tokenExp: (decoded.exp - decoded.iat) * 1000,
                    isRemembered: data['mercmart_isRemembered']  // If stay signed in is selected
                },
            }
        }
  
        // No user -- redirect
        redirect(context.res, "/admin/login");
        return {props:{custom: "no user"}}
  
    }catch(err){
  
      // Unexpected error -- redirect
      redirect(context.res, "/admin/login");
      return {props:{ err: "Unexpected error"}}
    }
}