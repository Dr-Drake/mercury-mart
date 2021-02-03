import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cardHeader:{
        fontSize: "14px",
        fontWeight: 500,
        color: "white"
    },

    tabScroller:{
        backgroundColor: "yellow",
        padding: 0
    },

    tab:{
        textTransform: 'none',
        minWidth: 72,
        color: "white"
    },

    tabSelected:{
        backgroundColor: "rgba(230, 236, 245, 0.4)",
        color: "orange"
    },

    tabIndicator:{
        backgroundColor: "orange"
    },

    card:{
        backgroundColor: "#191c24",
    },

    divider:{
        backgroundColor: "#6c7293",
    }
})

export default useStyles;