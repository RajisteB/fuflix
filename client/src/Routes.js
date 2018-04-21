import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
//import { Video } from './components/Video';
import Search from './components/Search';
import { Movies } from './components/Movies';
import Single from './components/Single';

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
