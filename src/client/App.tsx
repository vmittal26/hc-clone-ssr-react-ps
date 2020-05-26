import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./pages/Home/Home";

export default function App() {
    return (
     <Switch>
        <Route exact path="/" component= {Home} />
        <Redirect path="*" to="/"></Redirect>
    </Switch>);
}

