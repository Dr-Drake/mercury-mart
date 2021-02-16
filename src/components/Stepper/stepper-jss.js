import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    stepper:{
        //backgroundColor: "blue",
        paddingLeft: 0,
        paddingRight: 0,
        width: "100%",
    },

    step:{
        //backgroundColor: "beige",
        paddingLeft: 0,
    },

    stepLabel:{
        //fontSize: "0.625rem"
    },
    
}))

export default useStyles;