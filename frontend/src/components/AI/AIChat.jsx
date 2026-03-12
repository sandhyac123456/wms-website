import { useState, useRef, useEffect } from "react";
import { askAI } from "../../Service/Operation/aiApi";

const AIChat = () => {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const suggestions = [
    "What services does WhiteMirror provide?",
    "Where is WhiteMirror located?",
    "Who are the directors of WhiteMirror?"
  ];

  const sendMessage = async (text) => {

    const message = text || input;

    if (!message.trim()) return;

    const userMessage = { text: message, user: true };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {

      const reply = await askAI(message);

      const aiMessage = { text: reply, user: false };

      setMessages((prev) => [...prev, aiMessage]);

    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again.", user: false }
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
      className="fixed bottom-5 right-5 z-[9999] animate-bounce bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      >
        🤖
      </button>


      {/* Chat Modal */}

      {open && (
        <div className="fixed bottom-20 right-5 w-[340px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50">


          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 flex justify-between items-center">

            <div className="flex flex-col">
  <p className="font-semibold text-sm">
    WhiteMirror AI
  </p>

  <div className="flex items-center gap-1 text-xs text-green-200">
    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    Online
  </div>
</div>

            <button
              onClick={() => setOpen(false)}
              className="text-white hover:opacity-80"
            >
              ✖
            </button>

          </div>


          {/* Messages */}

          <div className="h-72 overflow-y-auto p-3 space-y-2 bg-gray-50">

            {/* Suggested Questions */}

            {messages.length === 0 && (

              <div className="space-y-2">

                <p className="text-xs text-gray-500">
                  Try asking:
                </p>

                {suggestions.map((q, i) => (

                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="block w-full text-left bg-gray-100 hover:bg-gray-200 text-sm p-2 rounded-lg transition"
                  >
                    {q}
                  </button>

                ))}

              </div>

            )}


            {/* Chat Messages */}

            {messages.map((msg, i) => (

              <div
                key={i}
                className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                  msg.user
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>

            ))}


            {/* Loading */}

            {loading && (

              <div className="text-sm text-gray-500 animate-pulse">
                AI is typing...
              </div>

            )}

            <div ref={chatEndRef}></div>

          </div>


          {/* Input */}

          <div className="flex items-center gap-2 border-t p-2 bg-white">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about company..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => sendMessage()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default AIChat;