import React from 'react';

import EmptyState from './EmptyState';
import { BackChevron, Gear, SendIcon } from './icons';
import { Conversation, Message, ApiMessageResponse } from '../types';
import { FetchState } from '../hooks/useFetchState';
import { API_BASE, httpGet, httpPost } from '../utils/api';
import { formatMessageTimestamp } from '../utils/date';

const DEFAULT_EMPTY = 'No messages yet. Say hello!';

type ChatPageProps = {
  chat: Conversation;
  onBack: () => void;
  onMessagePersisted: (conversation: Conversation, message: Message) => void;
};

function fallbackTitle(conversation: Conversation) {
  return conversation.title?.trim() || 'New Chat';
}

const ChatPage: React.FC<ChatPageProps> = ({ chat, onBack, onMessagePersisted }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [{ loading, error }, setState] = React.useState<FetchState>({ loading: true, error: null });
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const title = fallbackTitle(chat);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setState({ loading: true, error: null });
        const data = await httpGet<Message[]>(`${API_BASE}/conversations/${chat.id}/messages`);
        if (!cancelled) {
          setMessages(data);
          setState({ loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setMessages([]);
          setState({ loading: false, error: err instanceof Error ? err.message : 'Failed to load messages' });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chat.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setSending(true);
    try {
      const result = await httpPost<ApiMessageResponse>(
        `${API_BASE}/conversations/${chat.id}/messages`,
        {
          senderType: 'user',
          body: trimmed,
        },
      );

      setDraft('');
      setMessages(prev => [...prev, result.message]);
      onMessagePersisted(result.conversation, result.message);
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to send message',
      }));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <button className="back-button" onClick={onBack} aria-label="Back to chats">
          <BackChevron />
        </button>
        <div className="chat-title-group">
          <h2>{title}</h2>
          <span>{chat.participant || 'Assistant · Active now'}</span>
        </div>
        <button className="chat-header-action" aria-label="Chat options">
          <Gear />
        </button>
      </header>

      <div className="message-list">
        {loading && <EmptyState message="Loading messages…" />}
        {!loading && error && <EmptyState message={error} />}
        {!loading && !error && messages.length === 0 && <EmptyState message={DEFAULT_EMPTY} />}

        {!loading &&
          !error &&
          messages.map(message => {
            const isUser = message.senderType === 'user';
            return (
              <div
                key={message.id}
                className={`message-bubble ${isUser ? 'from-user' : 'from-ai'}`}
              >
                <p>{message.body}</p>
                <span className="message-timestamp">{formatMessageTimestamp(message.createdAt)}</span>
              </div>
            );
          })}
      </div>

      <form className="composer" onSubmit={handleSubmit}>
        <input
          value={draft}
          onChange={event => setDraft(event.target.value)}
          placeholder="Ask anything…"
          aria-label="Message assistant"
        />
        <button type="submit" disabled={!draft.trim() || sending} aria-label="Send message">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
