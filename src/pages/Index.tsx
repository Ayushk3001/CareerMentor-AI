
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import UserInfoForm, { UserInfo } from "@/components/UserInfoForm";
import LyzrChatInterface from "@/components/LyzrChatInterface";
import { LyzrService } from "@/services/lyzrService";

const Index: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [lyzrService, setLyzrService] = useState<LyzrService | null>(null);

  const handleFormSubmit = (data: UserInfo) => {
    setUserInfo(data);
    
    // Create the Lyzr service with user info
    const service = new LyzrService(data);
    setLyzrService(service);
    setShowChat(true);
    
    // Simulate resume processing feedback if resume was uploaded
    if (data.resumeFile) {
      console.log(`Processing resume: ${data.resumeFile.name}`);
    }
  };

  const handleReset = () => {
    setShowChat(false);
    setUserInfo(null);
    setLyzrService(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-mentor-teal/20 shadow-xl">
          <CardContent className="p-6">
            {!showChat ? (
              <>
                <h2 className="text-xl font-medium mb-6 text-center text-mentor-blue dark:text-mentor-light-teal">
                  Share your information to get personalized career guidance
                </h2>
                <UserInfoForm onSubmit={handleFormSubmit} />
              </>
            ) : userInfo && lyzrService ? (
              <LyzrChatInterface 
                userInfo={userInfo} 
                onReset={handleReset}
                lyzrService={lyzrService} 
              />
            ) : null}
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Your career journey starts with the right guidance</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
