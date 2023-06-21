import React, { useState } from 'react'
import Draggable from 'react-draggable';


function ElementContainer() {

    const [elements, setElements] = useState([]);

    const handleButtonClick = () => {
        console.log("Awa")
      const newElement = {
        id: Date.now(),
        color: getRandomColor(),
        position: { x: 0, y: 0 }, 
      };
      console.log(newElement)
  
      setElements([...elements, newElement]);
    };
  
    const handleDragStart = (e, id) => {
      e.dataTransfer.setData('elementId', id.toString());
      console.log("Drag Start")
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
      console.log("Drag End")
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const elementId = e.dataTransfer.getData('elementId');
      const droppedElement = elements.find((element) => element.id === Number(elementId));
  
      if (droppedElement) {
        setElements(
            elements.map((element) => {
              if (element.id === droppedElement.id) {
                // Update dropped element position
                const newPosition = {
                  x: e.clientX - e.currentTarget.getBoundingClientRect().left,
                  y: e.clientY - e.currentTarget.getBoundingClientRect().top,
                };
                return { ...element, position: newPosition };
              }
              return element;
            })
          );
      }
    };

    const handleDrag = (e, id) => {
        const elementId = e.dataTransfer.getData('elementId');
        const draggedElement = elements.find((element) => element.id === Number(elementId));
    
        if (draggedElement) {
          const newPosition = {
            x: e.clientX - e.currentTarget.getBoundingClientRect().left,
            y: e.clientY - e.currentTarget.getBoundingClientRect().top,
          };
    
          setElements(
            elements.map((element) => {
              if (element.id === draggedElement.id) {
                // Update dragged element position
                return { ...element, position: newPosition };
              }
              return element;
            })
          );
        }
      };
  
    const getRandomColor = () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    console.log(elements)
  
  return (
    <div>
     
     <div
        className="dropzone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {elements.map((element) => (
            <Draggable
        grid={[25, 25]}
        scale={1}
            >
          <div
            key={element.id}
            className="draggable-element"
            draggable
            onDragStart={(e) => handleDragStart(e, element.id)}
            onDrag={(e) => handleDrag(e, element.id)}
            style={{
              backgroundColor: element.color,
              position: 'absolute',
              left: element.position.x,
              top: element.position.y,
              width: '50px',
              height: '50px',
            }}
          />
          </Draggable>
        ))}
      </div>

      <button style={{ position:"fixed-bottom",  }} onClick={handleButtonClick}>Create Element</button>
    </div>
  )
}

export default ElementContainer