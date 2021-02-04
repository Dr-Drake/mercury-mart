import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) =>({
    header:{
        backgroundImage: `url("/red-planet.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        //backgroundPosition: "center",
        backgroundSize: "cover",
        padding: 80
    },

    title:{
        color: "white",
        fontWeight: 500
    }
}))

export default useStyles;