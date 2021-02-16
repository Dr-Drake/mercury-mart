import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    productRow:{
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 15,
        //backgroundColor: "yellowgreen"
    },

    totalRow:{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 15,
        paddingBottom: 15,
        //backgroundColor: "yellowgreen"
    },

    title:{
        fontSize: "1rem",
        paddingBottom: 15,
    },

    productName:{
        fontSize: ".875rem",
        fontWeight: 400,
    },

    quantity:{
        fontSize: ".825rem",
    },

    total:{
        fontSize: ".875rem",
        fontWeight: 600,
    },

    totalPrice:{
        fontSize: ".875rem",
        fontWeight: 600,
    },
}))

export default useStyles;

