import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {},
});

export default function DenseTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Todo</TableCell>
                        <TableCell align="right">User</TableCell>
                        <TableCell align="right">Completed</TableCell>

                        <TableCell align="right">Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.lista.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.testo}
                            </TableCell>
                            <TableCell align="right">
                                {row.user}
                            </TableCell>
                            <TableCell align="right">
                                {row.completed ? 'true' : 'false'}
                            </TableCell>

                            <TableCell align="right">
                                {row.data}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
