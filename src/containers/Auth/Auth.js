import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(true);

  const { isBuilding, redirectPath, onSetAuthRedirectPath } = props;
  useEffect(() => {
    if (!isBuilding && redirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [isBuilding, redirectPath, onSetAuthRedirectPath]);

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = emailPattern.test(value.toLowerCase()) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= 6 && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsSignup(!isSignup);
  };

  let form = (
    <form className={classes.Auth}>
      {Object.keys(controls).map((curr) => (
        <Input
          key={curr}
          elementType={controls[curr].elementType}
          elementConfig={controls[curr].elementConfig}
          value={controls[curr].value}
          changed={(event) => inputChangedHandler(event, curr)}
          invalid={!controls[curr].valid}
          shouldValidate={controls[curr].validation}
          touched={controls[curr].touched}
        />
      ))}
      <Button clicked={submitHandler} btnType="Success">
        SUBMIT
      </Button>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <h1 style={{ textAlign: 'center' }}>{props.error.message}</h1>
    );
  }

  return (
    <div>
      {errorMessage}
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
    redirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
