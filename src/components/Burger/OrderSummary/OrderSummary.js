import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => (
    <li key={ingKey}>
      <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
      {props.ingredients[ingKey]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicous burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
