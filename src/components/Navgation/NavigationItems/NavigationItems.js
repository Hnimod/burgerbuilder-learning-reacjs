import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';
import Aux from '../../../hoc/Auxiliary';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
    {props.isAuthenticated ? (
      <Aux>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </Aux>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
