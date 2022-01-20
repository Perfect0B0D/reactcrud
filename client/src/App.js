/*  _____ _______         _                      _
* |_   _|__   __|       | |                    | |
*   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
*   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
*  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
* |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
*                                _
*              ___ ___ ___ _____|_|_ _ _____
*             | . |  _| -_|     | | | |     |  LICENCE
*             |  _|_| |___|_|_|_|_|___|_|_|_|
*             |_|
*
* IT ZPRAVODAJSTVÍ  <>  PROGRAMOVÁNÍ  <>  HW A SW  <>  KOMUNITA
*
* Tento zdrojový kód je součástí výukových seriálů na
* IT sociální síti WWW.ITNETWORK.CZ
*
* Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
* našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
* Více informací na http://www.itnetwork.cz/licence
*/
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';

import MovieIndex from './movies/MovieIndex';
import MovieDetail from './movies/MovieDetail';
import MovieForm from './movies/MovieForm';

import PersonIndex from './persons/PersonIndex';
import PersonDetail from './persons/PersonDetail';
import PersonForm from './persons/PersonForm';

export function App() {
    return (
        <Router>
            <div className="container">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/movies"} className="nav-link">Filmy</Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/people"} className="nav-link">Osobnosti</Link>
                        </li>
                    </ul>

                </nav>

                <Switch>
                    <Route exact path="/movies" component={ MovieIndex } />
                    <Route path="/movies/show/:id" component={ MovieDetail } />
                    <Route path="/movies/create" component={ MovieForm } />
                    <Route path="/movies/edit/:id" component={ MovieForm } />

                    <Route exact path="/people" component={ PersonIndex } />
                    <Route path="/people/show/:id" component={ PersonDetail } />
                    <Route path="/people/create" component={ PersonForm } />
                    <Route path="/people/edit/:id" component={ PersonForm } />
                </Switch>

            </div>

            <Redirect from="/" to="/movies" />
        </Router>
    );
}

export default App;