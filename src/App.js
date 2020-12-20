import React from "react";
import reduxStore from "./redux/redux-store";
import { Provider } from "react-redux";
import Preprocessor from "./components/Preprocessor/Preprocessor";
import Processor from "./components/Processor/Processor";
import PostProcessor from './components/PostProcessor/PostProcessor';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
    return (
        <Router>
            <nav className="mainNav">
                <ul>
                    <li>
                        <Link to="/">Препроцессор</Link>
                    </li>
                    <li>
                        <Link to="/proc">Процессор</Link>
                    </li>
                    <li>
                        <Link to="/postproc">Постпроцессор</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                <Switch>
                  <Provider store={reduxStore}>
                      <Route path="/" exact component={Preprocessor}></Route>
                      <Route path="/proc" exact component={Processor}></Route>
                      <Route path="/postproc" exact component={PostProcessor}></Route>
                  </Provider>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
