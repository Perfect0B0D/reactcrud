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

export function InputCheck(props) {
    // podporované typy pro element input
    const INPUTS = ['checkbox', 'radio'];

    // validace typu
    const type = props.type.toLowerCase();
    const checked = props.checked || undefined;

    if (!INPUTS.includes(type)) {
        return null;
    }

    return (
        <div className="form-group form-check">
            <label className="form-check-label">
                {/* vykreslení s aktuálním typem */}
                <input type={props.type} className="form-check-input" name={props.name}
                       value={props.value} checked={checked} onChange={props.handleChange}/> {props.label}
            </label>
        </div>
    );
}

export default InputCheck;