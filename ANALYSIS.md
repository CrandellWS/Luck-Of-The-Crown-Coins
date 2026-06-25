# Moonie Machine - Code Analysis

## Repository
**GitHub:** https://github.com/CrandellWS/Luck-Of-The-Crown-Coins
**Live Demo:** https://crandellws.github.io/Luck-Of-The-Crown-Coins/

## Current Implementation

### Technology Stack
- **JavaScript:** 46.0%
- **HTML:** 29.3%
- **CSS:** 24.7%
- Pure client-side web application (no backend)

### Versions Available
Multiple iterations exist in the `/Moonie-Machine/` directory:
- `MoonieMachineV1.html` through `MoonieMachineV4.1.html`
- Themed variations: Pirate, Christmas, St. Patrick, July 4th, Baby Shower, etc.

### Current Version (V4.1) Features

#### Core Gameplay
1. **3-Reel Slot Machine** - Visual slot game with spinning reels
2. **Dual Mode System:**
   - **Big Moonie** 🌕 - Higher prize values
   - **Small Moonie** 🌙 - Lower prize values

#### Prize Structure

**Big Moonie Default Values:**
- Pink Diamond (Top Symbol): 40 SC
- Pirate Crown (Premium Gold): 35 SC
- Ruby Ring (Premium Silver): 30 SC
- Pink Pirate Hat (Premium Copper): 25 SC
- Gold Coin: 20 SC
- Silver Coin: 15 SC
- Copper Coin: 14 SC
- Chest (Bonus): Triggers bonus game

**Small Moonie Default Values:**
- Pink Diamond: 20 SC
- Pirate Crown: 15 SC
- Ruby Ring: 10 SC
- Pink Pirate Hat: 7 SC
- Gold Coin: 5 SC
- Silver Coin: 4 SC
- Copper Coin: 2 SC
- Chest (Bonus): Triggers bonus game

#### Configuration System

**Spin Configuration Modal:**
- Set custom prize values for each symbol
- Configure quantity/odds for each symbol type
- Toggle "Show Symbol Values" display
- Toggle "Consume Items on Win" (inventory depletion)
- Separate configs for Big vs Small Moonie

**Bonus Configuration Modal:**
- Configure "Lucky Loot Box Bonus" game
- Set number of losing picks (0-20)
- Define prize values for bonus game
- Pick-a-box style bonus round

#### Current Workflow (Manual)

1. **Setup:** Operator opens config modal, sets prize values and quantities
2. **Player Selection:** Name is drawn or gifted subs qualify player
3. **Manual Spin:** Operator clicks "Spin" button for the player
4. **Result Display:** Winning symbols appear on stream
5. **Prize Fulfillment:** Prize delivered to player in 24-48 hours
6. **Inventory Depletion:** If "Consume Items" enabled, won symbols reduce available quantity

#### Assets Structure

```
Moonie-Machine/
├── audio/           # Sound effects (spin, stop)
├── css/             # Styling (style-v4.css)
├── img/             # Symbol images
│   ├── pink-diamond.png
│   ├── pirate-crown.png
│   ├── ruby-ring.png
│   ├── pink-pirate-hat.png
│   ├── gold-coin.png
│   ├── silver-coin.png
│   ├── copper-coin.png
│   └── chest-closed.png
├── js/              # Game logic (javascript-v4.js)
└── MoonieMachineV4.1.html
```

### Key JavaScript Functions (javascript-v4.js)

**Configuration System:**
```javascript
symbolValuesBig = {
    "./img/pink-diamond.png": 40,
    "./img/pirate-crown.png": 35,
    // ... etc
};

symbolWinChanceBig = {
    "./img/pink-diamond.png": 10,  // Quantity available
    "./img/pirate-crown.png": 10,
    // ... etc
};
```

**Spin Logic:**
- Checks if mode is Big or Small
- Verifies items are still available (inventory > 0)
- Randomly selects winning symbol based on configured odds
- Animates reel spin
- Displays result
- Optionally consumes item from inventory

**Bonus Game:**
- "Lucky Loot Box Bonus" triggered by landing Chest symbol
- Modal opens with configurable number of boxes
- Pick-a-box style game
- Accumulates total SC won
- Separate prize pool from main slot

### Themes & Customization

**Available Themed Versions:**
- Default (Pirate theme - current)
- Christmas
- Christmas Night
- St. Patrick's Day
- July 4th
- Baby Shower
- Race theme

**Customization Elements:**
- Background video (currently pirate-video.mp4)
- Symbol images (themeable)
- Colors and styling (CSS variables)
- Bonus game branding
- Sound effects

## Integration Requirements for MyPrize

### Current State: Manual Operation
❌ No API integration
❌ Manual name selection
❌ Manual spin trigger
❌ Manual prize tracking

### Target State: MyPrize Automation

#### Phase 1: API Integration
1. **Authentication**
   - Implement HMAC-SHA512 signing for MyPrize API
   - Store API keys securely in environment variables
   - Set up request signing for all API calls

2. **Player Detection**
   - Poll `GET /api/creator/rooms/{room_id}/volume_stats?minutes=5`
   - Track active MyPrize players in play-along session
   - Monitor betting activity and participation

3. **Auto-Trigger Logic**
   - Define qualification criteria:
     - Minimum bet amount?
     - Active participation time?
     - Random selection from pool?
   - Automatically select qualified player
   - Trigger spin without manual intervention

