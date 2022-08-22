import WithLib from "./Components/ImageHotspots/WithLib";
import WithoutLib from "./Components/ImageHotspots/WithoutLib";
import ChangePosition from "./Components/DNDImages/ChangePosition";
import LoginTest from "./Components/LoginTest/LoginTest";
import { useState } from "react";
import DropZoneTest from "./Components/DNDImages/DropZoneTest";
import styled from "styled-components";
import Routess from "./Components/LoginTest/Routes";

const App = () => {

    // for DND test, don't forget to pass
  /*const [images, setImages] = useState([]);*/

  return (
    <WithoutLib/>
  );
};

const ContainerStyled = styled.div `
    width: 1500px;
  height: 800px;
  display: flex;
  justify-content: space-between;
  background-color: black;
`

export default App;
