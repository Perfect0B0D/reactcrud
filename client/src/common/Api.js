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
function sendApiRequest(request, options) {
    return (fetch(request, options).then(response => {
        if (!response.ok) {
            throw response;
        }

        return response.json();
    }));
}

function createRequestOptions(method = 'get', body = {}) {
    let options = {'method': method};

    if (['post', 'put'].includes(options.method)) {
        options['headers'] = {'Content-Type': 'application/json'};
        options['body'] = JSON.stringify(body);
    }

    return options;
}

function hasParam(request, key, value) {
    if (value != null && value !== '') {
        request.searchParams.append(key, value);
    }
}

export const Api = (url, params = {}, options) => {
    let request = new URL(url, 'http://localhost:3000');

    Object.keys(params)
        .forEach(
            key => hasParam(request, key, params[key])
        );

    return sendApiRequest(request, options);
};

export const ApiGet = (url, params = {}) => {
    return Api(url, params, createRequestOptions('get'));
};

export const ApiPost = (url, body) => {
    return Api(url, {}, createRequestOptions('post', body));
};

export const ApiPut = (url, body = {}) => {
    return Api(url, {}, createRequestOptions('put', body));
};

export const ApiDelete = (url) => {
    return Api(url, {}, createRequestOptions('delete'));
};

export default Api;