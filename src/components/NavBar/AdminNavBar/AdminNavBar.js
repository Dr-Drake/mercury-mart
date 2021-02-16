import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from 'next/link';
import useStyles from './adminNavBar-jss';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AdminSidebar from '../../Sidebar/AdminSidebar/AdminSidebar';
import Avatar from '@material-ui/core/Avatar';
import { useTheme } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import {  useRouter } from 'next/router';
import { useProduct } from '../../../hooks/dataFetch'
import getInitials from '../../../utils/getInitials';
import { BoxLoading } from 'react-loadingg';
import Backdrop from '@material-ui/core/Backdrop';



export default function AdminNavBar(props) {
    const {
        user
    } = props
    const router = useRouter();
    const theme = useTheme()
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["mercmart_admin"]);
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const anchorRef = React.useRef(null);

    const logOut = () =>{
        setIsLoggingOut(true)
        removeCookie("mercmart_admin");
        removeCookie("mercmart_isRemembered");
        removeCookie("mercmart_name");
        router.push("/admin/login");
    }
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleOpenDrawer = () =>{
        setDrawerOpen(true)
    }
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const Logo = (
        <span><img src="/mercury-icon.png" className={classes.logo} /></span>
    );

    return (
        <div className={classes.grow}>
            <Backdrop className={classes.backdrop} open={isLoggingOut} >
                <BoxLoading />
            </Backdrop>

            <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={()=> setDrawerOpen(false)}
            onOpen={()=> setDrawerOpen(true)}
          >
              <AdminSidebar responsive />
          </SwipeableDrawer>

        <AppBar position="static" classes={{root: classes.bar}}>
            <Toolbar classes={{root:classes.toolbar}}>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenDrawer}
            >
                <MenuIcon classes={{root:classes.menuIcon}} />
            </IconButton>

            <div style={{padding: "10px", flexGrow: 1}}>
                <Link href="/" passHref>
                    <Button 
                        variant="contained" 
                        color="primary"
                        size="small" 
                        component="a"
                        target="_blank"
                    >
                        Go to store
                    </Button>
                </Link>
                
            </div>

            <div style={{display: "flex", alignItems: "center", flexGrow: 1}}>
                {Logo}
                <Typography className={classes.title} variant="h6" noWrap>
                    Mercury Mart
                </Typography>
            </div>

            <div className={classes.search}>
                
            </div>

            <div className={classes.grow}/>
            <div className={classes.sectionActions}>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    classes={{root: classes.signInButton}}
                >
                    <Avatar className={classes.avatar}>
                        {getInitials(
                            user ? user : "Ikem Ezechukwu"
                        )}
                    </Avatar>
                    <p className={classes.displayName}>
                        {user ? user : "Ikem Ezechukwu"}
                    </p>
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal={false}>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper classes={{root: classes.paper}}>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList 
                            autoFocusItem={open} 
                            id="menu-list-grow" 
                            onKeyDown={handleListKeyDown}
                            classes={{root:classes.menuList}}
                        >
                            <MenuItem classes={{root:classes.menuItem}} onClick={handleClose}>Profile</MenuItem>
                            <MenuItem classes={{root:classes.menuItem}} onClick={handleClose}>My account</MenuItem>
                            <MenuItem classes={{root:classes.menuItem}} onClick={logOut}>Logout</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </div>
            </Toolbar>
        </AppBar>
        </div>
    );
}
