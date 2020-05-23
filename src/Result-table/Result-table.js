import React from 'react';
import './Result-table.css';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

class Tables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isloaded:false,
            items:[]

        };
    };

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
        var {isloaded,items} = this.state;
        var Totalcases = 0;
		var Active = 0;
		var Recoverd = 0;
		var Decesed = 0;
		for (var i = 0; i < items.length; i++){
			var totalCases = 0;
			var active = 0;
			var recovered =0;
			var deceased = 0;
			for(var j =0;j<items[i].districtData.length;j++){
				totalCases = totalCases + items[i].districtData[j].confirmed;
				active = active + items[i].districtData[j].active;
				recovered = recovered + items[i].districtData[j].recovered;
				deceased = deceased + items[i].districtData[j].deceased;
				items[i].active = active;
				items[i].recovered = recovered;
				items[i].deceased = deceased;
				items[i].totalCases= totalCases;
				items[i].confirmed =totalCases;

			    				
     		}
		    Totalcases = Totalcases + items[i].confirmed;
		    Active = Active + items[i].active;
		    Recoverd = Recoverd +items[i].recovered;
		    Decesed = Decesed + items[i].deceased;
		}
        const table=[];
        for(let i=0;i<items.length;i++){
            table.push(<tr id={items[i].statecode}>
                <td className="state-table" id={"100-"+i}>
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
        if(!isloaded){
            return <div>loading...</div>
        }
        else{
            return(
                
                    <Container id="table" >
                        <h3 id="tot-cases-heading">Total cases in India</h3>
                        <table className="table table-bordered" id="total-cases" >
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
                                    <td>{Totalcases}</td>
                                    <td>{Active}</td>
                                    <td>{Decesed}</td>
                                    <td>{Recoverd}</td>
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
                                {table}
                            </tbody>
                            
                        </table>
                            
                    </Container>
                
            );    
        }
    };
       
};

export default Tables;