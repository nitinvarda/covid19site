import React from 'react';
import './Result-table.css';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';




//this is the heart of this app .... the main results come form this component directly
class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false, //we are initializing the state as isloaded=false and items =['']
            items: []

        };
    };


    // we are fetching the data through an api call ,
    //after receving the data changing seting the state values as isloaded=true and items=[...dat] contain json data of results
    componentDidMount() {
        fetch("https://api.covid19india.org/v2/state_district_wise.json")
            .then((response) => { return response.json() })
            .then(dat => {
                this.setState({
                    items: [...dat],
                    isloaded: true
                })

            });


    }

    render() {
        // we are assigning the state values to var so that we can use them directly with names, if not we need to call them as this.state.items or this.state.isloaded
        var { isloaded, items } = this.state;
        // the json file of indian covid19 info have state and district info but there is no mentioned "data of overall cases of state or country"
        // so adding all districts will give total state values and adding all state values gives overall country result

        //below variables are created to store values of total country
        var TotalCases_india = 0;
        var ActiveCases_india = 0;
        var RecoverdCases_india = 0;
        var DecesedCases_india = 0;
        for (var i = 0; i < items.length; i++) {
            // below variable are created to store total cases of state
            var totalCases_State = 0;
            var activeCases_State = 0;
            var recoveredCases_State = 0;
            var deceasedCases_State = 0;
            for (var j = 0; j < items[i].districtData.length; j++) {
                // so iterating through each states districts data and adding respective values
                // as  confirmed , active , recovered and deceased to store them as overall state values
                totalCases_State = totalCases_State + items[i].districtData[j].confirmed;
                activeCases_State = activeCases_State + items[i].districtData[j].active;
                recoveredCases_State = recoveredCases_State + items[i].districtData[j].recovered;
                deceasedCases_State = deceasedCases_State + items[i].districtData[j].deceased;
                // we dont have state data on json file so we are creating a key values [active , recovered ,deceased ,confirmed]
                // and storing the above genrated values
                items[i].active = activeCases_State;
                items[i].recovered = recoveredCases_State;
                items[i].deceased = deceasedCases_State;
                // items[i].totalCases= totalCases;
                items[i].confirmed = totalCases_State;


            }
            // adding all the states form the above and generating values for total country
            TotalCases_india = TotalCases_india + items[i].confirmed;
            ActiveCases_india = ActiveCases_india + items[i].active;
            RecoverdCases_india = RecoverdCases_india + items[i].recovered;
            DecesedCases_india = DecesedCases_india + items[i].deceased;
        }
        const table = []; // created a empty array for the result table
        // creating a for loop of length {items.length}
        for (let i = 0; i < items.length; i++) {
            //pushing the data to table variable created above 
            table.push(<tr id={items[i].statecode}>
                <td  >
                    {/* creating an accordion , in simple terms if we click on state name we will get a table containing districts data */}
                    <Accordion defaultActiveKey="1">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    {items[i].state}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Table responsive="sm" >
                                        <thead>
                                            <tr >
                                                <td><b>District</b></td>
                                                <td><b>Total Cases</b></td>
                                                <td><b>Active Cases</b></td>
                                                <td><b>Decesed</b></td>
                                                <td><b>Recoverd</b></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* i can't create a nested for loop in middle of JSX elements so " i have used map function of javaScript
                                        which is iterating through "items[i].districtData" which have data of districts , so we get each district as individual item */}
                                            {items[i].districtData.map((item, j) => (
                                                <tr key={j} className={items[i].statecode.toLowerCase()}>
                                                    <td >{items[i].districtData[j].district}</td>
                                                    <td >{items[i].districtData[j].confirmed}</td>
                                                    <td >{items[i].districtData[j].active}</td>
                                                    <td >{items[i].districtData[j].deceased}</td>
                                                    <td >{items[i].districtData[j].recovered}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </td>
                <td  >{items[i].confirmed}</td>
                <td >{items[i].active}</td>
                <td  >{items[i].deceased}</td>
                <td  >{items[i].recovered}</td>

            </tr>

            );


        };
        // here creating a loding screen , if state element isloaded=flase(default) the screen shows a loading screen
        // later when we fetched the data we are assigning state element isloaded= true then it goes to else condition and returns the reults 
        if (!isloaded) {
            return (
                <div className="loading">
                    <h2 id="load-heading">Loading...</h2>
                    <div id="load"></div>

                </div>

            );
        }
        else {
            return (
                // creating a bootstrap container for placing all the elements in center
                // imported this contianer component 
                <React.Fragment>

                    <div id="table" >
                        <h3 style={{ textAlign: "center" }}>Total cases in India</h3>

                        <div className="table-responsive">

                            <table className="table table-bordered  " id="total-cases" >
                                <thead>
                                    <tr>
                                        <th> Cases</th>
                                        <th> Active</th>
                                        <th> Deceased</th>
                                        <th> Recoverd</th>
                                    </tr>

                                </thead>
                                <tbody >
                                    <tr>
                                        <td>{TotalCases_india}</td>
                                        <td>{ActiveCases_india}</td>
                                        <td>{DecesedCases_india}</td>
                                        <td>{RecoverdCases_india}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>


                    </div>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Cases State wise</h3>
                    <p style={{ textAlign: "center" }}>*click on state to see district info</p>



                    <div className="table-responsive" id="state-table">

                        <table id="state-table" className="table table-bordered "  >
                            <thead >
                                <tr className="table-header">
                                    <th>State</th>
                                    <th>Total Cases</th>
                                    <th>Active Cases</th>
                                    <th> Decesed</th>
                                    <th>Recoverd</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table}
                            </tbody>

                        </table>
                    </div>


                </React.Fragment >
            );
        }
    };

};

export default Tables;