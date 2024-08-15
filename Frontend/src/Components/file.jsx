import React, { useState } from "react";
import { FaFile } from "react-icons/fa";

function File({ file, onUpdateContent }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(file.content);

  const togglePreview = () => setIsPreviewOpen(!isPreviewOpen);
  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setEditedContent(file.content); // Revert to original content
    setIsEditing(false);
  };
  const saveEditing = () => {
    onUpdateContent(file.id, editedContent); // Save the edited content
    setIsEditing(false);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer" onClick={togglePreview}>
        <FaFile className="text-gray-600" />
        <span className="ml-2 text-gray-600">{file.name}</span>
      </div>
      {isPreviewOpen && (
        <div className="ml-6 mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
          {isEditing ? (
            <div>
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  className="px-4 py-1 text-sm text-white bg-blue-500 rounded"
                  onClick={saveEditing}
                >
                  Save
                </button>
                <button
                  className="px-4 py-1 text-sm text-gray-600 bg-gray-200 rounded"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                {file.content}
              </pre>
              <button
                className="mt-2 px-4 py-1 text-sm text-white bg-green-500 rounded"
                onClick={startEditing}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default File;
