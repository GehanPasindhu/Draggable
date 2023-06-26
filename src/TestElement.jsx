import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import EditPanel from "./EditPanel";
import Tabele from "./Tabele";
import Scorecard from "./Scorecard";
import Chart from "./Chart";
import TextBox from "./TextBox";

const ElementContainer = () => {
  const [elements, setElements] = useState([]);
  const [deleteElementId, setDeleteElementId] = useState(null);
  const [activeElementId, setActiveElementId] = useState(null);
  const [dropzoneHeight, setDropzoneHeight] = useState(0);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [editElementId, setEditElementId] = useState(null);

  const handleDragStart = (e, buttonId) => {
    e.dataTransfer.setData("buttonId", buttonId.toString());
    e.dataTransfer.effectAllowed = "move";

    const draggingElement = document.createElement("div");
    draggingElement.style.backgroundColor = "transparent";
    draggingElement.style.border = "1px dashed yellow";

    if (buttonId == "scorecard") {
      draggingElement.style.width = "13rem";
      draggingElement.style.height = "6rem";
    } else {
      draggingElement.style.width = "400px";
      draggingElement.style.height = "400px";
    }

    document.body.appendChild(draggingElement);
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
      name: buttonId,
      position: {
        x: dropX,
        y: dropY,
      },
      showDeleteButton: true,
      backgroundColor: "#FF0000",
      etype: buttonId,
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  const handleDelete = (elementId) => {
    setDeleteElementId(elementId);
  };

  const handleConfirmationAction = (action) => {
    if (action === "delete") {
      const updatedElements = elements.filter(
        (element) => element.id !== deleteElementId
      );
      setElements(updatedElements);
      setEditElementId(null);
      setShowEditPanel(false);
    }
    setDeleteElementId(null);
  };

  const dropzoneRef = useRef(null);
  useEffect(() => {
    if (dropzoneRef.current) {
      const { height } = dropzoneRef.current.getBoundingClientRect();
      setDropzoneHeight(height + 20);
    }
  }, [elements]);

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div
          className="dropzone"
          ref={dropzoneRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            minHeight: "90vh",
            height: `${dropzoneHeight}px`,
            overflow: "auto",
          }}
        >
          {elements.map((element) => (
        
              element.etype === "tableBtn" ? (
                      <>
                        <Tabele />
                      </>
                    ) : element.etype === "scorecard" ? (
                      <>
                        <Scorecard element={element}/>
                      </>
                    ) : element.etype === "chart" ? (
                      <>
                        <Chart />
                      </>
                    ) : element.etype === "textBox" ? (
                      <>
                        <TextBox />
                      </>
                    ) : (
                      <></>
                    )
          ))}
        </div>
        <div className="button-container z-50 fixed bottom-0 gap-5">
          <button
            draggable
            onDragStart={(e) => handleDragStart(e, "tableBtn")}
            onDragEnd={handleDragEnd}
            className="border-2 p-2"
            id="tableBtn"
          >
            Table
          </button>
          <button
            draggable
            onDragStart={(e) => handleDragStart(e, "scorecard")}
            onDragEnd={handleDragEnd}
            className="border-2 p-2"
            id="scorecard"
          >
            Scorecard
          </button>
          <button
            draggable
            onDragStart={(e) => handleDragStart(e, "chart")}
            onDragEnd={handleDragEnd}
            className="border-2 p-2"
            id="chart"
          >
            Chart
          </button>
          <button
            draggable
            onDragStart={(e) => handleDragStart(e, "textBox")}
            onDragEnd={handleDragEnd}
            className="border-2 p-2"
            id="textBox"
          >
            Texts
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

      {showEditPanel && (
        <EditPanel
          onClose={() => {
            setShowEditPanel(false), setEditElementId(null);
          }}
          editElement={editElementId}
          elements={elements}
          setElements={setElements}
        />
      )}
    </>
  );
};

export default ElementContainer;
