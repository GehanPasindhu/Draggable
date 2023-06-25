import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const ElementContainer = () => {
  const [elements, setElements] = useState([]);
  const [deleteElementId, setDeleteElementId] = useState(null);
  const [activeElementId, setActiveElementId] = useState(null);
  const [dropzoneHeight, setDropzoneHeight] = useState(0);

  const handleDragStart = (e, buttonId) => {
    e.dataTransfer.setData("buttonId", buttonId.toString());
    e.dataTransfer.effectAllowed = "move";

    const draggingElement = document.createElement("div");
    draggingElement.style.width = "150px";
    draggingElement.style.height = "150px";
    draggingElement.style.backgroundColor = "transparent";
    draggingElement.style.border = "2px dashed yellow";
    draggingElement.innerText = `Element ${buttonId}`;

    document.body.appendChild(draggingElement);

    // Set the dragged element as the drag image
    e.dataTransfer.setDragImage(draggingElement, 0, 0);

    setTimeout(() => {
      document.body.removeChild(draggingElement);
    }, 0);
  };

  const handleDragEnd = (e) => {
    const draggingElement = document.querySelector(".dragging-element");
    if (draggingElement) {
      draggingElement.classList.remove("dragging-element");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const buttonId = e.dataTransfer.getData("buttonId");

    const dropX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const dropY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    const elementWidth = 150;
    const elementHeight = 150;

    const dropzoneWidth = e.currentTarget.offsetWidth;
    const dropzoneHeight = e.currentTarget.offsetHeight;

    if (
      dropX < 0 ||
      dropX + elementWidth > dropzoneWidth ||
      dropY < 0 ||
      dropY + elementHeight > dropzoneHeight
    ) {
      return;
    }

    const newElement = {
      id: Date.now(),
      name: `Element ${buttonId}`,
      position: {
        x: dropX,
        y: dropY,
      },
      showDeleteButton: true,
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  const handleDelete = (elementId) => {
    setDeleteElementId(elementId);
  };

  const handleConfirmationAction = (action) => {
    if (action === "delete") {
      const updatedElements = elements.filter((element) => element.id !== deleteElementId);
      setElements(updatedElements);
    }
    setDeleteElementId(null);
  };

  const dropzoneRef = useRef(null)
  useEffect(() => {
    if (dropzoneRef.current) {
      const { height } = dropzoneRef.current.getBoundingClientRect();
      setDropzoneHeight(height + 20);
    }
  }, [elements]);
  
  
  return (
    <div style={{ margin: "10px" }}>
      <div
        className="dropzone"
        ref={dropzoneRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{minHeight:"100vh", height:`${dropzoneHeight}px`,
         width: "95vw", border: "2px solid red", overflow: "auto" }}
      >
        {elements.map((element) => (
          <Draggable
          >
          <div
            onClick={()=>setActiveElementId(element.id)}
            key={element.id}
            id={element.id}
            className={`draggable-element rounded-xl border-1 border-blue-50 p-2 ${activeElementId === element.id ? "z-30" : "z-10"} absolute`}
            style={{
              left: element.position.x,
              top: element.position.y,
              width: "400px",
              height: "400px",
              backgroundColor: "#FF0000",
            }}
          >
            <div className="element-content">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <div className="flex">
                  <div className="text-xl">{element.name}</div>
                </div>
                <div className="flex">
                  <div className="flex flex-col gap-2 menu-buttons">
                    <div className="flex flex-row justify-end gap-1 ">
                      <div className="w-1 h-1 rounded-full bg-white ring-1"></div>
                      <div className="w-1 h-1 rounded-full bg-white ring-1"></div>
                      <div className="w-1 h-1 rounded-full bg-white ring-1"></div>
                    </div>
                    <div className="flex flex-row justify-end">
                      <div className="element-buttons bg-indigo-500 p-2 rounded-lg w-24 z-10">
                        <button className="move-button cursor-move">
                          Move
                        </button>
                        <button className="edit-button">Edit</button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(element.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Draggable>
        ))}
      </div>
      <div className="button-container z-50 fixed bottom-0 gap-2">
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 1)}
          onDragEnd={handleDragEnd}
          id="btn1"
          
        >
          Element 1
        </button>
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 2)}
          onDragEnd={handleDragEnd}
          id="btn2"
          
        >
          Element 2
        </button>
        <button
          draggable
          onDragStart={(e) => handleDragStart(e, 3)}
          onDragEnd={handleDragEnd}
          id="btn3"
          
        >
          Element 3
        </button>
      </div>

      {deleteElementId && (
        <div className="confirmation-dialog z-50">
          <p>Are you sure you want to delete this element?</p>
          <div className="flex flex-row justify-end items-center gap-2">
          <button onClick={() => handleConfirmationAction("delete")}>
            Delete
          </button>
          <button onClick={() => handleConfirmationAction("cancel")}>
            Cancel
          </button>
          </div>
          
        </div>
      )}

    </div>
  );
};

export default ElementContainer;
