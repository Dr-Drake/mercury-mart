import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    filterOption:{
        fontSize: ".825rem",
        backgroundColor: "#191c24",
        color: "#6c7293"
    },

    filterTextField:{
        marginLeft: "0"
    },
    
    filterInput:{
        fontSize: ".825rem !important",
        color: "white !important",
    },

    selectIcon:{
       color: "#6c7293 !important"
    },

    disabled:{},
    focused:{},
    error:{},

    underline:{
        
        '&:before': {
            borderBottom: '1px solid #6c7293'
        },

        '&:hover:not($disabled):not($focused):not($error):before':{
            borderBottom: '1px solid white'
        },

        '&:after': {
            borderBottom: '1px solid white'
        },
    },

    labelFocus:{
        color: "white"
    }
})

export default useStyles;