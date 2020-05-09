import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MuiCssBaseline from '@material-ui/core/CssBaseline';
import MuiContainer from '@material-ui/core/Container';

import routes from 'src/routes';
import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <MuiCssBaseline />
                <Menu />
                <div className={classes.content}>
                    <Header />
                    <main className={classes.content}>
                        <MuiContainer maxWidth="lg" className={classes.container}>
                            <Switch>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} exact>
                                        {route.component}
                                    </Route>
                                ))}
                            </Switch>

                            <Footer />
                        </MuiContainer>
                    </main>
                </div>
            </div>
        </Router>
    );
}
