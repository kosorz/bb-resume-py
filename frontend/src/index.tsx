import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { loadFonts } from "./assets/fonts/fonts-loader";

loadFonts();
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
