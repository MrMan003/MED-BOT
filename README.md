#  Online Doctor Chatbot

An AI-powered web chatbot that helps users identify symptoms and receive relevant health information by searching online. Built with **Next.js**, **Framer Motion**, and supports **dark mode**, markdown responses, and toggle options.

## Features

*  AI chatbot interface for symptom queries
*  Google Search (or Gemini API) for live responses
*  Toggle between Light and Dark mode
*  Clear chat functionality
*  Animated chat UI with markdown formatting
*  Mobile-friendly and responsive

##  Tech Stack

* [Next.js](https://nextjs.org/) — React Framework
* [Framer Motion](https://www.framer.com/motion/) — Animations
* [Lucide Icons](https://lucide.dev/) — Icon set
* [React Markdown](https://github.com/remarkjs/react-markdown) — Rich markdown formatting
* [Tailwind CSS](https://tailwindcss.com/) — Styling

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/online-doctor-chatbot.git
cd online-doctor-chatbot
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Set Up Environment Variables

Create a `.env.local` file:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

Or if you're using Google Custom Search API:

```
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX=your_search_engine_id
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## Fallback API Option

If Gemini is unavailable or fails, the chatbot can fall back to using Google Search API by hitting `/api/search`.

## Folder Structure

```
/app
  /api/search.ts        - API route for querying Gemini/Google
  /components/ChatBox.tsx - Main chatbot component
  /page.tsx             - Main UI
```

##  To-Do

* [ ] Add authentication for patient profiles
* [ ] Integrate with symptom checker API or medical database
* [ ] Voice-to-text support

##  License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you’d like this tailored for deployment (Vercel, etc.) or if you want a version in Markdown file format (`README.md`).
