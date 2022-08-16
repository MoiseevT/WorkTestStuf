import React, { useState } from "react";
import ImageMapper from "react-img-mapper";
import styled from "styled-components";

const WithLib = () => {

  const [hotSpots, setHotSpots] = useState({
    name: "my-map",
    areas: [],
  });
  const [sendHotSpots, setSendHotSpots] = useState({
    name: "kek",
    areas: [],
  });
  const [clientHotSpots, setClientHotSpots] = useState({
    name: "zhopich",
    areas: [],
  });
  const [adminSelectedArea, setAdminSelectedArea] = useState({});
  const [clientSelectedArea, setClientSelectedArea] = useState({});

  const isEmptyObject = (obj) => {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        return false;
      }
    }
    return true;
  };
  console.log(adminSelectedArea)

  const YouClicked = (evt) => {
    let areas = hotSpots.areas;
    let setNewAreas = [
      ...areas,
      {
        id: areas.length + 1,
        shape: "circle",
        coords: [evt.nativeEvent.layerX, evt.nativeEvent.layerY, 15],
        preFillColor: "#fff",
      },
    ];
    let newHotspots = {
      name: hotSpots.name,
      areas: setNewAreas,
    };
    setHotSpots(newHotspots);
    setAdminSelectedArea({});
  };
  const SetAdminArea = (area) => {
    setAdminSelectedArea(area);
  };

  const sendHotSpotsTest = () => {
    let areas = hotSpots.areas;
    let imgWidth = document
      .getElementById("adminID")
      .getElementsByTagName("img")[0].width;
    let sendNewAreas = areas.map((area) => {
      return {
        id: area.id,
        shape: area.shape,
        coords: [
          (area.coords[0] * 100) / imgWidth,
          (area.coords[1] * 100) / imgWidth,
          15,
        ],
        preFillColor: area.preFillColor,
      };
    });
    let sendingHotSpots = {
      name: hotSpots.name,
      areas: sendNewAreas,
    };
    setSendHotSpots(sendingHotSpots);
    let defaultHotSpots = {
      name: "kek",
      areas: [],
    };
    setHotSpots(defaultHotSpots);
  };
  const renderHotSpotsTest = () => {
    let areas = sendHotSpots.areas;
    let imgWidth = document
      .getElementById("clientID")
      .getElementsByTagName("img")[0].width;
    let renderNewHotSpots = areas.map((area) => {
      return {
        id: area.id,
        shape: area.shape,
        coords: [
          (area.coords[0] / 100) * imgWidth,
          (area.coords[1] / 100) * imgWidth,
          10,
        ],
        preFillColor: area.preFillColor,
      };
    });
    let renderingHotSpots = {
      name: "zhopich",
      areas: renderNewHotSpots,
    };
    setClientHotSpots(renderingHotSpots);
  };
  const SetClientArea = (area) => {
    setClientSelectedArea(area);
  };

  return (
    <TestAreaStyled>
      <button onClick={sendHotSpotsTest}>ТЕСТ ОТПРАВКИ</button>
      <button onClick={renderHotSpotsTest}>ТЕСТ ОТРИСОВКИ</button>
      <AdminWrapperStyled id="adminID">
        <ImageMapper
          src={
            "https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg"
          }
          onClick={(area) => SetAdminArea(area)}
          onImageClick={(evt) => YouClicked(evt)}
          map={hotSpots}
          width={500}
        />
        {!isEmptyObject(adminSelectedArea) && (
          <AdminAreaContentStyled
            left={adminSelectedArea.coords[0] - 50}
            top={adminSelectedArea.coords[1] - 120}
          ></AdminAreaContentStyled>
        )}
      </AdminWrapperStyled>
      <ClientWrapperStyled id="clientID" style={{ marginLeft: "10px" }}>
        <ImageMapper
          src={
            "https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg"
          }
          onClick={(area) => SetClientArea(area)}
          map={clientHotSpots}
          width={300}
        />
        {!isEmptyObject(clientSelectedArea) && (
          <ClientAreaContentStyled
            left={clientSelectedArea.coords[0] - 25}
            top={clientSelectedArea.coords[1] - 65}
          ></ClientAreaContentStyled>
        )}
      </ClientWrapperStyled>
    </TestAreaStyled>
  );
};

const TestAreaStyled = styled.div`
  width: 1500px;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
const AdminWrapperStyled = styled.div`
  width: 500px;
  height: 625px;
  display: flex;
  position: relative;
`;
const ClientWrapperStyled = styled.div`
  width: 300px;
  height: 375px;
  display: flex;
  position: relative;
`;
const AdminAreaContentStyled = styled.div`
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  z-index: 10;
`;
const ClientAreaContentStyled = styled.div`
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
  width: 50px;
  height: 50px;
  background-color: red;
  position: absolute;
  z-index: 10;
`;

export default WithLib;
