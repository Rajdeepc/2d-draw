import React,{useState} from "react";
import CollaborationModal from "../CollaborationModal/CollaborationModal";

 const Header = () => {
  const [collaborationModal, setShowCollaborationModal] = useState(false);
  const [recordingOn, setRecordingON] = useState(false);

  const startCollaboration = () => {
    setShowCollaborationModal(true);
  };

  const checkSessionStarted = (value) => {
    setRecordingON(value)
  }
  return (
    <header>
      <div className="stroke-selection">
        <div>PaintWithAll</div>
        <div className="share">
          <button onClick={startCollaboration}>Start Collaboration <i class="bi bi-people-fill"></i></button>
          { recordingOn && <i class="recordfill bi bi-record-fill"></i>}
        </div>
      </div>
      <CollaborationModal isRecording={checkSessionStarted} show={collaborationModal} handleClose={() => setShowCollaborationModal(false)}/>
    </header>
  );
}

export default Header
