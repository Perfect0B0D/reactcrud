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
import DateStringFormatter from '../common/DateStringFormatter';
import Role from './Role';

export default class PersonDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personName: '',
            birthDate: '',
            country: '',
            biography: '',
            personRole: '',
        }
    }

    componentDidMount() {
        ApiGet('/api/people/' + this.props.match.params.id)
            .then(data => this.setState({
                personName: data.name,
                birthDate: DateStringFormatter(data.birthDate, true),
                country: data.country,
                biography: data.biography,
                personRole: data.role,
            }))
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const role = (Role.DIRECTOR === this.state.personRole) ? 'Režisér' : 'Herec';
        
        return (
            <div>
                <h1>Detail osobnosti</h1><hr />
                <h3>{this.state.personName}</h3>
                <p>
                    {role}, nar. {this.state.birthDate}, {this.state.country}.
                </p>
                <p>
                    <strong>Biografie:</strong><br />
                    {this.state.biography}
                </p>
            </div>
        )
    }

}