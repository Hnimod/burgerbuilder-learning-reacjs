import React from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  const Component = (props) => {
    const [errorState, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={errorState} cancelOrder={clearError}>
          {errorState ? errorState.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };

  return Component;
};

export default withErrorHandler;
