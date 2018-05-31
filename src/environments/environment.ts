// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {environment as prod} from './environment.prod';

const dev = {
    production: false,
    apiUrl: 'http://apitest.giddh.com/',
    appUrl: 'http://api.giddh.com/'
};

const environments = {
    prod,
    dev
};

let currentEnvironment = dev;
console.log(JSON.stringify('global[\'TNS_WEBPACK\']====' + global['TNS_WEBPACK']));
if (global['TNS_WEBPACK']) {
    console.log(JSON.stringify('this is tns webpack'));
    console.log(JSON.stringify('global[\'DEPLOYMENT\']======' + global['DEPLOYMENT']));
    const _env = environments[global['DEPLOYMENT']];
    if (_env) {

        currentEnvironment = _env;
    }
}

export let environment = currentEnvironment;

