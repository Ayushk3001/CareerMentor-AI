
import React, { useState, useEffect } from "react";
import { UserInfo } from "./UserInfoForm";
import { LyzrService, LyzrMessage } from "@/services/lyzrService";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface LyzrChatInterfaceProps {
  userInfo: UserInfo;
  onReset: () => void;
  lyzrService: LyzrService;
}

const LyzrChatInterface: React.FC<LyzrChatInterfaceProps> = ({
  userInfo,
  onReset,
  lyzrService
}) => {
  const [messages, setMessages] = useState<LyzrMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Send initial message to the API when component mounts
  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      try {
        // Format initial message based on user's information
        const initialMessage = `I'm looking for career guidance based on my background and goals.`;
        
        // Get the formatted user context
        const userContext = lyzrService.formatUserContext(userInfo);
        
        // Send the initial message with context
        const initialResponse = await lyzrService.sendMessage(initialMessage, userContext);
        
        setMessages([
          { role: "user", content: initialMessage },
          { role: "assistant", content: initialResponse }
        ]);
      } catch (error) {
        console.error("Error starting conversation:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to career mentor. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    startConversation();
  }, [lyzrService, userInfo]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage = newMessage.trim();
    setNewMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await lyzrService.sendMessage(userMessage);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Error is already handled in the service with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-mentor-blue dark:text-mentor-light-teal">
          CareerMentor.ai
        </h2>
        <Button variant="outline" onClick={onReset} size="sm">
          Start Over
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        {messages.length === 0 && isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Connecting to your career mentor...</p>
          </div>
        ) : messages.length === 0 && !isLoading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>No messages yet</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={
                  message.role === "assistant"
                    ? "bubble-mentor max-w-[80%] bg-mentor-light-teal/10 p-3 rounded-lg"
                    : "bubble-user max-w-[80%] bg-mentor-blue/10 p-3 rounded-lg text-right"
                }
              >
                {message.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))
        )}
        {isLoading && messages.length > 0 && (
          <div className="flex justify-start">
            <div className="bubble-mentor max-w-[80%] bg-mentor-light-teal/10 p-3 rounded-lg">
              <div className="flex space-x-2 items-center">
                <div className="h-2 w-2 bg-mentor-teal rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-mentor-teal rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-mentor-teal rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask your career question..."
          className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-mentor-teal input-gradient-focus"
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="bg-mentor-teal hover:bg-mentor-blue text-white"
          disabled={isLoading || !newMessage.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default LyzrChatInterface;
