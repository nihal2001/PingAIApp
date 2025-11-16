export type Conversation = {
  id: number;
  userId: number;
  title: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  lastMessagePreview: string | null;
  participant?: string | null;
  status?: string | null;
};

export type Message = {
  id: number;
  conversationId: number;
  senderType: 'user' | 'assistant' | 'system';
  body: string | null;
  createdAt: string | null;
  status?: string | null;
  mediaUrls?: string | null;
  twilioMessageSid?: string | null;
};

export type ApiMessageResponse = {
  message: Message;
  conversation: Conversation;
};
