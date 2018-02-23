// Snapshot the ~/app.css and the theme
const application = require("application");
require("ui/styling/style-scope");
// require('require-context/register');
const appCssContext = require.context("~/", false, /^\.\/app\.(css|scss|less|sass)$/);
global.registerWebpackModules(appCssContext);
application.loadAppCss();
console.log("-------------------------------------- App CSS loaded --------------------------")
require("./vendor-platform");

require("reflect-metadata");
require("@angular/platform-browser");
require("@angular/core");
require("@angular/common");
require("@angular/forms");
require("@angular/router");

require("nativescript-angular/platform-static");
require("nativescript-angular/forms");
require("nativescript-angular/router");
