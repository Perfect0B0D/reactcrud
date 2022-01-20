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
import React, {Component} from 'react';
import {ApiGet} from '../common/Api';
import PersonTable from './PersonTable';
import PersonFilter from './PersonFilter';
import Role from './Role';

export default class PersonIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            directors: [],
            actors: [],

            directorLimit: '',
            actorLimit: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(role) {
        if (Role.DIRECTOR === role) {
            ApiGet('/api/directors')
                .then(data => this.setState({directors: data}));
        }

        if (Role.ACTOR === role) {
            ApiGet('/api/actors')
                .then(data => this.setState({actors: data}));
        }
    }

    componentDidMount() {
        ApiGet('/api/directors')
            .then(data => this.setState({directors: data}));

        ApiGet('/api/actors')
            .then(data => this.setState({actors: data}));
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const directorLimit = parseInt(this.state.directorLimit);
        const actorLimit = parseInt(this.state.actorLimit);

        if (directorLimit) {
            const params = {
                limit: this.state.directorLimit
            };

            ApiGet('/api/directors', params)
                .then(data => this.setState({directors: data}))
        }

        if (actorLimit) {
            const params = {
                limit: this.state.actorLimit
            };

            ApiGet('/api/actors', params)
                .then(data => this.setState({actors: data}))
        }
    }

    render() {
        const moreActors = (this.state.actors.length > this.state.directors.length);

        return (
            <div>
                <h3>Seznam osobností</h3>
                <hr/>

                <div className="row">
                    <div className="col">
                        <PersonFilter name={'actorLimit'} handleChange={this.handleChange}
                                      handleSubmit={this.handleSubmit} value={this.state.actorLimit}
                                      label="Limit počtu herců" confirm="Filtrovat herce:" />
                    </div>
                    <div className="col">
                        <PersonFilter name={'directorLimit'} handleChange={this.handleChange}
                                      handleSubmit={this.handleSubmit} value={this.state.directorLimit}
                                      label="Limit počtu režisérů" confirm="Filtrovat režiséry:" />
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col">
                        <PersonTable role={Role.ACTOR} delete={this.delete} items={this.state.actors}
                                     label="Počet herců:" link={!moreActors} />
                    </div>
                    <div className="col">
                        <PersonTable role={Role.DIRECTOR} delete={this.delete} items={this.state.directors}
                                     label="Počet režisérů:" link={moreActors} />
                    </div>
                </div>
            </div>
        );
    }

}