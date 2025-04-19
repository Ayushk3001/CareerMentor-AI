
import { UserInfo } from "@/components/UserInfoForm";
import { toast } from "@/hooks/use-toast";

const LYZR_API_URL = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';
const LYZR_API_KEY = 'sk-default-74LN001C2dt3xpml1UKs3SSGNIkJxtor';

export interface LyzrMessage {
  role: 'assistant' | 'user';
  content: string;
}

interface LyzrApiRequest {
  user_id: string;
  agent_id: string;
  session_id: string;
  message: string;
  context?: string;
}

interface LyzrApiResponse {
  response: string;
  conversation_id?: string;
}

export class LyzrService {
  private userId: string;
  private agentId: string = '67ffa17ba90b98ad94caae14';
  private sessionId: string = '67ffa17ba90b98ad94caae14';
  private userInfo: UserInfo;
  
  constructor(userInfo: UserInfo) {
    // Store the user info for context in messages
    this.userInfo = userInfo;
    
    // Use email as user ID if available
    this.userId = "ayush30012003@gmail.com";
  }

  async sendMessage(message: string, userContext?: string): Promise<string> {
    try {
      // If no specific context is provided, use the formatted user info
      const contextToUse = userContext || this.formatUserContext(this.userInfo);
      
      const payload: LyzrApiRequest = {
        user_id: this.userId,
        agent_id: this.agentId,
        session_id: this.sessionId,
        message: message,
        context: contextToUse
      };

      const response = await fetch(LYZR_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': LYZR_API_KEY
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: LyzrApiResponse = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error sending message to Lyzr API:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to career mentor. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }

  // Format user info into a context string for the API
  formatUserContext(userInfo: UserInfo): string {
    return `
      User Profile:
      Education: ${userInfo.education}
      Skills: ${userInfo.skills}
      Interests: ${userInfo.interests}
      Short-term Goals: ${userInfo.shortTermGoals}
      Long-term Goals: ${userInfo.longTermGoals}
      ${userInfo.resumeFile ? `Resume: ${userInfo.resumeFile.name}` : 'No resume provided'}
      
      As CareerMentor.ai, provide personalized career guidance based on the above user profile.
    `.trim();
  }
}
