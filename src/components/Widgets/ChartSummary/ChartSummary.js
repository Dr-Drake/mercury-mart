import {useEffect , useState} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../TabPanel/TabPanel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import LineChart from '../../Chart/LineChart';
import useStyles from './chartSummary-jss';

export default function ChartSummary(props){
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Card classes={{root: classes.card}}>
            <CardHeader 
                title="Summary" 
                classes={{title: classes.cardHeader}}
            />
            <Divider classes={{root: classes.divider}} />
            <div role="graph-selector"> 
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    classes={{indicator: classes.tabIndicator}}
                >
                    {
                        ["Sales", "Revenue", "Cost", "Vibes"].map((item)=>(
                            <Tab 
                                key={item} 
                                label={item} 
                                classes={{root:classes.tab, selected: classes.tabSelected}} />
                        ))
                    }
                </Tabs>
            </div>
            <CardContent>
                <TabPanel value={value} index={0}>
                    <LineChart />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <LineChart color="blue" />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <LineChart color="olive"/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <LineChart color="bisque"/>
                </TabPanel>
            </CardContent>
        </Card>
    )
}