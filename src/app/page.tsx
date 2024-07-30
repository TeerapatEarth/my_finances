'use client'
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import SalaryPlan from '@/component/salaryPlan';
import Invest from '@/component/invest';
import MonneyDetail from '@/component/moneyDetail';
import { Provider } from "react-redux"
import { store } from './redux';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Home() {
    const [valueTab, setValueTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };

    return (
        <div>
            <Provider store={store}>
                <div className="text-center text-6xl mb-5 font-mono font-semibold text-zinc-50 bg-slate-700">
                    <Box paddingTop={3} paddingBottom={20}>
                        My Finances
                    </Box>
                </div>
                <Grid
                    style={{ position: "relative", top: "-8rem" }}
                    container
                    spacing={2}
                    paddingLeft={3}
                    paddingRight={2}
                    alignItems="center"
                    justifyContent="center">
                    <Grid item xs={12} md={8} className="bg-white" borderRadius={5} padding={5} minHeight={650}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example" scrollButtons="auto" variant="scrollable">
                                    <Tab label="Salary plan" {...a11yProps(0)} />
                                    <Tab label="Monney Detail" {...a11yProps(1)} />
                                    <Tab label="Invest" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={valueTab} index={0}>
                                <SalaryPlan />
                            </CustomTabPanel>
                            <CustomTabPanel value={valueTab} index={1}>
                                <MonneyDetail />
                            </CustomTabPanel>
                            <CustomTabPanel value={valueTab} index={2}>
                                <Invest />
                            </CustomTabPanel>
                        </Box>
                    </Grid>
                </Grid>
            </Provider>
        </div>
    );
}
