import * as React from "react";
import { MessageSquare, X, Send, Bot, User, ShoppingBag } from "lucide-react";
import { useStore } from "./store-context";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  link?: string;
  linkText?: string;
};

export function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const { setCartOpen, cartCount, setQuery, setCategory } = useStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! 👋 I'm your Kartly Assistant. Ask me about Mobiles, Fashion, Electronics, Cart, or Deals!",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate response based on user input
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let botMsg: Message;

      if (lower.includes("mobile") || lower.includes("phone")) {
        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Looking for smartphones? We have flagship 5G phones starting at ₹13,499!",
          link: "/category/Mobiles",
          linkText: "View Mobiles Store",
        };
      } else if (
        lower.includes("fashion") ||
        lower.includes("shirt") ||
        lower.includes("dress") ||
        lower.includes("pant")
      ) {
        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Check out our Fashion collection for Men, Women & Kids with up to 60% Off!",
          link: "/fashion",
          linkText: "Explore Fashion Store",
        };
      } else if (
        lower.includes("cart") ||
        lower.includes("checkout") ||
        lower.includes("order")
      ) {
        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `You currently have ${cartCount} item(s) in your shopping cart.`,
        };
        setCartOpen(true);
      } else if (
        lower.includes("electronics") ||
        lower.includes("laptop") ||
        lower.includes("earbud") ||
        lower.includes("watch")
      ) {
        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Explore laptops, wireless earbuds, smartwatches and 4K TVs in Electronics!",
          link: "/category/Electronics",
          linkText: "View Electronics Store",
        };
      } else if (
        lower.includes("beauty") ||
        lower.includes("home") ||
        lower.includes("sports") ||
        lower.includes("book") ||
        lower.includes("furniture")
      ) {
        const catName = lower.includes("beauty")
          ? "Beauty"
          : lower.includes("home")
          ? "Home"
          : lower.includes("sports")
          ? "Sports"
          : lower.includes("furniture")
          ? "Furniture"
          : "Books";

        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Here are the top products in ${catName}!`,
          link: `/category/${catName}`,
          linkText: `View ${catName} Category`,
        };
      } else {
        // Search trigger fallback
        setCategory("For You");
        setQuery(userText);
        botMsg = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `I searched the store for "${userText}". Check out the products on the main page!`,
        };
      }

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button (Sleek Dark Theme) */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:bg-black hover:scale-105 active:scale-95 transition-all cursor-pointer border border-slate-700"
        aria-label="Open Chatbot Assistant"
        title="Kartly AI Assistant"
      >
        {open ? <X className="size-6 text-white" /> : <MessageSquare className="size-6 text-white" />}
      </button>

      {/* Floating Chat Window Box */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[90vw] max-w-sm rounded-xl border border-slate-800 bg-card shadow-2xl overflow-hidden flex flex-col h-[420px]">
          {/* Chat Window Header (Sleek Dark Slate Header) */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Bot className="size-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold leading-tight text-white">Kartly AI Assistant</h3>
                <span className="text-[10px] text-emerald-400 font-medium">● Online Support</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="size-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="size-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-2.5 space-y-1.5 ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-tr-none font-medium shadow-xs"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  {m.link && (
                    <a
                      href={m.link}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-black hover:underline pt-1 text-[11px]"
                    >
                      <ShoppingBag className="size-3 text-emerald-600" />
                      <span>{m.linkText || "View Products"}</span>
                    </a>
                  )}
                </div>

                {m.sender === "user" && (
                  <div className="size-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="size-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-2 border-t border-slate-200 bg-white flex gap-1.5">
            <input
              type="text"
              placeholder="Ask about mobiles, fashion, cart..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-slate-300 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-slate-900 focus:bg-white rounded-md transition-colors text-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-slate-900 text-white px-3.5 py-2 rounded-md disabled:opacity-50 hover:bg-black transition-all font-bold cursor-pointer"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
