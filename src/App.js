import WithLib from "./Components/WithLib";
import WithoutLib from "./Components/WithoutLib";
import ChangePosition from "./Components/ChangePosition";
import LoginTest from "./Components/LoginTest";
import { useState } from "react";
import DropZoneTest from "./Components/DropZoneTest";
import styled from "styled-components";

const App = () => {

  const [images, setImages] = useState([]);
  console.log(images)
  return (
    <ContainerStyled>
      <ChangePosition images={images} setImages={setImages} />
      <DropZoneTest images={images} setImages={setImages}/>
    </ContainerStyled>
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
