import {useEffect , useState} from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import LineChart from '../Chart/LineChart';

export default function SummaryChart(props){
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <Card>
            <CardHeader title="Summary" />
            <CardContent>
                <LineChart />
            </CardContent>
        </Card>
    )
}