import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import useStyles from "./reportCard-jss";

export default function ReportCard(props){
    const classes = useStyles();

    const {
        title,
        value,
        Icon,
        SummaryIcon,
        summary
    } = props

    return(
        <Card classes={{root:classes.card}}>
            <CardContent>
                <div style={{ 
                    display: "flex", 
                    justifyContent:"space-between",
                    alignItems: "center"
                }}>
                    
                    <div>
                       {    Icon ? 
                            <Icon /> : 
                            <ReceiptOutlinedIcon classes={{root: classes.icon}}/>
                       } 
                    </div>
                    <div>
                       <p className={classes.title}>{title ? title : "Orders"}</p>
                       <div><h3 className={classes.value}>{value ? value : "3455"}</h3></div>
                    </div>

                </div>
                <p className={classes.summary}>
                    <span style={{position:"relative", top: "2px"}}>
                        {   SummaryIcon ? 
                            <SummaryIcon /> : 
                            <BookmarkBorderOutlinedIcon classes={{root: classes.summaryIcon}} />
                        } 
                    </span>
                    
                    {summary ? summary : "Product-wise sales"}
                </p>
            </CardContent>
        </Card>
    )   

}