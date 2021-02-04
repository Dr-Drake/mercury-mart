import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    card:{
        cursor: "pointer",
        transition: "all .1s ease-in",
        '&:hover':{
            zIndex: 100,
            transform: "translate3d(0px, -3px, 0px)"
        }
    },

    cardButton:{
        color: "#D06645"
    },
    
    media: {
        height: 300,
        objectFit: "contain",
        [theme.breakpoints.down("md")]:{
            height: 200,
        },
        [theme.breakpoints.down("sm")]:{
            height: 150,
        }
    },

    cardTitle:{
        textTransform: "uppercase",
        fontSize: "1rem",
    },

    cardHeader:{
        paddingTop: 10,
        paddingBottom: 10
    }
    
}))

export default useStyles;