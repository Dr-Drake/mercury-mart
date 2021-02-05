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
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Link from 'next/link';
import useStyles from './storeNavBar-jss';
import { useTheme } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';

export default function PrimarySearchAppBar() {
    const theme = useTheme()
    const classes = useStyles(theme);
    const [cookies, setCookie] = useCookies(['cart']);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    let cart = React.useMemo(()=>{
        return cookies.cart
    }, [cookies])
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
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
        <span><img src="/mercury-icon.png" style={{width: "30px", margin: "3px 0 0 3px"}} /></span>
    );

    return (
        <div className={classes.grow}>
        <AppBar position="sticky" classes={{root: classes.bar}}>
            <Toolbar classes={{root:classes.toolbar}}>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
            >
                <MenuIcon />
            </IconButton>

            <div style={{display: "flex", alignItems: "center"}}>
                <Link href="/">
                    <a alt="home">
                        <Typography className={classes.title} variant="h6" noWrap>
                            Mercury Mart
                        </Typography>
                    </a>
                </Link>
                {Logo}
            </div>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
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
                    Sign In
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
                
                <Link href="/cart">
                    <IconButton aria-label="shopping-cart" color="inherit" component="a" >
                        <Badge 
                            badgeContent={cart ? cart.length : 0} 
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Link>
            </div>
            <div className={classes.sectionDesktop} style={{backgroundColor: "orange"}}>
            </div>
            <div className={classes.sectionMobile}>
            </div>
            </Toolbar>
        </AppBar>
        </div>
    );
}
