import TableBackbone from '../TableBackbone/TableBacbone';
import SkeletonTableBackbone from '../TableBackbone/SkeletonTableBackbone';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TableCell from '@material-ui/core/TableCell';
import useStyles from './orderTable-jss';
import PropTypes from 'prop-types';

export default function OrderTable(props){

    const {
        data,
        isLoading,
    } = props;

    const statusColors = {
        pending: "#ffab00",
        approved: "#00d25b",
        rejected: "#fc424a",
        undefined: "purple"
    }

    const getColor = (status) =>{
        if (typeof(status) === "string"){
            let key = status.toLowerCase();
            
            if (statusColors[key]){
                return statusColors[key]
            } else {return statusColors.undefined}
        } else{
            return statusColors.undefined
        }
    };


    const classes = useStyles();
    const headerColumns = [
        { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
        { id: 'orderNo', numeric: false, disablePadding: false, label: 'Order No' },
        { id: 'cost', numeric: false, disablePadding: false, label: 'Total Price' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    ]

    
    const generateCells = (row, labelId) =>{
        var cells = [];
        var count = 1;
        for (var cell in row){
            
            if (count === 1){
                cells.push(      
                    <TableCell 
                        style={{width: "30%"}}
                        classes={{root: classes.tableCell}} 
                        component="th" 
                        id={labelId} 
                        scope="row"
                    >
                        <div className={classes.clientCellDiv}>
                            <div className={classes.avatarDiv}>
                                {
                                    isLoading ?
                                    <Skeleton width={25} height={25} circle={true}/> :
                                    <img
                                    src="/Luffy.jpg"
                                    alt={`${row[cell]}'s avatar`}
                                    />
                                }                                   
                            </div>
                            <div className={classes.clientCell}>
                                {
                                    isLoading ?
                                    <Skeleton count={1} /> :
                                    row[cell]
                                }   
                            </div>
                        </div>
                    </TableCell>          
                )
            } else if(cell === "status"){
                cells.push(
                    <TableCell 
                        classes={{root: classes.tableCell}}
                        align="center" 
                    >
                        {
                            isLoading ?
                            <div style={{
                                borderRadius: ".25rem",
                                padding: ".5rem .7rem",
                                fontSize: ".75rem",
                                width: "100%"
                            }}>
                               <Skeleton count={1} />
                            </div> :
                            <div style={{
                                color: `${getColor(row[cell])}`,
                                border: `1px solid ${getColor(row[cell])}`,
                                borderRadius: ".25rem",
                                padding: ".5rem .7rem",
                                fontSize: ".75rem",
                                width: "100%"
                            }}>
                                {row[cell]}
                            </div>
                        } 
                        
                    </TableCell>          
                )
            }
            else {
                cells.push(
                    <TableCell 
                    classes={{root: classes.tableCell}}  
                    align="left"
                    >
                        {
                            isLoading ?
                            <Skeleton count={1} /> :
                            row[cell]
                        }
                    </TableCell>          
                )
            }

            count++;
            
        }
        return cells
    }

    return(
       
           <TableBackbone
           enableCheckBoxPading
           enableEmptyRows
               generateCellsCallback={generateCells}
               headRow={headerColumns}
               bodyRows={data}
            />   
       
    )
}

OrderTable.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        client: PropTypes.string,
        orderNo: PropTypes.number,
        cost: PropTypes.number,
        date: PropTypes.instanceOf(Date),
        status: PropTypes.string

    })),
    isLoading: PropTypes.bool
}