import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    container:{
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "orange",
        width:"100%",
        height: "100vh",
        padding: "25px 0",
        backgroundImage: `url("/red-planet.jpg")`
    },

    branding:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        color: "white"
    },

}))

export default useStyles;