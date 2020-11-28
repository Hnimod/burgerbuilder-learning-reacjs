import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        label={ctrl.label}
        key={ctrl.label}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabled={props.disabledButton[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.orderDisabled}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControls;
