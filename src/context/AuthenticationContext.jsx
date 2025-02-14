import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useAuthentication from '../hooks/useAuthentication';

const AuthenticationContext = createContext();

export const useAuthenticationContext = () => useContext(AuthenticationContext);

export const AuthenticationProvider = ({ children }) => {
  const auth = useAuthentication();

  return (
    <AuthenticationContext.Provider value={auth}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

