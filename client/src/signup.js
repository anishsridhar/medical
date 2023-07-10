import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form,Spinner } from 'react-bootstrap';
//import { create } from "ipfs-http-client";


import moment from "moment";
import "./App.css";

const ipfs_Client = require("ipfs-http-client");
const _project_Id = '2LE4pUKjaVFr2UkQWEhMpxesjCj'
const _project_Secret = '2bb2beb63a4a271172ab6f54166141c9'
const _authorization_data = 'Basic ' + Buffer.from(_project_Id + ':' + _project_Secret).toString('base64');

 const response1 =  ipfs_Client.create({
    host: 'infura-ipfs.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
      authorization: _authorization_data
    }
  })
  function Signup(props) {
  const [urlArr, setUrlArr] = useState("");
  const [urlArrs, setUrlArrs] = useState("");
  const [file, setFile] = useState(null);
  const [data1, setdata1] = useState("")
  const [age, setage] = useState("")
  const [uname, setuname] = useState("")
  const [pass, setpass] = useState("")
  const [useradd, setuseradd] = useState("")
  const [reladd, setreladd] = useState("")
  const [bp, setbp] = useState("")
  const [heart_attack, setheart_attack] = useState("")
  const [diabetes_level, setdiabetes_level] = useState("")
  const [gender, setgender] = useState("")
  const [oxidation, setoxidation] = useState("")
  const [cancer, setcancer] = useState("")
  const [covid, setcovid] = useState("")
  const [updated_date, setupdated_date] = useState(moment().format("YYYYMMDD"))
  const [timestamp,settimestamp] = useState("")
  const [vaccine, setvaccine] = useState("") 
  const [dose, setdose] = useState("")
  const [data11, setdata11] = useState("")
  const [storageValue, setstorageValue] = useState(0)
  const [web3, setweb3] = useState(null)
  const [accounts, setaccounts] = useState(null)
  const [accountdetails, setaccountdetails] = useState(null)
  const [contract, setcontract] = useState(null)
  const [flag, setflag] = useState(0)
  const [option, setoption] = useState(localStorage.getItem("option"))
  const [screenlogic,  setscreenlogic] = useState(0)

 //IPFS
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
  console.log("called");
    e.preventDefault();
    try {
      const created = await response1.add(file);
      const url = `https://infura-ipfs.io/ipfs/${created.path}`;
      console.log(url,"handleSubmit1");
      setdata11(url)
    } catch (error) {
    console.log(error.message);
      console.log("error");
    }
  };

  useEffect(() => {
    load_data()
  }, [flag])


  
  const load_data = (async () => {
    try {
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      //  console.log(accounts);
      setaccountdetails(accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state.
      setweb3(instance)
      setaccounts(instance)
      setcontract(instance)
      setoption(localStorage.getItem("option"))
      // console.log(instance);
      // runExample(instance)
      // console.log(contract);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, deployedNetwork && deployedNetwork.address or contract. Check console for details.`,
      );
      console.error(error);
    }



  })



  let runExample = async (useradd, reladd, uname, pass, age) => {
    try {

      let response = ""
      if (option == "patient") {
        //const timestamp = Date.now()+"";
        //alert("Time = "+timestamp);
        console.log (useradd, reladd, uname, pass, Number(age),Number(bp),Number(heart_attack),Number(diabetes_level),gender,Number(oxidation),Number(cancer),Number(covid),updated_date,timestamp)
        response = await contract.methods.signup_patients(useradd, reladd, uname, pass, Number(age),Number(bp),Number(heart_attack),Number(diabetes_level),gender,Number(oxidation),Number(cancer),Number(covid),updated_date/*,timestamp*/).send({ from: accountdetails[0] })
       if(response!=null){
         setscreenlogic(0)
        alert("Account created successfully")
        window.location.reload()
       }
          
       

      }
      else if (option == "lab") {
        const timestamp = Date.now()+"";
        response = await contract.methods.signup_labs(useradd, uname, pass, timestamp).send({ from: accountdetails[0] })
        if(response!=null){
          setscreenlogic(0)
        alert("Account created successfully")
        window.location.reload()
       }
      }
      else if (option == "hospital") {
        const timestamp = Date.now()+"";
        response = await contract.methods.signup_hospitals(useradd, uname, pass,timestamp).send({ from: accountdetails[0] })
        if(response!=null){
          setscreenlogic(0)
          alert("Account created successfully")
          window.location.reload()
         }
      }
    


    } catch (error) {
      setscreenlogic(0)
      if (error.code == 4001) {

        alert(error.message)
       

        
      }
      else {
     
        alert("Enter valid details")
        window.location.reload()
      
      }

    
    }



  };
