import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const continuedCheckout = () => {
    props.history.replace('/checkout/contact-data');
  };

  const canceledCheckout = () => {
    props.history.replace('/');
  };

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          continuedCheckout={continuedCheckout}
          canceledCheckout={canceledCheckout}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
