import React, { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../styles/MessagesPage.css";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/messages`,
        {
          headers: { Authorization: token },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/admin/messages/${id}/status`,
        { status: "read" },
        { headers: { Authorization: token } }
      );
      fetchMessages();
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/admin/messages/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        fetchMessages();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container fluid className="admin-messages">
      <h2 className="page-title mb-4">Contact Messages</h2>

      <Table responsive striped hover className="messages-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{formatDate(message.created_at)}</td>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>
                <Badge bg={message.status === "read" ? "success" : "warning"}>
                  {message.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setSelectedMessage(message);
                    setShowModal(true);
                  }}
                >
                  View
                </Button>
                {message.status === "unread" && (
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleMarkAsRead(message.id)}
                  >
                    Mark as Read
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(message.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div>
              <p>
                <strong>From:</strong> {selectedMessage.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedMessage.email}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selectedMessage.created_at)}
              </p>
              <p>
                <strong>Status:</strong> {selectedMessage.status}
              </p>
              <hr />
              <p>
                <strong>Message:</strong>
              </p>
              <div className="message-content">{selectedMessage.message}</div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedMessage && selectedMessage.status === "unread" && (
            <Button
              variant="success"
              onClick={() => {
                handleMarkAsRead(selectedMessage.id);
                setShowModal(false);
              }}
            >
              Mark as Read
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MessagesPage;
