
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner } from 'react-bootstrap';
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import backgroundImage from "./test2.jpg";




import "./App.css";

function Login(props) {

const [initial_option, setinitial_option] = useState("lab")
const [initial_uname, setinitial_uname] = useState("")
const [initial_pass, setinitial_pass] = useState("")

const [web3, setweb3] = useState(null)
const [accounts, setaccounts] = useState(null)
const [contract, setcontract] = useState(null)
const [flag, setflag] = useState(0)
const [event, setevent] = useState("login")

const [viewrelation, setviewrelation] = useState(false)
const [grid, setgrid] = useState(12)
const [screenlogic, setscreenlogic] = useState(0)
const [accountdetails, setaccountdetails] = useState(null)
const [updated_date1, setupdated_date1] = useState(moment().format("YYYYMMDD"))


const [name, setname] = useState("")
const [age, setage] = useState("")
const [bp, setbp] = useState("")
const [dia, setdia] = useState("")
const [gender, setgender] = useState("")
const [heart, setheart] = useState("")
const [oxi, setoxi] = useState("")
const [cancer, setcancer] = useState("")
const [date, setdate] = useState("")
const [covid, setcovid] = useState("")

const [namer, setnamer] = useState("")
const [ager, setager] = useState("")
const [bpr, setbpr] = useState("")
const [diar, setdiar] = useState("")
const [genderr, setgenderr] = useState("")
const [heartr, setheartr] = useState("")
const [oxir, setoxir] = useState("")
const [cancerr, setcancerr] = useState("")
const [dater, setdater] = useState("")
const [covidr, setcovidr] = useState("")
const [timestamp, settimestamp] = useState("")


const [initial_uname_forlab, setinitial_uname_forlab] = useState("")

const [file, setFile] = useState(null);

const [data11, setdata11] = useState("")

const [data2, setdata2] = useState("")

const [data11r, setdata11r] = useState("")


const ipfs_Client = require("ipfs-http-client");

const _project_Id = '2LE4pUKjaVFr2UkQWEhMpxesjCj'
const _project_Secret = '2bb2beb63a4a271172ab6f54166141c9'


const _authorization_data = 'Basic ' + Buffer.from(_project_Id + ':' + _project_Secret).toString('base64');

 const responce =  ipfs_Client.create({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: _authorization_data
    }
  })
  
  
 //*************IPFS part************** */
 const retrieveFile1 = (e) => {
  const data1 = e.target.files[0];
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(data1);
  reader.onloadend = () => {
    setFile(Buffer(reader.result));
  }
  e.preventDefault();  
}
const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const created = await responce.add(file);
  
      const url = `https://infura-ipfs.io/ipfs/${created.path}`;
      console.log(url,"handleSubmit1");
      setdata11(url)

    } catch (error) {

    

      console.log(error.message);
      console.log("error");
    }
  };



//*************IPFS part************** */

    



useEffect(() => {
// console.log("mount");

load_data()


}, [flag])


const load_data = (async () => {

try {
// console.log("try");
// Get network provider and web3 instance.
const web3 = await getWeb3();
// Use web3 to get the user's accounts.
const accounts = await web3.eth.getAccounts();
setaccountdetails(accounts)

// Get the contract instance.
const networkId = await web3.eth.net.getId();
const deployedNetwork = SimpleStorageContract.networks[networkId];
const instance = new web3.eth.Contract(
SimpleStorageContract.abi,
deployedNetwork && deployedNetwork.address,
);

// Set web3, accounts, and contract to the state, and then proceed with an
// example of interacting with the contract's methods.
// this.setState({ web3, accounts, contract: instance }, this.runExample);
setweb3(instance)
setaccounts(instance)
setcontract(instance)
// console.log(instance);
// runExample(instance)
// console.log(contract);
} catch (error) {
// Catch any errors for any of the above operations.
alert(
`Failed to load web3, accoun deployedNetwork && deployedNetwork.address,
ts, or contract. Check console for details.`,
);
console.error(error);
}

})

