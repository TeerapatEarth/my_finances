'use client'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {
    Box, Stack, Grid, TextField, InputAdornment, Typography, IconButton, Snackbar,
    Alert, Table, TableContainer, TableCell, tableCellClasses, TableBody, TableHead, TableRow, Paper
} from '@mui/material';
import ModalAddList from './modal/modalAddList';
import { useState, useEffect } from 'react';
import { listDetail } from '@/model/listDetail';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/app/redux';
import { initialRevenue, addRevenue } from '@/app/redux/listRevenueReducer';
import { initialExpenses, addExpenses } from '@/app/redux/listExpensesReducer';
import { toggleFirstRenderSalary } from '@/app/redux/firstRenderReducer';
import { setSalary } from '@/app/redux/salaryReducer';
import RevenueService from '../service/RevenueService';
import ExpensesService from '@/service/ExpensesService';


let theme = createTheme({
    typography: {
        // Tell Material UI what the font-size on the html element is.
        htmlFontSize: 13,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

theme = responsiveFontSizes(theme);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function SalaryPlan() {

    const dispatch = useDispatch();
    const listRevenue = useSelector((state: RootState) => state.revenue.listRevenue)
    const listExpenses = useSelector((state: RootState) => state.expenses.listExpenses)
    const firstRenderSalary = useSelector((state: RootState) => state.firstRender.firstRenderSalary)
    const salary = useSelector((state: RootState) => state.salary.salary)

    const [openModalAddList, setOpenModalAddList] = useState(false)
    const [openSnackBarAddList, setOpenSnackBarAddList] = useState(false)
    const [openSnackBarAddListFail, setOpenSnackBarAddListFail] = useState(false)
    const [showLoadingAdd, setShowLoadingAdd] = useState(false)
    const [typeAddList, setTypeAddList] = useState('revenue')


    const handleOpenModalAddList = (type: string) => {
        setTypeAddList(type);
        setOpenModalAddList(true);
    };
    const handleCloseModalAddList = () => {
        setOpenModalAddList(false);
    }
    const handdleCloseSnackbar = () => {
        setOpenSnackBarAddList(false)
    }
    const handdleCloseSnackbarFail = () => {
        setOpenSnackBarAddListFail(false)
    }
    const addList = async (listDetail: listDetail) => {
        setShowLoadingAdd(true)
        let resultAddList = true
        if (typeAddList == 'Revenue') {
            const response: listDetail | null = await RevenueService.addRevenue(listDetail)
            if (response) {
                dispatch(addRevenue(response))
                setOpenSnackBarAddList(true)
                handleCloseModalAddList()
            } else {
                setOpenSnackBarAddListFail(true)
                resultAddList = false
            }
        } else {
            const response: listDetail | null = await ExpensesService.addExpenses(listDetail)
            if (response) {
                dispatch(addExpenses(response))
                setOpenSnackBarAddList(true)
                handleCloseModalAddList()
            } else {
                setOpenSnackBarAddListFail(true)
                resultAddList = false
            }
        }
        setShowLoadingAdd(false)
        return resultAddList
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRevenue: listDetail[] | null = await RevenueService.getAllRevenue()
                if (responseRevenue) {
                    dispatch(initialRevenue(responseRevenue))
                }
                const responseExpenses: listDetail[] | null = await ExpensesService.getAllExpenses()
                if (responseExpenses) {
                    dispatch(initialExpenses(responseExpenses))
                }
                dispatch(setSalary(21892))
                dispatch(toggleFirstRenderSalary(true))
            } catch (error: any) {
                console.error(error.message);
            }
        }

        if (!firstRenderSalary) {
            return () => {
                fetchData()
            }
        }
    }, []);

    return (
        <div>
            <Grid container mt={1}>
                <Grid item xs={12} md={12} lg={6} xl={3}>
                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        label="Salary"
                        variant="standard"
                        fullWidth
                        type='number'
                        value={salary}
                    />
                </Grid>
            </Grid>
            <Grid container mt={3} >

                {/* Revenue section */}
                <Grid item xs={12} md={12} lg={6} xl={6}>

                    <ThemeProvider theme={theme} >
                        <Stack direction={'row'}>
                            <Typography sx={{
                                fontFamily: 'sans-serif',
                            }} mt={0.5} mr={0.5}>Revenue
                            </Typography>
                            <IconButton size='small' color="primary" onClick={() => handleOpenModalAddList('Revenue')}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </ThemeProvider>
                    <Box margin={2} marginBottom={5}>
                        {listRevenue.length ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell >List</StyledTableCell>
                                            <StyledTableCell align={'right'}>Amount ( Baht )</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listRevenue.map((revenu) => (
                                            <StyledTableRow key={revenu._id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {revenu.list}
                                                </StyledTableCell>
                                                <StyledTableCell align={'right'}>{revenu.amounts}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <Box textAlign={'center'} mt={10}>
                                <Typography sx={{
                                    fontFamily: 'sans-serif',
                                }} mb={1}>
                                    No revenue
                                </Typography>
                                <InsertDriveFileIcon style={{ fontSize: 60, color: 'gray' }} />
                            </Box>
                        }
                    </Box>
                </Grid>

                {/* Expenses section */}
                <Grid item xs={12} md={12} lg={6} xl={6}>
                    <ThemeProvider theme={theme} >
                        <Stack direction={'row'}>
                            <Typography sx={{
                                fontFamily: 'sans-serif',
                            }} mt={0.5} mr={0.5}>Expenses</Typography>
                            <IconButton size='small' color="primary" onClick={() => handleOpenModalAddList('Expenses')}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </ThemeProvider>
                    <Box margin={2}>
                        {listExpenses.length ? <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 100 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>List</StyledTableCell>
                                        <StyledTableCell align={'right'}>Amount ( Baht )</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listExpenses.map((expenses, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell component="th" scope="row">
                                                {expenses.list}
                                            </StyledTableCell>
                                            <StyledTableCell align={'right'}>{expenses.amounts}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            :
                            <Box textAlign={'center'} mt={10}>
                                <Typography sx={{
                                    fontFamily: 'sans-serif',
                                }} mb={1}>
                                    No expenses
                                </Typography>
                                <InsertDriveFileIcon style={{ fontSize: 60, color: 'gray' }} />
                            </Box>
                        }
                    </Box>
                </Grid>
            </Grid>

            <ModalAddList
                open={openModalAddList}
                onClose={handleCloseModalAddList}
                addList={addList}
                type={typeAddList}
                showLoading={showLoadingAdd}
            />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackBarAddList}
                autoHideDuration={3000}
                onClose={handdleCloseSnackbar}
            >
                <Alert
                    onClose={handdleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Add new {typeAddList.toLowerCase()} success.
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackBarAddListFail}
                autoHideDuration={3000}
                onClose={handdleCloseSnackbarFail}
            >
                <Alert
                    onClose={handdleCloseSnackbarFail}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    Add new {typeAddList.toLowerCase()} fail.
                </Alert>
            </Snackbar>
        </div>
    );
}
