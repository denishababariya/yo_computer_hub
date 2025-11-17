# Visual Guide - Password Eye Icon & Shop Filters

## 1. Password Eye Icon

### Login Page
```
┌─────────────────────────────────────┐
│           Login                     │
├─────────────────────────────────────┤
│                                     │
│ Email Address                       │
│ [example@email.com_____________]   │
│                                     │
│ Password                            │
│ [••••••••••••••••••••] [👁️ eye]    │
│                                     │
│ Click eye → Shows password          │
│ [MyPassword12345______] [👁️/ slash] │
│                                     │
│ Remember me    Forgot Password?    │
│                                     │
│ [          Login           ]        │
│                                     │
│ Don't have account? Sign Up →       │
└─────────────────────────────────────┘
```

### Register Page
```
┌─────────────────────────────────────┐
│       Create Account                │
├─────────────────────────────────────┤
│                                     │
│ Full Name                           │
│ [John Doe________________]          │
│                                     │
│ Email Address                       │
│ [user@example.com__________]        │
│                                     │
│ Phone Number                        │
│ [+1 234-567-8900_________]          │
│                                     │
│ Password                            │
│ [••••••••••••••] [👁️]              │
│ (at least 6 characters)             │
│                                     │
│ Confirm Password                    │
│ [••••••••••••••] [👁️]              │
│                                     │
│ ☑ I agree to Terms                  │
│                                     │
│ [      Sign Up       ]              │
│                                     │
│ Already have account? Login →       │
└─────────────────────────────────────┘
```

---

## 2. Shop Filters - Desktop View (≥768px)

```
┌────────────────────────────────────────────────────────────────────────┐
│                             SHOP                                        │
│                                    Showing 24 products                 │
├──────────────────────────────┬──────────────────────────────────────────┤
│                              │                                          │
│  🔽 FILTER & SORT           │   Product 1    Product 2    Product 3   │
│                              │   [image]      [image]      [image]     │
│  Category                    │   Name...      Name...      Name...     │
│  ○ All                       │   ★★★★★        ★★★★★        ★★★★★     │
│  ○ Laptop                    │   $999         $1299        $1499       │
│  ○ Desktop                   │                                          │
│  ○ Gaming                    │   Product 4    Product 5    Product 6   │
│  ○ Accessories              │   [image]      [image]      [image]     │
│                              │   Name...      Name...      Name...     │
│                              │   ★★★★★        ★★★★★        ★★★★★     │
│  Price Range                 │   $599         $799         $1099       │
│                              │                                          │
│  Min: [0] $0                 │   Product 7    Product 8    Product 9   │
│  ━━━━━━━━━ slider           │   [image]      [image]      [image]     │
│                              │   Name...      Name...      Name...     │
│  Max: [5000] $5000           │   ★★★★★        ★★★★★        ★★★★★     │
│  ━━━━━━━━━━━ slider          │   $1299        $899         $649        │
│                              │                                          │
│  Price: $0 - $5000           │   [More products...]                    │
│                              │                                          │
│  Sort By                     │                                          │
│  ○ Popular                   │                                          │
│  ○ Price: Low-High           │                                          │
│  ○ Price: High-Low           │                                          │
│                              │                                          │
└──────────────────────────────┴──────────────────────────────────────────┘

(Sidebar is STICKY - stays visible while scrolling products)
```

---

## 3. Shop Filters - Mobile View (<768px)

### Before (Without Filters Button)
```
┌──────────────────────────────┐
│         Shop                 │
│    [Products Grid - 1-2 col]│
│    [Product 1]              │
│    [image]                  │
│    Name... $999             │
│                              │
│    [Product 2]              │
│    [image]                  │
│    Name... $1299            │
│                              │
│    [More products...]       │
└──────────────────────────────┘
```

### With Filters Button
```
┌────────────────────────────────────┐
│ Shop         [🔽 Filters]         │
│                                    │
│    [Products Grid]                 │
│    [Product 1]  [Product 2]        │
│    [image]      [image]            │
│    $999         $1299              │
│                                    │
│    [Product 3]  [Product 4]        │
│    [image]      [image]            │
│    $1499        $599               │
│                                    │
│    [More products...]              │
└────────────────────────────────────┘
```

