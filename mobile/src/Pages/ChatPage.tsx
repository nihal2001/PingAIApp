import React from "react";
import "../Pages/ChatPage.css";

const sampleMessages = [
	{ id: 1, from: "them", text: "Hey! How's it going?" },
	{ id: 2, from: "me", text: "All good — working on a project. You?" },
	{ id: 3, from: "them", text: "Nice. Just testing the new UI." },
	{ id: 4, from: "me", text: "Looks great so far!" },
];

const ChatPage: React.FC = () => {
	return (
		<div className="chat-page">
			<h1 className="chat-title">Chat</h1>

			<div className="chat-area" aria-label="Chat scroll area">
				{sampleMessages.map((m) => (
					<div
						key={m.id}
						className={m.from === "me" ? "chat-row row-end" : "chat-row row-start"}
					>
						<div className="message-row">
							<div className={"message-bubble " + (m.from === "me" ? "mine" : "their")}>
								{m.text}
							</div>
						</div>
					</div>
				))}

				<div className="muted">This is a visual mock — messages are not functional.</div>
			</div>

			<form className="input-bar" onSubmit={(e) => e.preventDefault()}>
				<input className="message-input" placeholder="Type a message..." aria-label="Message input" />
				<button type="submit" className="send-btn" aria-label="Send message">
					Send
				</button>
			</form>
		</div>
	);
};

export default ChatPage;

