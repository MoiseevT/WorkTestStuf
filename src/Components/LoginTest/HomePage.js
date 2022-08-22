import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomePageStyled> ДОМ </HomePageStyled>
  )
};

const HomePageStyled = styled.div`
  width: 1200px;
  height: 800px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export default HomePage;
