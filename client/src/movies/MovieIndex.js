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
import MovieTable from './MovieTable';
import MovieFilter from './MovieFilter';

export default class MovieIndex extends Component {

    constructor(props){
        super(props);

        this.state = {
            directorList: [],
            actorList: [],
            genreList: [],
            movies: [],

            filter: {
                directorID: '',
                actorID: '',
                genre: '',
                fromYear: '',
                toYear: '',
                limit: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete() {
        ApiGet('/api/movies')
            .then(data => this.setState({movies: data}));
    }

    componentDidMount() {
        ApiGet('/api/directors')
            .then(data => this.setState({directorList: data}));
        ApiGet('/api/actors')
            .then(data => this.setState({actorList: data}));
        ApiGet('/api/genres')
            .then(data => this.setState({genreList: data}));

        ApiGet('/api/movies')
            .then(data => this.setState({movies: data}));
    }

    handleChange(e) {
        this.setState({
            filter: {
                [e.target.name]: e.target.value,
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const params = this.state.filter;

        ApiGet('/api/movies', params)
            .then(data => this.setState({movies: data}));
    }

    render() {
        return (
            <div>
                <h3>Seznam filmů</h3>
                <hr />
                <MovieFilter handleChange={this.handleChange} handleSubmit={this.handleSubmit}
                             directorList={this.state.directorList} actorList={this.state.actorList} genreList={this.state.genreList}
                             filter={this.state.filter} confirm="Filtrovat filmy" />
                <hr />
                <MovieTable delete={this.delete} items={this.state.movies} label="Počet filmů:" />
            </div>
        );
    }
}