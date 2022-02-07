import React,{useState} from "react";
import CollaborationModal from "../CollaborationModal/CollaborationModal";

 const Header = () => {
  const [collaborationModal, setShowCollaborationModal] = useState(false);

  const startCollaboration = () => {
    setShowCollaborationModal(true);
  };
  return (
    <header>
      <div>
        <div></div>
        <div>
          <button onClick={startCollaboration}>Start Collaboration</button>
        </div>
      </div>
      <CollaborationModal show={collaborationModal} handleClose={() => setShowCollaborationModal(false)}/>
    </header>
  );
}

export default Header
