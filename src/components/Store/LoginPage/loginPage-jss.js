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
        //backgroundImage: `url("/red-planet.jpg")`
    },

    branding:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        //color: "white"
    },

    formContainer:{
        display:"flex",
        flexDirection: "column"
    },

    linkDivider:{
        fontSize: "13px",
        width: "100%",
        color: "#111",
        boxSizing: "border-box",
        textAlign: "center",
        position: "relative",
        top: "2px",
        paddingTop: "1px",
        marginBottom: "14px",
        lineHeight: 0,

        '& h5':{
            lineHeight: 1,
            fontSize: "12px",
            color: "#767676",
            fontWeight: 400,
            zIndex: 2,
            position: "relative",
            display: "inline-block",
            backgroundColor: "#DBCECA",
            padding: "0 8px 0 7px",
        },

        '&:after':{
            content: '""',
            width: "100%",
            display: "block",
            height: "1px",
            borderTop: "1px solid #e7e7e7",
            position: "absolute",
            top: "50%",
            marginTop: "-1px",
            zIndex: 1,
        }
    },

}))

export default useStyles;