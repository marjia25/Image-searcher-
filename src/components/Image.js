import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Image({ id, url }) {
  // States
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [show, setShow] = useState(false);

  const ACCESS_KEY = "g8TGL0wWTXP-ZUyh8A-Ew-EVlV5byz8E3g3NBhgck8Y";

  const handleClose = () => setShow(false);

  const showModal = (id) => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentImageUrl(data.urls.regular);
        setShow(true);
      });
  };

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
        onClick={() => showModal(id)}
        width="100%"
        src={url}
        alt=""
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img width="100%" src={currentImageUrl} alt="" />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Image;
