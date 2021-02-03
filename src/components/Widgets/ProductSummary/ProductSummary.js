import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './productSummary-jss';
import Product from '../../Product/Product';

export default function ProductSummary(props){
    const classes = useStyles();
    return(
        <TableContainer component={Card} classes={{root: classes.card}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell classes={{root: classes.cardHeader}}>
                            Top selling products
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        [0, 1, 2].map((item)=>(
                            <TableRow>
                                <TableCell classes={{root: classes.cell}} >
                                    <Product />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}