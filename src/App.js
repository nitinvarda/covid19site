import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './ScrollToTop ';
import './App.css';
import Footer from './Footer/Footer';
import NavBar from './Navbar/Navbar.js';   // we are imorting navbar component form navbar.js file 
import Helpline from './Helpline/Helpline.js';    // we are importing helpline form helpline.js file
import Measures from './Measures/Measures.js';  // we are importing  measures fomr measures.js file
import Tables from './Result-table/Result-table.js'     // finalyy the main table we are importing from result-table.js


// this is the main app here we are rendering the subcomponents of app like NavBar,Tables, helpline and measures
// basically we are dividing main app into sub componenets and working on them individually 
class App extends React.Component {
    render() {
        return (
            <div className="main">
                <div className="container contain">
                    <Router>
                        <NavBar />
                        <ScrollToTop />
                        <Switch>
                            <Route path="/" exact strict component={Tables} />
                            <Route path="/helpline" component={Helpline} />
                            <Route path="/safety-measures" component={Measures} />
                        </Switch>
                    </Router>


                </div>
                <Footer />
            </div>

        );
    };
};

export default App; 