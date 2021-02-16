import {PropTypes, object, checkPropTypes} from "prop-types";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import Collection from "../../Collection/Collection";
import menuList from "../../../data/menuList";
import useStyles from './adminSidebar-jss';
import useResponsiveStyles from './responsive-jss';
import { useTheme } from '@material-ui/core/styles';
import React from "react";

const MemoizedCollection = React.memo(Collection);


export default function AdminSidebar(props){
    const{
        condensed,
        responsive
    } = props

    const theme = useTheme();
    let classes;

    if (responsive){
        classes = useResponsiveStyles(theme);
    } else {
        classes = useStyles(theme);
    }
    

    const meList = [
        {text: "Dashboard", icon: DashboardIcon, href: "/admin"},
        {text: "Store", icon: StoreIcon, href: "/admin/store"},
        {text: "Users", icon: PeopleIcon, href: "/admin/users"},
    ]

    const Logo = (
        <span><img src="/mercury-icon.png" style={{width: "30px", margin: "3px 0 0 3px"}} /></span>
    );

    

    return(
        <nav className={classes.nav} >
            {
                condensed ?
                <List style={{padding: "0"}}>
                    <ListItem>
                        <ListItemIcon>{Logo}</ListItemIcon>
                    </ListItem>
                </List>
                :
                <List style={{padding: "0"}}>
                    <ListItem>
                        <ListItemIcon>{Logo}</ListItemIcon>
                        <ListItemText
                            classes={{primary: classes.logo}} 
                            primary={props.name? props.name : "Mercury Mart"} 
                        />
                    </ListItem>
                </List>
            }

            <Divider classes={{root: classes.divider}} />

            <MemoizedCollection list={menuList} condensed={condensed} />
        </nav>
    )
}