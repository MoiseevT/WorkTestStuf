import React, { useState } from "react";
import styled from "styled-components";

const WithoutLib = () => {
  const [hotSpots, setHotSpots] = useState({
    name: "admin-hotspots",
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
  const [adminSpotMenuOpen, setAdminSpotMenuOpen] = useState(false);
  const [clientSelectedArea, setClientSelectedArea] = useState({});
  const [clientSpotMenuOpen, setClientSpotMenuOpen] = useState(false);
  const [moveCircle, setMoveCircle] = useState({});

  const SetNewHotSpot = (e) => {
    if (adminSpotMenuOpen) setAdminSpotMenuOpen(false);
    else {
      let areas = hotSpots.areas;
      let setNewAreas = [
        ...areas,
        {
          id: areas.length + 1,
          coords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
        },
      ];
      let newHotspots = {
        name: hotSpots.name,
        areas: setNewAreas,
      };
      setHotSpots(newHotspots);
    }
  };

  const SelectAdminCircle = (e) => {
    e.stopPropagation();
    setAdminSelectedArea(hotSpots.areas.find((spot) => spot.id == e.target.id));
    setAdminSpotMenuOpen(false);
    setAdminSpotMenuOpen(true);
  };
  const SelectClientCircle = (e) => {
    e.stopPropagation();
    setClientSelectedArea(
      clientHotSpots.areas.find((spot) => spot.id == e.target.id)
    );
    setClientSpotMenuOpen(false);
    setClientSpotMenuOpen(true);
  };
  const ClientAreaClicked = () => {
    setClientSpotMenuOpen(false);
  }
  const PickCircle = (e) => {
    setMoveCircle(hotSpots.areas.find((spot) => spot.id == e.target.id));
  };

  const SpotCirclePlace = (e) => {
    let imgWidth = document.getElementById("adminID").clientWidth;
    let imgHeight = document.getElementById("adminID").clientHeight;
    let changedXPosition =
      moveCircle.coords[0] + e.nativeEvent.offsetX - 15 < 0
        ? 15
        : moveCircle.coords[0] + e.nativeEvent.offsetX - 15 > imgWidth
        ? imgWidth - 15
        : moveCircle.coords[0] + e.nativeEvent.offsetX - 15;
    let changedYPosition =
      moveCircle.coords[1] + e.nativeEvent.offsetY - 15 < 0
        ? 15
        : moveCircle.coords[1] + e.nativeEvent.offsetY - 15 > imgHeight
        ? imgHeight - 15
        : moveCircle.coords[1] + e.nativeEvent.offsetY - 15;
    let pepega = hotSpots.areas.map((spot) =>
      spot.id === moveCircle.id
        ? { id: spot.id, coords: [changedXPosition, changedYPosition] }
        : spot
    );
    let newHotSpots = {
      name: hotSpots.name,
      areas: pepega,
    };
    setHotSpots(newHotSpots);
  };

  const sendHotSpotsTest = () => {
    let areas = hotSpots.areas;
    let imgWidth = document.getElementById("adminID").clientWidth;
    let imgHeight = document.getElementById("adminID").clientHeight;
    let sendNewAreas = areas.map((area) => {
      return {
        id: area.id,
        coords: [
          (area.coords[0] * 100) / imgWidth,
          (area.coords[1] * 100) / imgHeight,
        ],
      };
    });
    let sendingHotSpots = {
      name: sendHotSpots.name,
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
    let imgWidth = document.getElementById("clientID").clientWidth;
    let imgHeight = document.getElementById("clientID").clientHeight;
    let renderNewHotSpots = areas.map((area) => {
      return {
        id: area.id,
        coords: [
          (area.coords[0] / 100) * imgWidth,
          (area.coords[1] / 100) * imgHeight,
        ],
      };
    });
    let renderingHotSpots = {
      name: "zhopich",
      areas: renderNewHotSpots,
    };
    setClientHotSpots(renderingHotSpots);
  };
  return (
    <TestAreaStyled>
      <button onClick={sendHotSpotsTest}>ТЕСТ ОТПРАВКИ</button>
      <button onClick={renderHotSpotsTest}>ТЕСТ ОТРИСОВКИ</button>
      <AdminWrapperStyled
        id="adminID"
        onClick={(e) => SetNewHotSpot(e)}
        style={{
          backgroundImage: `url("https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg")`,
        }}
      >
        {hotSpots.areas.map((area) => (
          <div key={area.id}>
            <StyledAdminCircle
              onDragStart={(e) => PickCircle(e)}
              onDragEnd={(e) => SpotCirclePlace(e)}
              draggable={true}
              id={area.id}
              top={area.coords[1] - 15}
              left={area.coords[0] - 15}
              onClick={(e) => SelectAdminCircle(e)}
            />
            {adminSpotMenuOpen && area.id === adminSelectedArea.id && (
              <AdminSpotMenuStyled
                top={area.coords[1] - 120}
                left={area.coords[0] - 50}
              ></AdminSpotMenuStyled>
            )}
          </div>
        ))}
      </AdminWrapperStyled>
      <ClientWrapperStyled
        id="clientID"
        style={{
          marginLeft: "10px",
          backgroundImage: `url("https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg")`,
        }}
        onClick={() => ClientAreaClicked()}
      >
        {clientHotSpots.areas.map((area) => (
          <div key={area.id}>
            <StyledClientCircle
              id={area.id}
              top={area.coords[1] - 10}
              left={area.coords[0] - 10}
              onClick={(e) => SelectClientCircle(e)}
            />
            {clientSpotMenuOpen && area.id === clientSelectedArea.id && (
              <ClientSpotMenuStyled
                top={area.coords[1] - 80}
                left={area.coords[0] - 35}
              ></ClientSpotMenuStyled>
            )}
          </div>
        ))}
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
  background-size: cover;
`;
const ClientWrapperStyled = styled.div`
  width: 300px;
  height: 375px;
  display: flex;
  position: relative;
  background-size: cover;
`;
const StyledAdminCircle = styled.span`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;
const AdminSpotMenuStyled = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;
const StyledClientCircle = styled.span`
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;
const ClientSpotMenuStyled = styled.div`
  width: 60px;
  height: 60px;
  background-color: white;
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;

export default WithoutLib;
