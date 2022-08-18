import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ChangePosition = ({images, setImages}) => {

  const onDeletingImage = (e) => {
    let currentImageIndex = images.findIndex(
      (file) => file.preview === e.target.src
    );
    images.splice(currentImageIndex, 1)
    let changePositionNumbers = images.map((file, index) =>
        Object.assign(file, {
            position: index
        })
    )
    setImages(changePositionNumbers)
  };

  const changeVariationImagePosition = (props) => {
    images.splice(
      props[1],
      0,
      images.splice(props[0], 1)[0]
    );
    let changePositionNumbers = images.map((file, index) =>
        Object.assign(file, {
            position: index
      })
    )
      setImages(changePositionNumbers)
  };

  return (
    <AddImagesAreaStyled>
      <DragDropContext
        onDragEnd={(param) => {
          const srcIndex = param.source.index;
          const desIndex = param.destination?.index;
          changeVariationImagePosition([srcIndex, desIndex]);
        }}
      >
        <Droppable droppableId="droppable-1" direction="horizontal">
          {(provided) => (
            <ImagesPreviewContainerStyled
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {images.map((file, index) => (
                <Draggable
                  key={file.position}
                  draggableId={"draggable-" + file.position}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ImageContainerStyled
                      style={{
                        position: "relative",
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging ? "0 0 .4rem" : "none",
                      }}
                      onClick={(e) => onDeletingImage(e)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <StyledIMG src={file.preview} />
                      <DeleteIconAreaStyled>
                        {/*<DeleteIcon />*/}
                      </DeleteIconAreaStyled>
                    </ImageContainerStyled>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ImagesPreviewContainerStyled>
          )}
        </Droppable>
      </DragDropContext>
    </AddImagesAreaStyled>
  );
};

const ImagesPreviewContainerStyled = styled.div`
  width: 500px;
  height: 126px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
`;
const ImageContainerStyled = styled.div`
  position: relative;
  &:hover {
    opacity: 0.48;
  }
`;
const DeleteIconAreaStyled = styled.div`
  display: none;
  ${ImageContainerStyled}:hover & {
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    bottom: 29px;
    left: 35px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
const StyledIMG = styled.img`
  display: block;
  width: 86px;
  height: 86px;
  margin-left: 8px;
  cursor: pointer;
  border-radius: 6px;
`;
const AddImagesAreaStyled = styled.div`
  width: 500px;
  height: 209px;
  display: flex;
  flex-direction: column;
`;

export default ChangePosition;
