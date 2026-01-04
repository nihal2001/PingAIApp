import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NewChatModal from './components/NewChatModal';
import ChatPage from './Pages/ChatPage';

const App: React.FC = () => {
  const [showNewChatModal, setShowNewChatModal] = React.useState(false);
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  return (
    <div className={`app ${isChatRoute ? 'chat-active' : ''}`}>
      <Routes>
        {/* Home / landing screen */}
        <Route
          path="/"
          element={
            <>
              <main className="screen">
                <button className="fab" onClick={() => setShowNewChatModal(true)}>
                  + New Chat
                </button>

                <NewChatModal
                  id={0}
                  open={showNewChatModal}
                  onClose={() => setShowNewChatModal(false)}
                />
              </main>
            </>
          }
        />

        {/* Chat page */}
        <Route
          path="/chat/:conversationId"
          element={
            <main className="screen">
              <ChatPage />
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
