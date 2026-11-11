import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const suggestions = [
  'What services do you offer?',
  'What kind of automation work do you build?',
  'Can you tell me about your projects?',
  'How do I contact you?',
];

const knowledgeBase = [
  {
    keywords: ['service', 'services', 'offer', 'offerings', 'build'],
    answer:
      'I build practical AI and workflow systems, including n8n automation, API/webhook integrations, AI-powered lead workflows, business process automation, and responsive website experiences for service businesses and founders.',
  },
  {
    keywords: ['automation', 'workflow', 'n8n', 'make', 'process'],
    answer:
      'My automation work focuses on clear process design: intake, validation, routing, AI-assisted decision steps, data storage, approvals, and notifications that keep work moving without losing control.',
  },
  {
    keywords: ['project', 'projects', 'case study', 'work'],
    answer:
      'Recent examples include AI lead qualification, WhatsApp chatbot flows, booking automation, form submission workflows, lead follow-up systems, and concept-driven AI workflow prototypes.',
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'phone', 'reach', 'hire'],
    answer:
      'You can email dikshachauhan9201@gmail.com or call +91 9217682198. The contact section on the site also includes the direct links and a working form fallback.',
  },
  {
    keywords: ['website', 'web', 'portfolio', 'landing page', 'business site'],
    answer:
      'I also design and build responsive websites and landing pages with clear user journeys, conversion-focused calls to action, and content structures that work well with automation and lead workflows.',
  },
];

const defaultResponse =
  'I can help with services, workflow automation, project examples, website work, and contact options. Try one of the suggested questions or ask about a specific automation or website need.';

const getResponse = (query) => {
  const normalized = query.toLowerCase();
  const match = knowledgeBase.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match ? match.answer : defaultResponse;
};

export default function PortfolioAssistant() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi — I am a quick portfolio assistant for service questions, project examples, and contact options. Ask about automation, websites, or available work.',
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const suggestionList = useMemo(() => suggestions, []);

  const pushMessage = (role, text) => {
    setMessages((current) => [
      ...current,
      {
        id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        role,
        text,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) {
      return;
    }

    pushMessage('user', trimmed);
    setInput('');
    setIsThinking(true);

    window.setTimeout(() => {
      pushMessage('assistant', getResponse(trimmed));
      setIsThinking(false);
    }, 350);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            className="w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.5rem] border border-cyan-400/20 bg-[#07111d]/90 shadow-[0_28px_80px_rgba(2,6,23,0.68)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-sm text-cyan-100">AI</span>
                <div>
                  <p className="text-sm font-semibold text-white">Portfolio assistant</p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">FAQ mode</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Minimize portfolio assistant"
                  onClick={() => setIsMinimized(true)}
                  className="focus-ring grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white"
                >
                  —
                </button>
                <button
                  type="button"
                  aria-label="Close portfolio assistant"
                  onClick={() => setIsOpen(false)}
                  className="focus-ring grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-lg text-slate-200 transition hover:border-cyan-300/20 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                      message.role === 'user'
                        ? 'bg-cyan-300/15 text-cyan-50 border border-cyan-300/20'
                        : 'border border-white/10 bg-slate-900/80 text-slate-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestionList.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setInput(suggestion);
                    }}
                    className="focus-ring rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-300 transition hover:border-cyan-300/20 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label htmlFor="portfolio-assistant-input" className="sr-only">
                  Ask a question about the portfolio
                </label>
                <input
                  id="portfolio-assistant-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about services, projects, or contact"
                  className="w-full rounded-full border border-white/10 bg-slate-950/80 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isThinking || !input.trim()}
                  className="focus-ring rounded-full border border-cyan-300/30 bg-cyan-300/12 px-3 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && !isMinimized && (
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          className="focus-ring flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.18),rgba(15,23,42,0.92)_60%)] px-4 py-3 text-sm font-semibold text-cyan-50 shadow-[0_12px_40px_rgba(34,211,238,0.12)]"
          aria-label="Open portfolio assistant"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs font-bold">AI</span>
          Ask about the portfolio
        </motion.button>
      )}

      {isOpen && isMinimized && (
        <motion.button
          type="button"
          onClick={() => setIsMinimized(false)}
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          className="focus-ring flex items-center gap-2 rounded-full border border-cyan-300/20 bg-[#081522]/90 px-3 py-2 text-sm font-medium text-cyan-50 shadow-[0_12px_30px_rgba(2,6,23,0.55)]"
          aria-label="Restore portfolio assistant"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-xs">AI</span>
          Assistant
        </motion.button>
      )}
    </div>
  );
}
