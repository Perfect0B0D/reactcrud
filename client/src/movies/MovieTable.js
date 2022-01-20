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
import {Link} from 'react-router-dom';
import {ApiDelete} from '../common/Api';

export default class MovieTable extends Component {

    delete(id) {
        ApiDelete('/api/movies/' + id)
            .then(data => console.log(data));

        this.props.delete();
    }

    render() {
        return (
            <div>
                <p>{this.props.label} {this.props.items.length}</p>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Název</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.items.map((item, index) =>
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={"/movies/show/" + item._id}
                                              className="btn btn-sm btn-info">Zobrazit</Link>
                                        <Link to={"/movies/edit/" + item._id}
                                              className="btn btn-sm btn-warning">Upravit</Link>
                                        <button onClick={this.delete.bind(this, item._id)}
                                                className="btn btn-sm btn-danger">Odstranit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <Link to={"/movies/create"} className="btn btn-success">Nový film</Link>
            </div>
        )
    }

}