import React from 'react';

import ChatList from './components/ChatList';
import ChatPage from './components/ChatPage';
import NewChatModal from './components/NewChatModal';
import { Gear } from './components/icons';
import { Conversation } from './types';
import { DEFAULT_USER_ID, API_BASE, httpGet } from './utils/api';
import { FetchState } from './hooks/useFetchState';

const App: React.FC = () => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [query, setQuery] = React.useState('');
  const [activeChat, setActiveChat] = React.useState<Conversation | null>(null);
  const [{ loading, error }, setState] = React.useState<FetchState>({ loading: true, error: null });
  const [showNewChatModal, setShowNewChatModal] = React.useState(false);

  const loadConversations = React.useCallback(async () => {
    setState({ loading: true, error: null });
    try {
      const data = await httpGet<Conversation[]>(`${API_BASE}/conversations?user_id=${DEFAULT_USER_ID}`);
      setConversations(data);
      setState({ loading: false, error: null });
    } catch (err) {
      setConversations([]);
      setState({ loading: false, error: err instanceof Error ? err.message : 'Failed to load conversations' });
    }
  }, []);

  React.useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const handleMessagePersisted = React.useCallback((updatedConversation: Conversation) => {
    setConversations(prev =>
      prev
        .map(conversation =>
          conversation.id === updatedConversation.id ? updatedConversation : conversation,
        )
        .sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        }),
    );
  }, []);

  return (
    <div className={`app ${activeChat ? 'chat-active' : ''}`}>
      <button className="settings" aria-label="Settings">
        <Gear />
      </button>

      <main className="screen">
        {activeChat ? (
          <ChatPage
            chat={activeChat}
            onBack={() => {
              setActiveChat(null);
              loadConversations();
            }}
            onMessagePersisted={(conversation, message) => {
              setActiveChat(conversation);
              handleMessagePersisted(conversation);
            }}
          />
        ) : (
          <ChatList
            query={query}
            conversations={conversations}
            loading={loading}
            error={error}
            onQueryChange={setQuery}
            onOpenChat={conversation => setActiveChat(conversation)}
          />
        )}
      </main>

      {!activeChat && (
        <button className="fab" onClick={() => setShowNewChatModal(true)}>
          + New Chat
        </button>
      )}

      <NewChatModal open={showNewChatModal} onClose={() => setShowNewChatModal(false)} />
    </div>
  );
};

export default App;
