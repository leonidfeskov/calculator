import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiCssBaseline from '@material-ui/core/CssBaseline';
import MuiContainer from '@material-ui/core/Container';
import MuiGrid from '@material-ui/core/Grid';

import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';
import CreditForm from 'src/components/CreditForm';
import SummaryMonthCount from 'src/components/SummaryMonthCount';
import SummaryOverpayment from 'src/components/SummaryOverpayment';
import PaymentSchedule from 'src/components/PaymentSchedule';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };
    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    return (
        <div className={classes.root}>
            <MuiCssBaseline />
            <Header isOpenMenu={openMenu} handleDrawerOpen={handleDrawerOpen} />
            <Menu isOpenMenu={openMenu} handleDrawerClose={handleDrawerClose} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <MuiContainer maxWidth="lg" className={classes.container}>
                    <MuiGrid container spacing={4}>
                        <MuiGrid item xs={12} md={12} lg={12}>
                            <CreditForm />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={4}>
                        <MuiGrid item xs={12} md={6} lg={6}>
                            <SummaryMonthCount />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={6} lg={6}>
                            <SummaryOverpayment />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container spacing={4}>
                        <MuiGrid item xs={12}>
                            <PaymentSchedule />
                        </MuiGrid>
                    </MuiGrid>
                    <Footer />
                </MuiContainer>
            </main>
        </div>
    );
}