let runExample = async (username, password) => {
try {
let response = ""
let response2 = ""
let response3 = ""
let response4 = ""
if (initial_option == "patient") {
response = await contract.methods.patient_login_validate(username, password).call()

if (Number(response)) {
localStorage.setItem('localusername',username );

response = await contract.methods.view_patient_info_by_owner_part1(username).call()
response2 = await contract.methods.view_patient_info_by_owner_part2(username).call()
response3 = await contract.methods.view_patient_info_by_relation_part1(username).call()
response4 = await contract.methods.view_patient_info_by_relation_part2(username).call()


console.log(response);
let comb=response["0"].split("+")
let comb2=response3["0"].split("+")


setname(comb[0])

setdata11(comb[1])


setage(response["1"])
setbp(response["2"])
setheart(response["3"])
setdia(response["4"])
setgender(response["5"])
setoxi(response2["0"])
setcancer(response2["1"])
setcovid(response2["2"])

let d1=response2["3"].split("")
let dd=d1[0]+d1[1]+d1[2]+d1[3]+"/"+d1[4]+d1[5]+"/"+d1[6]+d1[7]

setdate(dd)

setnamer(comb2[0])

setdata11r(comb2[1])

setager(response3["1"])
setbpr(response3["2"])
setheartr(response3["3"])
setdiar(response3["4"])
setgenderr(response4["0"])
setoxir(response4["1"])
setcancerr(response4["2"])
setcovidr(response4["3"])
if(response4["4"]==0){
  setdater("nil")
}
else{
  let d2=response4["4"].split("")
  let ddr=d2[0]+d2[1]+d2[2]+d2[3]+"/"+d2[4]+d2[5]+"/"+d2[6]+d2[7]
  setdater(ddr)
}

setevent("viewpatient")

}
else {
alert("Invalid username password")  
window.location.reload()
}

}
else if (initial_option == "lab") {
response = await contract.methods.lab_login_validate(username, password).call()
if (Number(response)) {
response = await contract.methods.view_patient_info_by_owner(username, password).call()
response2 = await contract.methods.view_patient_info_by_relation(username, password).call()

React.setdisplay(response)
React.setdisplay2(response2)

setevent("viewlab")

}
else {
alert("Invalid username or password")
window.location.reload()
}
}
else if (initial_option == "hospital") {
response = await contract.methods.hospital_login_validate(username, password).call()
if (Number(response)) {

setevent("viewlab")

}
else {
alert("Invalid username or password")
window.location.reload()
}
}

} catch (error) {
alert("Invalid username or password")
console.log(error,"error");
}

};

let patientdetails = async (username) => {
console.log("out");
try {
console.log("try");

let response = ""
let response2 = ""
let response3 = ""
let response4 = ""
localStorage.setItem('localusername',username );
response = await contract.methods.view_patient_info_by_owner_part1(username).call()
response2 = await contract.methods.view_patient_info_by_owner_part2(username).call()
response3 = await contract.methods.view_patient_info_by_relation_part1(username).call()
response4 = await contract.methods.view_patient_info_by_relation_part2(username).call()

let comb=response["0"].split("+")
let comb2=response3["0"].split("+")


setname(comb[0])

setdata11(comb[1])
setage(response["1"])
setbp(response["2"])
setheart(response["3"])
setdia(response["4"])
setgender(response["5"])
setoxi(response2["0"])
setcancer(response2["1"])
setcovid(response2["2"])
let d1=response2["3"].split("")
let dd=d1[0]+d1[1]+d1[2]+d1[3]+"/"+d1[4]+d1[5]+"/"+d1[6]+d1[7]

setdate(dd)

setnamer(comb2[0])

setdata11r(comb2[1])
setager(response3["1"])
setbpr(response3["2"])
setheartr(response3["3"])
setdiar(response3["4"])
setgenderr(response4["0"])
setoxir(response4["1"])
setcancerr(response4["2"])
setcovidr(response4["3"])
if(response4["4"]==0){
  setdater("nil")
}
else{
  let d2=response4["4"].split("")
  let ddr=d2[0]+d2[1]+d2[2]+d2[3]+"/"+d2[4]+d2[5]+"/"+d2[6]+d2[7]
  setdater(ddr)
}

setevent("viewpatient")

} catch (error) {
alert("Invalid user address")

}

};

