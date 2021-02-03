import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cardHeader:{
        fontSize: "14px",
        fontWeight: 500,
        color: "white",
        borderColor: "#6c7293"
    },

    card:{
        backgroundColor: "#191c24",
        //backgroundColor: "white",
        padding: "5px 15px",
        width: "100%",
        alignSelf: "start"
    },

    bodyCell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293"
    },

    headerCell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293",
    },

    checkbox:{
        color: "#6c7293 !important",
    },

    sortLabel:{
        color: '#6c7293',
        "&:hover": {
          color: 'white',
        },
        '&$sortLabelActive': {
          color: 'white',
        },
    },

    sortLabelActive:{},

    sortLabelIcon:{
        color: 'inherit !important'
    },

    table:{
        backgroundColor: "green",
    },

    tableRow:{
        backgroundColor: "rgba(230, 236, 245, 0.4)"
    },

    tablePagination:{
        color: "#6c7293",
    },

    paginationMenu:{
        "&:hover": {
            backgroundColor: "#3b3f58"
        }
    },

    selectDropdown:{
        color: "#6c7293",
        backgroundColor: "#191c24"
    },

    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },

    tableCell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293",
    },

    editIcon:{
        fontSize: "0.88rem",
        color: "#6c7293",
    },

    editIconButton:{
        zIndex: 100,
        borderRadius: 5,
        padding: 3,
        border: "1px solid #6c7293",
        boxShadow: "0 1px 0 0 transparent",

        '&:active':{
            boxShadow: "0 0 1px 0 transparent inset",
            marginTop: "2px",
        }
    },

    serialButton:{
        '& p':{
            fontSize: "0.7rem",
            margin: 0
        }
    },

    serialAddIcon:{
        fontSize: ".9rem",
    },

    serialInput:{
        border: "1px solid white",
        color: "#6c7293",
        fontSize: "0.8rem",
        padding: "0 2px",
        borderRadius: "5px",
    },

    serialIconButton:{
        padding: 0,
        marginLeft: 5,
        borderRadius: 0,
    },

    serialAddIconButton:{
        backgroundColor: "whitesmoke",
        borderRadius: "5px"
    }
})

export default useStyles;