document.addEventListener("DOMContentLoaded", () => {
    // ⚙️ Configurations
    // Replace this placeholder with your actual deployed Render service URL:
    const PRODUCTION_API_URL = "https://your-portfolio-backend-url.onrender.com/api/chat";
    
    // Auto-detect local vs production backend environment
    const getBackendUrl = () => {
        const hostname = window.location.hostname;
        if (hostname === "localhost" || hostname === "127.0.0.1") {
            return "http://localhost:5000/api/chat";
        }
        return PRODUCTION_API_URL;
    };

    const BACKEND_URL = getBackendUrl();
    let messageHistory = []; // Keep dialogue history for session context

    // 🔍 DOM Elements
    const chatContainer = document.getElementById("chat-widget-container");
    const chatButton = document.getElementById("chat-widget-button");
    const chatWindow = document.getElementById("chat-widget-window");
    const closeBtn = document.querySelector(".chat-close-btn");
    const sendBtn = document.querySelector(".chat-send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.querySelector(".chat-messages");

    // 📢 Toggle Chat Window
    const toggleChat = () => {
        const isOpen = chatWindow.classList.contains("open");
        if (isOpen) {
            chatWindow.classList.remove("open");
            chatButton.classList.remove("active");
        } else {
            chatWindow.classList.add("open");
            chatButton.classList.add("active");
            chatInput.focus();
            
            // Show welcome message if empty
            if (chatMessages.children.length === 0) {
                addMessage("Hi! I'm Prem's AI Assistant. Ask me anything about Prem's skills, projects, experience, or education!", "bot");
            }
        }
    };

    chatButton.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    // 🎨 Helper: Add message bubble
    const addMessage = (text, sender) => {
        const bubble = document.createElement("div");
        bubble.classList.add("message-bubble", sender);
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        scrollToBottom();
    };

    // ⏳ Helper: Show/Hide typing loader
    const showTypingIndicator = () => {
        const loader = document.createElement("div");
        loader.classList.add("bot-typing", "message-bubble", "bot");
        loader.id = "typing-loader";
        loader.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(loader);
        scrollToBottom();
    };

    const removeTypingIndicator = () => {
        const loader = document.getElementById("typing-loader");
        if (loader) {
            loader.remove();
        }
    };

    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // 📨 Send Message Handler
    const sendMessage = async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Render user message
        addMessage(text, "user");
        chatInput.value = "";

        // Show thinking loader
        showTypingIndicator();

        try {
            // Call Backend Server API
            const response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text,
                    history: messageHistory
                })
            });

            const data = await response.json();
            removeTypingIndicator();

            if (response.ok && data.reply) {
                addMessage(data.reply, "bot");
                // Save context history
                messageHistory.push({ role: "user", text: text });
                messageHistory.push({ role: "model", text: data.reply });
            } else {
                addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", "bot");
                console.error("API Error Response:", data);
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", "bot");
            console.error("Network Error Calling API:", error);
        }
    };

    // ⌨️ Event Listeners for sending messages
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
