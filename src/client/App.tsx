import * as React from "react";
import { HackerNews } from "./pages/HackerNews";
import { Switch, Route } from "react-router-dom";

export default function App() {
    return (
     <Switch>
        <Route exact path="/" component= {HackerNews} />
    </Switch>);
}

