import React, { useState } from 'react';
import Folder from '../Components/folder.jsx';

const initialStructure = [
  {
    id: 1,
    name: 'Root',
    type: 'folder',
    children: [
    ],
  },
];

function App() {
  const [structure, setStructure] = useState(initialStructure);

  const generateUniqueId = () => Date.now() + Math.random();

const addFolder = (parentId) => {
  const newFolderName = prompt('Enter folder name:');
  if (!newFolderName) return;

  const newFolder = {
    id: generateUniqueId(),
    name: newFolderName,
    type: 'folder',
    children: [],
  };

  setStructure(addItemToFolder(structure, parentId, newFolder));
};

  
  const updateFileContent = (fileId, newContent) => {
    setStructure((prevStructure) =>
      prevStructure.map((item) =>
        item.type === 'file'
          ? {
              ...item,
              content: item.id === fileId ? newContent : item.content,
            }
          : item
      )
    );
  };

  const addFile = (parentId) => {
    const newFileName = prompt('Enter file name:');
    const newFileContent = prompt('Enter file content:');
    if (!newFileName || !newFileContent) return;

    const newFile = {
      id: generateUniqueId(),
      name: newFileName,
      type: 'file',
      content: newFileContent,
    };

    setStructure(addItemToFolder(structure, parentId, newFile));
  };

  const renameFolder = (folderId, newName) => {
    setStructure(renameItem(structure, folderId, newName));
  };

  const renameItem = (structure, folderId, newName) => {
    return structure.map(item => {
      if (item.id === folderId && item.type === 'folder') {
        return {
          ...item,
          name: newName,
        };
      }
      if (item.type === 'folder') {
        return {
          ...item,
          children: renameItem(item.children, folderId, newName),
        };
      }
      return item;
    });
  };

  const addItemToFolder = (structure, parentId, newItem) => {
    return structure.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, newItem],
        };
      }
      if (item.type === 'folder') {
        return {
          ...item,
          children: addItemToFolder(item.children, parentId, newItem),
        };
      }
      return item;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">File Structure</h1>
      <div>
        {structure.map(item => (
          <Folder
            key={item.id}
            folder={item}
            addFolder={addFolder}
            addFile={addFile}
            onRenameFolder={renameFolder}
            onUpdateContent={updateFileContent}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
