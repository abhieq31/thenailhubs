'use client';

import React, { createContext, useContext, useState } from 'react';
import ChatWidget from './ChatWidget';

const ChatContext = createContext({ isChatOpen: false, openChat: () => {}, closeChat: () => {} });

export const useChat = () => useContext(ChatContext);

// Makes the AI receptionist available on every page (home, try-on, …)
export default function ChatProvider({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        openChat: () => setIsChatOpen(true),
        closeChat: () => setIsChatOpen(false),
      }}
    >
      {children}

      {!isChatOpen && (
        <button className="floating-book-button" onClick={() => setIsChatOpen(true)}>
          <span className="book-icon">💬</span>
          <span className="book-text">Chat with Us</span>
        </button>
      )}

      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </ChatContext.Provider>
  );
}
