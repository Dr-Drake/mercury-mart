import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=> ({
    bar:{
        backgroundColor: "#191c24",
        padding: 0,
        margin: 0,
    },

    toolbar:{
        margin: 0,
        minHeight: 0,
    },

    menuButton: {
        display: "none",
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]:{
            display: 'block'
        }
    },

    menuIcon:{
      width: "20px"
    },

    paper:{
        backgroundColor: "#191c24",
    },

    menuList:{
        zIndex: 200,
        color: "white",
    },

    menuItem:{
        "&:hover": {
            backgroundColor: "#3b3f58",
            //color: "white",
        }
    },

    title: {
        display: 'none',
        fontWeight: 700,
        marginLeft: 8,
        textTransform: "uppercase",
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },

    avatar:{
        width: "35px !important",
        height: "35px !important",
        backgroundColor: "#3f51b5 !important",
        fontSize: "1rem !important"
    },

    displayName:{
        fontSize: "0.8rem", 
        fontWeight: 500,
        margin:"0 0 0 5px",
        //color: "#6c7293",
    },

    logo:{
        display: 'none',
        width: "30px", 
        margin: "3px 0 0 3px",
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },

    signInButton:{
        color: "white"
    },

    grow: {
        flexGrow: 1,
    },

    sectionActions:{
        display: "flex",
    },

    backdrop: {
        zIndex: 1000,
        color: '#fff',
    },
      
}));

export default useStyles;