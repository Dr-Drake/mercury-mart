import Grid from '@material-ui/core/Grid';
import OrderToolbar from '../../Toolbar/OrderToolbar/OrderFilterToolbar';
import OrderTable from '../../Tables/OrderTable/OrderTable';
import useStyles from './orderPage-jss';
import { useCallback, useState } from 'react';


export default function OrderPage(props){
    const classes = useStyles();
    const fields = ["client", "orderNo", "cost", "date", "status"];
    const data = [
        {client: "Joshua smith", orderNo: "1234572", cost: 356000, date: "04 DEC 2019", status: "Pending"},
        {client: "Ikem Faith", orderNo: "1234571", cost: 56000, date: "04 DEC 2019", status: "Rejected"},
        {client: "Donald West", orderNo: "1234570", cost: 36000, date: "04 DEC 2019", status: "Pending"},
        {client: "Kanye Trump", orderNo: "1234569", cost: 41500, date: "04 DEC 2019", status: "Pending"},
        {client: "Kim Cabbage", orderNo: "1234568", cost: 35000, date: "04 DEC 2019", status: "Pending"},
        {client: "Lettuce Kardashian", orderNo: "1234567", cost: 476000, date: "04 DEC 2019", status: "Approved"},
        {client: "Ronaldo messi", orderNo: "1234566", cost: 90000, date: "04 DEC 2019", status: "Pending"},
        {client: "Mbappe Neymar", orderNo: "1234565", cost: 62000, date: "04 DEC 2019", status: "Approved"},
        {client: "Sasuke Uzumaki", orderNo: "1234564", cost: 720000, date: "04 DEC 2019", status: "Pending"},
        {client: "Roronoa Zoro", orderNo: "1234563", cost: 12000, date: "04 DEC 2019", status: "Rejected"},
        {client: "Killua Gon", orderNo: "1234562", cost: 3000, date: "04 DEC 2019", status: "Pending"},
        {client: "Emmanuel Fabain", orderNo: "1234561", cost: 282000, date: "04 DEC 2019", status: "Pending"},
    ]
   
    let filteredData = data;

    const [tableData, setTableData] = useState(data)

    const formatFilter = (field, operator, inputValue)=>{
        let lowerField = field;

        if (typeof(field) !== "string"){
            lowerField = field.toString();
        }

        switch(operator){
            case "contains":
                return lowerField.toLowerCase().includes(inputValue);
            
            case "equals":
                return lowerField.toLowerCase() === inputValue
            
            case "starts with":
                return lowerField.toLowerCase().startsWith(inputValue);

            case "greater than":
                return lowerField.toLowerCase() > inputValue;

            case "less than":
                return lowerField.toLowerCase() < inputValue;
            
            default:
                return lowerField.toLowerCase().endsWith(inputValue);
        }
    }


    const applyFilters = (filters) =>{
        //console.log(filters)

        for (let i = 0; i < filters.length; i++){
            filteredData = filteredData.filter((row)=>{
                //console.log(row[filters[i].field])
                return formatFilter(row[filters[i].field], filters[i].operator, filters[i].inputValue);
            })
        }

        setTableData(filteredData);
        
    }

    const resetFilters = () =>{
        setTableData(data);
    }


    return(
        <div style={{flexGrow: 1, padding: 20, background: "#000"}}>
            <Grid container spacing={3}>
                
                <Grid xs={12} item>
                    <OrderToolbar 
                        filterFields={fields} 
                        applyFilters={applyFilters} 
                        resetFilters={resetFilters} 
                    />
                </Grid>

                <Grid xs={12} item>
                    <OrderTable data={tableData} />
                </Grid>

            </Grid>
        </div>
    )
}