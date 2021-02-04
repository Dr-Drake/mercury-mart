import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    card:{
        height: "100%"
    },

    infoArea:{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    description:{
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        color: "whitesmoke"
    },

    productName:{
        fontSize: ".825rem",
        color: "#D06645"
    },

    hidden:{
        opacity: 0,
    },

    cardMiddle:{
        backgroundColor: "black", 
    },

    cardBottom:{
        backgroundColor: "black", 
        //height: "100%"
    },

    cardButton:{
        color: "white"
    },
    
    media: {
        height: 200,
        objectFit: "contain",
        padding: 10,
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