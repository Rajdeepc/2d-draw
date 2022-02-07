import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ClickToCopy from "../ClickToCopy/ClickToCopy";

export default function CollaborationModal({ show, handleClose,isRecording }) {
  const [collaborationInitiated, setCollaborationInitiated] = useState(true);
  const [collaborationStarted, setCollaborationStarted] = useState(false);

  // set new name
  const handleNameChange = () => {};

  const copyLinkToClipboard = (link) => {};
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Live collaboration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <React.Fragment>
            {collaborationInitiated && (
              <p>
                You can invite people to your current scene to collaborate with
                you.
                <br></br>
                🔒 Don't worry, the session uses end-to-end encryption, so
                whatever you draw will stay private. Not even our server will be
                able to see what you come up with.
              </p>
            )}
            {collaborationStarted && (
              <div>
                <p>
                  Share this link with anyone you want to collaborate with:{" "}
                </p>
                <div>
                  <ClickToCopy
                    copyLink={copyLinkToClipboard}
                    link={window.location.href}
                  />
                </div>
                <br></br>
                <small>
                  🔒 Don't worry, the session uses end-to-end encryption, so
                  whatever you draw will stay private. Not even our server will
                  be able to see what you come up with.
                </small>
                <br></br>
                <br></br>
                <small>
                  Stopping the session will disconnect you from the room, but
                  you'll be able to continue working with the scene, locally.
                  Note that this won't affect other people, and they'll still be
                  able to collaborate on their version.
                </small>
              </div>
            )}
          </React.Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {collaborationInitiated && (
            <Button
              variant={"primary"}
              onClick={() => {
                setCollaborationStarted(true);
                setCollaborationInitiated(false);
                isRecording(true)
              }}
            >
              Start Session
            </Button>
          )}
          {collaborationStarted && (
            <Button
              variant={"danger"}
              onClick={() => {
                setCollaborationStarted(false);
                setCollaborationInitiated(true);
                isRecording(false)

              }}
            >
              End Session
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
