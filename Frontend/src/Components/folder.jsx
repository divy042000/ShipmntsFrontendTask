import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import File from "./file.jsx";

function Folder({
  folder,
  addFolder,
  addFile,
  onRenameFolder,
  onUpdateContent,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const toggleOpen = () => setIsOpen(!isOpen);
  const startRenaming = () => setIsRenaming(true);
  const cancelRenaming = () => {
    setNewName(folder.name); // Reset to original name
    setIsRenaming(false);
  };
  const saveRenaming = () => {
    onRenameFolder(folder.id, newName); // Save the new name
    setIsRenaming(false);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center">
        <span onClick={toggleOpen} className="cursor-pointer">
          {isOpen ? (
            <FaFolderOpen className="text-yellow-500" />
          ) : (
            <FaFolder className="text-yellow-500" />
          )}
        </span>
        {isRenaming ? (
          <div className="ml-2 flex items-center">
            <input
              className="border p-1 text-sm"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              className="ml-2 text-xs text-blue-500"
              onClick={saveRenaming}
            >
              Save
            </button>
            <button
              className="ml-2 text-xs text-red-500"
              onClick={cancelRenaming}
            >
              Cancel
            </button>
          </div>
        ) : (
          <span className="ml-2 text-blue-500 font-semibold">
            {folder.name}
          </span>
        )}
        {!isRenaming && (
          <div>
            <button
              className="ml-2 text-xs text-green-500"
              onClick={() => addFolder(folder.id)}
            >
              +Folder
            </button>
            <button
              className="ml-2 text-xs text-blue-500"
              onClick={() => addFile(folder.id)}
            >
              +File
            </button>
            <button
              className="ml-2 text-xs text-gray-500"
              onClick={startRenaming}
            >
              Rename
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="ml-6">
          {folder.children.map((item) =>
            item.type === "folder" ? (
              <Folder
                key={item.id}
                folder={item}
                addFolder={addFolder}
                addFile={addFile}
                onRenameFolder={onRenameFolder}
                onUpdateContent={onUpdateContent}
              />
            ) : (
              <File
                key={item.id}
                file={item}
                onUpdateContent={onUpdateContent}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Folder;
