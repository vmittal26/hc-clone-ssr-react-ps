import * as React from "react";
import { Switch, Route, StaticRouter } from "react-router-dom";
import { Home } from "./pages/Home";


export default class App extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <StaticRouter   >
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </StaticRouter  >
            </React.Fragment>
        );
    }
}
