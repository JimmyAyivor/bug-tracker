import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

export default function ProjectsModal({show, id ,title,handleClose,handleDelete}){


  return (<>{show ? 
    <Modal >
              <Modal.Header closeButton>
                <Modal.Title>Delete Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete "{title}" ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="badge badge-secondary" onClick={handleDelete}>
                  Yes
                </Button>
              </Modal.Footer>
                </Modal> : null}</>
  )
}
