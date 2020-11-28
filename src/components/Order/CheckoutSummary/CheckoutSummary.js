import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.canceledCheckout}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continuedCheckout}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
