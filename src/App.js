import React from 'react';
import NavBar from './Navbar/Navbar.js';
import Helpline from './Helpline/Helpline.js';
import Measures from './Measures/Measures.js';
import Tables from './Result-table/Result-table.js'

class App extends React.Component{
    render(){
        return(
            <div>
                <NavBar />
                <Tables />
                <Helpline />
                <hr />
                <Measures />
            </div>
            
        );
    };
};

export default App; 