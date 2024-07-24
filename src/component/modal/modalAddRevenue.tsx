import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Button, Box, InputAdornment } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';

export default function modalAddRevenue(props: any) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [valueList, setValueList] = useState<string>('')
    const changeValueList = (value: string) => {
        setValueList(value)
    }

    const [valueAmounts, setValueAmounts] = useState<string>('')
    const changeValueAmounts = (value: string) => {
        setValueAmounts(value)
    }

    const addRevenue = () => {
        props.addRevenue({ list: valueList, amounts: valueAmounts })
        setValueList('')
        setValueAmounts('')
    }



    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                fullWidth
                open={props.open}
                onClose={props.onClose}>
                <DialogTitle>Revenue</DialogTitle>
                <DialogContent >
                    <Grid
                        container
                    >
                        <Grid item xs={3} textAlign={'end'} paddingRight={2} paddingTop={1}>
                            List
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                onChange={(e) => changeValueList(e.target.value)}
                                value={valueList}
                                variant="standard"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        mt={5}
                        container
                    >
                        <Grid item xs={3} textAlign={'end'} paddingRight={2} paddingTop={1}>
                            Amounts
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                onChange={(e) => changeValueAmounts(e.target.value)}
                                value={valueAmounts}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                }}
                                variant="standard"
                                fullWidth
                                type='number'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box margin={2}>
                        <Button autoFocus onClick={props.onClose} >
                            Cancel
                        </Button>
                    </Box>
                    <Box margin={2}>
                        <Button onClick={addRevenue} autoFocus >
                            Add
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

        </div>
    )
}
