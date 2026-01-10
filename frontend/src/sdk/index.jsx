import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from '../components/ChatWidget';

// Inline styles as a string to be injected
const inlineStyles = `
/* Vet Chatbot Widget Styles - Inline for SDK */
.vet-chat-widget{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.5;position:fixed;bottom:24px;right:24px;z-index:999999;box-sizing:border-box}.vet-chat-widget *{box-sizing:border-box}.vet-chat-fab{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 4px 20px rgba(79,70,229,.4),0 2px 8px rgba(0,0,0,.1);transition:all .3s cubic-bezier(.4,0,.2,1);animation:vet-chat-pulse 2s infinite}.vet-chat-fab:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(79,70,229,.5),0 4px 12px rgba(0,0,0,.15)}.vet-chat-fab:active{transform:scale(.95)}.vet-chat-fab-hidden{opacity:0;pointer-events:none;transform:scale(.5)}@keyframes vet-chat-pulse{0%,100%{box-shadow:0 4px 20px rgba(79,70,229,.4),0 2px 8px rgba(0,0,0,.1)}50%{box-shadow:0 4px 30px rgba(79,70,229,.6),0 2px 8px rgba(0,0,0,.1)}}.vet-chat-window{position:absolute;bottom:0;right:0;width:380px;height:560px;max-height:calc(100vh - 100px);background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.15),0 0 1px rgba(0,0,0,.1);display:flex;flex-direction:column;overflow:hidden;animation:vet-chat-slideUp .3s cubic-bezier(.4,0,.2,1)}@keyframes vet-chat-slideUp{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.vet-chat-header{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.vet-chat-header-info{display:flex;align-items:center;gap:12px}.vet-chat-header-avatar{width:40px;height:40px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center}.vet-chat-header-title{font-weight:600;font-size:16px}.vet-chat-header-status{font-size:12px;opacity:.9;display:flex;align-items:center;gap:6px}.vet-chat-status-dot{width:8px;height:8px;background:#10b981;border-radius:50%;animation:vet-chat-blink 2s infinite}@keyframes vet-chat-blink{0%,100%{opacity:1}50%{opacity:.5}}.vet-chat-close-btn{width:36px;height:36px;border:none;background:rgba(255,255,255,.15);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;transition:background .2s}.vet-chat-close-btn:hover{background:rgba(255,255,255,.25)}.vet-chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:16px;background:#f8fafc}.vet-chat-messages::-webkit-scrollbar{width:6px}.vet-chat-messages::-webkit-scrollbar-track{background:transparent}.vet-chat-messages::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}.vet-chat-message{display:flex;gap:10px;max-width:85%;animation:vet-chat-fadeIn .3s ease-out}@keyframes vet-chat-fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.vet-chat-message-user{flex-direction:row-reverse;margin-left:auto}.vet-chat-message-bot{margin-right:auto}.vet-chat-avatar{width:32px;height:32px;min-width:32px;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff}.vet-chat-bubble{padding:12px 16px;border-radius:16px;word-wrap:break-word;white-space:pre-wrap}.vet-chat-message-user .vet-chat-bubble{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);color:#fff;border-bottom-right-radius:4px}.vet-chat-message-bot .vet-chat-bubble{background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.05)}.vet-chat-message-error .vet-chat-bubble{background:#fef2f2;border-color:#fecaca;color:#991b1b}.vet-chat-text{line-height:1.5}.vet-chat-loading{display:flex;gap:5px;padding:12px 16px;background:#fff;border-radius:16px;border:1px solid #e2e8f0;border-bottom-left-radius:4px}.vet-chat-loading-dot{width:8px;height:8px;background:#94a3b8;border-radius:50%;animation:vet-chat-bounce 1.4s infinite ease-in-out both}.vet-chat-loading-dot:nth-child(1){animation-delay:-.32s}.vet-chat-loading-dot:nth-child(2){animation-delay:-.16s}@keyframes vet-chat-bounce{0%,80%,100%{transform:scale(.6);opacity:.5}40%{transform:scale(1);opacity:1}}.vet-chat-error{background:#fef2f2;color:#991b1b;padding:10px 20px;font-size:13px;border-top:1px solid #fecaca}.vet-chat-input-container{display:flex;gap:10px;padding:16px 20px;background:#fff;border-top:1px solid #e2e8f0;flex-shrink:0}.vet-chat-input{flex:1;padding:12px 16px;border:1px solid #e2e8f0;border-radius:24px;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;font-family:inherit}.vet-chat-input:focus{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(79,70,229,.1)}.vet-chat-input::placeholder{color:#94a3b8}.vet-chat-input:disabled{background:#f8fafc;cursor:not-allowed}.vet-chat-send-btn{width:44px;height:44px;border:none;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;transition:transform .2s,opacity .2s;flex-shrink:0}.vet-chat-send-btn:hover:not(:disabled){transform:scale(1.05)}.vet-chat-send-btn:active:not(:disabled){transform:scale(.95)}.vet-chat-send-btn:disabled{opacity:.5;cursor:not-allowed}@media(max-width:480px){.vet-chat-widget{bottom:16px;right:16px}.vet-chat-window{width:calc(100vw - 32px);height:calc(100vh - 100px);max-width:380px}.vet-chat-fab{width:56px;height:56px}}
`;

// SDK initialization function
function initVetChatbot() {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = inlineStyles;
    document.head.appendChild(styleEl);

    // Create container
    const container = document.createElement('div');
    container.id = 'vet-chatbot-root';
    document.body.appendChild(container);

    // Mount React app
    const root = ReactDOM.createRoot(container);
    root.render(<ChatWidget />);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVetChatbot);
} else {
    initVetChatbot();
}

// Export for manual initialization if needed
window.VetChatbot = {
    init: initVetChatbot
};
