# 📌 Pinterest Affiliate Marketing AI Agent

An end-to-end AI agent that automates affiliate marketing on Pinterest for Indian traditional fashion wear. The agent discovers top-rated products on Amazon India, generates AI-powered Pinterest content, and posts affiliate pins automatically.

---

## 🎯 What It Does

1. **Product Discovery** — Scrapes Amazon India for top-rated Indian ethnic fashion products based on your criteria
2. **Human Approval Loop** — Shows you each product with image, rating, price and reviews. You accept or reject each one
3. **AI Content Generation** — Uses Google Gemini AI to write an optimized Pinterest pin title, description and hashtags
4. **Affiliate Link Generation** — Automatically builds Amazon affiliate links using your Associate tag
5. **Pinterest Posting** — Posts the final pin directly to your Pinterest board via the Pinterest API

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | Local web server and API routes |
| Cheerio | Amazon product web scraping |
| Axios | HTTP requests |
| Google Gemini AI | Pinterest content generation |
| Pinterest API v5 | Automated pin posting |
| HTML/CSS/JS | Approval UI frontend |
| dotenv | Environment variable management |

---

## 📁 Project Structure
```
pinterest-affiliate-agent/
├── src/
│   ├── index.js              # Main server and API endpoints
│   ├── amazonSearch.js       # Amazon scraper module
│   ├── contentGenerator.js   # Gemini AI content generation
│   ├── pinterestPost.js      # Pinterest API posting
│   └── approvalUI.html      # Web UI for product approval
|   ├── approvalUI.css         # Styling for the UI        
├── .env                      # API keys (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/reet31/pinterest-affiliate-agent.git
cd pinterest-affiliate-agent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root folder
```
AMAZON_ASSOCIATE_TAG=your-associate-tag
GEMINI_API_KEY=your-gemini-api-key
PINTEREST_ACCESS_TOKEN=your-pinterest-token
PINTEREST_BOARD_ID=your-board-id
PORT=3000
```

### 4. Run the agent
```bash
node src/index.js
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🔑 API Keys Required

| Key | Where to Get |
|-----|-------------|
| `AMAZON_ASSOCIATE_TAG` | [Amazon Associates India](https://affiliate-program.amazon.in) |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) |
| `PINTEREST_ACCESS_TOKEN` | [Pinterest Developer Portal](https://developers.pinterest.com) |
| `PINTEREST_BOARD_ID` | Your Pinterest board URL |

---

## 🚀 How To Use

**Step 1 — Search Products**
Enter your niche keyword (e.g. "indian traditional kurti women"), set minimum rating and max products to fetch, then click Search.

**Step 2 — Approve or Reject**
The agent shows each product with its image, rating, reviews and price. Click Accept to move forward or Reject to see the next product.

**Step 3 — Generate Content**
Once you accept a product, click "Generate Pinterest Content". Gemini AI will write an optimized pin title, description and hashtags.

**Step 4 — Post to Pinterest**
Review the generated content and click "Post to Pinterest" to publish the pin directly to your board.

---

## 📸 Flow Diagram
```
User enters keyword
       ↓
Amazon scraper fetches products
       ↓
Human approval loop (Accept / Reject)
       ↓
Gemini AI generates title + description + hashtags
       ↓
Affiliate link generated automatically
       ↓
Pin posted to Pinterest board
```
## 📸 Screenshots

### Search Screen
<img width="600" height="550" alt="image" src="https://github.com/user-attachments/assets/898a4042-c671-472d-9075-0cc4801b7d66" />


### Accepted Product
<img width="600" height="550" alt="image" src="https://github.com/user-attachments/assets/fe67396f-21b0-4b2b-bbba-7d65a6938323" />

### Generated Content
<img width="600" height="550" alt="image" src="https://github.com/user-attachments/assets/1428ff7c-69f3-424f-acb2-cdd0ce3e4012" />

---

## ⚠️ Notes

- Pinterest API access requires approval from the Pinterest Developer Portal. The posting module is fully built and ready. it will work immediately once API access is granted.
- Amazon PA-API is not required. The agent uses web scraping as a fallback which works for personal/low-volume use.
- Gemini API free tier has a rate limit of 15 requests per minute. Wait 60 seconds between requests if you hit the limit.

---

## 📄 License

MIT License — free to use and modify.

---

## 👤 Author

**Reet** — [github.com/reet31](https://github.com/reet31)
