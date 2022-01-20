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
import Genre from './Genre';

export default class MovieDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movieName: '',
            year: 0,
            director: '',
            actors: [],
            genres: [],
            available: false,
            added: '',
        }
    }

    componentDidMount() {
        ApiGet('/api/movies/' + this.props.match.params.id)
            .then(data => this.setState({
                movieName: data.name,
                year: data.year,
                director: data.director,
                actors: data.actors,
                genres: data.genres,
                available: data.isAvailable,
                added: data.dateAdded,
            }))
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const genres = this.state.genres.map(item => Genre[item]);
        const actors = this.state.actors.map(item => item.name);
        const dateAdded = new Date(this.state.added);

        return (
            <div>
                <h1>Detail filmu</h1><hr />
                <h3>{this.state.movieName} <small>({this.state.year})</small></h3>
                <p>{genres.join(' / ')}</p>
                    <p>
                        <strong>Režie: </strong>{this.state.director.name}<br/>
                        <strong>Hrají: </strong>{actors.join(', ')}<br/>
                        <strong>Dostupný: </strong>{this.state.available ? 'ANO' : 'NE'}<br/>
                        <em>Vytvořeno {dateAdded.toLocaleString()}</em>
                    </p>
            </div>
        )
    }

}