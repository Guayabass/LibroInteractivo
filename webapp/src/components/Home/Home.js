import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";

import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import Header from '../Header/Header';
import Simple from '../Simple/Simple';
import Advance from '../Advance/Advance';
import ListExample from '../ListExample/ListExample';
import axios from 'axios'
import AprenderEspaniol2 from '../Libro1/AprenderEspaniol2/AprenderEspaniol2'
import SumaResta1 from '../Libro1/SumaResta1/SumaResta1';

/* 
    Esta es la pagina Home de la aplicacion, en la misma se encuentra un componente Header con un Switch que hace mostrar el componente en 
    la pagina que elija el usuario
*/
function Home(props) {
    const { path } = useRouteMatch();
    //Esta llamada al servidor verifica que el usuario este loggeado para ingresar a cualquier ruta del app
    useEffect(() => {
        axios.get(API_BASE_URL + '/user/me', { headers: { 'Authorization': localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .then(function (response) {
                if (response.status !== 200) {
                    redirectToLogin()
                }
            })
            .catch(function (error) {
                redirectToLogin()
            });
    })
    function redirectToLogin() {
        props.history.push('/login');
    }
    return (
        <Router>
            <div>
                <Header history={props.history}/>
                <Switch>
                    <Route path={path} exact={true}>
                        <ListExample />
                    </Route>
                    <Route path={'/simple'} exact={true}>
                        <Simple />
                    </Route>
                    <Route path={'/advance'} exact={true}>
                        <Advance />
                    </Route>
                    <Route path={'/AprenderEspaniol2'} exact={true}>
                        <AprenderEspaniol2 />
                    </Route>
                    <Route path={'/SumaResta1'} exact={true}>
                        <SumaResta1 />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default withRouter(Home);