let update = async (address,name,age,bp,heart_attack,diabetes_level,gender,oxidation,cancer,covid,updated_date) => {
try{
console.log(address,name,age,bp,heart_attack,diabetes_level,gender,oxidation,cancer,covid,updated_date);
await contract.methods.update_patients(address,name, Number(age),Number(bp),Number(heart_attack),Number(diabetes_level),gender,Number(oxidation),Number(cancer),Number(covid),updated_date).send({ from: accountdetails[0] })
await contract.methods.update_patients(address,name, Number(age),Number(bp),Number(heart_attack),Number(diabetes_level),gender,Number(oxidation),Number(cancer),Number(covid),updated_date).send({ from: accountdetails[0] })
alert("SUCCESSFULLY UPDATED")

setscreenlogic(0)
setevent("viewpatient")

}
catch (error) {
setscreenlogic(0)
alert("Something went worng")

}

};
if(screenlogic==1){
return(
<>
<Spinner animation="border" role="status" variant="success" className="position-absolute bottom-50 start-50">
</Spinner>
<h1 style={{marginTop:"27%"}} className="text-success text-center">Updating... Please wait</h1>
</>
)
}

return (
<>
{
event == "login" ? (
<div className="auth-wrapper" style={{
backgroundImage: `url(${backgroundImage})`,
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
width: '100vw',
height: '100vh'
}}>

<Container >

<Row>
<Col >
<Card style={{ width: '25rem', height: '23rem' }} border="success" className=" p-4 position-absolute top-50 start-50 translate-middle">

<p className="fs-1 text-center">LOGIN</p>
<Form.Group className="mb-3" controlId="formGridState">

<Form.Select defaultValue={initial_option}
onChange={(event) => {

setinitial_option(event.target.value);
setinitial_uname("")
setinitial_pass("")

}}>

<option value="lab" >LAB</option>
<option value="patient">PATIENT</option>
<option value="hospital">HOSPITAL</option>
</Form.Select>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasic">

<Form.Control onChange={(event) => {
setinitial_uname(event.target.value);

}} value={initial_uname} type="text" placeholder="User address" />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">

<Form.Control onChange={(event) => {
setinitial_pass(event.target.value);

}} value={initial_pass} type="password" placeholder="Password" />
</Form.Group>

<Button onClick={() => {
localStorage.setItem('option', initial_option);
runExample(initial_uname, initial_pass)
}

} variant="outline-success" className="d-grid gap-2 ">LOGIN</Button>
<Button onClick={() => {

localStorage.setItem('option', initial_option);
props.history.push({
pathname: '/signup',
option: initial_option,

})
window.location.reload()
}}
variant="link">New User?</Button>

</Card>

</Col>
</Row>
</Container>
</div>
) :
event == "viewpatient" ? (
<>
<Container>

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>

<Button onClick={() => {
localStorage.clear();
window.location.reload();
}

}
style={{ marginTop: 30 }}
variant="outline-success" >LOG OUT</Button>
</div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
<Button onClick={() => {
setevent("viewpatientedit")
}

}

style={{ marginTop: 30 }}
variant="outline-success" >Edit details</Button>
<Button onClick={() => {
setviewrelation(true)
setgrid(6)
}

}
style={{ marginTop: 30 }}
variant="outline-success" >View relation</Button>

</div>

<Row style={{ marginTop: 60 }} className="text-center">

<Col md={grid}>
<Row>
<Col><h3>Patient Details</h3></Col>

</Row>
<div style={{ marginTop: 20 }}>
<table className="table table-striped">
<thead>
<tr>
<th scope="col"></th>
<th scope="col">Value</th>

</tr>
</thead>
<tbody>
<tr>
<th scope="row">Name</th>
<td ><h4>{name}</h4></td>

</tr>
<tr>
<th scope="row">Age</th>
<td><h4>{age}</h4></td>

</tr>
<tr>
<th scope="row">Blood Pressure level</th>
<td><h4>{bp}</h4></td>

</tr>
<tr>
<th scope="row">Heart attack</th>
<td><h4>{heart}</h4></td>

</tr>
<tr>
<th scope="row">Diabetes level</th>
<td><h4>{dia}</h4></td>

</tr>
<tr>
<th scope="row">Gender</th>
<td><h4>{gender}</h4></td>

</tr>
<tr>
<th scope="row">Oxidation level</th>
<td><h4>{oxi}</h4></td>

</tr>
<tr>
<th scope="row">Cancer</th>
<td><h4>{cancer}</h4></td>

</tr>
<tr>
<th scope="row">COVID</th>
<td><h4>{covid}</h4></td>

</tr>

<tr>
<th scope="row">Image</th>
<img src={data11} alt="nfts" height="200px" />
</tr>
<tr>
<th scope="row">Updated date</th>
<td><h4>{date}</h4></td>

</tr>


</tbody>
</table>

</div>
</Col>
{
viewrelation == true ? (

<>
<Col md={6}>
<Row>
<Col><h3>Relation Details</h3></Col>

</Row>
<div style={{ marginTop: 20 }}>
<table className="table table-striped">
<thead>
<tr>
<th scope="col"></th>
<th scope="col">Value</th>

</tr>
</thead>
<tbody>
<tr>
<th scope="row">Name</th>
<td ><h4>{namer}</h4></td>

</tr>
<tr>
<th scope="row">Age</th>
<td><h4>{ager}</h4></td>

</tr>
<tr>
<th scope="row">Blood Pressure level</th>
<td><h4>{bpr}</h4></td>

</tr>
<tr>
<th scope="row">Heart attack</th>
<td><h4>{heartr}</h4></td>

</tr>
<tr>
<th scope="row">Diabetes level</th>
<td><h4>{diar}</h4></td>

</tr>
<tr>
<th scope="row">Gender</th>
<td><h4>{genderr}</h4></td>

</tr>
<tr>
<th scope="row">Oxidation level</th>
<td><h4>{oxir}</h4></td>

</tr>
<tr>
<th scope="row">Cancer</th>
<td><h4>{cancerr}</h4></td>

</tr>
<tr>
<th scope="row">COVID</th>
<td><h4>{covidr}</h4></td>

</tr>
<tr>
<th scope="row">Image</th>
<img src={data11r} alt="nfts" height="200px" />
</tr>
<tr>
<th scope="row">Updated date</th>
<td><h4>{dater}</h4></td>

</tr>


</tbody>
</table>
</div>

</Col>
</>

) : (
null
)
}

</Row>
</Container>



</>
) :
event == "viewpatientedit" ? (
<>
<Container>

<div style={{ display: 'flex', justifyContent: 'flex-end' }}>

<Button onClick={() => {
localStorage.clear();
window.location.reload();
}

}
style={{ marginTop: 30 }}
variant="outline-success" >LOG OUT</Button>
</div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
<Button onClick={() => {
  let all=`${name}+${data11}`
  console.log(all);

// (address owner,string memory name,uint age,uint bp,uint heart_attack,uint diabetes_level,uint gender,uint oxidation,uint cancer,uint covid, uint256 updated_date)
update(localStorage.getItem("localusername"),all,age,bp,heart,dia,gender,oxi,cancer,covid,updated_date1)
console.log(localStorage.getItem("localusername"),all,age,bp,heart,dia,gender,oxi,cancer,covid,updated_date1);
setscreenlogic(1)
}

}

style={{ marginTop: 30 }}
variant="outline-success" >Save details</Button>

<Button onClick={() => {
setviewrelation(true)
setgrid(6)
}

}
style={{ marginTop: 30 }}
variant="outline-success" >View relation</Button>
</div>

<Row style={{ marginTop: 60 }} className="text-center">

<Col md={grid}>

<Row>
<Col><h3>My Details</h3></Col>




</Row>
<div style={{ marginTop: 20 }}>
<table className="table table-striped table-editable">
<thead>
<tr>
<th scope="col"></th>
<th scope="col">Value</th>

</tr>
</thead>
<tbody>
<tr>
<th scope="row">Name</th>
<td contenteditable="true">
<input
onChange={(e)=>{
setname(e.target.value)
console.log(name);

}}
value={name}>
</input>
</td>

</tr>
<tr>
<th scope="row">Age</th>
<td contenteditable="true" > <input
onChange={(e)=>{
setage(e.target.value)
console.log(age);

}}
value={age}>
</input></td>

</tr>
<tr>
<th scope="row">Blood Pressure level</th>
<td contenteditable="true" > <input
onChange={(e)=>{
setbp(e.target.value)
console.log(bp);

}}
value={bp}>
</input></td>

</tr>
<tr>
<th scope="row">Heart attack</th>
<td contenteditable="true" > <input
onChange={(e)=>{
setheart(e.target.value)
console.log(heart);

}}
value={heart}>
</input></td>

</tr>
<tr>
<th scope="row">Diabetes level</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setdia(e.target.value)
console.log(dia);

}}
value={dia}>
</input>
</td>

</tr>
<tr>
<th scope="row">Gender</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setgender(e.target.value)
console.log(gender);

}}
value={gender}>
</input></td>