if(screenlogic==1){
  return(
    <>
    <Spinner animation="border" role="status" variant="success" className="position-absolute bottom-50 start-50">
 
</Spinner>
 <h1 style={{marginTop:"27%"}} className="text-success text-center">Loading... Please wait</h1>
 </>
  )
}
  return (

  option=="patient"?(

  
      <div style={{display:'flex',alignItems:'center'}} >

        <Container className="border border-5 border-success" style={{marginTop:"5%"}}>

          <Row style={{ marginTop: 40, marginLeft: 40, marginRight: 80, marginBottom: 80, }}>
            <p className="fs-3">Selected option : {localStorage.getItem("option")}</p>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="fs-5">User name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setuname(e.target.value)
                    }}
                    value={uname} type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5">Password</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setpass(e.target.value)
                    }}
                    value={pass} type="password" placeholder="Password" />
                </Form.Group>

             


                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5" >Age</Form.Label>
                  <Form.Control onChange={(e) => {
                    setage(e.target.value)
                  }}
                    value={age} type="number" placeholder="Enter age" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="fs-5">Blood Pressure</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setbp(e.target.value)
                    }}
                    value={bp} type="number" placeholder="Blood Pressure" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5">Heart Attact</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setheart_attack(e.target.value)
                    }}
                    value={heart_attack} type="number" placeholder="Heart Attact" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5" >Diabetes Level</Form.Label>
                  <Form.Control onChange={(e) => {
                    setdiabetes_level(e.target.value)
                  }}
                    value={diabetes_level} type="number" placeholder="Diabetes Level" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="fs-5">Gender</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setgender(e.target.value)
                    }}
                    value={gender} type="text" placeholder="Enter gender" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5">Oxidation</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setoxidation(e.target.value)
                    }}
                    value={oxidation} type="number" placeholder="oxidation" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5" >Cancer</Form.Label>
                  <Form.Control onChange={(e) => {
                    setcancer(e.target.value)
                  }}
                    value={cancer} type="number" placeholder="Enter cancer" />
                </Form.Group>           

               
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label className="fs-5" >covid</Form.Label>
                  <Form.Control onChange={(e) => {
                    setcovid(e.target.value)
                  }}
                    value={covid} type="number" placeholder="Enter covid" />
                </Form.Group>
                
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="fs-5">Owner address</Form.Label>
                  <Form.Control onChange={(e) => {
                    setuseradd(e.target.value)
                  }}
                    value={useradd} type="text" placeholder="Enter owner address" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label className="fs-5">Relation address</Form.Label>
                  <Form.Control onChange={(e) => {
                    setreladd(e.target.value)
                  }}
                    value={reladd} type="text" placeholder="Enter relation address" />
                </Form.Group>

                <Row style={{marginTop:20}}>
                <form className="form" onSubmit={handleSubmit1}>
                              <input type="file" name="data" onChange={retrieveFile1} />
                              <Button type="submit"  variant="outline-success">Upload Image</Button>
                            </form>
                            <img src={data11} alt="no image uploaded" className="py-3" height="500px" />
                            </Row>
              </Row>


              <div style={{ marginTop: 18 }}>
                <Button onClick={(e) => {
                  e.preventDefault()

let all=`${uname}+${data11}`
console.log(all);
                  runExample(useradd, reladd, all, pass, age)
                  setscreenlogic(1)
                }} variant="outline-success" type="button">
                  Sign-up
                </Button>
                <Button style={{ marginLeft: 18 }} onClick={(e) => {
                  props.history.push({
                    pathname: '/',
                  })
                  window.location.reload()



                }} variant="outline-success" type="button">
                  Login
                </Button>
              </div>
            </Form>
          </Row>

        </Container>
      </div>
  ):
 option=="lab"? (
  <div style={{display:'flex',alignItems:'center'}} >

  <Container className="border border-5 border-success" style={{marginTop:"5%"}}>

    <Row style={{ marginTop: 40, marginLeft: 40, marginRight: 80, marginBottom: 80, }}>
      <p className="fs-3">Selected option : {localStorage.getItem("option")}</p>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="fs-5">User name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setuname(e.target.value)
              }}
              value={uname} type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label className="fs-5">Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setpass(e.target.value)
              }}
              value={pass} type="password" placeholder="Password" />
          </Form.Group>

        </Row>
       
        <Row className="mb-3">
     
          
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label className="fs-5">Owner address</Form.Label>
            <Form.Control onChange={(e) => {
              setuseradd(e.target.value)
            }}
              value={useradd} type="text" placeholder="Enter owner address" />
          </Form.Group>

        
        </Row>


        <div style={{ marginTop: 18 }}>
          <Button onClick={(e) => {
            e.preventDefault()

           
            runExample(useradd, reladd, uname, pass, age)
            setscreenlogic(1)
          }} variant="outline-success" type="button">
            Sign-up
          </Button>
          <Button style={{ marginLeft: 18 }} onClick={(e) => {
            props.history.push({
              pathname: '/',
            })
            window.location.reload()



          }} variant="outline-success" type="button">
            Login
          </Button>
        </div>
      </Form>
    </Row>

  </Container>
</div>
    
  ):
  option=="hospital"?(
    <div style={{display:'flex',alignItems:'center'}} >

    <Container className="border border-5 border-success" style={{marginTop:"5%"}}>
  
      <Row style={{ marginTop: 40, marginLeft: 40, marginRight: 80, marginBottom: 80, }}>
        <p className="fs-3">Selected option : {localStorage.getItem("option")}</p>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="fs-5">User name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setuname(e.target.value)
                }}
                value={uname} type="text" placeholder="Enter username" />
            </Form.Group>
  
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label className="fs-5">Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setpass(e.target.value)
                }}
                value={pass} type="password" placeholder="Password" />
            </Form.Group>
  
          </Row>
      
          <Row className="mb-3">
       
            
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label className="fs-5">Owner address</Form.Label>
              <Form.Control onChange={(e) => {
                setuseradd(e.target.value)
              }}
                value={useradd} type="text" placeholder="Enter owner address" />
            </Form.Group>
  
          
          </Row>
  
  
          <div style={{ marginTop: 18 }}>
            <Button onClick={(e) => {
              e.preventDefault()
  
  
              runExample(useradd, reladd, uname, pass, age)
              setscreenlogic(1)
            }} variant="outline-success" type="button">
              Sign-up
            </Button>
            <Button style={{ marginLeft: 18 }} onClick={(e) => {
              props.history.push({
                pathname: '/',
              })
              window.location.reload()
  
  
  
            }} variant="outline-success" type="button">
              Login
            </Button>
          </div>
        </Form>
      </Row>
  
    </Container>
  </div>

  ):
  (
    null
  )
              
    // </div>






  );
}


export default Signup;
