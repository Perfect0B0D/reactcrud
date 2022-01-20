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
import FlashMessage from '../common/FlashMessage';
import {ApiGet, ApiPost, ApiPut} from '../common/Api';
import Genre from './Genre';
import InputField from "../common/InputField";
import InputSelect from "../common/InputSelect";
import InputCheck from "../common/InputCheck";

export default class MovieForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movieId: null,
            directorList: [],
            actorList: [],
            genreList: [],

            movieName: '',
            year: '',
            director: '',
            actors: [],
            genres: [],
            available: false,

            sent: false,
            success: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;

        if (id) {
            this.setState({movieId: id});

            ApiGet('/api/movies/' + id)
                .then(data => {
                    this.setState({
                        movieName: data.name,
                        year: data.year,
                        director: data.directorID,
                        actors: data.actorIDs,
                        genres: data.genres,
                        available: data.isAvailable,
                    })
                });
        }

        ApiGet('/api/directors')
            .then(data => this.setState({directorList: data}));
        ApiGet('/api/actors')
            .then(data => this.setState({actorList: data}));
        ApiGet('/api/genres')
            .then(data => this.setState({genreList: data}));
    }

    handleChange(e) {
        const target = e.target;

        let temp;
        if (['actors', 'genres'].includes(target.name)) {
            temp = Array.from(target.selectedOptions, (item) => item.value);
        }
        else if (target.name === 'available') {
            temp = target.checked;
        }
        else {
            temp = target.value;
        }

        const name = target.name;
        const value = temp;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const body = {
            name: this.state.movieName,
            year: this.state.year,
            directorID: this.state.director,
            actorIDs: this.state.actors,
            genres: this.state.genres,
            isAvailable: this.state.available,
        };

        (this.state.movieId
                ? ApiPut('/api/movies/' + this.props.match.params.id, body)
                : ApiPost('/api/movies/', body)
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
        const id = this.state.movieId;
        const sent = this.state.sent;
        const success = this.state.success;

        return (
            <div>
                <h1>{id ? 'Vytvořit' : 'Upravit'} film</h1>
                <hr/>
                {sent && <FlashMessage theme={success ? 'success' : 'danger'}
                                        text={success ? 'Uložení filmu proběhlo úspěšně.'
                                                      : 'Chyba při ukládání filmu.'}/>}

                <form onSubmit={this.handleSubmit}>
                    <InputField required={true} type="text" name="movieName" min="3"
                                label="Název" prompt="Zadejte název díla"
                                value={this.state.movieName} handleChange={this.handleChange}/>

                    <InputField required={true} type="number" name="year"
                                label="Rok vydání" prompt="Zadejte rok vydání" min="0"
                                value={this.state.year} handleChange={this.handleChange}/>

                    <InputSelect required={true} name="director" items={this.state.directorList}
                                 label="Režie" prompt="Vyberte režiséra"
                                 value={this.state.director} handleChange={this.handleChange}/>

                    <InputSelect required={true} name="actors" items={this.state.actorList}
                                 multiple={true} label="Hrají" prompt="Označte herce"
                                 value={this.state.actors} handleChange={this.handleChange}/>

                    <InputSelect required={true} name="genres" items={this.state.genreList}
                                 multiple={true} enum={Genre} label="Žánr" prompt="Označte žánry"
                                 value={this.state.genres} handleChange={this.handleChange}/>

                    <InputCheck type="checkbox" name="available" label="Dostupný"
                                value={this.state.available} handleChange={this.handleChange}/>

                    <input type="submit" className="btn btn-primary" value="Uložit"/>
                </form>
            </div>
        )
    }
}