### Filters Offcanvas (Slides from Left)
```
Click [Filters] button
              ↓
┌────────────────────────────────┐
│ ← FILTERS            ✕         │
├────────────────────────────────┤
│ 🔽 CATEGORY                    │
│                                │
│ ○ All                          │
│ ○ Laptop         ← selected    │
│ ○ Desktop                      │
│ ○ Gaming                       │
│ ○ Accessories                  │
│                                │
│ ──────────────────────         │
│ 💰 PRICE RANGE                 │
│                                │
│ Min     [slider]  $0           │
│ Max     [slider]  $5000        │
│                                │
│ Price: $0 - $5000              │
│                                │
│ ──────────────────────         │
│ ↗️ SORT BY                      │
│                                │
│ ○ Popular         ← selected   │
│ ○ Price: Low-High              │
│ ○ Price: High-Low              │
│                                │
│ ──────────────────────         │
│                                │
│ [Reset]    [✓ Apply]           │
│                                │
└────────────────────────────────┘
     (Click Apply to close)
```

---

## 4. Eye Icon Animations

### Eye Icon Toggle
```
Hidden Password:
[••••••••••••••••] [👁️ eye]
                    ↓ click
Shown Password:
[MyPassword12345] [👁️⁄ slash]
                    ↓ click
Hidden Password:
[••••••••••••••••] [👁️ eye]
```

### Hover Effects
```
Normal:
[👁️]  <- Gray, size 1x

Hover:
[👁️ → ↗️]  <- Red (#de3431), size 1.15x, scale up
```

---

## 5. Color Scheme

### Theme Colors
```
Primary Red:    #de3431  (All active states, icons, highlights)
White:          #ffffff  (Backgrounds, text on dark)
Light Gray:     #f8f9fa  (Sidebar background, input backgrounds)
Dark Gray:      #333333  (Headings)
Medium Gray:    #555555  (Labels, descriptions)
Light Gray:     #e0e0e0  (Borders)
Muted Gray:     #888888  (Helper text)
```

### No Bootstrap Blue!
❌ Bootstrap Primary Blue (#007bff) - NOT used
✅ Custom Red Theme (#de3431) - Applied throughout

---

## 6. Responsive Breakpoints

### Mobile (<576px)
- Filters button visible at top
- 1 column product grid
- Full-width offcanvas

### Tablet (576px - 768px)
- Filters button visible at top
- 2 column product grid
- Full-width offcanvas

### Desktop (≥768px)
- Sidebar filters on left (sticky)
- 3-4 column product grid
- No filters button
- Sidebar always visible

---

## 7. Interaction Flow - Complete Journey

### User opens Shop page:
```
1. Page loads
2. API fetches products
3. Spinner shows
4. Products display with filters
   ├─ Desktop: Sidebar on left
   └─ Mobile: Filters button at top
```

### User adjusts filters (Desktop):
```
1. User clicks category → Products update instantly
2. User drags price slider → Products filter in real-time
3. User selects sort option → Products sort immediately
4. No page reload!
5. Sidebar remains sticky while scrolling
```

### User adjusts filters (Mobile):
```
1. User clicks [Filters] button
2. Offcanvas slides in from left
3. User adjusts category/price/sort
4. User clicks [Apply]
5. Offcanvas closes
6. Products update
7. Can click [Reset] to clear all filters
```

---

## 8. Features at a Glance

### Password Input Features
- ✅ Toggle eye icon
- ✅ Password visibility on/off
- ✅ Smooth transitions
- ✅ Hover effects
- ✅ Mobile friendly
- ✅ Works on all password pages

### Shop Filter Features
- ✅ Category filtering
- ✅ Min-Max price range
- ✅ Real-time sorting
- ✅ Desktop sticky sidebar
- ✅ Mobile offcanvas
- ✅ Red theme (#de3431)
- ✅ Responsive design
- ✅ No API overhead (client-side filtering)

---

## 9. Technical Highlights

```javascript
// Password Eye Icon Component
<PasswordInput
  label="Password"
  name="password"
  placeholder="Enter password"
  value={formData.password}
  onChange={handleChange}
  required
/>

// Filter State Management
const [filters, setFilters] = useState({
  category: 'All',
  priceMin: 0,
  priceMax: 10000,
  sort: 'popular'
});

// Efficient Filtering with useMemo
const filtered = useMemo(() => {
  // Filter by category
  // Filter by price range
  // Sort results
}, [filters, products]);
```

---

**Everything is ready to use!** ✅
