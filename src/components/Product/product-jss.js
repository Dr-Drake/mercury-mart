import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapper:{
        display: "grid",
        //gridTemplateColumns: "repeat(3, 1fr)" reference purpose
        gridTemplateColumns: "1fr 2fr 1fr",
        gridGap: "1em",
        //justifyItems: "start" reference purpose
        //gridTemplateRows: "100px",
        gridAutoRows: "80px"
    },

    imageWrapper:{
        //background: `url("/default_product.png") 50% 50% no-repeat`,
        padding: "0 30px 0 0",
        '& img':{
            color: "white", 
            width: "100%",
            height: "100%"
        },
        
    },

    description:{
        display: "flex",
        '& h5':{
            fontSize: "1.0625", 
            margin: 0,
            color: "white",
            fontWeight: 500,
        }
    },

    category:{
        '& p':{
            margin : 0,
            padding: 0,
            color: "#6c7293",
            fontSize: ".875rem",
        },
    },

    price:{ 
        '& h4':{
            color: "white",
            fontSize: "1.0625",
            fontWeight: 500,
            margin: 0,
        },
    }
})

export default useStyles;