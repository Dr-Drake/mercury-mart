import TableBackbone from '../TableBackbone/TableBacbone';
import SkeletonTableBackbone from '../TableBackbone/SkeletonTableBackbone';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TableCell from '@material-ui/core/TableCell';
import useStyles from './productTable-jss';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

export default function ProductTable(props){

    const {
        data,
        isLoading,
    } = props;


    const classes = useStyles();
    const headerColumns = [
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
        { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
        { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },
    ]
    
    const generateCells = (row, labelId) =>{
        var cells = [];
        var count = 1;
        for (var cell in row){
            
            if (count === 1){
                cells.push(      
                    <TableCell 
                        style={{width: "25%"}}
                        classes={{root: classes.tableCell}} 
                        component="th" 
                        id={labelId} 
                        scope="row"
                    >
                        <div className={classes.nameCellDiv}>
                            <div className={classes.imageDiv}>
                                {
                                    isLoading ?
                                    <Skeleton width={50} height={50} /> :
                                    <img
                                    src="/default-store.jpg"
                                    alt={`${row[cell]}'s avatar`}
                                    />
                                }                                   
                            </div>
                            <div className={classes.nameCell}>
                                {
                                    isLoading ?
                                    <Skeleton count={1} /> :
                                    row[cell]
                                }   
                            </div>
                        </div>
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
       <SkeletonTheme color="#E0E0E0" highlightColor="#444">
            <SkeletonTableBackbone
            enableCheckBoxPading
            enableEmptyRows
            isLoading={isLoading}
            generateCellsCallback={generateCells}
            headRow={headerColumns}
            bodyRows={data}
            /> 
       </SkeletonTheme>
    )
}

ProductTable.propTypes={
    data: PropTypes.arrayOf(PropTypes.shape({
        client: PropTypes.string,
        orderNo: PropTypes.number,
        cost: PropTypes.number,
        date: PropTypes.string,
        status: PropTypes.string

    })),
}