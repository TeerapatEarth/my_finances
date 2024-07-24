'use client'
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, Grid, TextField, InputAdornment, Typography, IconButton, Snackbar, Alert, List, ListItem, ListItemButton } from '@mui/material';
import ModalAddRevenue from './modal/modalAddRevenue';
import { useState } from 'react';
import { Revenue } from '@/model/revenue';


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


export default function SalaryPlan() {

    const [openModalRevenue, setOpenModalRevenue] = useState(false)
    const [listRevenue, setListRevenue] = useState<Revenue[]>([{ list: 'Share', amounts: 120000000000000 }, { list: 'Emergency fund', amounts: 12 }])
    const [openSnackBarAddRevenue, setOpenSnackBarAddRevenue] = useState(false)
    const [salary, setSalary] = useState<number>(21892)


    const handleOpenModalRevenue = () => {
        setOpenModalRevenue(true);
    };
    const handleCloseModalRevenue = () => {
        setOpenModalRevenue(false);
    }
    const handdleCloseSnackbar = () => {
        setOpenSnackBarAddRevenue(false)
    }
    const addRevenue = (revenue: Revenue) => {
        const newRevenueList: Revenue[] = listRevenue
        listRevenue.push(revenue)
        setListRevenue(newRevenueList)
        setOpenSnackBarAddRevenue(true)
        handleCloseModalRevenue()
    }
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
                        value={salary   }
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
                            <IconButton size='small' color="primary" onClick={handleOpenModalRevenue}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </ThemeProvider>
                    {listRevenue.map((revenue, index) =>
                        <Box key={index} borderRadius={100}>
                            <List dense={false} disablePadding>
                                <ListItemButton>
                                    <Grid container >
                                        <Grid item xs={4} textAlign={'end'} >
                                            <Typography variant="subtitle1" noWrap>
                                                {revenue.list}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}  textAlign={'center'}>
                                            <Typography variant="subtitle1"> : </Typography>
                                        </Grid>
                                        <Grid item xs={6}  textAlign={'center'}>
                                            <Typography variant="subtitle1">
                                                {revenue.amounts}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </List>
                        </Box>
                    )}
                </Grid>

                {/* Expenses section */}
                <Grid item xs={12} md={12} lg={6} xl={6}>
                    <ThemeProvider theme={theme} >
                        <Stack direction={'row'}>
                            <Typography sx={{
                                fontFamily: 'sans-serif',
                            }} mt={0.5} mr={0.5}>Expenses</Typography>
                            <IconButton size='small' color="primary">
                                <AddIcon />
                            </IconButton>
                        </Stack>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <ModalAddRevenue
                open={openModalRevenue}
                onClose={handleCloseModalRevenue}
                addRevenue={addRevenue} />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackBarAddRevenue}
                autoHideDuration={3000}
                onClose={handdleCloseSnackbar}
            >
                <Alert
                    onClose={handdleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Add new revenu success
                </Alert>
            </Snackbar>
        </div>
    );
}
