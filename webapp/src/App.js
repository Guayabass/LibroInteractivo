import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import SumaResta2 from './components/Libro1/SumaResta1/SumaResta1';
import PrivateRoute from './utils/PrivateRoute';

/* Este es el principal componente de la aplicacion, aqui se definen las rutas publicas y privadas del app.
 *  En esta definicion cualquier usuario puede ver la pagina de login y las demas rutas estan condicionadas
 *  a que un usuario este loggeado para poder ingresar, esto brinda una capa de seguridad al app (Ver PrivateRoute.js)
 */
function App() {
	return (
		<Router>
			<Container>
				<Switch>
					<Route path="/SumaResta1" exact={true}>
						<SumaResta2 />
					</Route>
					<Route path="/login" exact={true}>
						<Login />
					</Route>
					<PrivateRoute path="/">
						<Home />
					</PrivateRoute>
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
