# Onchain Pulse - Dappit Integration Guide

## Overview

**Onchain Pulse** is a real-time trending activity dashboard for Base mini apps. It provides live leaderboards, transaction volume analytics, and personalized achievement badges for users exploring Base's ecosystem.

### Key Features
- **Real-Time Leaderboard**: Mini apps ranked by transactions/hour and new user acquisition
- **USDC Volume Analytics**: 24-hour transaction volume trends with interactive charts
- **User Badge System**: Personalized achievements ("Top 10 in Social", "DeFi Explorer", etc.)
- **Live Activity Feed**: Real-time event stream of significant blockchain activity
- **Dashboard Metrics**: Live statistics on transactions, active users, and network health

---

## Architecture

### Frontend Stack
- **Framework**: Next.js 16 (React 19.2)
- **Styling**: Tailwind CSS v4 with custom animations
- **Charts**: Recharts + shadcn/ui chart components
- **State Management**: React hooks with custom simulators

### Backend Integration Points
- **Data Sources**: Base mainnet RPC or The Graph subgraph (mock implementation included)
- **Real-Time Updates**: Simulated WebSocket-style updates (3-5 second intervals)
- **User Badges**: Client-side achievement tracking (Dappit profile integration ready)

### Design System
- **Theme**: Dark mode with neon-blue (#A39BEB) accents
- **Grid Layout**: Centered max-width container with responsive breakpoints
- **Animations**: Custom pulse waves, glowing borders, floating elements
- **Accessibility**: ARIA roles, semantic HTML, screen reader support

---

## Dappit Mini App Integration

### Mini App Metadata

```json
{
  "name": "Onchain Pulse",
  "description": "Real-time trending activity dashboard for Base mini apps",
  "version": "1.0.0",
  "icon": "🔵",
  "chain": "base",
  "platforms": ["web"],
  "deploymentUrl": "https://onchain-pulse.vercel.app",
  "dapptUrl": "https://dappit.io/apps/onchain-pulse"
}
```

### Dappit Media Engine - 15-Second Demo Video

**Video Concept**: "Pulse of Base"

#### Scene 1 (0-3s): Opening Sequence
- Black background with animated grid pattern
- Neon-blue pulse waves emanating from center
- "ONCHAIN PULSE" title glows into view with glow-text animation
- Subtitle: "Base Mini App Dashboard"

#### Scene 2 (3-6s): Real-Time Metrics
- Camera zooms in on header section
- Live stats cards animate in from left to right
- Numbers update in real-time (transactions: 12.4K, users: 3.2K, volume: $3.8M)
- Animated "LIVE" badges pulse on each card
- Show 24h trend indicator: "+12.4%"

#### Scene 3 (6-10s): Leaderboard Update
- Transition to mini app leaderboard section
- RevU, Noice, Farville cards slide up with staggered timing
- Transaction counts and new user numbers animated with counter effect
- Highlight ranking badges (1st, 2nd, 3rd place) with glow effect
- Show percentage changes (+24.3%, +18.7%, +12.1%)

#### Scene 4 (10-13s): Volume Analytics
- Transition to USDC Volume chart
- Area chart animates with data points appearing left-to-right
- Chart shows gradient fill from neon-blue
- Hover tooltip displays: "$847K transactions/hour"
- Summary stats update: Total Volume shows $3.8M

#### Scene 5 (13-15s): User Badges & CTA
- Quick transition to badges section
- Multiple tier badges display (Platinum, Gold, Silver, Bronze)
- Progress bars animate filling to show completion percentages
- Final frame: "Discover What's Hot on Base" with animated pulse border
- CTA text: "Launch Dashboard" with glow effect

---

## Data Structure & Mock Implementation

### Mini App Schema

```typescript
interface MiniApp {
  id: string;
  name: string;
  icon: string;
  txPerHour: number;
  newUsers: number;
  volume: number;
  change: number;
  rank: number;
}
```

### Mock Data Sources

#### 1. Real-Time Updates
- Transactions/hour update every 3 seconds with ±100 variance
- New users update with ±20 variance per update
- Volume updates with ±$2K variance
- Percentage changes recalculated based on current trends

#### 2. USDC Volume Data
- 24-hour historical data with hourly granularity
- Peak hour: ~847K transactions
- Data updated every 5 seconds with new hourly datapoint
- Includes per-app breakdown (RevU, Noice, Farville)

#### 3. Activity Events
- New event generated every 4 seconds
- Types: trade, user, milestone, volume
- 10 most recent events displayed in scrollable feed
- Timestamps relative to current time

---

## Production Implementation Guide

### Step 1: Connect to Base RPC

Replace mock data with live data from Base:

```typescript
// Example with ethers.js or viem
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const client = createPublicClient({
  chain: base,
  transport: http(),
});

// Fetch historical transactions
const logs = await client.getLogs({
  address: MINI_APP_ADDRESSES,
  fromBlock: 'latest',
  toBlock: 'latest',
});
```

### Step 2: Integrate The Graph Subgraph

Create a dedicated subgraph for Base mini apps:

```graphql
query MiniAppStats {
  miniApps(first: 10, orderBy: transactionCount, orderDirection: desc) {
    id
    name
    transactionCount
    newUsersLastHour
    volumeUSDC
    lastUpdated
  }
}
```

### Step 3: WebSocket for Real-Time Updates

Upgrade simulated updates to live WebSocket connection:

```typescript
// Pseudo-code for WebSocket integration
const ws = new WebSocket('wss://your-backend.com/live');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  setApps(prev => updateAppStats(prev, update));
};
```

### Step 4: User Authentication & Badges

Integrate with Dappit user profile:

```typescript
// Connect to Dappit profile for badge tracking
import { useDapptUser } from '@dappit/sdk';

const { user, badges, addBadge } = useDapptUser();

// Unlock badge when conditions met
if (user.transactionCount > 100) {
  addBadge('power-user');
}
```

---

## Base Mini Apps Referenced

1. **RevU** (🎯) - Rewards and verification platform
   - Leader in transaction volume
   - Strong new user onboarding

2. **Noice** (🎵) - Social audio platform
   - High engagement metrics
   - Consistent user growth

3. **Farville** (🚜) - Farm simulation game
   - Stable transaction rate
   - Community-driven

4. **Friend.tech** (👥) - Social graph protocol
   - Significant volume
   - Creator monetization

5. **Pixel Arcade** (🎮) - Gaming ecosystem
   - Fast-growing user base
   - High transaction frequency

---

## Deployment Instructions

### Vercel Deployment

```bash
# 1. Clone repository
git clone <repo-url>

# 2. Install dependencies
npm install

# 3. Deploy to Vercel
vercel deploy --prod

# 4. Set environment variables in Vercel dashboard
# (Not required for mock data, but prepare for production)
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_GRAPH_URL=https://api.thegraph.com/subgraphs/name/...
```

### Dappit Mini App Manifest

Create `dappit.json` in root:

```json
{
  "name": "Onchain Pulse",
  "description": "Real-time trending activity dashboard for Base mini apps",
  "version": "1.0.0",
  "author": "Onchain Pulse Team",
  "repository": "https://github.com/your/repo",
  "mainUrl": "https://onchain-pulse.vercel.app",
  "icon": "🔵",
  "screenshots": [
    "https://cdn.example.com/screenshot-1.png",
    "https://cdn.example.com/screenshot-2.png"
  ],
  "permissions": [
    "public_profile",
    "transaction_history"
  ],
  "supportedChains": ["base"],
  "demo": {
    "videoUrl": "https://cdn.example.com/demo.mp4",
    "duration": 15,
    "format": "mp4"
  }
}
```

---

## API Endpoints (For Future Backend)

### GET /api/mini-apps
Returns list of trending mini apps with current stats

```
Query Params:
- limit: number (default: 10)
- sortBy: "volume" | "transactions" | "users" (default: "volume")
- timeframe: "1h" | "24h" | "7d" (default: "24h")

Response:
{
  apps: MiniApp[],
  lastUpdated: timestamp,
  network: "base"
}
```

### GET /api/volume-data
Returns USDC volume history

```
Query Params:
- granularity: "hour" | "day" | "week"
- limit: number

Response:
{
  data: VolumeData[],
  chart: {
    min: number,
    max: number,
    average: number
  }
}
```

### GET /api/user/badges
Returns user's earned and in-progress badges

```
Headers:
- Authorization: Bearer <token>

Response:
{
  earned: UserBadge[],
  inProgress: UserBadge[],
  nextUnlock: string,
  progressPercentage: number
}
```

---

## Performance Optimization

### Current Implementation
- Client-side data generation and updates
- No database queries needed
- Instant page load
- Smooth 60fps animations

### Production Considerations
- Implement server-side caching (Redis)
- Rate limit API endpoints
- Use CDN for static assets
- Compress chart data before transmission
- Lazy-load badge images

---

## Security & Compliance

### Smart Contract Audit Checklist
- [ ] Verify all data sources for accuracy
- [ ] Implement signed transactions for profile updates
- [ ] Add rate limiting to prevent abuse
- [ ] Encrypt sensitive user data
- [ ] Regular security audits of subgraph queries

### User Privacy
- No personal data collected beyond wallet address
- All statistics are anonymized aggregates
- Privacy-first badge system design

---

## Support & Roadmap

### Current Version: 1.0.0
- Real-time leaderboards
- Volume analytics
- Achievement badges
- Activity feed

### Planned Features (v1.1)
- User portfolio tracking
- Alert system for trending apps
- Historical analytics & reports
- Social sharing integration
- Mobile app (React Native)

### Contact
- GitHub: [repository-link]
- Discord: [community-link]
- Email: support@onchainpulse.dev

---

## License

MIT License - See LICENSE.md for details
