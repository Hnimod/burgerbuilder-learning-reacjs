import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {
  const { onInitIngredients } = props;
  // state = {
  //   ordered: false,
  // };
  const [ordered, setOrdered] = useState(false);

  // componentDidMount() {
  //   this.props.onInitIngredients();
  // }
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => ingredients[ingKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const orderBtnHandler = () => {
    if (props.isAuthenticated) {
      setOrdered(true);
    } else {
      props.onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const backdropHandler = () => {
    setOrdered(false);
  };

  const cancelOrderHandler = () => {
    setOrdered(false);
  };

  const continueOrderHandler = () => {
    props.history.push('/checkout');
    props.onInitPurchase();
  };

  const disabledInfo = { ...props.ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Can not load ingredients</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientsAdded={props.onIngredientAdded}
          ingredientsRemoved={props.onIngredientRemoved}
          disabledButton={disabledInfo}
          price={props.totalPrice}
          orderDisabled={!updatePurchaseState(props.ingredients)}
          ordered={orderBtnHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSumary
        ingredients={props.ingredients}
        canceled={cancelOrderHandler}
        continued={continueOrderHandler}
        totalPrice={props.totalPrice}
      />
    );
  }

  return (
    <Aux>
      <Modal show={ordered} cancelOrder={backdropHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
