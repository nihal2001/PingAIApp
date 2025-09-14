import React from 'react';

type Chat = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
};

const chats: Chat[] = [
  { id: '1', title: 'Camping Trip', subtitle: 'Lorem Ipsum', dateLabel: 'Yesterday' },
  { id: '2', title: 'Europe Traveling Guide', subtitle: 'Lorem Ipsum', dateLabel: '8/11/25' },
  { id: '3', title: 'Hawaii Hiking Trip', subtitle: 'Lorem Ipsum', dateLabel: '6/9/2025' },
  { id: '4', title: 'Fishing', subtitle: 'Lorem Ipsum', dateLabel: '5/4/2025' },
  { id: '5', title: 'Mount Everest Climb', subtitle: 'Lorem Ipsum', dateLabel: '3/22/2025' },
  { id: '6', title: 'Im crazy', subtitle: 'Lorem Ipsum', dateLabel: '3/26/2025' },
  { id: '7', title: 'Im crazy', subtitle: 'Lorem Ipsum', dateLabel: '3/26/2025' },
  { id: '8', title: 'Im crazy', subtitle: 'Lorem Ipsum', dateLabel: '3/26/2025' },
  { id: '9', title: 'Im crazy', subtitle: 'Lorem Ipsum', dateLabel: '3/26/2025' },
  { id: '11', title: 'Im crazy', subtitle: 'Lorem Ipsum', dateLabel: '3/26/2025' },

];

const Magnifier = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M11 4a7 7 0 105.196 11.804l3.5 3.5a1 1 0 001.415-1.415l-3.5-3.5A7 7 0 0011 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Gear = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2"/>
    <path d="M19.4 15a7.963 7.963 0 00.1-6l2-1.2-2-3.4-2.3 1a8.05 8.05 0 00-4.2-2.4l-.3-2.7H9.3l-.3 2.7a8.05 8.05 0 00-4.2 2.4l-2.3-1-2 3.4 2 1.2a7.963 7.963 0 00.1 6l-2 1.2 2 3.4 2.3-1a8.05 8.05 0 004.2 2.4l.3 2.7h3.4l.3-2.7a8.05 8.05 0 004.2-2.4l2.3 1 2-3.4-2-1.2z" stroke="currentColor" strokeWidth="1.2" opacity=".3"/>
  </svg>
);

export default function App() {
  const [query, setQuery] = React.useState('');
  const filtered = chats.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app">
      <button className="settings" aria-label="Settings">
        <Gear />
      </button>

      <main className="screen">
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
              onChange={e => setQuery(e.target.value)}
              placeholder="Search conversations"
              aria-label="Search conversations"
            />
          </div>

          <div className="chat-card">
            {filtered.map(item => (
              <button key={item.id} className="chat-row" aria-label={`Open ${item.title}`}>
                <div className="left">
                  <div className="title">{item.title}</div>
                  <div className="subtitle">{item.subtitle}</div>
                </div>
                <div className="right">
                  <div className="date">{item.dateLabel}</div>
                  <ChevronRight />
                </div>
              </button>
            ))}
            <div className="scroll-handle" aria-hidden/>
          </div>
        </section>
      </main>

      <button className="fab">+ New Chat</button>
    </div>
  );
}

