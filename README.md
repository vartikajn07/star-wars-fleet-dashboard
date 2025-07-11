# 🚀 Star Wars Fleet Dashboard

A sleek, responsive Star Wars starship dashboard built with **Next.js** and **SWAPI**.  
Users can search, filter, and compare starships with a smooth UI and instant feedback.

## 🌌 Features

- 🔍 **Search & Filter** starships by name, hyperdrive rating, and crew size
- ♾️ **Infinite Scrolling** for smooth starship list loading
- 🪄 **Starship Comparison Page** with interactive selection (up to 6), then choose 3 to compare side-by-side
- 📈 **Visual Ratings** for hyperdrive via star indicators
- 🧭 **Back to Top** functionality with Framer Motion
- 🎨 **Responsive UI** built with TailwindCSS & shadcn/ui
- ⚡️ Optimized with data caching and request debouncing
- 💾 **State Persistence** using Jotai across navigation

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **API**: [SWAPI - Star Wars API](https://swapi.dev/)
- **Icons/UX**: Lottie Loader, Custom Gradients, Star Ratings

## 🧪 Getting Started (Run Locally)

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/star-wars-fleet-dashboard.git
   cd star-wars-fleet-dashboard
2. Install dependencies:
   ```bash
   yarn
3. Run dev server:
   ```bash
   yarn dev
4. Open http://localhost:3000 in your browser.

###💡 Implementation Notes
1. The app uses @tanstack/react-query for data fetching with infinite scroll and caching.
2. Filters and search queries are reactive — handled via Jotai atoms.
3. Starships are fetched in pages, filtered on the client, and optimized to avoid unnecessary re-fetching.
4. The compare page allows selecting up to 6 ships, then narrowing to 3 for side-by-side comparison in a responsive table.

### Extras & Optimizations
1. Debounced search input to avoid hammering the API
2. Persistent global state via Jotai atoms — selection survives route changes
3. Custom gradient background on landing page
4. Built with accessibility and mobile responsiveness in mind

### 📦 Deployed on Vercel
Check it out: star-wars-fleet-dashboard-teal.vercel.app

