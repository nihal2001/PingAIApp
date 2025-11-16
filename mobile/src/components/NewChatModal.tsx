import React from 'react';

type NewChatModalProps = {
  open: boolean;
  onClose: () => void;
};

const NewChatModal: React.FC<NewChatModalProps> = ({ open, onClose }) => {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (!open) {
      setName('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="new-chat-title">
      <div className="modal">
        <header className="modal-header">
          <h2 id="new-chat-title">Start a new chat</h2>
          <button className="close-button" onClick={onClose} aria-label="Close new chat modal">
            ×
          </button>
        </header>

        <div className="modal-body">
          <label htmlFor="chat-name-input">Name your chat</label>
          <input
            id="chat-name-input"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="e.g. Grocery ideas"
          />
        </div>

        <footer className="modal-footer">
          <button type="button" className="primary">
            Create chat
          </button>
          <button type="button" className="ghost" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewChatModal;
