// import logo from './logo.svg';
import "./App.css";

//import react module; destructure component function from react module
import React from "react";

//import Watch component
import Watch from "./components/Watch";

//import material-ui components
import { Container } from "@material-ui/core";
const App = () =>{
  return (
    <Container style={{height : "100vh" , marginTop: "200px" , padding: "10px"}}>
      <Watch />
    </Container>
  );
}

export default App;
