import React from 'react';

import EmptyState from './EmptyState';
import { ChevronRight, Magnifier } from './icons';
import { Conversation } from '../types';
import { formatRelativeDate } from '../utils/date';

type ConversationListProps = {
  query: string;
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  onQueryChange: (value: string) => void;
  onOpenChat: (conversation: Conversation) => void;
};

function fallbackTitle(conversation: Conversation) {
  return conversation.title?.trim() || 'New Chat';
}

const ChatList: React.FC<ConversationListProps> = ({
  query,
  conversations,
  loading,
  error,
  onQueryChange,
  onOpenChat,
}) => {
  const filtered = React.useMemo(
    () =>
      conversations.filter(conversation =>
        fallbackTitle(conversation).toLowerCase().includes(query.toLowerCase()),
      ),
    [conversations, query],
  );

  return (
    <>
      <header className="welcome">
        <h1>Welcome</h1>
        <p>Set up a number to start texting your AI — even without internet.</p>
        <button className="cta">Set Up New Number</button>
      </header>

      <section className="chats">
        <h2>Chats</h2>
        <div className="search">
          <Magnifier />
          <input
            value={query}
            onChange={event => onQueryChange(event.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
          />
        </div>

        <div className="chat-card">
          {loading && <EmptyState message="Loading conversations…" />}
          {!loading && error && <EmptyState message={error} />}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState message={query ? 'No conversations match your search.' : 'Start a new chat to begin.'} />
          )}

          {!loading &&
            !error &&
            filtered.map(conversation => (
              <button
                key={conversation.id}
                className="chat-row"
                aria-label={`Open ${fallbackTitle(conversation)}`}
                onClick={() => onOpenChat(conversation)}
              >
                <div className="left">
                  <div className="title">{fallbackTitle(conversation)}</div>
                  <div className="subtitle">{conversation.lastMessagePreview || 'No messages yet'}</div>
                </div>
                <div className="right">
                  <div className="date">{formatRelativeDate(conversation.updatedAt)}</div>
                  <ChevronRight />
                </div>
              </button>
            ))}

          <div className="scroll-handle" aria-hidden />
        </div>
      </section>
    </>
  );
};

export default ChatList;
