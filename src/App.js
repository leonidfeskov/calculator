import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'src/App.css';

import MuiCssBaseline from '@material-ui/core/CssBaseline';
import MuiContainer from '@material-ui/core/Container';

import routes from 'src/routes';
import Header from 'src/components/Header';
import Menu from 'src/components/Menu';
import Footer from 'src/components/Footer';

export default function Dashboard() {
    return (
        <Router>
            <div className="app-container">
                <MuiCssBaseline />
                <Menu />
                <div className="app-content">
                    <Header />
                    <main>
                        <MuiContainer maxWidth="lg">
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
