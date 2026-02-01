# Onchain Pulse - Animation & Effects Reference

## Complete Animation Catalog

### 1. Pulse Glow Animation
**CSS Keyframe**: `pulse-glow`
**Duration**: 2 seconds
**Iteration**: Infinite
**Easing**: ease-in-out

#### Effect Description
Expanding glow circle that emanates from center, with color intensity fading:
- 0% / 100%: Small glow, high opacity (0.7)
- 50%: Large glow, low opacity (0.15)

#### Applied To
- Logo icon background
- Highlight badges
- Primary buttons on hover
- Stat card backgrounds

#### CSS
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(163, 155, 235, 0.7),
                0 0 20px 0 rgba(163, 155, 235, 0.3);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(163, 155, 235, 0),
                0 0 30px 10px rgba(163, 155, 235, 0.15);
  }
}
```

#### Utility Class
`.animate-pulse-glow` - Apply to any element

---

### 2. Slide Up Animation
**CSS Keyframe**: `slide-up`
**Duration**: 0.5 seconds
**Iteration**: Once
**Easing**: ease-out

#### Effect Description
Element slides up from 20px below with fade-in:
- From: opacity 0%, translateY(20px)
- To: opacity 100%, translateY(0)

#### Applied To
- Stat cards (staggered)
- Leaderboard rows
- Badge cards
- Activity feed items
- Tab content

#### Stagger Pattern
- First item: 0ms delay
- Each subsequent: +50-100ms delay
- Creates cascading effect

#### CSS
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Implementation
```jsx
<div
  className="animate-slide-up"
  style={{ animationDelay: `${index * 50}ms` }}
>
  {/* Content */}
