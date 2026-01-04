import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type NewChatModalProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  creating?: boolean;
};

const NewChatModal: React.FC<NewChatModalProps> = ({
  open,
  onClose,
  creating = false,
}) => {
  const [title, setTitle] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!open) {
      setTitle('');
    }
  }, [open]);

  const handleCreateConversationRequest = () => {
    axios.post('/api/conversations', {
      userId: -1,
      title: title,
      participant: 'Tester',
    })
    .then(response => {
      console.log('Conversation created:', response.data);
      onClose();
      navigate(`/chat/${response.data.id}`);
    })
    .catch(error => {
      console.error('ERROR creating conversation:', error);
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || creating) return;

    // Make databse call to create chat, then navigate to it
    handleCreateConversationRequest();
    
    // Navigate to chat page
    navigate('/chat/new');
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="new-chat-title">
      <form className="modal" onSubmit={handleSubmit}>
        <header className="modal-header">
          <h2 id="new-chat-title">Start a new chat</h2>
          <button className="close-button" type="button" onClick={onClose} aria-label="Close new chat modal">
            ×
          </button>
        </header>

        <div className="modal-body">
          <label htmlFor="chat-name-input">Name your chat</label>
          <input
            id="chat-name-input"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="e.g. Grocery ideas"
          />
        </div>

        <footer className="modal-footer">
          <button type="submit" className="primary" disabled={!title.trim() || creating}>
            {creating ? 'Creating…' : 'Create chat'}
          </button>
          <button type="button" className="ghost" onClick={onClose} disabled={creating}>
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
};

export default NewChatModal;
