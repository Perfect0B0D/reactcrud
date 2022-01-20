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
import Genre from './Genre';
import InputSelect from "../common/InputSelect";
import InputField from "../common/InputField";

export default class MovieFilter extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    handleSubmit(e) {
        this.props.handleSubmit(e);
    }

    render() {
        const filter = this.props.filter;

        return (
            <form onSubmit={this.handleSubmit}>

                <div className="row">
                    <div className="col">
                        <InputSelect name="directorID" items={this.props.directorList} handleChange={this.handleChange}
                                     label="Režisér" prompt="nevybrán" value={filter.directorID} />
                    </div>
                    <div className="col">
                        <InputSelect name="actorID" items={this.props.actorList} handleChange={this.handleChange}
                                     label="Herec" prompt="nevybrán" value={filter.actorID} />
                    </div>
                    <div className="col">
                        <InputSelect name="genre" items={this.props.genreList} handleChange={this.handleChange}
                                     label="Žánr" prompt="nevybrán" value={filter.genre} enum={Genre} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <InputField type="number" min="0" name="fromYear" handleChange={this.handleChange}
                                    label="Od roku" prompt="neuveden" value={filter.fromYear} />
                    </div>

                    <div className="col">
                        <InputField type="number" min="0" name="toYear" handleChange={this.handleChange}
                                    label="Do roku" prompt="neuveden" value={filter.toYear} />
                    </div>

                    <div className="col">
                        <InputField type="number" min="1" name="limit" handleChange={this.handleChange}
                                    label="Limit počtu filmů" prompt="neuveden" value={filter.limit} />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <input type="submit" className="btn btn-secondary float-right" value={this.props.confirm} />
                    </div>
                </div>

            </form>
        );
    }
}