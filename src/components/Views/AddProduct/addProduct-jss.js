import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({

    card:{
        backgroundColor: "#191c24",
        padding: "15px"
    },

    adornment:{
        marginRight: 5,
        color: "white"
    },

    container:{
        flexGrow: 1, padding: 0, background: "#000",
        [theme.breakpoints.down("md")]:{
            padding: 20
        },

    },

    main:{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "1em",
        [theme.breakpoints.down("sm")]:{
            gridTemplateColumns: "3fr 4fr 4fr",
        },
    },

    grid1:{
        gridRow: "1/3",
        [theme.breakpoints.down("sm")]:{
            gridColumn: "1/4"
        },
    },

    grid2:{
        gridColumn: "1/2",
        [theme.breakpoints.down("sm")]:{
            justifySelf: "stretch",
            gridColumn: "1/4"
        },

        [theme.breakpoints.down("xs")]:{
            backgroundColor: "orange",
            justifySelf: "stretch",
            gridColumn: "1/4"
        },
    },

    pageTitle:{
        fontWeight: 500,
        fontSize: 25,
        color: "white",
    },

    addButtonIcon:{
        fontSize: ".8rem",
        padding: 0,
    },

    addButtonGroup:{
        '& p':{
            fontSize: "0.7rem", 
            fontWeight: 500,
            padding: 0,
            margin: 0,
            //margin:"0 0 0 3px",
            color: "#6c7293",
        }
    },

    serialField:{
        height: 30,
        fontSize: "0.8rem", 
    },

    tablecell:{
        borderBottom: "2px solid #2c2e33",
        color: "#6c7293"
    },

    previousButton:{
        color: "white"
    },

    inputLabel:{
        color: "white",
    },

    inputField:{
        color: "white",
    },

    textField:{
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    }
}))

export default useStyles;