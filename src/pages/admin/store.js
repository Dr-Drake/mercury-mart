import Head from 'next/head';
import {Grid} from "@material-ui/core";
import React from "react";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";

export default function AdminStore(){

    return(
        <React.Fragment>
            <Head>
                <title>Tech Stack Admin</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </Head>

            <div style={{display: "flex"}}>
                <AdminSidebar/>
                <div style={{backgroundColor:"bisque", width: "100%"}}>LEL</div>
            </div>
        </React.Fragment>
       
    )
}