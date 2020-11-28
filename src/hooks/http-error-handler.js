import { useState, useEffect } from 'react';

export default (httpClient) => {
  const [errorState, setErrorState] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setErrorState(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => setErrorState(err)
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.response.eject(reqInterceptor);
      httpClient.interceptors.request.eject(resInterceptor);
    };
  }, [
    resInterceptor,
    reqInterceptor,
    httpClient.interceptors.response,
    httpClient.interceptors.request,
  ]);

  const errorConfirmedHandler = () => {
    setErrorState(null);
  };

  return [errorState, errorConfirmedHandler];
};
