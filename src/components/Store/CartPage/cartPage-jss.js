import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    container:{
        flexGrow: 1, padding: 20, background: "#DBCECA",
    },

    header:{
        backgroundImage: `url("/red-planet.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        //backgroundPosition: "center",
        backgroundSize: "cover",
        padding: 80
    },

    title:{
        fontWeight: 500,
        textTransform: "uppercase",
        fontSize: '2.125rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem',
        },
        //color: "#D06645"
    },

    cartInfo:{
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
    },

    cartActionArea:{
        justifySelf: "end",
    },

    checkoutButton:{
        marginLeft: 10,
    },

    emptyCartArea:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    emptyCartImg:{
        //justifySelf: "center"
    },

    imgCaption:{
        fontWeight: 700,
        margin: "6px 0",
    },

    emptyDescription:{
        margin: "10px 0",
    },

    backdrop: {
        zIndex: 10000,
        color: '#fff',
    },
}))

export default useStyles;