</tr>
<tr>
<th scope="row">Oxidation level</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setoxi(e.target.value)
console.log(oxi);

}}
value={oxi}>
</input></td>

</tr>
<tr>
<th scope="row">Cancer</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setcancer(e.target.value)
console.log(cancer);

}}
value={cancer}>
</input></td>

</tr>
<tr>
<th scope="row">COVID</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setcovid(e.target.value)
console.log(covid);

}}
value={covid}>
</input></td>

</tr>
<tr>
<th scope="row">Updated date</th>
<td contenteditable="true" >
<input
onChange={(e)=>{
setdate(e.target.value)
console.log(date);

}}
value={date}>
</input></td>

</tr>

<img src={data11} alt="no data" height="200px" />



</tbody>
</table>
<form className="form" onSubmit={handleSubmit1}>
                          <input type="file" name="data" onChange={retrieveFile1} />
                          <Button type="submit" variant="outline-success">Upload</Button>
                        </form>


</div>
</Col>
{
viewrelation == true ? (

<>
<Col>
<Row>
<Col><h3>Relation Details</h3></Col>

</Row>
<div style={{ marginTop: 20 }}>
<table className="table table-striped">
<thead>
<tr>
<th scope="col"></th>
<th scope="col">Value</th>

</tr>
</thead>
<tbody>
<tr>
<th scope="row">Name</th>
<td ><h4>{namer}</h4></td>

</tr>
<tr>
<th scope="row">Age</th>
<td><h4>{ager}</h4></td>

</tr>
<tr>
<th scope="row">Blood Pressure level</th>
<td><h4>{bpr}</h4></td>

</tr>
<tr>
<th scope="row">Heart attack</th>
<td><h4>{heartr}</h4></td>

</tr>
<tr>
<th scope="row">Diabetes level</th>
<td><h4>{diar}</h4></td>

</tr>
<tr>
<th scope="row">Gender</th>
<td><h4>{genderr}</h4></td>

</tr>
<tr>
<th scope="row">Oxidation level</th>
<td><h4>{oxir}</h4></td>

</tr>
<tr>
<th scope="row">Cancer</th>
<td><h4>{cancerr}</h4></td>

</tr>
<tr>
<th scope="row">COVID</th>
<td><h4>{covidr}</h4></td>

</tr>
<tr>
<th scope="row">Image</th>
<img src={data11r} alt="nfts" height="200px" />
</tr>
<tr>
<th scope="row">Updated date</th>
<td><h4>{dater}</h4></td>

</tr>


</tbody>
</table>
</div>
</Col>
</>


) : (
null
)
}

