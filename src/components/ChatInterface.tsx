
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { UserInfo } from "./UserInfoForm";

interface Message {
  id: string;
  sender: "user" | "mentor";
  content: string;
}

interface ChatInterfaceProps {
  userInfo: UserInfo;
  onReset: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userInfo, onReset }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Generate initial mentor message based on user info
  useEffect(() => {
    const initialMessage = generateInitialResponse(userInfo);
    
    // Simulate a loading period before showing the response
    setIsLoading(true);
    setTimeout(() => {
      setMessages([
        {
          id: Date.now().toString(),
          sender: "mentor",
          content: initialMessage,
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, [userInfo]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input.trim(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(input.trim(), userInfo);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "mentor",
          content: mentorResponse,
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col animate-fade-in shadow-lg border-mentor-teal/20">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "mentor" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === "mentor" 
                    ? "bubble-mentor" 
                    : "bubble-user"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bubble-mentor flex items-center space-x-2 animate-pulse-light">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="shrink-0 border-mentor-teal/30 hover:bg-mentor-teal/10 hover:text-mentor-blue dark:hover:text-mentor-light-teal"
          >
            Start Over
          </Button>
          <div className="flex-1 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for career advice..."
              className="flex-1 input-gradient-focus"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-mentor-teal hover:bg-mentor-light-teal transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Helper functions to generate AI responses
const generateInitialResponse = (userInfo: UserInfo): string => {
  const { education } = userInfo;
  const educationLevel = education.toLowerCase().includes("bachelor") 
    ? "Bachelor's degree" 
    : education.toLowerCase().includes("master") 
      ? "Master's degree" 
      : "your educational background";
  
  return `Hello! I'm your Career Mentor, and I'm here to guide you on your professional journey. 
  
I see you have ${educationLevel}. That's a great foundation! Based on your information, I'll be providing personalized career guidance. 
  
What would you like to know first? You can ask about:
- Career paths that match your background
- Skills you should develop
- Interview preparation
- Job search strategies`;
};

const generateMentorResponse = (question: string, userInfo: UserInfo): string => {
  // Basic response generation based on user input
  if (question.toLowerCase().includes("career path") || question.toLowerCase().includes("jobs")) {
    return `Based on your interests in ${userInfo.interests} and your ${userInfo.education} background, you might consider these career paths:
    
1. [Role One] - This aligns with your short-term goals of ${userInfo.shortTermGoals}
2. [Role Two] - This could help you achieve your long-term vision of ${userInfo.longTermGoals}
3. [Role Three] - This leverages your current skill set in ${userInfo.skills}

Would you like more specific information about any of these roles?`;
  }
  
  if (question.toLowerCase().includes("skill") || question.toLowerCase().includes("learn")) {
    return `To enhance your career prospects in ${userInfo.interests}, I recommend developing these key skills:
    
1. Technical skills: [Specific technical skills relevant to their field]
2. Certifications: [Relevant certifications]
3. Soft skills: Communication, leadership, and problem-solving

Are there any specific skills you're most interested in developing?`;
  }
  
  if (question.toLowerCase().includes("interview") || question.toLowerCase().includes("prepare")) {
    return `For interviews in the ${userInfo.interests} field, prepare for these common questions:

1. "Tell me about a project where you used [skill mentioned in their skills]"
2. "How do you plan to achieve your goal of ${userInfo.shortTermGoals}?"
3. "How does your background in ${userInfo.education} prepare you for this role?"

Would you like me to suggest resources for interview preparation?`;
  }
  
  // Default response
  return `That's a great question! Based on your background in ${userInfo.education} and interests in ${userInfo.interests}, here's my guidance:

${question.toLowerCase().includes("resume") 
    ? "For your resume, I recommend highlighting your skills in " + userInfo.skills + " and connecting them directly to your career goals."
    : question.toLowerCase().includes("company") || question.toLowerCase().includes("job") 
      ? "Given your interests and background, these companies would be worth exploring for opportunities."
      : "I recommend focusing on building skills that bridge where you are now to your goal of " + userInfo.shortTermGoals
}

Would you like more specific advice on this topic?`;
};

export default ChatInterface;
