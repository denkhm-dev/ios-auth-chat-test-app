export interface Message {
  id: string;
  content: string;
  user_id: string;
  user_email: string;
  created_at: string;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}
