import React, { useState } from "react";
import styled from "styled-components";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const ItemTypes = {
  CIRCLE: "circle",
};

const WithoutLib = () => {
  const [hotSpots, setHotSpots] = useState({
    name: "admin-hotspots",
    areas: [],
  });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CIRCLE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [adminSelectedArea, setAdminSelectedArea] = useState({});

  const SetNewHotSpot = (e) => {
    let areas = hotSpots.areas;
    let setNewAreas = [
      ...areas,
      {
        id: areas.length + 1,
        coords: [e.nativeEvent.layerX, e.nativeEvent.layerY],
      },
    ];
    let newHotspots = {
      name: hotSpots.name,
      areas: setNewAreas,
    };
    setHotSpots(newHotspots);
  };

  const SelectCircle = (e) => {
    setAdminSelectedArea(hotSpots.areas.find((spot) => spot.id == e.target.id));
  };

  return (
      <TestAreaStyled>
        <PizdosStyled>
          <AdminWrapperStyled id="adminID">
            <img
              src={
                "https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg"
              }
              alt="AAAAAA"
              onClick={(e) => SetNewHotSpot(e)}
            />
            {hotSpots.areas.map((area) => (
              <StyledAdminCircle
                ref={drag}
                draggable={true}
                key={area.id}
                id={area.id}
                top={area.coords[1] - 15}
                left={area.coords[0] - 15}
                onClick={(e) => SelectCircle(e)}
              />
            ))}
          </AdminWrapperStyled>
        </PizdosStyled>
        <ClientWrapperStyled id="clientID" style={{ marginLeft: "10px" }}>
          <img
            src={
              "https://latqvbedpllwqek.skdesign.ru/wp-content/uploads/2022/06/224239_289526484_348993037199526_6213266534771725691_n.jpg"
            }
            alt="AAAAAA"
          />
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
const PizdosStyled = styled.div`
  width: 500px;
  height: 625px;
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
const StyledAdminCircle = styled.span`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: ${(props) => props.top + "px"};
  left: ${(props) => props.left + "px"};
`;

export default WithoutLib;
