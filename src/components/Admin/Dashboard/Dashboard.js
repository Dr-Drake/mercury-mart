import ReportCard from "../../Widgets/ReportCard/ReportCard";
import Grid from '@material-ui/core/Grid';
import useStyles from './dashboard-jss';
import ChartSummary from '../../Widgets/ChartSummary/ChartSummary';
import ProductSummary from '../../Widgets/ProductSummary/ProductSummary';
import LineChart from '../../Chart/LineChart';

export default function Dashboard(props){
    const classes = useStyles();

    return(
        <div style={{flexGrow: 1, padding: 20, background: "#000"}}>
            <Grid container spacing={3}>

                <Grid item classes={{root: classes.reportCards}}>
                    <Grid container spacing={3}>
                    {[0, 1, 2, 3].map((value) => (
                        <Grid key={value} item xs={12} sm={6} md={3}>
                            <ReportCard title="Total Revenue Earned Yesterday" />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
                <Grid item style={{width: "100%", backgroundColor: "orange"}}>
                    <Grid container spacing={3}>
                       <Grid item xs sm md={6}>
                           <ChartSummary />
                       </Grid>
                       <Grid item xs sm md={6}>
                           <ProductSummary />
                       </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}