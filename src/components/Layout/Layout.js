import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navgation/Toolbar/Toolbar';
import SideDrawer from '../Navgation/SideDrawer/SideDrawer';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawIsVisible] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        openDrawer={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
