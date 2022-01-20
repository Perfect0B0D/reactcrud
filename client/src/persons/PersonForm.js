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
import {ApiGet, ApiPost, ApiPut} from '../common/Api';
import DateStringFormatter from '../common/DateStringFormatter';
import FlashMessage from '../common/FlashMessage';
import InputField from "../common/InputField";
import InputCheck from "../common/InputCheck";
import Role from './Role';

export default class PersonForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            personId: null,

            personName: '',
            birthDate: '',
            country: '',
            biography: '',
            personRole: '',

            sent: false,
            success: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;

        if (id) {
            this.setState({personId: id});

            ApiGet('/api/people/' + id)
                .then(data => {
                    this.setState({
                        personName: data.name,
                        birthDate: DateStringFormatter(data.birthDate),
                        country: data.country,
                        biography: data.biography,
                        personRole: data.role,
                    });
                });
        }
    }

    handleChange(e) {
        const target = e.target;

        this.setState({[target.name]: target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        const body = {
            name: this.state.personName,
            birthDate: this.state.birthDate,
            country: this.state.country,
            biography: this.state.biography,
            role: this.state.personRole,
        };

        (this.state.personId
                ? ApiPut('/api/people/' + this.props.match.params.id, body)
                : ApiPost('/api/people/', body)
        ).then((data) => {
            console.log(data);

            this.setState({
                sent: true,
                success: true,
            });
        }).catch((error) => {
            console.error(error);

            this.setState({
                sent: true,
                success: false,
            });
        });
    }

    render() {
        const id = this.state.personId;
        const sent = this.state.sent;
        const success = this.state.success;

        return (
            <div>
                <h1>{id ? 'Vytvořit' : 'Upravit'} osobnost</h1>
                <hr/>
                {sent && <FlashMessage theme={success ? 'success' : 'danger'}
                                        text={success ? 'Uložení osobnosti proběhlo úspěšně.'
                                                      : 'Chyba při ukládání osobnosti.'}/>}

                <form onSubmit={this.handleSubmit}>
                    <InputField required={true} type="text" name="personName" min="3"
                                label="Jméno" prompt="Zadejte celé jméno"
                                value={this.state.personName} handleChange={this.handleChange}/>

                    <InputField required={true} type="date" name="birthDate"
                                label="Datum narození" prompt="Zadejte datum narození" min="0000-01-01"
                                value={this.state.birthDate} handleChange={this.handleChange}/>

                    <InputField required={true} type="text" name="country" min="2"
                                label="Země původu" prompt="Zadejte zemi původu"
                                value={this.state.country} handleChange={this.handleChange}/>

                    <InputField required={true} type="textarea" name="biography" min="10"
                                label="Biografie" prompt="Napište biografii" rows="5"
                                value={this.state.biography} handleChange={this.handleChange}/>

                    <h6>Role:</h6>

                    <InputCheck type="radio" name="personRole" label="Režisér"
                                value={Role.DIRECTOR} handleChange={this.handleChange}
                                checked={Role.DIRECTOR === this.state.personRole}/>

                    <InputCheck type="radio" name="personRole" label="Herec"
                                value={Role.ACTOR} handleChange={this.handleChange}
                                checked={Role.ACTOR === this.state.personRole}/>

                    <input type="submit" className="btn btn-primary" value="Uložit"/>
                </form>
            </div>
        )
    }

}








