import React, { useState } from "react";
import Draggable from "react-draggable";
import ScorecardEdit from "./assets/editPannels/ScorecardEdit";
import deleteIcon from "./assets/delete.png";
import editIcon from "./assets/edit.png";
import moveIcon from "./assets/moveIcone.png";

function Scorecard({ element }) {
  const [size, setSize] = useState("md");
  const [activeElementId, setActiveElementId] = useState(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [elements, setElements] = useState([]);
  const [deleteElementId, setDeleteElementId] = useState(null);
  const [dropzoneHeight, setDropzoneHeight] = useState(0);
  const [editElementId, setEditElementId] = useState(null);

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

  return (
    <>
      <Draggable bounds="parent">
        <div
          className={`p-2 m-4 ${
            size === "sm"
              ? "w-[13rem] h-[11rem]"
              : size == "md"
              ? "w-[14rem] h-[12rem]"
              : "w-[15rem] h-[13rem]"
          } menu-buttons`}
        >
          <>
            <div className="columns-1 border-2 rounded-xl border-yellow-50 p-2">
              <div
                className={`${
                  size === "sm"
                    ? "text-lg"
                    : size === "md"
                    ? "text-2xl"
                    : "text-4xl"
                } font-bold`}
              >
                13%
              </div>
              <div
                className={`${
                  size === "sm"
                    ? "text-xs"
                    : size === "md"
                    ? "text-sm"
                    : "text-md"
                } font-bold`}
              >
                Scorecard name
              </div>
            </div>
          </>

          <div
            className={`absolute ${
              size === "sm"
                ? "top-4 p-0.5  -right-1.5"
                : size === "md"
                ? "top-4 p-1  -right-2"
                : "top-4 p-1 py-2  -right-3"
            } bg-[#F1F1F1] rounded-tr-md rounded-br-md element-buttons`}
          >
            <div className={`flex flex-col gap-2 justify-center items-center`}>
              <div title="Move" className="cursor-move">
                <img
                  src={moveIcon}
                  className={`${
                    size === "sm" || size === "md" ? "h-2.5" : "h-3"
                  }`}
                />
              </div>
              <div title="Edit" className="cursor-pointer">
                <img
                  src={editIcon}
                  className={`${
                    size === "sm" || size === "md" ? "h-2.5" : "h-3"
                  }`}
                />
              </div>
              <div title="Delete" className="cursor-pointer"  onClick={() => handleDelete(element.id)}>
                <img
                  src={deleteIcon}
                  className={`${
                    size === "sm" || size === "md" ? "h-2.5" : "h-3"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </Draggable>

      {showEditPanel && <ScorecardEdit />}


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
    </>
  );
}

export default Scorecard;
