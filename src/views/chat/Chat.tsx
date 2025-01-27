import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Send } from "lucide-react";
import "../../public/styles/chatbot.css";
import { Message } from "../../models/Message";
import { API_URL } from "../../url/api_url";

function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  // Conectar al WebSocket cuando el componente se monta
  useEffect(() => {
    if (!userName) return; // No conectar hasta que el usuario ingrese su nombre

    ws.current = new WebSocket(`${API_URL}`);

    ws.current.onopen = () => {
      console.log("Conexión WebSocket establecida");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newMessage: Message = {
        text: data.text,
        sender: data.sender,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.current.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    // Limpiar la conexión al desmontar el componente
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userName]);

  const handleSendMessage = () => {
    if (newMessage.trim() && ws.current) {
      const userMessage = {
        text: newMessage,
        sender: userName,
      };

      // Enviar el mensaje al servidor a través de WebSocket
      ws.current.send(JSON.stringify(userMessage));
      setNewMessage(""); // Limpiar el campo de entrada
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setShowNameDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Dialog
        header="Ingresa tu nombre"
        visible={showNameDialog}
        style={{ width: "400px" }}
        onHide={() => setShowNameDialog(false)}
        footer={
          <div>
            <Button label="Unirse al chat" onClick={handleNameSubmit} />
          </div>
        }
      >
        <InputText
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full"
        />
      </Dialog>

      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">Chat General</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.sender === userName ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={
                  message.sender === userName
                    ? "chat-message-sender"
                    : "chat-message-receiver"
                }
              >
                <p className="text-gray-800 whitespace-pre-wrap">
                  <strong>{message.sender}:</strong> {message.text}
                </p>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <InputText
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1"
          />
          <Button
            icon={<Send className="w-4 h-4" />}
            onClick={handleSendMessage}
            className="p-button-rounded"
            disabled={!newMessage.trim()}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatView;
