import {PropTypes, object, checkPropTypes} from "prop-types";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import Collection from "../Collection/Collection";
import menuList from "../../data/menuList";
import useStyles from './adminSidebar-jss';
import React from "react";

const MemoizedCollection = React.memo(Collection);


export default function AdminSidebar(props){

    const classes = useStyles();

    const meList = [
        {text: "Dashboard", icon: DashboardIcon, href: "/admin"},
        {text: "Store", icon: StoreIcon, href: "/admin/store"},
        {text: "Users", icon: PeopleIcon, href: "/admin/users"},
    ]

    const Logo = (
        <span><img src="/logo.png" style={{width: "30px"}} /></span>
    );

    

    return(
        <nav style={{
            backgroundColor: "#191c24", 
            maxWidth: "220px",
            minWidth: "220px",
            minHeight: "100vh", 
            zIndex: 11,
        }}>
            <List style={{padding: "0"}}>
                <ListItem>
                    <ListItemIcon>{Logo}</ListItemIcon>
                    <ListItemText
                        classes={{primary: classes.logo}} 
                        primary={props.name? props.name : "Mercury Mart"} 
                    />
                </ListItem>
            </List>

            <Divider classes={{root: classes.divider}} />

            <MemoizedCollection list={menuList} />
        </nav>
    )
}