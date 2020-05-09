import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MuiCssBaseline from '@material-ui/core/CssBaseline';
import MuiContainer from '@material-ui/core/Container';

import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';


import routes from './routes';

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
      <Router>
        <div className={classes.root}>
          <MuiCssBaseline />
          <Header isOpenMenu={openMenu} handleDrawerOpen={handleDrawerOpen} />
          <Menu isOpenMenu={openMenu} handleDrawerClose={handleDrawerClose} />

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
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
      </Router>

  )
}
