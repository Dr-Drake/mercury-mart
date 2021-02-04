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
        marginRight: theme.spacing(2),
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    search: {
        position: 'relative',
        flexGrow: 1,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: "#DBCECA",
        },
        margin: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        color: "black",
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
        
    inputRoot: {
        color: 'black',
    },
        
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
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
      
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
}));

export default useStyles;