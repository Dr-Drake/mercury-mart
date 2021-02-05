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
}))

export default useStyles;