
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="flex items-center justify-center p-2.5 mb-4 rounded-full bg-gradient-to-r from-mentor-blue via-mentor-teal to-mentor-light-teal">
        <div className="bg-white dark:bg-mentor-blue p-2 rounded-full">
          <Briefcase className="h-6 w-6 text-mentor-teal" />
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-2 gradient-text">
        CareerMentor.ai
      </h1>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-4">
        Your AI career guide to navigate professional growth, skill development, and job opportunities
      </p>
      
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="outline" className="bg-mentor-teal/10 text-mentor-teal border-mentor-teal/30">
          Personalized Guidance
        </Badge>
        <Badge variant="outline" className="bg-mentor-teal/10 text-mentor-teal border-mentor-teal/30">
          Skill Development
        </Badge>
        <Badge variant="outline" className="bg-mentor-teal/10 text-mentor-teal border-mentor-teal/30">
          Career Paths
        </Badge>
        <Badge variant="outline" className="bg-mentor-teal/10 text-mentor-teal border-mentor-teal/30">
          Interview Prep
        </Badge>
      </div>
    </div>
  );
};

export default Header;
