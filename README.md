# 📚 BookCompass — AI Book Knowledge Assistant

**BookCompass** is an AI-powered Book Intelligence Agent built with **Mastra** and the **Google Books API**.

It can:

- 🔍 Search books by title
- 🧾 Fetch top N books by an author
- 🤖 Recommend similar books (via semantic model response)
- 💬 Maintain conversation context
- 🔗 Integrate into Telex via A2A protocol

This project demonstrates how to build a **production-grade agent** with tools, memory, and cross-platform integration — using **zero-auth / free public API** access.

---

## ⭐ Features

| Feature                   | Description                                |
| ------------------------- | ------------------------------------------ |
| **Book Search**           | Search any book title via Google Books API |
| **Author Books**          | Retrieve top books from a given author     |
| **Smart Recommendations** | Uses LLM to suggest similar reads          |
| **Mastra Agent**          | Type-safe tools + memory                   |
| **Telex Integration**     | Works as an AI coworker in Telex.im        |
| **Zero Auth**             | No API key required                        |

---

## 🏗️ Tech Stack

| Layer               | Technology         |
| ------------------- | ------------------ |
| **Agent Runtime**   | Mastra             |
| **Model**           | Llama 3 (Groq)     |
| **API Data Source** | Google Books API   |
| **Deploy Target**   | Telex A2A standard |

---

## 🔌 Tools in this Agent

| Tool                 | Description                   |
| -------------------- | ----------------------------- |
| `searchBookTool`     | Returns book data by query    |
| `topAuthorBooksTool` | Returns top N books by author |

---

## ⚙️ Understanding A2A Protocols

**A2A (Agent-to-Agent)** protocols are a standardized way for AI agents to communicate, exchange data, and collaborate across different platforms.

In **BookCompass**, the A2A interface allows seamless integration with **Telex**, enabling the agent to:

- Expose standardized **endpoints** (`/a2a/agent/...`)
- Share **capability metadata** through `/card` endpoints
- Communicate with other AI agents or services in a **plug-and-play** manner
- Support **cross-platform interoperability** without extra configuration

This makes BookCompass compatible with other agents or AI systems that follow the **Telex A2A standard**.

---

## 🚀 Running Locally

```bash
pnpm install
pnpm dev
```

The agent server starts with **A2A endpoints** enabled.

---

## 📡 Telex Integration

Point your Telex agent URL to:

```bash
/a2a/agent/bookCompass
```

Telex auto-discovers capabilities via:

```bash
/a2a/agent/bookCompass/card
```

---

## 📎 API Used

| API                  | Auth          | Link                                                                         |
| -------------------- | ------------- | ---------------------------------------------------------------------------- |
| **Google Books API** | None required | [Google Books API](https://www.googleapis.com/books/v1/volumes?q=searchTerm) |

---

## 🧠 Why This Project Exists

AI agents are moving beyond “chat demos” — they’re becoming **functionally useful autonomous workers**.

**BookCompass** is a practical showcase of:

- No-auth API data integration
- Type-safe Mastra tools
- Platform interoperability
- A2A protocol implementation
- Production agent patterns

---

## 📝 License

MIT License

---

## 👤 Author

Built by **Ayomikun**
