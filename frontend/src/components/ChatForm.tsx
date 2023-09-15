import { useState } from "react";
import { chatSend } from "../services/api";

interface ChatFormProps {
  userId: string;
  onSent: () => void;
}
function ChatForm({ userId, onSent }: ChatFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifique se ambos os campos estão preenchidos
    if (!userId || !message) {
      return;
    }
    console.log("sendind message");
    chatSend(userId, message).then(onSent);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" id="userId" value={userId} />
      <div>
        <label htmlFor="message">Mensagem:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}

export default ChatForm;
