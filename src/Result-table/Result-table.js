import React from 'react';
import './Result-table.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';



//this is the heart of this app .... the main results come form this component directly
class Tables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isloaded:false, //we are initializing the state as isloaded=false and items =['']
            items:[]

        };
    };


    // we are fetching the data through an api call ,
    //after receving the data changing seting the state values as isloaded=true and items=[...dat] contain json data of results
    componentDidMount(){
        fetch("https://api.covid19india.org/v2/state_district_wise.json")
        .then((response) => { return response.json()})
            .then(dat =>{
                this.setState({
                    items: [...dat],
                    isloaded:true
                })
                
            });
                
						
    }
    
    render(){
        // we are assigning the state values to var so that we can use them directly with names, if not we need to call them as this.state.items or this.state.isloaded
        var {isloaded,items} = this.state; 
        // the json file of indian covid19 info have state and district info but there is no mentioned "data of overall cases of state or country"
        // so adding all districts will give total state values and adding all state values gives overall country result

        //below variables are created to store values of total country
        var TotalCases_india = 0; 
		var ActiveCases_india = 0;
		var RecoverdCases_india = 0;
		var DecesedCases_india= 0;
		for (var i = 0; i < items.length; i++){
            // below variable are created to store total cases of state
			var totalCases_State = 0;
			var activeCases_State = 0;
			var recoveredCases_State =0;
			var deceasedCases_State = 0;
			for(var j =0;j<items[i].districtData.length;j++){
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
				items[i].confirmed =totalCases_State;

			    				
     		}
            // adding all the states form the above and generating values for total country
            TotalCases_india = TotalCases_india + items[i].confirmed;
            ActiveCases_india = ActiveCases_india + items[i].active;
            RecoverdCases_india = RecoverdCases_india +items[i].recovered;
            DecesedCases_india = DecesedCases_india + items[i].deceased;
		}
        const table=[]; // created a empty array for the result table
        // creating a for loop of length {items.length}
        for(let i=0;i<items.length;i++){
            //pushing the data to table variable created above 
            table.push(<tr id={items[i].statecode}>
                <td className="state-table state-animation" id={"100-"+i}>
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
                                        <tr className={items[i].statecode.toLowerCase()}>
                                            <td className=' district-table'><b>District</b></td>
                                            <td className=' district-table'><b>Total Cases</b></td>
                                            <td className='district-table'><b>Active Cases</b></td>
                                            <td className='district-table'><b>Decesed</b></td>
                                            <td className='district-table'><b>Recoverd</b></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* i can't create a nested for loop in middle of JSX elements so " i have used map function of javaScript
                                        which is iterating through "items[i].districtData" which have data of districts , so we get each district as individual item */}
                                        {items[i].districtData.map((item,j)=>(
                                        <tr key={j} className={items[i].statecode.toLowerCase()}>
                                            <td className="district-table"  id={i+'-'+j}>{items[i].districtData[j].district}</td>
                                            <td className="district-table"  id={i+'-'+j+'-'+j}>{items[i].districtData[j].confirmed}</td>
                                            <td className="district-table"  id={i+'-'+j+'-'+j+'-'+j}>{items[i].districtData[j].active}</td>
                                            <td className="district-table"  id={i+'-'+j+'-'+j+'-'+j+'-'+j}>{items[i].districtData[j].deceased}</td>
                                            <td className="district-table"  id={i+'-'+j+'-'+j+'-'+j+'-'+j+'-'+j}>{items[i].districtData[j].recovered}</td>
                                        </tr>
                                         ))} 
                                    </tbody>
                                </Table> 
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion> 
                </td>
                <td className="state-table" id={"100-"+i+'-'+i}>{items[i].confirmed}</td>
                <td className="state-table" id={"100-"+i+'-'+i+'-'+i}>{items[i].active}</td>
                <td className="state-table" id={"100-"+i+'-'+i+'-'+i+'-'+i}>{items[i].deceased}</td>
                <td className="state-table" id={"100-"+i+'-'+i+'-'+i+'-'+i+'-'+i}>{items[i].recovered}</td>

            </tr>

            );
            
            
        };
        // here creating a loding screen , if state element isloaded=flase(default) the screen shows a loading screen
        // later when we fetched the data we are assigning state element isloaded= true then it goes to else condition and returns the reults 
        if(!isloaded){
            return (
                <div >
                    <h2 id="load-heading">Loading...</h2>
                    <div id="load"></div>

                </div>
            
            );
        }
        else{
            return(
                    // creating a bootstrap container for placing all the elements in center
                    // imported this contianer component 
                    <Container id="table" >
                        <h3 id="tot-cases-heading">Total cases in India</h3>
                        <table className="table table-bordered table-condensed" id="total-cases" >
                            <thead>
                                <tr>
                                    <th> Cases</th>
                                    <th> Active</th>
                                    <th> Deceased</th>
                                    <th> Recoverd</th>
                                </tr>

                            </thead>
                            <tbody id="total-result">
                                <tr>
                                    <td>{TotalCases_india}</td>
                                    <td>{ActiveCases_india}</td>
                                    <td>{DecesedCases_india}</td>
                                    <td>{RecoverdCases_india}</td>
                                </tr>

                            </tbody>
                        </table>
                        <h3 id="state-table-heading">Cases State wise</h3>
                        <p id='district-info'>*click on state to see district info</p>

                        <table id="state-table" className="table table-bordered responsive-sm"  >
                            <thead>
                                    <tr >
                                        <td className='state-table'><b>State</b></td>
                                        <td className='state-table' ><b>Total Cases</b></td>
                                        <td className='state-table'><b>Active Cases</b></td>
                                        <td className='state-table'><b>Decesed</b></td>
                                        <td className='state-table'><b>Recoverd</b></td>
                                    </tr>    
                            </thead>
                            <tbody>
                                {table} {/* we are placing the above created table variable which contains the data here*/}
                            </tbody>
                            
                        </table>
                            
                    </Container>
                
            );    
        }
    };
       
};

export default Tables;