4. **Result Tracking**
   - Log spin results to database/file
   - Track prize amounts awarded
   - Record player ID and timestamp
   - Generate reports for prize fulfillment

#### Phase 2: Prize Fulfillment
1. **MyPrize Promo Integration**
   - Fetch available promos: `GET /api/creator/promos/assignable`
   - Map Moonie Machine prizes to MyPrize promos
   - Auto-assign prizes: `POST /api/creator/promos/{promo_id}/assign`

2. **Hybrid Approach**
   - Keep manual mode for non-MyPrize platforms (Spree, etc.)
   - Auto mode for MyPrize players
   - Operator can override/manually trigger when needed

#### Phase 3: Enhanced Features
1. **Live Data Display**
   - Show current MyPrize participants on overlay
   - Display betting leaderboard
   - Show qualification status

2. **Points Integration**
   - Award Moonie Machine "tickets" based on MyPrize activity
   - Track accumulated spins earned
   - Display player's spin count

3. **Chat Notifications**
   - Integrate with PubNub chat API
   - Announce winners in chat
   - Send congrats messages
   - Display prize details

## Technical Architecture (Proposed)

### Backend Service (Node.js/Python)
```
moonie-backend/
├── api/
│   ├── myprize.js          # MyPrize API client
│   ├── authentication.js    # HMAC-SHA512 signing
│   └── chat.js             # PubNub integration
├── services/
│   ├── player-tracker.js    # Monitor MyPrize players
│   ├── spin-automation.js   # Auto-trigger logic
│   └── prize-fulfillment.js # Award prizes via API
├── database/
│   ├── spin-history.js      # Log all spins
│   └── player-stats.js      # Track player activity
└── config/
    ├── .env                 # API keys (gitignored)
    └── prize-mapping.json   # Map Moonie prizes to MyPrize promos
```

### Frontend (Enhanced Moonie Machine)
```
moonie-machine-v5/
├── MoonieMachineV5.html
├── js/
│   ├── javascript-v5.js     # Enhanced game logic
│   ├── api-client.js        # Communicate with backend
│   └── live-display.js      # Show MyPrize participant data
└── css/
    └── style-v5.css         # Enhanced styling
```

### Communication Flow
```
MyPrize Platform
    ↓ (poll every 5s)
Backend Service
    ↓ (detects qualified player)
Backend Service
    ↓ (sends trigger via WebSocket)
Moonie Machine Frontend
    ↓ (auto-spin animation)
Backend Service
    ↓ (logs result & assigns prize)
MyPrize API
    ↓ (player receives prize)
Chat/Notifications
```

## Development Roadmap

### Milestone 1: Backend Setup
- [ ] Create Node.js backend service
- [ ] Implement MyPrize API authentication
- [ ] Build player monitoring service
- [ ] Set up database for spin history

### Milestone 2: API Integration
- [ ] Connect to MyPrize Creator API
- [ ] Poll room volume stats
- [ ] Implement auto-selection logic
- [ ] Test API prize assignment

### Milestone 3: Frontend Enhancement
- [ ] Add WebSocket connection to backend
- [ ] Implement auto-spin trigger
- [ ] Add live participant display
- [ ] Create admin control panel

### Milestone 4: Prize System
- [ ] Map Moonie prizes to MyPrize promos
- [ ] Implement automatic prize assignment
- [ ] Add fallback for manual prizes
- [ ] Build prize tracking dashboard

### Milestone 5: Testing & Deployment
- [ ] End-to-end testing with MyPrize API
- [ ] Load testing for concurrent players
- [ ] Deploy backend service
- [ ] Deploy frontend to GitHub Pages or custom domain

## Compatibility Notes

### Keep Manual Mode
- Some platforms (Spree) don't offer API access
- Operator may want manual control sometimes
- Fallback if API is down

### Dual Mode Toggle
```
[ Manual Mode ] [ MyPrize Auto Mode ]
```
- Manual: Current behavior (click to spin)
- Auto: Backend triggers spins for MyPrize players

## Security Considerations

1. **API Key Protection**
   - Store in `.env` files
   - Never commit to git
   - Use environment variables in production

2. **Rate Limit Management**
   - MyPrize: 5000 req / 5 min
   - Implement request queuing
   - Cache results where possible

3. **Prize Validation**
   - Verify player eligibility before awarding
   - Log all prize distributions
   - Prevent duplicate awards

4. **Error Handling**
   - API failures don't crash game
   - Graceful degradation to manual mode
   - Alert operator of issues

## Questions for Implementation

1. **Player Selection Criteria:**
   - Random from all active MyPrize players?
   - Based on betting amount/frequency?
   - First to reach threshold?
   - Queue system?

2. **Spin Frequency:**
   - How often should auto-spins trigger?
   - One per stream?
   - Time-based intervals?
   - Activity-based?

3. **Prize Budget:**
   - Daily/weekly prize pool limits?
   - How to map Moonie prizes to MyPrize promos?
   - What if promo inventory runs out?

4. **Notification System:**
   - How to notify winners?
   - Chat announcement?
   - On-screen display?
   - Both?

---

**Next Steps:**
1. Review this analysis with team
2. Answer implementation questions
3. Begin Milestone 1 (Backend Setup)
4. Set up development environment with MyPrize API keys

**Priority:** HIGH - Critical for automated giveaway system
**Status:** Analysis Complete - Ready for Development Planning
