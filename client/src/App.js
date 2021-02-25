import React from 'react';
import { Container } from '@material-ui/core';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Search from './components/Search/Search';
import Forma from './components/Form/Forma';
import redirect from './components/Auth/redirect';

const App = () => (



    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/profile" component={Profile} />
                <Route path="/search" component={Search} />
                <Route path="/upload" component={Forma} />
                <Route path="/redirect" component={redirect} />
            </Switch>
        </Container>
    </BrowserRouter>

);

export default App;