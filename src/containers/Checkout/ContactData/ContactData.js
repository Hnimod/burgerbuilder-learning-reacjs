import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Zip code',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your e-mail',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
        placeholder: 'Method',
      },
      value: 'fastest',
      validation: {
        required: false,
      },
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const orderSubmitedHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIndentifier in orderForm) {
      formData[formElementIndentifier] =
        orderForm[formElementIndentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };

    props.onBurgerOrder(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    formValidityHandler();
    setOrderForm(updatedOrderForm);
  };

  const formValidityHandler = () => {
    const isValid = true;
    Object.keys(orderForm).forEach((curr) => {
      if (curr !== 'deliveryMethod') {
        if (orderForm[curr].valid && isValid) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      }
    });
  };

  const checkValidity = (value, rules) => {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    } else {
      isValid = true;
    }

    return isValid;
  };

  let form = (
    <form onSubmit={orderSubmitedHandler}>
      {Object.keys(orderForm).map((curr) => (
        <Input
          key={curr}
          elementType={orderForm[curr].elementType}
          elementConfig={orderForm[curr].elementConfig}
          value={orderForm[curr].value}
          changed={(event) => inputChangedHandler(event, curr)}
          invalid={!orderForm[curr].valid}
          shouldValidate={orderForm[curr].validation}
          touched={orderForm[curr].touched}
        />
      ))}
      <Button disabled={!isFormValid} btnType="Success">
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerOrder: (orderData, token) =>
      dispatch(actions.purchaseBurgerFetching(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
