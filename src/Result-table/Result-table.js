import React from 'react';
import './Result-table.css';
// import {VictoryBar, VictoryChart,VictoryLabel,VictoryAxis,VictoryContainer} from 'victory'
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip} from 'recharts'
import axios from 'axios'
import { STATE_NAMES } from '../CONSTANTS';




//this is the heart of this app .... the main results come form this component directly
class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false, //we are initializing the state as isloaded=false and items =['']
            items: [],
            covidData:[],
            defaultGraph:'total'

        };
    };


    // we are fetching the data through an api call ,
    //after receving the data changing seting the state values as isloaded=true and items=[...dat] contain json data of results
    componentDidMount() {
        axios.get("https://data.covid19india.org/v4/min/data.min.json").then((result)=>{
            this.setState({
                covidData:result.data,
                isloaded:true,
                
            })
        }).catch(err=>console.log(err))
        // fetch("https://api.covid19india.org/v2/state_district_wise.json")
        //     .then((response) => { return response.json() })
        //     .then(dat => {
        //         this.setState({
        //             items: [...dat],
        //             isloaded: true,
        //             defaultGraph:'total'
        //         })

        //     });


    }


    renderGraph=(name,data)=>{
        switch(name){
            case 'total':
                return(
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={data}>
                        <XAxis label={{value:'states',position:'insideBottom', offset: -5}} dataKey="state" />
                        <YAxis tickFormatter={(label)=>`${label/1000}k`} />
                        <Tooltip  />
                        <Bar dataKey="total" fill="#8884d8"  />
                        </BarChart>
                    </ResponsiveContainer>

                )
            case 'deceased' :
                return(
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={data}>
                        <XAxis dataKey="state" />
                        <YAxis tickFormatter={(label)=>`${label/1000}k`} />
                        <Tooltip />
                        <Bar dataKey="deceased" fill="#8884d8"  />
                        </BarChart>
                    </ResponsiveContainer>
                )
            case 'active':
                return(
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={data}>
                        <XAxis dataKey="state" />
                        <YAxis tickFormatter={(label)=>`${label/1000}k`} />
                        <Tooltip />
                        <Bar dataKey="active" fill="#8884d8"  />
                        </BarChart>
                    </ResponsiveContainer>

                )
            case 'recovered':{
                
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={data}>
                        <XAxis dataKey="state" />
                        <YAxis tickFormatter={(label)=>`${label/1000}k`} />
                        <Tooltip />
                        <Bar dataKey="recovered" fill="#8884d8"  />
                        </BarChart>
                    </ResponsiveContainer>

                )
            }
            default:
                return 
        }
    }

    render() {
        console.log(this.state)
       
        console.log([...Array(Object.keys(this.state.covidData).length).keys()])
        // we are assigning the state values to var so that we can use them directly with names, if not we need to call them as this.state.items or this.state.isloaded
        var { isloaded, items } = this.state;
        // the json file of indian covid19 info have state and district info but there is no mentioned "data of overall cases of state or country"
        // so adding all districts will give total state values and adding all state values gives overall country result

        //below variables are created to store values of total country
   
        var statesTotalNumber = []
        var TotalCases_india = 0;
        var ActiveCases_india = 0;
        var RecoverdCases_india = 0;
        var DecesedCases_india = 0;
        var daily_totalCases_india = 0;
        var daily_recoveredCases_india = 0;
        var daily_deceasedCases_india = 0;
        for (var i = 0; i < items.length; i++) {
            // below variable are created to store total cases of state
            var totalCases_State = 0;
            var activeCases_State = 0;
            var recoveredCases_State = 0;
            var deceasedCases_State = 0;
            var daily_totalCases_State = 0;
            var daily_recoveredCases_State = 0;
            var daily_deceasedCases_State = 0;
            for (var j = 0; j < items[i].districtData.length; j++) {
                // so iterating through each states districts data and adding respective values
                // as  confirmed , active , recovered and deceased to store them as overall state values
                totalCases_State = totalCases_State + items[i].districtData[j].confirmed;
                activeCases_State = activeCases_State + items[i].districtData[j].active;
                recoveredCases_State = recoveredCases_State + items[i].districtData[j].recovered;
                deceasedCases_State = deceasedCases_State + items[i].districtData[j].deceased;
                daily_totalCases_State = daily_totalCases_State + items[i].districtData[j].delta.confirmed;
                daily_deceasedCases_State = daily_deceasedCases_State + items[i].districtData[j].delta.deceased;
                daily_recoveredCases_State = daily_recoveredCases_State + items[i].districtData[j].delta.recovered;


              
                // we dont have state data on json file so we are creating a key values [active , recovered ,deceased ,confirmed]
                // and storing the above genrated values
                items[i].active = activeCases_State;
                items[i].recovered = recoveredCases_State;
                items[i].deceased = deceasedCases_State;
                // items[i].totalCases= totalCases;
                items[i].confirmed = totalCases_State;
                items[i].newTotalCases = daily_totalCases_State;
                items[i].newDeceasedCases = daily_deceasedCases_State;
                items[i].newRecoveredCases = daily_recoveredCases_State;



            }
            statesTotalNumber.push({
                state:items[i].statecode,
                total:items[i].confirmed,
                active:items[i].active,
                recovered:items[i].recovered,
                deceased:items[i].deceased
            })
            // adding all the states form the above and generating values for total country
            TotalCases_india = TotalCases_india + items[i].confirmed;
            ActiveCases_india = ActiveCases_india + items[i].active;
            RecoverdCases_india = RecoverdCases_india + items[i].recovered;
            DecesedCases_india = DecesedCases_india + items[i].deceased;
            daily_totalCases_india = daily_totalCases_india + items[i].newTotalCases;
            daily_recoveredCases_india = daily_recoveredCases_india + items[i].newRecoveredCases;
            daily_deceasedCases_india = daily_deceasedCases_india + items[i].newDeceasedCases;
        }

        console.log(statesTotalNumber)
        
        const table = []; // created a empty array for the result table
        // creating a for loop of length {items.length}
        for (let i = 0; i < items.length; i++) {
            //pushing the data to table variable created above 
            table.push(
                <tr id={items[i].statecode}>
                <td  >
                    {/* creating an accordion , in simple terms if we click on state name we will get a table containing districts data */}
                    <div className="accordion" >
                        <div className="card">
                            <div className="card-header">
                                <a className="collapsed" href={"#state-" + items[i].statecode} data-toggle="collapse">{items[i].state}</a>

                            </div>
                            <div id={"state-" + items[i].statecode} className="collapse" >
                                <div className="card-body">
                                    <table className="table"  >
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
                                                    <td >{items[i].districtData[j].district} </td>
                                                    <td ><p>{items[i].districtData[j].confirmed}</p> {items[i].districtData[j].delta.confirmed > 0 ? <p style={{ color: "blue" }}> &uarr;{items[i].districtData[j].delta.confirmed}</p> : ""}</td>
                                                    <td ><p>{items[i].districtData[j].active}</p> </td>
                                                    <td ><p>{items[i].districtData[j].deceased}</p> {items[i].districtData[j].delta.deceased > 0 ? <p style={{ color: "red" }}> &uarr;{items[i].districtData[j].delta.deceased}</p> : ""}</td>
                                                    <td ><p>{items[i].districtData[j].recovered}</p> {items[i].districtData[j].delta.recovered > 0 ? <p style={{ color: "#00ff00" }}> &uarr;{items[i].districtData[j].delta.recovered}</p> : ""}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td  >{items[i].confirmed} {items[i].newTotalCases > 0 ? <p style={{ color: "blue" }}>&uarr;{items[i].newTotalCases}</p> : ""}</td>
                <td ><p>{items[i].active}</p> </td>
                <td  ><p>{items[i].deceased}</p> {items[i].newDeceasedCases > 0 ? <p style={{ color: "red" }}>&uarr;{items[i].newDeceasedCases}</p> : ""}</td>
                <td  ><p>{items[i].recovered}</p> {items[i].newRecoveredCases > 0 ? <p style={{ color: "#006400" }}>&uarr;{items[i].newRecoveredCases}</p> : ""}</td>

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
            const {
                total:{confirmed:totalConfirmed,deceased:totalDeceased,recovered:totalRecovered},
                delta:{confirmed:newTotalConfirmed,deceased:newTotalDeceased,recovered:newTotalRecovered}
            } = this.state.covidData['TT']
            return (
                // creating a bootstrap container for placing all the elements in center
                // imported this contianer component 
                <React.Fragment>
                    
                    <div id=" table " >
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
                                        <td>{totalConfirmed} {newTotalConfirmed > 0 ? <p style={{ color: "blue" }}>&uarr;{newTotalConfirmed}</p> : ""}</td>
                                        <td>{totalConfirmed-totalRecovered-totalDeceased}</td>
                                        <td>{totalDeceased} {newTotalDeceased > 0 ? <p style={{ color: "red" }}>&uarr;{newTotalDeceased}</p> : ""}</td>
                                        <td>{totalRecovered} {newTotalRecovered > 0 ? <p style={{ color: "#006400" }}>&uarr;{newTotalRecovered}</p> : ""}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                    {/* <div className="col-sm-12">
                        <VictoryChart 
                        domainPadding={20}
                       
                        
                        >
                            <VictoryAxis  />
                            <VictoryAxis dependentAxis  fixLabelOverlap />
                            <VictoryBar
                            height={800}
                            horizontal
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                              }}
                            style={{
                                labels:{
                                    fontSize:5,
                                    
                                }
                            }}
                            alignment="middle"
                            labels={({ datum }) => datum.activeCases}
                            
                            barRatio={0.5}
                            fixLabelOverlap 
                            
                            data={statesTotalNumber}
                            x='state'
                            y='totalCases'
                            y0={10}
                            width={1200}
                            
                            containerComponent={<VictoryContainer responsive={false}/>}


                            />
                        </VictoryChart>

                    </div> */}
                    {/* <div className='col-sm-8 my-5' style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                        <button className={`btn ${this.state.defaultGraph==='total' ? 'btn-primary' : 'btn-secondary'}`}  onClick={()=>this.setState({...this.state,defaultGraph:'total'})}>Total</button>
                        <button className={`btn ${this.state.defaultGraph==='active' ? 'btn-primary' : 'btn-secondary'}`}  onClick={()=>this.setState({...this.state,defaultGraph:'active'})}>Active</button>
                        <button className={`btn ${this.state.defaultGraph==='deceased' ? 'btn-primary' : 'btn-secondary'}`}  onClick={()=>this.setState({...this.state,defaultGraph:'deceased'})}>Deceased</button>
                        <button className={`btn ${this.state.defaultGraph==='recovered' ? 'btn-primary' : 'btn-secondary'}`}  onClick={()=>this.setState({...this.state,defaultGraph:'recovered'})}>Recovered</button>
                        
                    </div>
                    <div className='col-sm-12' style={{height:'50vh',width:'100%'}}>
                        {this.renderGraph(this.state.defaultGraph,)}
                    {/* <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={statesTotalNumber}>
                        <XAxis dataKey="state" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="deceased" fill="#8884d8"  />
                        </BarChart>
                    </ResponsiveContainer> 
                    </div> */}
                   
                   


                  
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
                                 {/* eslint-disable-next-line */}
                                {Object.keys(this.state.covidData).length > 0 && Object.keys(this.state.covidData).map((data)=>{
                             
                                const {
                                    total:{confirmed,deceased,recovered},
                                    delta:{confirmed:newConfirmed,deceased:newDeceased,recovered:newRecovered},
                                    districts={}
                                } = this.state.covidData[data]
                                
                                if(data !== 'TT'){

                                
                                    return(
                                        <tr key={data} >
                                            <td  >
                                                
                                                <div className="accordion" >
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <a className="collapsed" href={"#state-" + data} data-toggle="collapse">{STATE_NAMES[data]}</a>
                            
                                                        </div>
                                                        <div id={"state-" + data}  className="collapse" >
                                                            <div className="card-body">
                                                                <table className="table"  >
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
                                                                        
                                                                    
                        
                                                                        {Object.keys(districts).map((district) => {
                                                                            const {
                                                                                total:{confirmed:districtConfirmed,deceased:districtDeceased,recovered:districtRecovered} = {},
                                                                            } = districts[district]
                                                                            // console.log(districts[district],district)
                                                                                // console.log(Number.isNaN(districtConfirmed-districtRecovered-districtDeceased),district)
                                                                                return(
                                                                                    <tr key={district} >
                                                                                        <td >{district} </td>
                                                                                        <td ><p>{districtConfirmed}</p> {districts[district]?.delta?.confirmed > 0 ? <p style={{ color: "blue" }}> &uarr;{districts[district]?.delta?.confirmed}</p> : ""}</td>
                                                                                        <td ><p>{Number.isNaN(districtConfirmed-districtRecovered-districtDeceased) ? '-' : districtConfirmed-districtRecovered-districtDeceased}</p> </td>
                                                                                        <td ><p>{districtDeceased}</p> {districts[district]?.delta?.deceased > 0 ? <p style={{ color: "red" }}> &uarr;{districts[district]?.delta?.deceased}</p> : ""}</td>
                                                                                        <td ><p>{districtRecovered}</p> {districts[district]?.delta?.recovered > 0 ? <p style={{ color: "#00ff00" }}> &uarr;{districts[district]?.delta?.recovered}</p> : ""}</td>
                                                                                    </tr>
                                                                                )
                                                                            
                                                                    })}  
                                                                    
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td> 
                                            <td  >{confirmed} {newConfirmed > 0 ? <p style={{ color: "blue" }}>&uarr;{newConfirmed}</p> : ""}</td>
                                            <td ><p>{confirmed-recovered-deceased}</p> </td>
                                            <td  ><p>{deceased}</p> {newDeceased > 0 ? <p style={{ color: "red" }}>&uarr;{newDeceased}</p> : ""}</td>
                                            <td  ><p>{recovered}</p> {newRecovered > 0 ? <p style={{ color: "#006400" }}>&uarr;{newRecovered}</p> : ""}</td>
                        
                                        </tr>
                                    )
                                }
                            })}
                            </tbody>

                        </table>
                    </div>
                    <div>
                        
                    </div>


                </React.Fragment >
            );
        }
    };

};

export default Tables;