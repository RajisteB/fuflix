import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';

export const Routes = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/movies" component={Search} />
            </Switch>
        </main>
    );
}
