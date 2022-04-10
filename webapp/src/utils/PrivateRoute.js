import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';

/* Este componente tiene la funcionalidad de proveer seguridad a la aplicacion mediante 
*  la solicitud de un token al servidor del usuario loggeado, si no hay ninguno este
*  devuelve al usuario a la pagina de login
*/
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem(ACCESS_TOKEN_NAME) ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;