</div>
```

---

### 3. Glow Text Animation
**CSS Keyframe**: `glow-text`
**Duration**: 2 seconds
**Iteration**: Infinite
**Easing**: ease-in-out

#### Effect Description
Text shadow pulsing between normal and glowing states:
- 0% / 100%: Subtle glow (0.5x intensity)
- 50%: Strong glow (0.8x intensity)

#### Applied To
- Primary stat numbers
- Primary headings
- Badge tier labels
- Active navigation items
- Key metrics

#### Color
Neon-blue text shadow: `rgba(163, 155, 235, 0.5-0.8)`

#### CSS
```css
@keyframes glow-text {
  0%, 100% {
    text-shadow: 0 0 10px rgba(163, 155, 235, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(163, 155, 235, 0.8);
  }
}
```

#### Utility Class
`.animate-glow-text` - Apply to text elements
`.glow-text` - Static glow effect

---

### 4. Float Animation
**CSS Keyframe**: `float`
**Duration**: 3 seconds
**Iteration**: Infinite
**Easing**: ease-in-out

#### Effect Description
Subtle vertical lift and settle motion:
- 0% / 100%: translateY(0px)
- 50%: translateY(-10px)

#### Applied To
- Decorative elements
- Badge icons (optional)
- Floating action buttons
- Visual accents

#### CSS
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

#### Utility Class
`.animate-float` - Apply to floating elements

---

### 5. Shimmer Animation
**CSS Keyframe**: `shimmer`
**Duration**: Variable (1-2s)
**Iteration**: Once or infinite
**Easing**: linear

#### Effect Description
Loading shimmer effect with gradient background:
- 0%: Background at -1000px
- 100%: Background at 1000px

#### Applied To
- Loading states
- Chart data loading
- Skeleton screens
- Data transitions

#### CSS
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

---

## Custom Utility Classes

### Glow Border
**Class**: `.glow-border`
**Effect**: Inset glow + outer glow + colored border

#### CSS
```css
.glow-border {
  box-shadow: inset 0 0 20px rgba(163, 155, 235, 0.2),
              0 0 20px rgba(163, 155, 235, 0.1);
  border: 1px solid rgba(163, 155, 235, 0.3);
}
```

#### Applied To
- All card backgrounds
- Input fields
- Hover states
- Selected elements

#### Visual Effect
```
┌─────────────────────┐
│ ✨ Card Content ✨  │ ← Outer glow
│                     │ ← Blue border
│  ═══════════════    │ ← Inset glow
└─────────────────────┘
```

---

### Glow Text Utility
**Class**: `.glow-text`
**Effect**: Neon-blue color with text shadow

#### CSS
```css
.glow-text {
  color: rgb(163, 155, 235);
  text-shadow: 0 0 10px rgba(163, 155, 235, 0.5);
}
```

#### Applied To
- Primary headings
- Key metrics
- Brand name
- Emphasis text

---

## Animation Sequences

### Page Load Sequence (0-2 seconds)
```
0.0s  ├─ Background fades in
      ├─ Header slides up
      ├─ Logo pulses (glow-glow)
      │
0.3s  ├─ Stat card 1 slides up
0.4s  ├─ Stat card 2 slides up (stagger)
0.5s  ├─ Stat card 3 slides up
0.6s  ├─ Stat card 4 slides up
      │
0.7s  ├─ Leaderboard title
0.8s  ├─ Leaderboard row 1 slides up
0.9s  ├─ Leaderboard row 2 slides up (stagger)
1.0s  ├─ Leaderboard row 3 slides up
1.1s  ├─ Leaderboard row 4 slides up
1.2s  ├─ Leaderboard row 5 slides up
      │
1.3s  ├─ Activity ticker animates in
2.0s  └─ All animations settle, continuous effects start
```

### Stat Card Animation
```
Cards: [12.4K] [3.2K] [$3.8M] [99.8%]

Each card:
1. Slide up (0.5s)
2. Number counter animates
3. Glow text pulse starts (infinite)
4. On hover:
   - Background brightens (0.3s transition)
   - Glow intensifies
   - Subtle elevation effect
```

### Leaderboard Row Animation
```
Per row:
1. Container slides up (0.5s)
2. Rank badge pulses (glow-glow)
3. Numbers update with counter animation
4. Change percentage animates
5. On hover:
   - Background glow increases
   - Scale slightly (1.02x)
   - Pointer changes to hand
```

### Badge Card Animation
```
Cards grid: [3 cols desktop, 2 cols tablet, 1 col mobile]

Each badge:
1. Slide up with stagger (0.5s + delay)
2. Tier color gradient visible
3. On hover:
   - Overlay gradient fades in (0.3s)
   - Light overlay appears
   - Subtle scale increase (1.02x)
4. Progress bar animates to value (0.5s duration)
```

### Activity Feed Animation
```
Events: [Newest → Oldest, max 10 visible]

Each event:
1. Appears with slide-up animation (0.5s)
2. Color-coded background (trade/user/milestone/volume)
3. Timestamp in relative format
4. On new event:
   - New event slides in from top
   - Oldest event slides out (if 10+ events)
   - Smooth transition (0.3s)
5. Timestamp updates live (no animation)
```

### Chart Animation
```
Area Chart:
1. Axis and grid fade in
2. Data points appear left-to-right (animated)
3. Area fill animates from bottom (0.8s)
4. Gradient applies during animation
5. On hover:
   - Tooltip slides in (0.2s)
   - Highlight color changes

Summary cards below chart:
1. Slide up with stagger (0.5s)
2. Numbers update with counter animation
3. Trend indicators animate
```

---

## Hover & Interaction States

### Button Hover State
```
Base state:
  - Background: rgba(163, 155, 235, 0.1)
  - Border: 1px solid rgba(163, 155, 235, 0.3)

Hover state (0.3s transition):
  - Background: rgba(163, 155, 235, 0.15)
  - Box-shadow: Added glow
  - Scale: 1.02x (optional)
  - Cursor: pointer
```

### Card Hover State
```
Base state:
  - Background: rgba(163, 155, 235, 0.1)
  - Border: 1px solid rgba(163, 155, 235, 0.3)
  - Box-shadow: Subtle inset glow

Hover state (0.3s transition):
  - Background: rgba(163, 155, 235, 0.15)
  - Border-color: rgba(163, 155, 235, 0.5)
  - Box-shadow: Enhanced glow
  - Transform: translateY(-2px) (optional)
```

### Stat Card Hover State
```
Base state:
  - Opacity: 100%
  - Transform: scale(1)

Hover state (0.3s transition):
  - Background: Slightly brighter
  - Box-shadow: Stronger glow
  - Transform: scale(1.02)
  - Glow intensity: Increase

Icon effect:
  - Color: More vibrant
  - Scale: 1.1x
```

### Text Link Hover State
```
Base state:
  - Color: rgb(163, 155, 235)
  - Text-decoration: none

Hover state (0.2s transition):
  - Color: rgb(180, 170, 255)
  - Text-decoration: underline
  - Text-shadow: Enhanced glow
```

---

## Responsive Animation Adjustments

### Desktop (1920px+)
- Full animation effects enabled
- Stagger delays: 100ms between items
- Transition duration: 0.3s standard
- Hover effects: Fully enabled

### Tablet (1024px - 1919px)
- Animation effects enabled
- Stagger delays: 75ms between items
- Transition duration: 0.3s standard
- Hover effects: Simplified

### Mobile (< 1024px)
- Animation effects simplified
- Stagger delays: 50ms between items
- Transition duration: 0.25s (faster)
- Hover effects: Touch-friendly alternatives
- Reduced motion: Respected

### Prefers-Reduced-Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Performance Optimization

### Hardware Acceleration
All animations use GPU-accelerated properties:
- `transform: translateY()` ✅ (not top/bottom)
- `opacity` ✅ (GPU accelerated)
- `box-shadow` ⚠️ (limited use)
- `background-color` ❌ (not accelerated)

### Frame Budget
- Target: 60fps (16.67ms per frame)
- Animation complexity: Kept minimal
- Simultaneous animations: Max 3-4 per element

### Best Practices Applied
- Use `will-change` sparingly
- Animate only necessary properties
- Use CSS over JavaScript animations
- Batch DOM updates
- Debounce resize listeners

---

## Accessibility Considerations

### Motion-Safe
Default animations for users without motion sensitivity:
- Smooth, continuous animations
- Clear state transitions
- Visual feedback on interactions

### Motion-Reduced
Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Animations
Keyboard navigation maintains visual feedback:
- Focus state: Visible outline (3px ring)
- Tab order: Logical flow
- Animation: Still applies to focused elements

---

## Testing Animation Performance

### Chrome DevTools Method
1. Open DevTools (F12)
2. Go to Performance tab
3. Click record
4. Interact with animations
5. Check FPS chart (should be 60fps)

### Expected Results
- Page load: <2 seconds first paint
- Interaction latency: <100ms
- Animation smoothness: 60fps minimum
- Memory: <100MB (demo version)

---

## Future Animation Ideas

### Phase 2 Enhancements
- Skeleton loading animations
- Chart transitions between data
- Expandable card animations
- Notification toast animations
- Modal entrance animations

### Phase 3 Advanced
- 3D transforms (rotate, perspective)
- SVG path animations
- Canvas particle effects
- Advanced gesture animations
- Scroll-triggered animations

---

## Animation Debugging

### Visual Debugging
```js
// Slow down animations in DevTools
document.documentElement.style.animationPlayState = 'paused';

// Speed up animations for testing
document.documentElement.style.animationDuration = '0.1s';
```

### Performance Monitoring
```js
// Check animation frame rate
let lastTime = performance.now();
let frames = 0;

function checkFPS() {
  frames++;
  const currentTime = performance.now();
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frames}`);
    frames = 0;
    lastTime = currentTime;
  }
  requestAnimationFrame(checkFPS);
}

checkFPS();
```

---

## Animation Checklist

Before deploying, verify:
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Animations run at 60fps on target devices
- [ ] No animations block user interactions
- [ ] Focus states remain visible
- [ ] Animations add value, not distraction
- [ ] Performance metrics meet targets
- [ ] Cross-browser compatibility verified
- [ ] Mobile animations optimized
- [ ] Accessibility standards met
- [ ] User testing completed

---

**Last Updated**: January 2025
**Animation System**: v1.0 (Stable)
**Browser Compatibility**: 90%+ of target browsers
