import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import NotFound from './components/UI/NotFound/NotFound';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  });

  let routes = (
    <Switch>
      <Route path="/burger-builder" component={BurgerBuilder} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect exact from="/" to="/burger-builder" />
      <Route component={NotFound} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/burger-builder" component={BurgerBuilder} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Redirect exact from="/" to="/burger-builder" />
        <Route component={NotFound} />
      </Switch>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.redirectPath} />;
  }

  return (
    <div>
      <Layout>
        {authRedirect}
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
