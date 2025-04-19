
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, FileUp } from "lucide-react";
import { useState } from "react";

export interface UserInfo {
  education: string;
  skills: string;
  interests: string;
  shortTermGoals: string;
  longTermGoals: string;
  resumeFile?: File | null;
}

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    education: "",
    skills: "",
    interests: "",
    shortTermGoals: "",
    longTermGoals: "",
    resumeFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUserInfo((prev) => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <Card className="w-full animate-fade-in shadow-lg border-mentor-teal/20">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="education" className="text-mentor-blue dark:text-mentor-light-teal">
                Education / Academic Background
              </Label>
              <Textarea
                id="education"
                name="education"
                placeholder="What's your educational background? Include degrees, certifications, or significant courses."
                className="mt-1 input-gradient-focus"
                value={userInfo.education}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="skills" className="text-mentor-blue dark:text-mentor-light-teal">
                Current Technical & Soft Skills
              </Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="What skills do you already have? Include technical skills, tools, and soft skills."
                className="mt-1 input-gradient-focus"
                value={userInfo.skills}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="interests" className="text-mentor-blue dark:text-mentor-light-teal">
                Industries & Domains of Interest
              </Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="What industries or domains are you interested in working in?"
                className="mt-1 input-gradient-focus"
                value={userInfo.interests}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="shortTermGoals" className="text-mentor-blue dark:text-mentor-light-teal">
                Short-Term Career Goals
              </Label>
              <Textarea
                id="shortTermGoals"
                name="shortTermGoals"
                placeholder="What are your career goals for the next 1-2 years?"
                className="mt-1 input-gradient-focus"
                value={userInfo.shortTermGoals}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="longTermGoals" className="text-mentor-blue dark:text-mentor-light-teal">
                Long-Term Career Goals
              </Label>
              <Textarea
                id="longTermGoals"
                name="longTermGoals"
                placeholder="Where do you see yourself in 5+ years?"
                className="mt-1 input-gradient-focus"
                value={userInfo.longTermGoals}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="resume" className="text-mentor-blue dark:text-mentor-light-teal">
                Upload Your Resume (Optional)
              </Label>
              <div className="mt-1 flex items-center">
                <Label
                  htmlFor="resume"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-mentor-teal/30 bg-mentor-teal/5 hover:bg-mentor-teal/10 rounded-md transition-colors"
                >
                  <FileUp className="h-5 w-5 text-mentor-teal" />
                  <span>Choose File</span>
                </Label>
                <span className="ml-3 text-sm text-gray-500">
                  {userInfo.resumeFile
                    ? userInfo.resumeFile.name
                    : "No file chosen"}
                </span>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-mentor-blue to-mentor-teal hover:from-mentor-teal hover:to-mentor-light-teal text-white transition-all duration-300"
            >
              Connect with Career Mentor <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserInfoForm;
