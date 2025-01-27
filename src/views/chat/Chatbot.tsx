import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { MessageCircle, Bot, User, Send } from "lucide-react";
import axios from "axios";
import { Message } from "../../models/Message";
import { API_URL, ENDPOINT_DIABETES } from "../../url/api_url";
import "../../public/styles/chatbot.css";

function ChatbotView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! Soy un asistente especializado en información sobre diabetes. Puedes preguntarme sobre estadísticas y datos relacionados con la diabetes. Por ejemplo:\n- ¿Cuál es el promedio de embarazos?\n- ¿Cuál es el nivel promedio de glucosa?\n- ¿Cuál es la edad promedio de las personas con diabetes?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const processQuestion = async (question: string) => {
    try {
      const numbers = question.match(/\d+(\.\d+)?/g);
      const params: any = { pregunta: question };

      if (numbers) {
        if (question.includes("mayores de")) params.n = numbers[0];
        if (question.includes("glucosa")) params.y = numbers[0];
        if (question.includes("presión")) params.z = numbers[0];
        if (question.includes("insulina")) params.x = numbers[0];
        if (question.includes("bmi")) params.f = numbers[0];
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${API_URL}${ENDPOINT_DIABETES}`, {
        params,
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
      return response.data;
    } catch (error) {
      console.error("Error al procesar la pregunta:", error);
      return "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.";
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsTyping(true);

      try {
        const response = await processQuestion(newMessage.toLowerCase());
        const botMessage: Message = {
          text:
            typeof response === "string"
              ? response
              : JSON.stringify(response, null, 2),
          sender: "bot",
          timestamp: new Date(),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            text: "Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-white shadow-md p-4 flex items-center gap-2">
        <Bot className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">
          Asistente de Diabetes
        </h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.sender === "user" ? (
                <User className="w-8 h-8 text-red-500" />
              ) : (
                <Bot className="w-8 h-8 text-gray-500" />
              )}
              <div
                className={
                  message.sender === "user"
                    ? "chat-message-sender"
                    : "chat-message-receiver"
                }
              >
                <p className="text-gray-800 whitespace-pre-wrap">
                  {message.text}
                </p>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-2">
              <Bot className="w-8 h-8 text-gray-500" />
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <MessageCircle className="w-6 h-6 text-gray-500" />
          <InputText
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Haz una pregunta sobre diabetes..."
            className="flex-1"
          />
          <Button
            icon={<Send className="w-4 h-4" />}
            onClick={handleSendMessage}
            className="p-button-rounded"
            disabled={!newMessage.trim() || isTyping}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatbotView;