</Row>
</Container>



</>
) :
event == "viewlab" ? (

<Container>
<Row>

<Form>
<Row>

<Form.Label style={{ marginTop: 100 }}><h1>View Patient Details</h1></Form.Label>
<Row>
<Col>
<Form.Control style={{ marginTop: 10}} onChange={(event) => {
setinitial_uname_forlab(event.target.value);

}} value={initial_uname_forlab} type="text" placeholder="Enter patient address" />
{/* <form onSubmit={onSignInSubmit}>

<Form.Control style={{ marginTop: 30 }} onChange={(event) => {
setphonenumber(event.target.value);

}} value={phonenumber} type="text" placeholder="Enter patient phone number" />

<div id="ash"></div>
<Button type="submit" 

style={{ marginTop: 20 }}
variant="outline-success" >Verify OTP</Button>
<h6 className="pt-2">OTP:{verified}</h6>
</form> */}


{/* <Form.Control onSubmit={onSignInSubmit} style={{ marginTop: 30 }} onChange={(event) => {
setphonenumber(event.target.value);

}} value={phonenumber} type="text" placeholder="Enter patient phone number" /> */}

</Col>
<Col>

<Button 
onClick={() => {

patientdetails(initial_uname_forlab)

}

}
style={{ marginTop: 10 }}
variant="outline-success" >View patient details</Button>
</Col>
</Row>

</Row>
</Form>
</Row>
</Container> 

) :
(
null
)
}

</>




);
}

export default Login;

