import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    container:{
        backgroundColor: "red",
        display: "flex",
        padding: "30px",
        justifyContent: "center",
        //height: "100%",
        //padding: "80px 200px"
        /*display: "flex",
        alignItems: "center",
        //justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "red"*/
    },

    card:{
        width: "100%",
    },

    cardHeader:{
        //backgroundColor: "yellow",
        paddingBottom: 0,
    },

    cardTitle:{
        textAlign: "center",
        fontWeight: 500,
    },

    cardContent:{
        paddingBottom: 0,
        paddingTop: 0,
    },

    cardAction:{
        justifyContent: "space-between",
    },

    backButton:{
        backgroundColor: "transparent",
        //border: "1px solid black",
    }, 

    backdrop: {
        zIndex: 10000,
        color: '#fff',
    },
}))

export default useStyles;