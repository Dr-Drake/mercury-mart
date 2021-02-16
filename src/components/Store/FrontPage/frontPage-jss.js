import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    header:{
        backgroundImage: `url("/red-planet.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        //backgroundPosition: "center",
        backgroundSize: "cover",
        padding: 80,
        [theme.breakpoints.down('xs')]: {
            padding: 30,
        },
    },

    title:{
        color: "white",
        fontWeight: 500,
        fontSize: "3.75rem",
        [theme.breakpoints.down('md')]: {
            fontSize: "3.3rem !important",
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.8rem !important',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.4rem !important',
        },
    }
}))

export default useStyles;