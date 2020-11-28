const updateState = (oldState, updatedObject) => {
  return {
    ...oldState,
    ...updatedObject,
  };
};

export default updateState;
