import { useState, useEffect } from 'react'
import {
  Menu, X, ShoppingBasket, Search, ChevronRight, ChevronLeft,
  ChevronDown, Home, BookOpen, Printer, Store, Star, Heart, Check,
  Truck, Package, MapPin, Plus, Minus, SlidersHorizontal, ShoppingBag, MousePointer2, Tag, Phone, Navigation
} from 'lucide-react'
import essentialStationeryImg from '@/imports/Essential_Stationery.webp'
import premiumStationeryImg from '@/imports/Premium_Stationery.webp'
import stationeryGiftsImg from '@/imports/Stationery_Gifts.webp'
import ballpointPensImg from '@/imports/Ballpoint_Pens.webp'
import pencilCasesImg from '@/imports/Pencil_Cases.webp'
import pencilsImg from '@/imports/Pencils.webp'
import stickyNotesImg from '@/imports/Sticky_Notes-1.webp'
import filingFoldersImg from '@/imports/Filing_Folders.webp'
import fashionStationeryImg from '@/imports/Fashion_Stationery.webp'
import birthdayCardImg from '@/imports/Birthday.webp'
import weddingCardImg from '@/imports/Wedding_1.webp'
import anniversaryCardImg from '@/imports/Anniversary.webp'
import newJobCardImg from '@/imports/New_Job.webp'
import goodLuckCardImg from '@/imports/Good_Luck.webp'
import sentimentsCardImg from '@/imports/sentiments.webp'
import greetingCardOneImg from '@/imports/card_1.webp'
import greetingCardTwoImg from '@/imports/card_2.webp'
import weddingCardPlpImg from '@/imports/wedding_card.webp'
import anniversaryCardPlpImg from '@/imports/anniversary_card.webp'
import newJobCardPlpImg from '@/imports/newjob_card.webp'
import goodLuckCardPlpImg from '@/imports/goodluck_Card.webp'
import sentimentsCardPlpImg from '@/imports/sentiments_card.webp'
import bopisTimerImg from '@/imports/BOPIS_Creative_Guidelines_RGB_Same_Day-Timer.webp'
import bopisStoreImg from '@/imports/BOPIS_Creative_Guidelines_RGB_Same_Day-Store.webp'
import cardsBannerImg from '@/imports/cards-transparent-final.png'
import logoImg from '@/imports/logo_ry_red_full.png'
import logoSmallImg from '@/imports/logo-small.svg'
import storeImg from '@/imports/Untitled-1.jpg'
import rewardsIcon from '@/imports/customer-club_star_new.png'
import schoolBannerImg from '@/imports/School_banner.webp'

declare const __APP_VERSION__: string
declare const __APP_BUILD__: string
declare const __APP_BUILD_DATE__: string

// ── Types ─────────────────────────────────────────────────────────────────
type Screen =
  | 'home'
  | 'nav'
  | 'basket'
  | 'storefinder'
  | 'rewards'
  | 'greetingcards'
  | 'printshop'
  | 'printyourdoc'
  | 'posterprinting'
  | 'shop'
  | 'categorylanding'
  | 'plp'
  | 'cardsplp'
  | 'pdp'
  | 'cardpdp'

// ── Colours ────────────────────────────────────────────────────────────────
const RED = '#d80a00'
const GREEN = '#3FA14F'
const REWARDS_TEAL = '#267c84'
const CHARCOAL = '#1a1a1a'
const LIGHT_GREY = '#F5F5F5'
const MID_GREY = '#e8e8e8'
const TEXT_GREY = '#666'
const CTA_GREY = '#68717a'
const BUILD_LABEL = `Prototype v${__APP_VERSION__} · build ${__APP_BUILD__} · ${__APP_BUILD_DATE__}`
const TAB_BAR_HEIGHT = 58
const CARD_RADIUS = 14
const CARD_BORDER = `1px solid ${MID_GREY}`
const CARD_SHADOW = '0 1px 4px rgba(0,0,0,0.07)'
const STATIONERY_CATEGORIES = [
  { label: 'Arts & Crafts', img: essentialStationeryImg },
  { label: 'Notebooks & Notepads', img: fashionStationeryImg },
  { label: 'School Supplies', img: premiumStationeryImg },
  { label: 'Revision Tools', img: stickyNotesImg },
  { label: 'Gifts', img: stationeryGiftsImg },
  { label: 'Pencil Cases', img: pencilCasesImg },
  { label: 'Pens & Pencils', img: ballpointPensImg },
  { label: 'Drawing Tools', img: pencilsImg },
  { label: 'Games', img: essentialStationeryImg },
  { label: 'Colouring', img: stickyNotesImg },
  { label: 'Fashion Stationery', img: fashionStationeryImg },
  { label: "Children's Stationery", img: filingFoldersImg },
]
const SHOP_CATEGORIES = [
  { label: 'School Supplies', img: premiumStationeryImg },
  { label: 'Special Offers', img: stationeryGiftsImg },
  { label: 'Print Shop', img: premiumStationeryImg },
  { label: 'Greeting Cards', img: fashionStationeryImg },
  { label: 'Stationery', img: essentialStationeryImg },
  { label: 'Office Supplies', img: filingFoldersImg },
  { label: 'Office Furniture & Storage', img: pencilCasesImg },
  { label: 'Printers & Paper', img: stickyNotesImg },
  { label: 'Electricals & Technology', img: ballpointPensImg },
  { label: 'Home and Garden', img: pencilCasesImg },
  { label: 'Hobbies & Leisure', img: essentialStationeryImg },
  { label: 'Ryman Rewards Prices', img: stationeryGiftsImg },
  { label: 'Gifting', img: fashionStationeryImg },
  { label: 'New In', img: premiumStationeryImg },
]
const STORE_MARKERS = [
  { left: '30%', top: '26%' },
  { left: '36%', top: '25%' },
  { left: '42%', top: '24%' },
  { left: '45%', top: '33%' },
  { left: '48%', top: '39%' },
  { left: '52%', top: '45%' },
  { left: '55%', top: '51%' },
  { left: '58%', top: '58%' },
  { left: '63%', top: '61%' },
  { left: '67%', top: '69%' },
  { left: '37%', top: '73%' },
  { left: '26%', top: '81%' },
]
type BasketItem = {
  id: number
  name: string
  price: number
  img: string
  qty: number
}

type ProductCardItem = {
  id: number
  name: string
  price: number
  img: string
  wasPrice?: number
  from?: boolean
  promo?: string
}

type PickupStore = {
  id: string
  name: string
  status: 'in' | 'out'
  address?: string
  collectBy?: string
}

const PICKUP_STORES: PickupStore[] = [
  { id: 'wimbledon', name: 'Wimbledon', status: 'in', address: '6 The Broadway, London, SW19 1RF', collectBy: 'Collect by Monday, 3rd August' },
  { id: 'putney', name: 'Putney', status: 'out', address: '84 Putney High Street, London, SW15 1RB' },
  { id: 'clapham-junction', name: 'Clapham Junction', status: 'out', address: 'St John’s Road, London, SW11 1QW' },
  { id: 'sutton', name: 'Sutton', status: 'in', address: '65 High Street, Sutton, SM1 1DT', collectBy: 'Collect by Monday, 3rd August' },
  { id: 'north-end-road', name: 'North End Road', status: 'in', address: '246 North End Road, London, SW6 1NL', collectBy: 'Collect by Monday, 3rd August' },
]

function ClickAndCollectIcon() {
  return (
    <span style={{ position: 'relative', width: 30, height: 28, display: 'inline-block', flexShrink: 0 }}>
      <ShoppingBag
        size={24}
        strokeWidth={1.9}
        style={{ position: 'absolute', left: 0, top: 1 }}
      />
      <MousePointer2
        size={17}
        strokeWidth={2}
        style={{ position: 'absolute', right: -1, bottom: -1 }}
      />
    </span>
  )
}

function RewardsIcon({ size = 22, color = REWARDS_TEAL, opacity = 1 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: color,
        opacity,
        WebkitMaskImage: `url(${rewardsIcon})`,
        maskImage: `url(${rewardsIcon})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

// ── Shared Header ──────────────────────────────────────────────────────────
function Header({
  onMenu,
  onBack,
  onHome,
  onBasket,
  basketCount = 2,
}: {
  onMenu?: () => void
  onBack?: () => void
  onHome?: () => void
  onBasket?: () => void
  basketCount?: number
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: `1px solid ${MID_GREY}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        height: 'calc(env(safe-area-inset-top, 0px) + 48px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <button
        onClick={onBack ?? onMenu}
        style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', color: CHARCOAL }}
      >
        {onBack ? <ChevronLeft size={24} /> : <Menu size={22} />}
      </button>

      <button onClick={onHome} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
        <img src={logoImg} alt="Ryman" style={{ height: 32, objectFit: 'contain' }} />
      </button>

      <button
        onClick={onBasket}
        style={{ position: 'relative', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', color: CHARCOAL }}
      >
        <ShoppingBasket size={22} />
        <span style={{
          position: 'absolute', top: 4, right: 4,
          background: RED, color: '#fff',
          fontSize: 10, fontWeight: 700, lineHeight: 1,
          width: 16, height: 16, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{basketCount}</span>
      </button>
    </header>
  )
}

// ── Search Bar ─────────────────────────────────────────────────────────────
function SearchBar({
  placeholder = 'Search for products or brands',
  padding = '10px 16px 8px',
}: {
  placeholder?: string
  padding?: string
}) {
  return (
    <div style={{ padding }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: LIGHT_GREY, borderRadius: 10,
        padding: '10px 14px', border: `1px solid ${MID_GREY}`,
      }}>
        <Search size={16} color={TEXT_GREY} />
        <span style={{ fontSize: 14, color: TEXT_GREY }}>{placeholder}</span>
      </div>
    </div>
  )
}

// ── Bottom Tab Bar ─────────────────────────────────────────────────────────
function TabBar({ active, onChange }: { active: string; onChange: (s: Screen) => void }) {
  const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={22} strokeWidth={1.8} /> },
    { id: 'greetingcards', label: 'Cards', icon: <BookOpen size={22} strokeWidth={1.8} /> },
    { id: 'printshop', label: 'Print', icon: <Printer size={22} strokeWidth={1.8} /> },
    { id: 'shop', label: 'Shop', icon: <Store size={22} strokeWidth={1.8} /> },
    { id: 'rewards', label: 'Rewards', icon: null },
  ]
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: '#fff', borderTop: `1px solid ${MID_GREY}`,
      display: 'flex',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {tabs.map(t => {
        const isActive =
          active === t.id ||
          (active === 'plp' && t.id === 'shop') ||
          ((active === 'printyourdoc' || active === 'posterprinting') && t.id === 'printshop') ||
          (active === 'pdp' && t.id === 'shop')
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 3, padding: '10px 0 8px', border: 'none', background: 'none',
              cursor: 'pointer',
              color: isActive ? (t.id === 'rewards' ? REWARDS_TEAL : RED) : '#878787',
              transition: 'color 0.15s',
            }}
          >
            {t.id === 'rewards' ? (
              <RewardsIcon size={22} color={REWARDS_TEAL} opacity={isActive ? 1 : 0.68} />
            ) : t.icon}
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, letterSpacing: '0.2px' }}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

// ── Nav Drawer ─────────────────────────────────────────────────────────────
function NavDrawer({ onClose, onNavigate }: { onClose: () => void; onNavigate: (s: Screen) => void }) {
  const [activeCategory, setActiveCategory] = useState<{
    label: string
    icon: React.ReactNode
    screen: Screen
    children: string[]
  } | null>(null)
  const sections = [
    { label: 'Invitations', screen: 'plp' as Screen },
    { label: 'Arts & Crafts', screen: 'plp' as Screen },
    { label: 'School Supplies', screen: 'plp' as Screen },
  ]
  const items: { label: string; icon: React.ReactNode; screen: Screen; children?: string[] }[] = [
    { label: 'Special Offers', icon: <Star size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Back to School', 'Clearance', 'Multi-buy Deals', 'Trending Offers'] },
    { label: 'Print Shop', icon: <Printer size={18} strokeWidth={1.8} />, screen: 'printshop', children: ['Document Printing', 'Poster Printing', 'Photo Printing', 'Binding & Laminating'] },
    { label: 'Greeting Cards', icon: <BookOpen size={18} strokeWidth={1.8} />, screen: 'greetingcards', children: ['Birthday Cards', 'Thank You Cards', 'Wedding Invitations', 'Personalised Cards'] },
    { label: 'Stationery', icon: <Store size={18} strokeWidth={1.8} />, screen: 'plp', children: STATIONERY_CATEGORIES.map(category => category.label) },
    { label: 'Office Supplies', icon: <Package size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Desk Accessories', 'Files & Folders', 'Labels', 'Adhesives', 'Envelopes', 'Staplers & Punches'] },
    { label: 'Office Furniture & Storage', icon: <Home size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Desks', 'Chairs', 'Shelving', 'Storage Boxes', 'Desk Accessories', 'Filing'] },
    { label: 'Printers & Paper', icon: <Printer size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Printers', 'Ink & Toner', 'Copy Paper', 'Photo Paper', 'Labels', 'Card'] },
    { label: 'Electricals & Technology', icon: <Package size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Cables', 'Chargers', 'Headphones', 'Keyboards', 'Mouse & Mats', 'Tech Accessories'] },
    { label: 'Home and Garden', icon: <Home size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Storage', 'Lighting', 'Cleaning', 'Outdoor Living', 'Decor', 'Kitchen Essentials'] },
    { label: 'Hobbies & Leisure', icon: <Heart size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Craft Kits', 'Jigsaws', 'Games', 'Adult Colouring', 'Journaling', 'Model Making'] },
    { label: 'Ryman Rewards Prices', icon: <RewardsIcon size={18} color={REWARDS_TEAL} />, screen: 'rewards' },
    { label: 'Gifting', icon: <Heart size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Gift Wrap', 'Gift Bags', 'Gift Sets', 'Pens', 'Desk Gifts', 'Occasion Gifts'] },
    { label: 'New In', icon: <Star size={18} strokeWidth={1.8} />, screen: 'plp', children: ['Latest Arrivals', 'Trending Now', 'Seasonal Launches', 'New Stationery'] },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '85%', maxWidth: 320,
            background: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column',
          }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 8px)',
            right: 14,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: CHARCOAL,
            zIndex: 2,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={22} />
        </button>

        {/* Sections */}
        {activeCategory ? (
          <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 0 10px' }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '0 20px 12px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: 15,
                color: CHARCOAL,
                textDecoration: 'underline',
              }}
            >
              Back to Categories
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '6px 20px 14px', borderBottom: `1px solid ${MID_GREY}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                <span style={{ color: CHARCOAL, display: 'flex', alignItems: 'center' }}>{activeCategory.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: CHARCOAL, lineHeight: 1.2 }}>{activeCategory.label}</span>
              </div>
              <button
                onClick={() => { onNavigate(activeCategory.screen); onClose() }}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: CHARCOAL, textDecoration: 'underline', whiteSpace: 'nowrap', padding: 0 }}
              >
                View All
              </button>
            </div>

            <div>
              {activeCategory.children.map(child => (
                <button
                  key={child}
                  onClick={() => { onNavigate(activeCategory.screen); onClose() }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 20px',
                    border: 'none',
                    borderBottom: `1px solid ${MID_GREY}`,
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    color: CHARCOAL,
                    lineHeight: 1.25,
                  }}
                >
                  {child}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 0 12px' }}>
            {sections.map(s => (
              <button key={s.label} onClick={() => { if (s.screen) { onNavigate(s.screen); onClose() } }}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, color: CHARCOAL }}>
                {s.label}
              </button>
            ))}
            <div style={{ height: 1, background: MID_GREY, margin: '6px 0' }} />
            {items.map(item => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.children?.length) {
                    setActiveCategory({
                      label: item.label,
                      icon: item.icon,
                      screen: item.screen,
                      children: item.children,
                    })
                    return
                  }
                  onNavigate(item.screen)
                  onClose()
                }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left', padding: '11px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, color: CHARCOAL }}
              >
                <span style={{ color: TEXT_GREY, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.children?.length ? <ChevronRight size={16} color="#8d8d8d" strokeWidth={2} /> : null}
              </button>
            ))}

            <div style={{ padding: '12px 20px 2px' }}>
              <button
                onClick={() => { onNavigate('storefinder'); onClose() }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  border: 'none',
                  padding: '17px 18px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  minHeight: 84,
                  borderRadius: 12,
                }}
              >
                <img src={storeImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.58) saturate(0.9)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(216,10,0,0.58) 0%, rgba(216,10,0,0.2) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <MapPin size={24} color="#fff" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>Find Your Local Store</div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 }}>250+ stores across the UK</div>
                  </div>
                </div>
                <ChevronRight size={18} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
              </button>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Home Screen ────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#fff', paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${TAB_BAR_HEIGHT}px)` }}>
      <SearchBar padding="10px 16px" />

      {/* Back to School Savings Promo */}
      <div style={{ margin: '0', overflow: 'hidden', position: 'relative', height: 182, background: '#1a1a1a' }}>
        <img src={schoolBannerImg} alt="Back to school" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.08) 74%, rgba(0,0,0,0) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '74%' }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 25, lineHeight: 1.08, marginBottom: 10 }}>
              Back to School<br />Savings
            </div>
            <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.4, marginBottom: 16 }}>
              Everything they need,<br />all in one place
            </div>
            <button
              onClick={() => onNavigate('plp')}
              style={{
                background: RED,
                color: '#fff',
                border: 'none',
                padding: '9px 18px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 0 }}>
        <button
          onClick={() => onNavigate('shop')}
          style={{
            border: 'none',
            background: 'linear-gradient(145deg, #e1f1fb 0%, #c9e3f7 58%, #b1d3ef 100%)',
            minHeight: 52,
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            borderRadius: 0,
            borderTop: `1px solid ${MID_GREY}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -8, right: -8, opacity: 0.28, transform: 'rotate(-8deg)' }}>
            <ShoppingBasket size={62} color="#ffffff" strokeWidth={1.8} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, textAlign: 'left', position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#262626', lineHeight: 1.15, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>
              Shop all
              <br />
              categories
            </div>
            <ChevronRight size={15} color={CHARCOAL} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          </div>
        </button>

        <button
          onClick={() => onNavigate('rewards')}
          style={{
            border: 'none',
            background: 'linear-gradient(145deg, #eef8f6 0%, #d6ebe7 58%, #bfded8 100%)',
            minHeight: 52,
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            cursor: 'pointer',
            borderRadius: 0,
            borderTop: `1px solid ${MID_GREY}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -12, right: -16, opacity: 0.24, transform: 'rotate(-14deg)' }}>
            <RewardsIcon size={68} color="#7aa19b" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, textAlign: 'left', minWidth: 0, position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#262626', lineHeight: 1.15, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>
              Explore
              <br />
              Ryman Rewards
            </div>
            <ChevronRight size={15} color={REWARDS_TEAL} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          </div>
        </button>
      </div>

      {/* Personalised Cards Promo */}
      <div onClick={() => onNavigate('greetingcards')} style={{ display: 'block', cursor: 'pointer', background: '#fff2f2' }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flex: 1, padding: '16px 0 16px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: RED, textTransform: 'uppercase', marginBottom: 6 }}>
              <img src={logoSmallImg} alt="Ryman" style={{ display: 'none', height: 12.6, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 800, lineHeight: 1, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>PERSONALISED CARDS</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: CHARCOAL, lineHeight: 1.15, paddingTop: 4, paddingBottom: 6, marginBottom: 6 }}>
              Collect In-Store<br />
              in <span style={{ fontSize: 26, lineHeight: 0.95 }}>60</span> minutes
            </div>
            <div style={{ background: RED, color: '#fff', display: 'inline-block', padding: '9px 18px', borderRadius: 4, fontSize: 13, fontWeight: 700 }}>Create a card</div>
          </div>
          <div style={{ width: 196, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={cardsBannerImg} alt="Cards" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* Print Shop Promo */}
      <div onClick={() => onNavigate('printshop')} style={{ position: 'relative', background: CHARCOAL, minHeight: 180, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ position: 'relative', zIndex: 2, padding: '36px 24px', width: '60%' }}>
          <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 900, margin: '0 0 6px', lineHeight: 1.1 }}>Print Shop</h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, margin: '0 0 16px' }}>Collect in-store in as little as 60 mins*</p>
          <div style={{ display: 'inline-block', background: '#fff', color: CHARCOAL, borderRadius: 4, padding: '9px 18px', fontSize: 13, fontWeight: 800 }}>Get Started</div>
        </div>
        {/* Poster image — behind */}
        <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=180&h=260&fit=crop&auto=format"
          alt="" style={{ position: 'absolute', right: 80, top: '50%', transform: 'translateY(-57%) rotate(-6deg)', width: 90, height: 124, objectFit: 'cover', borderRadius: 5, boxShadow: '0 6px 20px rgba(0,0,0,0.45)', zIndex: 1 }} />
        {/* Chart doc — front */}
        <div style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-43%) rotate(5deg)', width: 90, height: 124, background: '#fff', borderRadius: 3, boxShadow: '0 8px 22px rgba(0,0,0,0.5)', zIndex: 2, padding: '8px 7px', boxSizing: 'border-box' }}>
          <div style={{ height: 6, background: '#222', borderRadius: 1, marginBottom: 5, width: '65%' }} />
          {[100, 80].map((w, j) => (
            <div key={j} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 3, width: `${w}%` }} />
          ))}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 34, marginTop: 5, marginBottom: 5 }}>
            {[60, 85, 45, 100, 70, 55, 90].map((h, j) => (
              <div key={j} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: [RED, '#f5a623', '#4a90d9', GREEN, '#9b59b6', '#e67e22', RED][j] }} />
            ))}
          </div>
          {[90, 70].map((w, j) => (
            <div key={j} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 3, width: `${w}%` }} />
          ))}
        </div>
      </div>

      {/* Find Your Local Store */}
      <button data-no-radius="true" onClick={() => onNavigate('storefinder')} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', border: 'none', padding: '26px 24px', cursor: 'pointer', overflow: 'hidden', minHeight: 92 }}>
        <img src={storeImg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.58) saturate(0.9)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(216,10,0,0.58) 0%, rgba(216,10,0,0.2) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <MapPin size={28} color="#fff" />
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>Find Your Local Store</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>250+ stores across the UK</div>
          </div>
        </div>
        <ChevronRight size={20} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
      </button>
    </div>
  )
}

function StoreLocatorPin({ left, top, onClick, selected = false }: { left: string; top: string; onClick: () => void; selected?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        left,
        top,
        transform: 'translate(-50%, -100%)',
        width: 40,
        height: 48,
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',
        filter: selected ? 'drop-shadow(0 6px 14px rgba(216,10,0,0.3))' : 'drop-shadow(0 3px 8px rgba(0,0,0,0.18))',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 48,
          color: '#fff',
          fontSize: 20,
          fontWeight: 800,
          fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif',
          lineHeight: 1,
          background: RED,
          clipPath: 'path("M20 0C9 0 0 8.7 0 19.4C0 33.1 20 48 20 48C20 48 40 33.1 40 19.4C40 8.7 31 0 20 0Z")',
        }}
      >
        R
      </span>
    </button>
  )
}

function StoreFinderOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 120 }}>
      <button
        onClick={onClose}
        aria-label="Close store details"
        style={{ position: 'absolute', inset: 0, border: 'none', background: 'rgba(0,0,0,0.42)', cursor: 'pointer' }}
      />

      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 'calc(env(safe-area-inset-top, 0px) + 72px)',
          bottom: 0,
          width: '100%',
          background: LIGHT_GREY,
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -10px 28px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
            <div style={{ width: 72, height: 6, borderRadius: 999, background: '#111' }} />
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 16,
              right: 14,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: TEXT_GREY,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ height: '100%', overflowY: 'auto', padding: '30px 16px calc(env(safe-area-inset-bottom, 0px) + 28px)' }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: CHARCOAL, lineHeight: 1.05, margin: '0 0 18px' }}>
              Ilkeston
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
              <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, padding: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, marginBottom: 10 }}>Address</div>
                <div style={{ fontSize: 13, color: CHARCOAL, lineHeight: 1.45, marginBottom: 14 }}>
                  18 Albion Centre<br />
                  Ilkeston, DE7 8AG
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, marginBottom: 8 }}>Phone</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: CHARCOAL }}>
                  <Phone size={18} strokeWidth={2} />
                  <span>01156 713 778</span>
                </div>
              </div>

              <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, padding: 16 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, marginBottom: 10 }}>Opening hours</div>
                <div style={{ display: 'grid', gap: 6, fontSize: 13, color: CHARCOAL, lineHeight: 1.35 }}>
                  {[
                    ['Mon', '09:00 - 17:30'],
                    ['Tue', '09:00 - 17:30'],
                    ['Wed', '09:00 - 17:30'],
                    ['Thu', '09:00 - 17:30'],
                    ['Fri', '09:00 - 17:30'],
                    ['Sat', '09:00 - 17:30'],
                    ['Sun', '10:00 - 16:00'],
                  ].map(([day, hours]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <span style={{ color: TEXT_GREY }}>{day}:</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: CHARCOAL, marginBottom: 12 }}>Store Options</div>
              <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, padding: 14 }}>
                <div style={{ background: RED, color: '#fff', borderRadius: 4, padding: '14px 16px', textAlign: 'center', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
                  We are open
                </div>
                <div style={{ fontSize: 13, color: CHARCOAL, lineHeight: 1.45 }}>
                  At Ryman you can shop for stationery and office supplies, as well as print from USB/email, photocopy, comb, click, wire, and thermal binding services, laminate, DHL, Western Union, and scan to USB/email.
                </div>
              </div>
            </div>

            <button
              style={{
                width: '100%',
                background: CHARCOAL,
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '15px 16px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Navigation size={17} strokeWidth={2.2} />
              Get directions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StorePickupOverlay({
  onClose,
  onSelect,
  selectedStoreId,
}: {
  onClose: () => void
  onSelect: (storeId: string) => void
  selectedStoreId: string
}) {
  const [query, setQuery] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [activeStoreId, setActiveStoreId] = useState(selectedStoreId)

  const filteredStores = PICKUP_STORES.filter(store => {
    if (availableOnly && store.status !== 'in') return false
    if (!query.trim()) return true
    return store.name.toLowerCase().includes(query.trim().toLowerCase())
  })

  const activeStore = PICKUP_STORES.find(store => store.id === activeStoreId) ?? filteredStores[0] ?? PICKUP_STORES[0]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 140 }}>
      <button
        onClick={onClose}
        aria-label="Close store selector"
        style={{ position: 'absolute', inset: 0, border: 'none', background: 'rgba(0,0,0,0.42)', cursor: 'pointer' }}
      />

      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 'calc(env(safe-area-inset-top, 0px) + 72px)',
          bottom: 0,
          width: '100%',
          background: LIGHT_GREY,
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -10px 28px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
            <div style={{ width: 72, height: 6, borderRadius: 999, background: '#111' }} />
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 16,
              right: 14,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: TEXT_GREY,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ height: '100%', overflowY: 'auto', padding: '30px 16px calc(env(safe-area-inset-bottom, 0px) + 24px)' }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: CHARCOAL, lineHeight: 1.05, margin: '0 0 18px' }}>
              Select a Store
            </h2>

            <div
              style={{
                height: 224,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                background: 'radial-gradient(circle at 70% 18%, #4a5771 0%, #354257 44%, #293447 100%)',
                marginBottom: 12,
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 100%)', backgroundSize: '44px 44px', opacity: 0.35 }} />
              <div style={{ position: 'absolute', left: -8, top: 106, width: 260, height: 3, background: 'rgba(198,210,226,0.32)', transform: 'rotate(34deg)' }} />
              <div style={{ position: 'absolute', left: 96, top: 30, width: 280, height: 3, background: 'rgba(198,210,226,0.24)', transform: 'rotate(-28deg)' }} />
              <div style={{ position: 'absolute', left: 228, top: 0, width: 42, height: '100%', background: 'rgba(98,79,149,0.26)', transform: 'skewX(-12deg)' }} />
              <div style={{ position: 'absolute', left: 20, top: 28, color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 700 }}>WIMBLEDON</div>
              <div style={{ position: 'absolute', left: 110, top: 56, color: '#e3a86c', fontSize: 10.5, fontWeight: 700 }}>Wimbledon High School</div>
              <div style={{ position: 'absolute', left: 130, top: 116, color: '#f2a457', fontSize: 10.5, fontWeight: 700 }}>McDonald&apos;s</div>
              <div style={{ position: 'absolute', right: 18, top: 78, color: '#70db86', fontSize: 10.5, fontWeight: 700 }}>South Park Gardens</div>
              <div style={{ position: 'absolute', right: 26, top: 142, color: '#f889d5', fontSize: 10.5, fontWeight: 700 }}>New Wimbledon Theatre</div>
              <div style={{ position: 'absolute', left: 210, top: 132, color: '#f889d5', fontSize: 10.5, fontWeight: 700 }}>ODEON</div>

              <div style={{ position: 'absolute', left: 204, top: 58, width: 20, height: 20, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 12px rgba(0,0,0,0.18)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', border: '4px solid #0a66ff', boxSizing: 'border-box', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: -4, borderTop: '4px solid #ef4444', borderBottom: '4px solid #ef4444', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderRadius: '50%' }} />
                </div>
              </div>

              <div style={{ position: 'absolute', left: 194, top: 98, transform: 'translate(-50%, -100%)', width: 42, height: 50, filter: 'drop-shadow(0 6px 14px rgba(216,10,0,0.3))' }}>
                <span
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 42,
                    height: 50,
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 800,
                    fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif',
                    background: RED,
                    clipPath: 'path("M21 0C9.4 0 0 9.2 0 20.5C0 35 21 50 21 50C21 50 42 35 42 20.5C42 9.2 32.6 0 21 0Z")',
                  }}
                >
                  R
                </span>
              </div>

              <div style={{ position: 'absolute', left: 14, bottom: 12, color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 700 }}>Maps</div>
            </div>

            <button
              onClick={() => setAvailableOnly(value => !value)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'none', padding: '2px 0 14px', cursor: 'pointer', color: CHARCOAL }}
            >
              <span style={{ width: 18, height: 18, borderRadius: 4, border: availableOnly ? `2px solid ${GREEN}` : '2px solid #bcc4cd', background: availableOnly ? '#f7fcf8' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {availableOnly && <Check size={12} color={GREEN} strokeWidth={3} />}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Show only available stores</span>
            </button>

            <button
              onClick={() => {
                if (activeStore) onSelect(activeStore.id)
                onClose()
              }}
              style={{
                width: '100%',
                background: RED,
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '15px 16px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: 12,
              }}
            >
              Select store for pickup
            </button>

            <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: 4, boxShadow: CARD_SHADOW, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Search size={18} color="#9ca3af" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by town or postcode"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: CHARCOAL, background: 'transparent' }}
              />
            </div>

            <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, overflow: 'hidden' }}>
              {filteredStores.map((store, index) => {
                const selected = store.id === activeStoreId
                return (
                  <button
                    key={store.id}
                    onClick={() => setActiveStoreId(store.id)}
                    style={{
                      width: '100%',
                      border: 'none',
                      borderTop: index === 0 ? 'none' : `1px solid ${MID_GREY}`,
                      background: selected ? '#f7fcf8' : '#fff',
                      padding: '16px 14px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto auto',
                      gap: 14,
                      alignItems: 'center',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL, lineHeight: 1.2 }}>{store.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 110 }}>
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          background: store.status === 'in' ? GREEN : '#111',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {store.status === 'in'
                          ? <Check size={12} color="#fff" strokeWidth={3} />
                          : <span style={{ color: '#fff', fontSize: 13, fontWeight: 900, lineHeight: 1, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif', transform: 'translateY(-0.5px)' }}>i</span>}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: CHARCOAL }}>
                        {store.status === 'in' ? 'In-Stock' : 'Out-of-Stock'}
                      </span>
                    </div>
                    <div style={{ width: 112, fontSize: 13, color: CHARCOAL, lineHeight: 1.25 }}>
                      {store.collectBy ?? ''}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoreFinderScreen() {
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <div style={{ background: '#20336b', minHeight: '100%', paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 106px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 55% 62%, rgba(31,54,112,0.9) 0%, rgba(28,43,98,1) 58%, rgba(24,35,84,1) 100%)' }} />
        <div style={{ position: 'absolute', left: '16%', top: '10%', width: '48%', height: '76%', background: 'linear-gradient(180deg, #3e876d 0%, #2d715d 100%)', opacity: 0.95, clipPath: 'polygon(54% 0%, 68% 10%, 76% 21%, 71% 30%, 79% 40%, 72% 49%, 75% 58%, 69% 70%, 62% 79%, 48% 89%, 38% 100%, 24% 92%, 30% 77%, 22% 64%, 18% 50%, 10% 36%, 14% 24%, 26% 16%, 34% 8%)', transform: 'rotate(8deg)' }} />
        <div style={{ position: 'absolute', left: '3%', top: '38%', width: '20%', height: '28%', background: '#477d6a', opacity: 0.82, clipPath: 'polygon(35% 0%, 85% 14%, 100% 45%, 69% 100%, 18% 85%, 0% 41%)' }} />
        <div style={{ position: 'absolute', right: '-7%', bottom: '2%', width: '24%', height: '16%', background: '#4a866f', opacity: 0.84, clipPath: 'polygon(14% 16%, 60% 0%, 100% 22%, 93% 78%, 42% 100%, 0% 73%)' }} />
        <div style={{ position: 'absolute', left: '18%', top: '50%', width: '44%', height: 2, background: 'rgba(214,224,255,0.26)', transform: 'rotate(66deg)' }} />
        <div style={{ position: 'absolute', left: '36%', top: '60%', width: '26%', height: 2, background: 'rgba(214,224,255,0.26)', transform: 'rotate(24deg)' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '22px 16px 0' }}>
          <div style={{ color: '#fff', fontSize: 26, fontWeight: 900, lineHeight: 1.05, marginBottom: 14 }}>Store Finder</div>
          <div style={{ background: '#fff', borderRadius: 4, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 18px rgba(0,0,0,0.08)' }}>
            <Search size={18} color="#9ca3af" />
            <span style={{ fontSize: 14, color: '#9ca3af' }}>Search town, postcode or store</span>
          </div>
        </div>

        {STORE_MARKERS.map((marker, index) => (
          <StoreLocatorPin
            key={`${marker.left}-${marker.top}`}
            left={marker.left}
            top={marker.top}
            selected={index === 7}
            onClick={() => setDetailsOpen(true)}
          />
        ))}
      </div>

      {detailsOpen && <StoreFinderOverlay onClose={() => setDetailsOpen(false)} />}
    </div>
  )
}

// ── Greeting Cards Screen ──────────────────────────────────────────────────
const cardCategories = [
  { label: 'Birthday', img: birthdayCardImg },
  { label: 'Wedding', img: weddingCardImg },
  { label: 'Anniversary', img: anniversaryCardImg },
  { label: 'New Job', img: newJobCardImg },
  { label: 'Good Luck', img: goodLuckCardImg },
  { label: 'Sentiments', img: sentimentsCardImg },
]
const cardJourneySlides = [
  {
    step: 'Step 1',
    title: 'Choose a card',
    body: 'Choose from hundreds of designs, then pick the style that fits the moment.',
    badge: 'Birthday, wedding or thank you',
    accent: '#ffe8dd',
    visual: 'birthday',
  },
  {
    step: 'Step 2',
    title: 'Personalise it',
    body: 'Many of our cards can be personalised with names, photos and your own message.',
    badge: 'Add photos and a personal message',
    accent: '#fff1d9',
    visual: 'photo',
  },
  {
    step: 'Step 3',
    title: 'Collect in store or order online',
    body: 'Choose fast collection or send it direct. Collect in-store in as little as 60 mins.',
    badge: 'Ready in as little as 60 mins*',
    accent: '#ffe1d5',
    visual: 'delivery',
  },
] as const

function CardJourneyVisual({
  visual,
}: {
  visual: 'birthday' | 'photo' | 'delivery'
}) {
  if (visual === 'birthday') {
    return (
      <div
        style={{
          width: 124,
          height: 136,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', right: 10, top: 18, width: 58, height: 102, borderRadius: 16, background: '#173f7c', transform: 'rotate(8deg)', boxShadow: '0 10px 18px rgba(66,15,8,0.14)' }} />
        <div style={{ position: 'absolute', right: 16, top: 8, width: 56, height: 98, background: 'repeating-linear-gradient(180deg, #e43a2f 0 4px, #fff 4px 8px)', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 14% 100%)', opacity: 0.95 }} />
        <div style={{ position: 'absolute', left: 8, top: 18, width: 74, height: 102, borderRadius: 10, background: 'repeating-linear-gradient(90deg, #f4ead8 0 9px, #e7f0f7 9px 12px)', boxShadow: '0 10px 18px rgba(0,0,0,0.12)', padding: '10px 8px', boxSizing: 'border-box' }}>
          <div style={{ color: '#d8372b', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', marginBottom: 4 }}>COME HAVE A</div>
          <div style={{ color: '#d8372b', fontSize: 20, fontWeight: 900, lineHeight: 0.9, marginBottom: 5 }}>BALL!</div>
          <div style={{ color: '#173f7c', fontSize: 8, fontWeight: 700, lineHeight: 1.15 }}>James is turning 7</div>
          <div style={{ position: 'absolute', left: 12, bottom: 12, width: 38, height: 16, borderTop: '2px solid #173f7c', borderBottom: '2px solid #173f7c' }} />
        </div>
      </div>
    )
  }

  if (visual === 'photo') {
    return (
      <div
        style={{
          width: 124,
          height: 136,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={weddingCardPlpImg}
          alt=""
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            width: 68,
            height: 110,
            borderRadius: 12,
            objectFit: 'contain',
            background: '#fff',
            transform: 'rotate(6deg)',
            boxShadow: '0 10px 18px rgba(66,15,8,0.12)',
          }}
        />
        <div style={{ position: 'absolute', left: 10, top: 18, width: 76, height: 102, borderRadius: 10, background: '#2f3559', boxShadow: '0 10px 18px rgba(0,0,0,0.14)', padding: '8px 8px 10px', boxSizing: 'border-box' }}>
          <div style={{ color: '#fff', fontSize: 8, fontStyle: 'italic', marginBottom: 8 }}>Haley is 30!</div>
          <div style={{ width: 42, height: 46, borderRadius: 8, background: 'linear-gradient(180deg, #d6dbe7 0%, #7f8faa 100%)', margin: '0 auto 8px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 8, top: 10, width: 26, height: 26, borderRadius: '50%', background: '#5b3a33' }} />
            <div style={{ position: 'absolute', left: 11, top: 18, width: 20, height: 14, borderRadius: '50%', background: '#e7b38d' }} />
            <div style={{ position: 'absolute', left: 6, top: 42, width: 30, height: 18, borderRadius: 12, background: '#fff' }} />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.84)', fontSize: 6.5, lineHeight: 1.3, textAlign: 'center' }}>Let&apos;s toast to another year</div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        width: 124,
        height: 136,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        src={bopisStoreImg}
        alt=""
        style={{
          position: 'absolute',
          right: -8,
          top: 22,
          width: 94,
          height: 126,
          objectFit: 'contain',
          transform: 'rotate(7deg)',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.12))',
        }}
      />
      <img
        src={bopisTimerImg}
        alt=""
        style={{
          position: 'absolute',
          left: 2,
          top: 2,
          width: 96,
          height: 124,
          objectFit: 'contain',
          zIndex: 2,
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.16))',
        }}
      />
    </div>
  )
}

function GreetingCardsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeCardJourney, setActiveCardJourney] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveCardJourney(current => (current + 1) % cardJourneySlides.length)
    }, 4200)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div style={{ background: '#fff', paddingBottom: 92 }}>
      <div style={{ background: LIGHT_GREY, padding: '16px 24px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, margin: 0, lineHeight: 1.1 }}>
          Personalised Cards<br /><span style={{ color: RED }}>In as little as 60 mins*</span>
        </h1>
      </div>

      <SearchBar placeholder="Search by design, theme, or category" padding="10px 16px" />

      <div style={{ padding: '0 16px 4px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            columnGap: 12,
            rowGap: 18,
            paddingBottom: 6,
          }}
        >
          {cardCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => onNavigate('cardsplp')}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'center',
                overflow: 'hidden',
                appearance: 'none',
              }}
            >
              <div
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginBottom: 8,
                  background: '#f7efe5',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  style={{ display: 'block', width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: CHARCOAL, lineHeight: 1.2 }}>
                {cat.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 16px 0' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: CARD_RADIUS,
            background: '#fff',
            minHeight: 154,
            border: CARD_BORDER,
            boxShadow: CARD_SHADOW,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 86% 16%, rgba(216,10,0,0.16) 0%, rgba(216,10,0,0.06) 24%, rgba(216,10,0,0) 42%),
                radial-gradient(circle at 100% 100%, rgba(216,10,0,0.1) 0%, rgba(216,10,0,0) 36%)
              `,
            }}
          />
          <div style={{ position: 'absolute', left: 16, right: 16, top: 16, display: 'flex', gap: 6, zIndex: 2 }}>
            {cardJourneySlides.map((_, index) => (
              <div key={index} style={{ flex: 1, height: 4, borderRadius: 999, background: '#ececec', overflow: 'hidden' }}>
                <div
                  style={{
                    width: index <= activeCardJourney ? '100%' : '0%',
                    height: '100%',
                    borderRadius: 999,
                    background: RED,
                    opacity: index < activeCardJourney ? 0.78 : 1,
                    transition: 'width 320ms ease',
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              width: `${cardJourneySlides.length * 100}%`,
              transform: `translateX(-${activeCardJourney * (100 / cardJourneySlides.length)}%)`,
              transition: 'transform 420ms ease',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {cardJourneySlides.map(slide => (
              <div
                key={slide.title}
                style={{
                  width: `${100 / cardJourneySlides.length}%`,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'stretch',
                  minHeight: 146,
                  padding: '30px 18px 6px',
                  boxSizing: 'border-box',
                  gap: 8,
                }}
              >
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <div>
                    <div style={{ color: RED, fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>
                      {slide.step}
                    </div>
                    <div style={{ color: CHARCOAL, fontSize: 21, fontWeight: 800, lineHeight: 1.04, marginBottom: 8 }}>
                      {slide.title}
                    </div>
                    <div style={{ color: TEXT_GREY, fontSize: 12.5, lineHeight: 1.35, maxWidth: 168 }}>
                      {slide.body}
                    </div>
                  </div>
                </div>

                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', paddingTop: 2 }}>
                  <CardJourneyVisual visual={slide.visual} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Print Shop Screen ──────────────────────────────────────────────────────
function PrintShopScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ background: '#fff', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: LIGHT_GREY, padding: '16px 24px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, margin: 0, lineHeight: 1.1 }}>
          Print Shop<br /><span style={{ color: RED }}>In as little as 60 mins*</span>
        </h1>
      </div>

      {/* Document Printing */}
      <div style={{ position: 'relative', background: CHARCOAL, minHeight: 220, overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px', width: '62%' }}>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.1 }}>Document<br />Printing</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '0 0 20px', lineHeight: 1.4 }}>Print your documents from A4 to A0</p>
          <button onClick={() => onNavigate('printyourdoc')} style={{ background: '#fff', color: CHARCOAL, border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Print documents</button>
        </div>
        {/* Plain text document — behind */}
        <div style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-57%) rotate(-6deg)', width: 100, height: 138, background: '#fff', borderRadius: 3, boxShadow: '0 6px 20px rgba(0,0,0,0.45)', zIndex: 1, padding: '10px 8px', boxSizing: 'border-box' }}>
          <div style={{ height: 8, background: '#222', borderRadius: 1, marginBottom: 8, width: '70%' }} />
          {[90, 100, 75, 100, 85, 60, 100, 80, 95, 70, 100, 65].map((w, j) => (
            <div key={j} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 4, width: `${w}%` }} />
          ))}
        </div>
        {/* Chart document — front */}
        <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-43%) rotate(5deg)', width: 100, height: 138, background: '#fff', borderRadius: 3, boxShadow: '0 8px 22px rgba(0,0,0,0.5)', zIndex: 2, padding: '10px 8px', boxSizing: 'border-box' }}>
          <div style={{ height: 7, background: '#222', borderRadius: 1, marginBottom: 6, width: '65%' }} />
          {[100, 80].map((w, j) => (
            <div key={j} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 3, width: `${w}%` }} />
          ))}
          {/* Bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 38, marginTop: 6, marginBottom: 6 }}>
            {[60, 85, 45, 100, 70, 55, 90].map((h, j) => (
              <div key={j} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: [RED, '#f5a623', '#4a90d9', GREEN, '#9b59b6', '#e67e22', RED][j] }} />
            ))}
          </div>
          {[90, 70, 55].map((w, j) => (
            <div key={j} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 3, width: `${w}%` }} />
          ))}
        </div>
      </div>

      {/* Poster Printing */}
      <div style={{ position: 'relative', background: RED, minHeight: 220, overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px', width: '62%' }}>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.1 }}>Poster<br />Printing</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '0 0 20px', lineHeight: 1.4 }}>Vibrant, high quality posters and signs</p>
          <button onClick={() => onNavigate('posterprinting')} style={{ background: '#fff', color: CHARCOAL, border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>Print posters</button>
        </div>
        {/* Two portrait posters */}
        <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=180&h=260&fit=crop&auto=format"
          alt="" style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%) rotate(-6deg)', width: 100, height: 150, objectFit: 'cover', borderRadius: 5, boxShadow: '0 6px 18px rgba(0,0,0,0.4)', zIndex: 1 }} />
        <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=180&h=260&fit=crop&auto=format"
          alt="" style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%) rotate(5deg)', width: 100, height: 155, objectFit: 'cover', borderRadius: 5, boxShadow: '0 8px 22px rgba(0,0,0,0.5)', zIndex: 2 }} />
      </div>

      {/* Shared how-it-works */}
      <div style={{ padding: '22px 24px 12px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, margin: '0 0 12px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>How it works</h3>
        <div style={{ display: 'flex' }}>
          {['Choose your options', 'Upload your files', 'Collect in-store today'].map((step, i) => (
            <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
              {i < 2 && <div style={{ position: 'absolute', top: 14, left: '50%', right: '-50%', height: 2, background: MID_GREY, zIndex: 0 }} />}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: RED, color: '#fff', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>{i + 1}</div>
              <span style={{ fontSize: 12, color: TEXT_GREY, textAlign: 'center', lineHeight: 1.25, maxWidth: 72 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 11, color: TEXT_GREY, padding: '12px 24px 4px', margin: 0 }}>*all print orders are subject to a £2.50 service charge</p>
    </div>
  )
}

function DeliveryOptionsCard({
  deliveryOptions,
  collectLabel,
  defaultTab = 'collect',
  defaultDeliveryOptionId,
}: {
  deliveryOptions: { id: string; title: string; copy: string }[]
  collectLabel: string
  defaultTab?: 'delivery' | 'collect'
  defaultDeliveryOptionId?: string
}) {
  const [deliveryTab, setDeliveryTab] = useState<'delivery' | 'collect'>(defaultTab)
  const [deliveryOption, setDeliveryOption] = useState(defaultDeliveryOptionId ?? deliveryOptions[0]?.id ?? '')
  const [storePickerOpen, setStorePickerOpen] = useState(false)
  const [selectedStoreId, setSelectedStoreId] = useState(PICKUP_STORES.find(store => store.status === 'in')?.id ?? PICKUP_STORES[0]?.id ?? '')
  const selectedStore = PICKUP_STORES.find(store => store.id === selectedStoreId)

  return (
    <>
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          position: 'relative',
          border: `1px solid #c7cdd6`,
          borderRadius: 10,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 4,
          background: GREEN,
          left: deliveryTab === 'delivery' ? 0 : 'auto',
          right: deliveryTab === 'collect' ? 0 : 'auto',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 1 }}>
        {(['delivery', 'collect'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setDeliveryTab(tab)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: tab === 'collect' ? '10px 16px 10px 28px' : '10px 16px',
              border: 'none',
              background: deliveryTab === tab ? '#fff' : '#f4f4f4',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 800,
              color: CHARCOAL,
              clipPath: tab === 'delivery' ? 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' : 'polygon(24px 0, 100% 0, 100% 100%, 0 100%)',
              marginRight: tab === 'delivery' ? -12 : 0,
              marginLeft: tab === 'collect' ? -12 : 0,
              position: 'relative',
              zIndex: deliveryTab === tab ? 2 : 1,
            }}
          >
            {tab === 'delivery' ? <Truck size={20} strokeWidth={1.9} /> : <ClickAndCollectIcon />}
            <span style={{ fontSize: 14, fontWeight: 800 }}>{tab === 'delivery' ? 'Delivery' : 'Collect'}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 14px 16px', position: 'relative', zIndex: 1 }}>
        {deliveryTab === 'delivery' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {deliveryOptions.map(option => {
              const selected = deliveryOption === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => setDeliveryOption(option.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: selected ? 'none' : `2px solid #c8ced6`,
                      background: selected ? GREEN : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {selected && <Check size={11} color="#fff" strokeWidth={3} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: CHARCOAL, lineHeight: 1.25, marginBottom: 3 }}>{option.title}</div>
                    <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.45 }}>{option.copy}</div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, minWidth: 0, alignItems: 'center' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #c8ced6', background: '#fff', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: CHARCOAL, lineHeight: 1.25 }}>{collectLabel}</div>
                {selectedStore?.status === 'in' && (
                  <div style={{ fontSize: 12, color: TEXT_GREY, marginTop: 2, lineHeight: 1.35 }}>
                    {selectedStore.name} • {selectedStore.collectBy}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setStorePickerOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#f3f3f3',
                border: 'none',
                borderRadius: 10,
                padding: '13px 12px',
                fontSize: 12.5,
                fontWeight: 600,
                color: RED,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <MapPin size={13} color={RED} />
              <span style={{ textDecoration: 'underline' }}>Select your store</span>
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
    {storePickerOpen && (
      <StorePickupOverlay
        selectedStoreId={selectedStoreId}
        onSelect={storeId => setSelectedStoreId(storeId)}
        onClose={() => setStorePickerOpen(false)}
      />
    )}
    </>
  )
}

function OptionSelectorGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: string[]
  selected: string
  onSelect: (option: string) => void
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, margin: '0 0 10px' }}>{label}</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {options.map(option => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            style={{
              flex: options.length <= 3 ? 1 : undefined,
              minWidth: options.length <= 3 ? 0 : 'calc(20% - 7px)',
              padding: '10px 12px',
              border: `2px solid ${selected === option ? RED : MID_GREY}`,
              borderRadius: 8,
              background: selected === option ? '#fff2f2' : '#fff',
              fontSize: 13,
              fontWeight: 700,
              color: selected === option ? RED : CHARCOAL,
              cursor: 'pointer',
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function PrintServiceScreen({
  title,
  description,
  collectLabel,
  ctaLabel,
  art,
  configurator,
  deliveryOptions,
  defaultDeliveryTab,
  defaultDeliveryOptionId,
  uploadCopy,
}: {
  title: string
  description: string
  collectLabel: string
  ctaLabel: string
  art: React.ReactNode
  configurator?: React.ReactNode
  deliveryOptions: { id: string; title: string; copy: string }[]
  defaultDeliveryTab?: 'delivery' | 'collect'
  defaultDeliveryOptionId?: string
  uploadCopy?: React.ReactNode
}) {
  return (
    <div style={{ background: '#fff', paddingBottom: 96 }}>
      <div style={{ background: LIGHT_GREY, padding: '16px 24px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, margin: 0, lineHeight: 1.1 }}>
          {title}<br /><span style={{ color: RED }}>in as little as 60 mins*</span>
        </h1>
      </div>

      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, padding: 16, display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: CHARCOAL, marginBottom: 8 }}>{title}</div>
            <p style={{ margin: 0, fontSize: 13, color: TEXT_GREY, lineHeight: 1.5 }}>{description}</p>
          </div>
          <div style={{ width: 120, height: 140, flexShrink: 0, position: 'relative' }}>
            {art}
          </div>
        </div>

        {configurator && (
          <div style={{ paddingTop: 2, marginBottom: 18 }}>
            {configurator}
          </div>
        )}

        <DeliveryOptionsCard
          deliveryOptions={deliveryOptions}
          collectLabel={collectLabel}
          defaultTab={defaultDeliveryTab}
          defaultDeliveryOptionId={defaultDeliveryOptionId}
        />

        <button style={{ width: '100%', background: GREEN, color: '#fff', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{ctaLabel}</button>
        {uploadCopy && <div style={{ marginTop: 18 }}>{uploadCopy}</div>}
      </div>
    </div>
  )
}

// ── Print Detail Screens ──────────────────────────────────────────────────
const printUploadGuidance = (
  <div style={{ display: 'grid', gap: 20, fontSize: 13, color: CHARCOAL, lineHeight: 1.42 }}>
    <p style={{ margin: 0 }}>
      Whether you're decorating your student space, printing patterns for your next sewing project, or creating impactful visuals for a presentation or event, our poster printing service is the perfect solution. With high-quality finishes and same-day collection available, bringing your ideas to life has never been easier. Simply choose the paper type and size required, then upload your poster(s). Choose delivery to home, or collect in store same-day.
    </p>
    <div>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>How pricing works:</div>
      <div>-All orders are subject to a £2.50 standard fee.</div>
      <div>-Guide Price per print is shown within product images.</div>
      <div>-The final price will be shown in the basket after uploading your poster(s).</div>
    </div>
    <p style={{ margin: 0 }}>
      Use the quantity picker to pick the number of copies you want, if you need multiple posters with the same options, you can upload those files in one order and they will be printed together. If you have multiple sizes/print option requirements, then simply add multiple orders to your basket.
    </p>
    <p style={{ margin: 0 }}>
      We recommend converting your file to PDF format as it offers the highest level of compatibility between various design programs and our system.
    </p>
    <p style={{ margin: 0 }}>
      Please make sure your file is print-ready and sized to the option you have selected. Using a file which is smaller than the selected size will affect the print resolution.
    </p>
    <p style={{ margin: 0 }}>
      Need help? View our Poster Printing Guide
    </p>
  </div>
)

function PrintYourDocScreen() {
  const [selectedSize, setSelectedSize] = useState('A4')
  const [selectedColour, setSelectedColour] = useState('Colour')
  const [selectedFinish, setSelectedFinish] = useState('Single-sided')

  return (
    <PrintServiceScreen
      title="Document Printing"
      description="Ideal for forms, reports, presentations and everyday print jobs from A4 to A0, ready for fast collection or home delivery."
      collectLabel="FREE Click & Collect TODAY *"
      ctaLabel="File Upload"
      deliveryOptions={[
        {
          id: 'standard',
          title: 'Home Delivery by Monday, 27th July',
          copy: 'Free Standard Delivery on orders over £50 with code FREEDELIVERY50 otherwise £4.95',
        },
      ]}
      defaultDeliveryTab="collect"
      defaultDeliveryOptionId="standard"
      uploadCopy={printUploadGuidance}
      configurator={
        <>
          <OptionSelectorGroup
            label="Paper size"
            options={['A4', 'A3', 'A2', 'A1', 'A0']}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
          <OptionSelectorGroup
            label="Print type"
            options={['Colour', 'Black & White']}
            selected={selectedColour}
            onSelect={setSelectedColour}
          />
          <OptionSelectorGroup
            label="Sides"
            options={['Single-sided', 'Double-sided']}
            selected={selectedFinish}
            onSelect={setSelectedFinish}
          />
        </>
      }
      art={
        <>
          <div style={{ position: 'absolute', right: 30, top: 10, width: 78, height: 110, background: '#fff', borderRadius: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.2)', zIndex: 1, padding: '10px 8px', boxSizing: 'border-box' }}>
            <div style={{ height: 7, background: '#222', borderRadius: 1, marginBottom: 7, width: '68%' }} />
            {[95, 100, 82, 97, 72, 92, 66, 100].map((w, i) => (
              <div key={i} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 4, width: `${w}%` }} />
            ))}
          </div>
          <div style={{ position: 'absolute', right: 0, top: 18, width: 82, height: 114, background: '#fff', borderRadius: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.22)', zIndex: 2, padding: '9px 7px', boxSizing: 'border-box', transform: 'rotate(5deg)' }}>
            <div style={{ height: 6, background: '#222', borderRadius: 1, marginBottom: 5, width: '64%' }} />
            {[100, 80].map((w, i) => (
              <div key={i} style={{ height: 3, background: '#ccc', borderRadius: 1, marginBottom: 3, width: `${w}%` }} />
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 32, marginTop: 5, marginBottom: 5 }}>
              {[60, 85, 45, 100, 70, 55, 90].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0', background: [RED, '#f5a623', '#4a90d9', GREEN, '#9b59b6', '#e67e22', RED][i] }} />
              ))}
            </div>
          </div>
        </>
      }
    />
  )
}

function PosterPrintingScreen() {
  const [selectedSize, setSelectedSize] = useState('A2')
  const [selectedFinish, setSelectedFinish] = useState('Matt')
  const [selectedOrientation, setSelectedOrientation] = useState('Portrait')

  return (
    <PrintServiceScreen
      title="Poster Printing"
      description="Create standout posters, signage and large-format prints for events, retail displays and presentations with vibrant colour output."
      collectLabel="FREE Click & Collect TODAY *"
      ctaLabel="File Upload"
      deliveryOptions={[
        {
          id: 'standard',
          title: 'Home Delivery by Monday, 27th July',
          copy: 'Standard home delivery is available on completed poster orders from £4.95, subject to size and finishing.',
        },
      ]}
      defaultDeliveryTab="collect"
      defaultDeliveryOptionId="standard"
      uploadCopy={printUploadGuidance}
      configurator={
        <>
          <OptionSelectorGroup
            label="Poster size"
            options={['A4', 'A3', 'A2', 'A1', 'A0']}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
          <OptionSelectorGroup
            label="Finish"
            options={['Matt', 'Gloss']}
            selected={selectedFinish}
            onSelect={setSelectedFinish}
          />
          <OptionSelectorGroup
            label="Orientation"
            options={['Portrait', 'Landscape']}
            selected={selectedOrientation}
            onSelect={setSelectedOrientation}
          />
        </>
      }
      art={
        <>
          <img src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=180&h=260&fit=crop&auto=format" alt="" style={{ position: 'absolute', right: 34, top: 8, width: 78, height: 118, objectFit: 'cover', borderRadius: 5, boxShadow: '0 6px 18px rgba(0,0,0,0.22)', zIndex: 1 }} />
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=180&h=260&fit=crop&auto=format" alt="" style={{ position: 'absolute', right: 2, top: 20, width: 82, height: 122, objectFit: 'cover', borderRadius: 5, boxShadow: '0 8px 22px rgba(0,0,0,0.24)', zIndex: 2, transform: 'rotate(5deg)' }} />
        </>
      }
    />
  )
}

// ── Shop (Category Landing) Screen ─────────────────────────────────────────
const shopCategories = SHOP_CATEGORIES

function ShopScreen({
  onNavigate,
  onOpenCategory,
}: {
  onNavigate: (s: Screen) => void
  onOpenCategory: (title: string, heroImg: string) => void
}) {
  return (
    <div style={{ background: '#fff', paddingBottom: 92 }}>
      <div style={{ background: LIGHT_GREY, padding: '16px 24px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, margin: 0, lineHeight: 1.1 }}>
          Shop Ryman<br /><span style={{ color: RED }}>For School, Work & Home</span>
        </h1>
      </div>

      {/* Promo Banner */}
      <div style={{ margin: '0 0 12px', overflow: 'hidden', position: 'relative', height: 182, background: '#1a1a1a' }}>
        <img src={schoolBannerImg} alt="Back to school" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 42%, rgba(0,0,0,0.08) 74%, rgba(0,0,0,0) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '20px 22px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '74%' }}>
            <div style={{ color: '#fff', fontWeight: 900, fontSize: 25, lineHeight: 1.08, marginBottom: 10 }}>
              Back to School<br />Savings
            </div>
            <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.4, marginBottom: 16 }}>
              Everything they need,<br />all in one place
            </div>
            <button
              onClick={() => onNavigate('plp')}
              style={{
                background: RED,
                color: '#fff',
                border: 'none',
                padding: '9px 18px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <SearchBar padding="6px 16px 8px" />

      {/* Category Grid */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: CHARCOAL, margin: '0 0 14px' }}>Shop by category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {shopCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => onOpenCategory(cat.label, cat.img)}
              style={{
                border: CARD_BORDER,
                background: '#fff',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                overflow: 'hidden',
                borderRadius: CARD_RADIUS,
                boxShadow: CARD_SHADOW,
              }}
            >
              <div style={{ height: 76, overflow: 'hidden' }}>
                <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '7px 8px 5px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 500, color: CHARCOAL, lineHeight: 1.2 }}>{cat.label}</span>
                <ChevronRight size={16} strokeWidth={2.1} color={CHARCOAL} />
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 26 }}>
          <button
            onClick={() => onNavigate('plp')}
            style={{
              width: '100%',
              border: CARD_BORDER,
              background: '#fff',
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'stretch',
              cursor: 'pointer',
              borderRadius: CARD_RADIUS,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div style={{ width: 84, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <Tag size={28} strokeWidth={2.1} />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 16px 16px 14px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: CHARCOAL, marginBottom: 3 }}>Special Offers</div>
                <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.35 }}>Great deals, every day</div>
              </div>
              <ChevronRight size={20} strokeWidth={2.1} color={RED} />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

function CategoryLandingScreen({
  title,
  heroImg,
  onNavigate,
}: {
  title: string
  heroImg: string
  onNavigate: (s: Screen) => void
}) {
  return (
    <div style={{ background: '#fff', paddingBottom: 92 }}>
      <div style={{ background: LIGHT_GREY, padding: '16px 24px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, margin: 0, lineHeight: 1.1 }}>
          {title}
        </h1>
      </div>

      <div style={{ margin: 0, overflow: 'hidden', position: 'relative', height: 91, background: '#1a1a1a' }}>
        <img src={heroImg} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <SearchBar padding="10px 16px" />

      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {STATIONERY_CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => onNavigate('plp')}
              style={{
                border: CARD_BORDER,
                background: '#fff',
                cursor: 'pointer',
                padding: 0,
                textAlign: 'left',
                overflow: 'hidden',
                borderRadius: CARD_RADIUS,
                boxShadow: CARD_SHADOW,
              }}
            >
              <div style={{ height: 76, overflow: 'hidden' }}>
                <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '7px 8px 5px' }}>
                <span style={{ fontSize: 11.5, fontWeight: 500, color: CHARCOAL, lineHeight: 1.2 }}>{cat.label}</span>
                <ChevronRight size={16} strokeWidth={2.1} color={CHARCOAL} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PLP Screen ─────────────────────────────────────────────────────────────
const products: ProductCardItem[] = [
  { id: 104, name: 'Pastel Desk Stationery Gift Set', price: 12.99, wasPrice: 16.49, img: stationeryGiftsImg, promo: '3 for 2' },
  { id: 101, name: 'Pukka Jotta Notebook A4', price: 6.99, img: premiumStationeryImg, promo: 'New In' },
  { id: 102, name: 'Zebra Mildliner Ballpoint Pen Set', price: 9.99, img: ballpointPensImg },
  { id: 103, name: 'Mesh Pencil Case Assorted', price: 4.99, img: pencilCasesImg },
  { id: 105, name: 'Pukka Pad Pastel Jotter', price: 5.49, img: essentialStationeryImg },
  { id: 1, name: 'Ryman A5 Soft Cover Lined Notebook', price: 5.99, from: true, img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&auto=format', promo: 'Buy One Get One Free' },
  { id: 2, name: 'Pukka Jotta Notepad A4 80gsm Wirebound', price: 2.75, img: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop&auto=format' },
  { id: 3, name: 'Desktop Easel Dry Erase and Magnetic', price: 91.99, img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop&auto=format' },
  { id: 4, name: 'Frisk Watercolour Artboards Pack of 4', price: 3.00, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format' },
  { id: 5, name: 'Frisk Acrylic Artboards Pack of 4', price: 4.00, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&auto=format' },
  { id: 6, name: 'Magic and Sparkle Weekly Planner A5', price: 8.99, img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=400&fit=crop&auto=format', promo: '20% Off' },
]

const greetingCardProducts: ProductCardItem[] = [
  { id: 301, name: 'Personalised Birthday Card', price: 2.99, img: greetingCardOneImg },
  { id: 302, name: 'Personalised Wedding Card', price: 3.49, img: weddingCardPlpImg },
  { id: 303, name: 'Personalised Anniversary Card', price: 2.99, img: anniversaryCardPlpImg },
  { id: 304, name: 'Personalised New Job Card', price: 2.99, img: newJobCardPlpImg },
  { id: 305, name: 'Personalised Good Luck Card', price: 2.99, img: goodLuckCardPlpImg },
  { id: 306, name: 'Personalised Sentiments Card', price: 3.49, img: sentimentsCardPlpImg },
]

function QuantityStepper({
  value,
  onDecrement,
  onIncrement,
  compact = false,
}: {
  value: number
  onDecrement: () => void
  onIncrement: () => void
  compact?: boolean
}) {
  const height = compact ? 34 : 48
  const controlWidth = compact ? 30 : 40
  const valueWidth = compact ? 30 : 36
  const iconSize = compact ? 15 : 18

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #c2c9d1',
        borderRadius: 8,
        overflow: 'hidden',
        background: '#fff',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: controlWidth,
          height,
          borderRight: '1px solid #c2c9d1',
          background: '#f3f3f3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onDecrement}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: CHARCOAL,
            padding: 0,
            margin: 0,
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          <Minus size={iconSize} strokeWidth={2.2} />
        </button>
      </div>
      <span
        style={{
          width: valueWidth,
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          borderRadius: 0,
          background: '#fff',
          fontSize: compact ? 13 : 16,
          fontWeight: 500,
          color: CHARCOAL,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <div
        style={{
          width: controlWidth,
          height,
          borderLeft: '1px solid #c2c9d1',
          background: '#f3f3f3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={onIncrement}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: CHARCOAL,
            padding: 0,
            margin: 0,
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          <Plus size={iconSize + 1} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  )
}

function PLPScreen({
  onNavigate,
  title = 'Stationery',
  items = products,
  productTarget = 'pdp',
}: {
  onNavigate: (s: Screen) => void
  title?: string
  items?: ProductCardItem[]
  productTarget?: Screen
}) {
  return (
    <div style={{ background: LIGHT_GREY, paddingBottom: 80 }}>
      <div style={{ background: LIGHT_GREY, padding: '16px 24px 12px', borderBottom: `1px solid ${MID_GREY}` }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: CHARCOAL, lineHeight: 1.1, margin: 0 }}>{title}</h1>
      </div>

      {/* Filter bar */}
      <div style={{ background: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${MID_GREY}` }}>
        <span style={{ fontSize: 13, color: TEXT_GREY, fontWeight: 600 }}>{items.length} products</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: LIGHT_GREY, border: `1px solid ${MID_GREY}`, borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: CHARCOAL }}>
            <SlidersHorizontal size={14} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: LIGHT_GREY, border: `1px solid ${MID_GREY}`, borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: CHARCOAL }}>
            Sort <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12 }}>
        {items.map(p => (
          <div key={p.id} style={{ background: '#fff', borderRadius: CARD_RADIUS, border: CARD_BORDER, overflow: 'hidden', boxShadow: CARD_SHADOW, display: 'flex', flexDirection: 'column' }}>
            <button onClick={() => onNavigate(productTarget)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'block', position: 'relative' }}>
              <div style={{ aspectRatio: '1', overflow: 'hidden', position: 'relative' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {p.promo && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(216, 10, 0, 0.84)',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 800,
                      textAlign: 'center',
                      padding: '5px 8px',
                      lineHeight: 1.2,
                    }}
                  >
                    {p.promo}
                  </div>
                )}
              </div>
            </button>
            <div style={{ padding: '10px 10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => onNavigate(productTarget)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}>
                <p style={{ fontSize: 12, color: CHARCOAL, margin: '0 0 4px', lineHeight: 1.3, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif', fontWeight: 400 }}>{p.name}</p>
              </button>
              <div style={{ marginTop: 'auto', marginBottom: 4 }}>
                {p.wasPrice && (
                  <div style={{ fontSize: 11, color: TEXT_GREY, marginBottom: 1, lineHeight: 1.2 }}>
                    Was <span style={{ textDecoration: 'line-through' }}>£{p.wasPrice.toFixed(2)}</span> Save £{(p.wasPrice - p.price).toFixed(2)}
                  </div>
                )}
                {p.from && <span style={{ fontSize: 11, color: TEXT_GREY }}>From </span>}
                <span style={{ fontSize: 19, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{p.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GreetingCardsPLPScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return <PLPScreen onNavigate={onNavigate} title="Greeting Cards" items={greetingCardProducts} productTarget="cardpdp" />
}

function BasketScreen({
  items,
  onRemove,
  useRewardsPoints,
  onToggleRewardsPoints,
  onCheckout,
}: {
  items: BasketItem[]
  onRemove: (id: number) => void
  useRewardsPoints: boolean
  onToggleRewardsPoints: () => void
  onCheckout: () => void
}) {
  const pointsAvailable = 325
  const rewardsValue = pointsAvailable / 100
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = Math.max(0, subtotal - (useRewardsPoints ? rewardsValue : 0))
  const pointsEarned = Math.round(subtotal)

  return (
    <div style={{ background: LIGHT_GREY, minHeight: '100%', padding: '18px 16px calc(env(safe-area-inset-bottom, 0px) + 88px)' }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: '#000', lineHeight: 1.02, margin: '0 0 16px' }}>Basket</h1>

      {items.length ? (
        <>
          <div
            style={{
              background: '#fff',
              border: CARD_BORDER,
              borderRadius: CARD_RADIUS,
              boxShadow: CARD_SHADOW,
              overflow: 'hidden',
              marginBottom: 16,
            }}
          >
            {items.map((item, index) => (
              <div key={item.id}>
                <div
                  style={{
                    padding: 14,
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ width: 96, height: 96, borderRadius: 10, overflow: 'hidden', background: LIGHT_GREY, flexShrink: 0 }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, lineHeight: 1.25, marginBottom: 8, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.45, marginBottom: 10 }}>
                      <div>Price: £{item.price.toFixed(2)}</div>
                      <div>Quantity: {item.qty}</div>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      style={{ border: 'none', background: 'none', padding: 0, color: TEXT_GREY, fontSize: 12, fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {index < items.length - 1 && <div style={{ height: 1, background: MID_GREY, margin: '0 14px' }} />}
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              border: CARD_BORDER,
              borderRadius: CARD_RADIUS,
              boxShadow: CARD_SHADOW,
              padding: '16px 14px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <RewardsIcon size={36} color={REWARDS_TEAL} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: CHARCOAL, lineHeight: 1.2, marginBottom: 4 }}>
                  Use Ryman Reward Points
                </div>
                <div style={{ fontSize: 13, color: CHARCOAL, lineHeight: 1.35, marginBottom: 6 }}>
                  {pointsAvailable} points available • worth £{rewardsValue.toFixed(2)}
                </div>
                <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.35 }}>
                  Earn {pointsEarned} points with this order
                </div>
              </div>

              <button
                onClick={onToggleRewardsPoints}
                aria-pressed={useRewardsPoints}
                style={{
                  width: 42,
                  height: 24,
                  borderRadius: 999,
                  border: `1px solid ${useRewardsPoints ? REWARDS_TEAL : '#d6dbe1'}`,
                  background: useRewardsPoints ? REWARDS_TEAL : '#eef1f4',
                  padding: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: useRewardsPoints ? 'flex-end' : 'flex-start',
                  transition: 'all 0.18s ease',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.14)',
                  }}
                />
              </button>
            </div>

            <div style={{ height: 1, background: MID_GREY, margin: '0 0 14px' }} />

            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 13, color: TEXT_GREY }}>Items total</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{subtotal.toFixed(2)}</span>
              </div>
              {useRewardsPoints && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 13, color: TEXT_GREY }}>Reward points</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: REWARDS_TEAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>-£{rewardsValue.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 13, color: TEXT_GREY }}>Delivery</span>
                <span style={{ fontSize: 13, color: TEXT_GREY }}>Calculated at checkout</span>
              </div>
              <div style={{ height: 1, background: MID_GREY }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: CHARCOAL, lineHeight: 1.1 }}>Total</span>
                <span style={{ fontSize: 28, fontWeight: 900, color: CHARCOAL, lineHeight: 1, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              style={{
                width: '100%',
                background: GREEN,
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '15px 16px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, padding: '22px 18px' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: CHARCOAL, marginBottom: 6 }}>Your basket is empty</div>
          <div style={{ fontSize: 13, color: TEXT_GREY, lineHeight: 1.5 }}>Add products from the shop, cards or print journeys to continue the prototype flow.</div>
        </div>
      )}
    </div>
  )
}

function CheckoutOverlay({
  items,
  useRewardsPoints,
  onClose,
}: {
  items: BasketItem[]
  useRewardsPoints: boolean
  onClose: () => void
}) {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'collect'>('delivery')
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'nextday'>('standard')
  const [paymentOption, setPaymentOption] = useState<'applepay' | 'card'>('card')
  const [promoOpen, setPromoOpen] = useState(false)
  const [sameAsDelivery, setSameAsDelivery] = useState(true)
  const [storePickerOpen, setStorePickerOpen] = useState(false)
  const [selectedStoreId, setSelectedStoreId] = useState('wimbledon')

  const pointsAvailable = 325
  const rewardsValue = pointsAvailable / 100
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryPrice = deliveryMethod === 'collect' ? 0 : deliveryOption === 'nextday' ? 6.95 : 4.95
  const total = Math.max(0, subtotal + deliveryPrice - (useRewardsPoints ? rewardsValue : 0))
  const selectedStore = PICKUP_STORES.find(store => store.id === selectedStoreId) ?? PICKUP_STORES[0]

  const radio = (selected: boolean) => (
    <span
      style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: selected ? `1.5px solid ${GREEN}` : '1.5px solid #c5ccd4',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: '#fff',
        boxShadow: selected ? '0 2px 6px rgba(63,161,79,0.12)' : 'none',
      }}
    >
      {selected && <Check size={13} color={GREEN} strokeWidth={3} />}
    </span>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 120 }}>
      <button
        onClick={onClose}
        aria-label="Close checkout"
        style={{ position: 'absolute', inset: 0, border: 'none', background: 'rgba(0,0,0,0.46)', cursor: 'pointer' }}
      />

      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: 'calc(env(safe-area-inset-top, 0px) + 72px)',
          bottom: 0,
          width: '100%',
          background: LIGHT_GREY,
          borderRadius: '28px 28px 0 0',
          boxShadow: '0 -10px 28px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
            <div style={{ width: 72, height: 6, borderRadius: 999, background: '#111' }} />
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 16,
              right: 14,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: TEXT_GREY,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div style={{ height: '100%', overflowY: 'auto', padding: '28px 16px calc(env(safe-area-inset-bottom, 0px) + 28px)' }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: CHARCOAL, lineHeight: 1.05, margin: '0 0 18px' }}>
              Checkout
            </h2>

            <div
              style={{
                position: 'relative',
                border: '1px solid #c7cdd6',
                borderRadius: 10,
                overflow: 'hidden',
                background: '#fff',
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: GREEN,
                  left: deliveryMethod === 'delivery' ? 0 : 'auto',
                  right: deliveryMethod === 'collect' ? 0 : 'auto',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', zIndex: 1 }}>
                {(['delivery', 'collect'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => setDeliveryMethod(method)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: method === 'collect' ? '10px 16px 10px 28px' : '10px 16px',
                      border: 'none',
                      background: deliveryMethod === method ? '#fff' : '#f4f4f4',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 800,
                      color: CHARCOAL,
                      clipPath: method === 'delivery' ? 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 0 100%)' : 'polygon(24px 0, 100% 0, 100% 100%, 0 100%)',
                      marginRight: method === 'delivery' ? -12 : 0,
                      marginLeft: method === 'collect' ? -12 : 0,
                      position: 'relative',
                      zIndex: deliveryMethod === method ? 2 : 1,
                    }}
                  >
                    {method === 'delivery' ? <Truck size={20} strokeWidth={1.9} /> : <ClickAndCollectIcon />}
                    <span style={{ fontSize: 14, fontWeight: 800 }}>{method === 'delivery' ? 'Delivery' : 'Collect'}</span>
                  </button>
                ))}
              </div>

              <div style={{ padding: '16px 14px 14px' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: CHARCOAL, marginBottom: 10 }}>
                  {deliveryMethod === 'delivery' ? 'Delivery Address' : 'Collection Store'}
                </div>

                <div
                  style={{
                    border: '1px solid #d8e9db',
                    borderRadius: 10,
                    padding: '16px 14px',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    marginBottom: 12,
                    background: '#f7fcf8',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    {deliveryMethod === 'delivery' ? (
                      <>
                        <div style={{ fontSize: 12, fontWeight: 800, color: CHARCOAL, lineHeight: 1.35, textTransform: 'uppercase' }}>London, EC1A 1BB</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: CHARCOAL, lineHeight: 1.4 }}>42 Example Street, Flat 7</div>
                        <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.4 }}>07123 456789</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 12, fontWeight: 800, color: CHARCOAL, lineHeight: 1.35, textTransform: 'uppercase' }}>{selectedStore.name}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: CHARCOAL, lineHeight: 1.4 }}>{selectedStore.address}</div>
                        <div style={{ fontSize: 12, color: TEXT_GREY, lineHeight: 1.4 }}>{selectedStore.collectBy ?? 'Currently unavailable for collection'}</div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (deliveryMethod === 'collect') setStorePickerOpen(true)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    borderRadius: 4,
                    background: CTA_GREY,
                    color: '#fff',
                    padding: '14px 16px',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginBottom: 12,
                  }}
                >
                  {deliveryMethod === 'delivery' ? 'Add New Address' : 'Select Another Store'}
                </button>

                <div style={{ display: 'grid', gap: 10 }}>
                  {deliveryMethod === 'delivery' ? (
                    <>
                      <button
                        onClick={() => setDeliveryOption('standard')}
                        style={{
                          border: `1.5px solid ${deliveryOption === 'standard' ? GREEN : '#d3d9e0'}`,
                          borderRadius: 10,
                          background: deliveryOption === 'standard' ? '#f7fcf8' : '#fff',
                          padding: '18px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          cursor: 'pointer',
                          boxShadow: deliveryOption === 'standard' ? 'inset 0 0 0 1px rgba(63,161,79,0.05)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                          {radio(deliveryOption === 'standard')}
                          <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL, textAlign: 'left' }}>Standard Home Delivery</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£4.95</span>
                      </button>
                      <button
                        onClick={() => setDeliveryOption('nextday')}
                        style={{
                          border: `1.5px solid ${deliveryOption === 'nextday' ? GREEN : '#d3d9e0'}`,
                          borderRadius: 10,
                          padding: '18px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          cursor: 'pointer',
                          background: deliveryOption === 'nextday' ? '#f7fcf8' : '#fff',
                          boxShadow: deliveryOption === 'nextday' ? 'inset 0 0 0 1px rgba(63,161,79,0.05)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                          {radio(deliveryOption === 'nextday')}
                          <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL, lineHeight: 1.25, textAlign: 'left' }}>Next Working Day Delivery<br />(Order by 5pm)</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£6.95</span>
                      </button>
                    </>
                  ) : (
                    <div
                      style={{
                        border: `1.5px solid ${GREEN}`,
                        borderRadius: 10,
                        background: '#f7fcf8',
                        padding: '18px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        boxShadow: 'inset 0 0 0 1px rgba(63,161,79,0.05)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        {radio(true)}
                        <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL, textAlign: 'left' }}>FREE Click & Collect</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£0.00</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setPromoOpen(open => !open)}
              style={{
                width: '100%',
                background: '#fff',
                border: CARD_BORDER,
                borderRadius: CARD_RADIUS,
                boxShadow: CARD_SHADOW,
                padding: '16px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                color: CHARCOAL,
                marginBottom: promoOpen ? 10 : 18,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500 }}>Add a Promotional Code</span>
              <ChevronDown size={22} style={{ transform: promoOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s ease' }} />
            </button>

            {promoOpen && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <input
                  defaultValue="FREEDLV50"
                  style={{
                    flex: 1,
                    border: '1px solid #ccd2da',
                    borderRadius: 4,
                    padding: '13px 14px',
                    fontSize: 14,
                    color: CHARCOAL,
                    outline: 'none',
                  }}
                />
                <button
                  style={{
                    border: 'none',
                    borderRadius: 4,
                    background: CTA_GREY,
                    color: '#fff',
                    padding: '0 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Apply
                </button>
              </div>
            )}

            <div style={{ fontSize: 18, fontWeight: 900, color: CHARCOAL, marginBottom: 12 }}>Payment Options</div>

            <div
              style={{
                background: '#fff',
                border: CARD_BORDER,
                borderRadius: CARD_RADIUS,
                boxShadow: CARD_SHADOW,
                padding: 12,
                display: 'grid',
                gap: 10,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  border: `1.5px solid ${paymentOption === 'applepay' ? GREEN : '#d3d9e0'}`,
                  borderRadius: 10,
                  background: paymentOption === 'applepay' ? '#f7fcf8' : '#fff',
                  padding: '18px 14px',
                  boxShadow: paymentOption === 'applepay' ? 'inset 0 0 0 1px rgba(63,161,79,0.05)' : 'none',
                }}
              >
                <button
                  onClick={() => setPaymentOption('applepay')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', marginBottom: paymentOption === 'applepay' ? 16 : 0 }}
                >
                  {radio(paymentOption === 'applepay')}
                  <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL }}>Apple Pay</span>
                </button>

                {paymentOption === 'applepay' && (
                  <button
                    style={{
                      width: '100%',
                      background: '#050505',
                      color: '#fff',
                      border: '1px solid #1f1f1f',
                      borderRadius: 4,
                      padding: '15px 16px',
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <span>Buy with</span>
                    <span aria-hidden="true" style={{ fontSize: 19, lineHeight: 1 }}></span>
                    <span>Pay</span>
                  </button>
                )}
              </div>

              <div
                style={{
                  border: `1.5px solid ${paymentOption === 'card' ? GREEN : '#d3d9e0'}`,
                  borderRadius: 10,
                  background: paymentOption === 'card' ? '#f7fcf8' : '#fff',
                  padding: '18px 14px',
                  boxShadow: paymentOption === 'card' ? 'inset 0 0 0 1px rgba(63,161,79,0.05)' : 'none',
                }}
              >
                <button
                  onClick={() => setPaymentOption('card')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', marginBottom: paymentOption === 'card' ? 16 : 0 }}
                >
                  {radio(paymentOption === 'card')}
                  <span style={{ fontSize: 14, fontWeight: 500, color: CHARCOAL }}>Credit Card</span>
                </button>

                {paymentOption === 'card' && (
                  <>
                    <input
                      placeholder="Card Number"
                      style={{
                        width: '100%',
                        border: '1px solid #ccd2da',
                        borderRadius: 4,
                        padding: '13px 14px',
                        fontSize: 14,
                        color: CHARCOAL,
                        outline: 'none',
                        marginBottom: 10,
                      }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                      <input
                        placeholder="MM/YY"
                        style={{
                          width: '100%',
                          border: '1px solid #ccd2da',
                          borderRadius: 4,
                          padding: '13px 14px',
                          fontSize: 14,
                          color: CHARCOAL,
                          outline: 'none',
                        }}
                      />
                      <input
                        placeholder="CVC"
                        style={{
                          width: '100%',
                          border: '1px solid #ccd2da',
                          borderRadius: 4,
                          padding: '13px 14px',
                          fontSize: 14,
                          color: CHARCOAL,
                          outline: 'none',
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setSameAsDelivery(value => !value)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: CHARCOAL, marginBottom: 14 }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 2,
                          background: sameAsDelivery ? CHARCOAL : '#fff',
                          border: sameAsDelivery ? `1px solid ${CHARCOAL}` : '1px solid #c5ccd4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {sameAsDelivery && <Check size={14} color="#fff" strokeWidth={3} />}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 500 }}>Same as Delivery Address</span>
                    </button>
                    <button
                      style={{
                        width: '100%',
                        background: GREEN,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '15px 16px',
                        fontSize: 16,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Place Order
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                border: CARD_BORDER,
                borderRadius: CARD_RADIUS,
                boxShadow: CARD_SHADOW,
                padding: 14,
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: CHARCOAL, marginBottom: 10 }}>Order Summary</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_GREY }}>Items ({items.reduce((sum, item) => sum + item.qty, 0)})</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{subtotal.toFixed(2)}</span>
                </div>
                {useRewardsPoints && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ fontSize: 12, color: TEXT_GREY }}>Reward points</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: REWARDS_TEAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>-£{rewardsValue.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 12, color: TEXT_GREY }}>{deliveryMethod === 'collect' ? 'Click & Collect' : 'Delivery'}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{deliveryPrice.toFixed(2)}</span>
                </div>
                <div style={{ height: 1, background: '#d9dee4', margin: '2px 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: CHARCOAL }}>Total</span>
                  <span style={{ fontSize: 24, fontWeight: 900, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {storePickerOpen && (
        <StorePickupOverlay
          selectedStoreId={selectedStoreId}
          onSelect={storeId => setSelectedStoreId(storeId)}
          onClose={() => setStorePickerOpen(false)}
        />
      )}
    </div>
  )
}

function RewardsScreen() {
  const barcodeDigits = '501234567890'
  const leftOdd = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011']
  const leftEven = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
  const right = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100']
  const parityMap = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL']
  const checkDigit =
    (10 -
      barcodeDigits
        .split('')
        .map(Number)
        .reduce((sum, digit, index) => sum + digit * (index % 2 === 0 ? 1 : 3), 0) % 10) % 10
  const fullBarcode = `${barcodeDigits}${checkDigit}`
  const parity = parityMap[Number(fullBarcode[0])]
  const leftPattern = fullBarcode
    .slice(1, 7)
    .split('')
    .map((digit, index) => (parity[index] === 'L' ? leftOdd : leftEven)[Number(digit)])
    .join('')
  const rightPattern = fullBarcode
    .slice(7)
    .split('')
    .map(digit => right[Number(digit)])
    .join('')
  const barcodePattern = `101${leftPattern}01010${rightPattern}101`

  return (
    <div style={{ background: LIGHT_GREY, minHeight: '100%', padding: '18px 16px 96px' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f1faf9 58%, #e5f2f0 100%)',
          border: CARD_BORDER,
          borderRadius: CARD_RADIUS,
          boxShadow: CARD_SHADOW,
          padding: '20px 18px 18px',
          marginBottom: 16,
        }}
      >
        <div style={{ position: 'absolute', top: -18, right: -22, opacity: 0.08, transform: 'rotate(-14deg)' }}>
          <RewardsIcon size={162} color={REWARDS_TEAL} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: REWARDS_TEAL, marginBottom: 10 }}>
            <RewardsIcon size={18} color={REWARDS_TEAL} />
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>Ryman Rewards</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: CHARCOAL, lineHeight: 1.02, margin: '0 0 10px' }}>My Rewards</h1>
          <p style={{ fontSize: 13, color: TEXT_GREY, lineHeight: 1.5, margin: 0, maxWidth: 240 }}>
            Scan your barcode in store, track your points, and add missing points.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#fff',
            border: CARD_BORDER,
            borderRadius: CARD_RADIUS,
            boxShadow: CARD_SHADOW,
            padding: '18px 18px 20px',
          }}
        >
          <div style={{ position: 'absolute', right: -16, bottom: -12, opacity: 0.05, transform: 'rotate(12deg)' }}>
            <RewardsIcon size={124} color={REWARDS_TEAL} />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_GREY, marginBottom: 4 }}>Customer No.</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: CHARCOAL, letterSpacing: '0.02em', lineHeight: 1, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>RR-XXXXXX</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_GREY, marginBottom: 4 }}>My Reward Points</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: REWARDS_TEAL, lineHeight: 1, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>325</div>
              </div>
            </div>
            <div style={{ padding: '2px 0 0', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <div style={{ background: '#fff', padding: '12px 14px', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)' }}>
                  <svg viewBox="0 0 95 84" width="286" height="96" aria-hidden="true" style={{ display: 'block' }}>
                    <rect width="95" height="84" fill="#fff" />
                    {barcodePattern.split('').map((bit, i) => {
                      if (bit !== '1') return null
                      const guard = i < 3 || (i >= 45 && i <= 49) || i >= 92
                      return <rect key={i} x={i} y={0} width="1" height={guard ? 80 : 72} fill="#111" />
                    })}
                  </svg>
                </div>
              </div>
              <div style={{ textAlign: 'center', fontSize: 12, color: TEXT_GREY, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Scan in-store to collect points
              </div>
            </div>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                width: '100%',
                background: '#050505',
                color: '#fff',
                border: '1px solid #1f1f1f',
                padding: '10px 22px 10px 16px',
                cursor: 'pointer',
                boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'relative',
                  width: 44,
                  height: 34,
                  borderRadius: 9,
                  background: '#f4f4f4',
                  flexShrink: 0,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                }}
              >
                <span style={{ position: 'absolute', left: 5, right: 5, top: 5, height: 5, borderRadius: 4, background: '#53a6ff' }} />
                <span style={{ position: 'absolute', left: 5, right: 5, top: 10, height: 5, borderRadius: 4, background: '#2cc98b' }} />
                <span style={{ position: 'absolute', left: 5, right: 5, top: 15, height: 5, borderRadius: 4, background: '#f6c542' }} />
                <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 15, background: '#ece9e2' }} />
                <span style={{ position: 'absolute', left: '50%', bottom: 6, transform: 'translateX(-50%)', width: 18, height: 10, background: '#ef6b56', borderRadius: '0 0 10px 10px' }} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.02 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: '#fff' }}>Add to</span>
                <span style={{ fontSize: 20, fontWeight: 500, color: '#fff', letterSpacing: '-0.02em' }}>Apple Wallet</span>
              </span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ background: '#fff', border: CARD_BORDER, borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, overflow: 'hidden' }}>
            <div style={{ padding: '18px' }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: CHARCOAL, lineHeight: 1.15, marginBottom: 8 }}>
                Have a store receipt to add?
              </div>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: TEXT_GREY, lineHeight: 1.5 }}>
                Add missed points from your latest in-store purchase and keep your balance up to date.
              </p>
              <button
                style={{
                  width: '100%',
                  background: CTA_GREY,
                  color: '#fff',
                  border: 'none',
                  padding: '14px 16px',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Add Receipt
              </button>
            </div>
            <button
              style={{
                width: '100%',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                color: CHARCOAL,
                border: 'none',
                borderTop: `1px solid ${MID_GREY}`,
                background: 'none',
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800 }}>My Account</span>
              <ChevronRight size={18} strokeWidth={2.2} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── PDP Screen ─────────────────────────────────────────────────────────────
function GreetingCardPDPScreen() {
  const [selectedSize, setSelectedSize] = useState('A5')
  const [accordions, setAccordions] = useState<Record<string, boolean>>({ description: false, delivery: false, returns: false })
  const productImages = [greetingCardOneImg, greetingCardTwoImg]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cardPrice = selectedSize === 'A4' ? 3.99 : 2.99

  const toggleAccordion = (k: string) => setAccordions(a => ({ ...a, [k]: !a[k] }))

  return (
    <div style={{ background: '#fff', paddingBottom: 176 }}>
      <div style={{ background: LIGHT_GREY }}>
        <div style={{ position: 'relative', background: '#fff' }}>
          <img
            src={productImages[currentImageIndex]}
            alt="Personalised Greeting Card"
            style={{
              width: '100%',
              aspectRatio: '4/3.5',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              background: '#fff',
            }}
          />
          <button
            onClick={() => setCurrentImageIndex(i => Math.max(0, i - 1))}
            disabled={currentImageIndex === 0}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#000',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentImageIndex === 0 ? 'default' : 'pointer',
              color: '#fff',
              opacity: currentImageIndex === 0 ? 0.38 : 1,
            }}
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            onClick={() => setCurrentImageIndex(i => Math.min(productImages.length - 1, i + 1))}
            disabled={currentImageIndex === productImages.length - 1}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#000',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentImageIndex === productImages.length - 1 ? 'default' : 'pointer',
              color: '#fff',
              opacity: currentImageIndex === productImages.length - 1 ? 0.38 : 1,
            }}
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, padding: '10px 12px', overflowX: 'auto' }}>
          {productImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              style={{ width: 52, height: 52, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === currentImageIndex ? RED : MID_GREY}`, flex: '0 0 auto', padding: 0, background: 'none', cursor: 'pointer' }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <h1 style={{ fontSize: 19, fontWeight: 700, color: CHARCOAL, margin: '0 0 4px', lineHeight: 1.3 }}>Personalised Greeting Card</h1>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£{cardPrice.toFixed(2)}</div>
        </div>

        <OptionSelectorGroup
          label="Card size"
          options={['A5', 'A4']}
          selected={selectedSize}
          onSelect={setSelectedSize}
        />

        <DeliveryOptionsCard
          deliveryOptions={[
            {
              id: 'standard',
              title: 'Home Delivery by Monday, 27th July',
              copy: 'Free Standard Delivery on orders over £50 with code FREEDELIVERY50 otherwise £4.95',
            },
            {
              id: 'zoom',
              title: 'Ryman Zoom Express Delivery',
              copy: 'In as little as 25 minutes, powered by Deliveroo',
            },
          ]}
          collectLabel="FREE Click & Collect TODAY *"
          defaultTab="collect"
          defaultDeliveryOptionId="standard"
        />

        <p style={{ fontSize: 12, color: TEXT_GREY, margin: '0 0 6px' }}>Product code: 2553010001</p>

        {[['description', 'Description'], ['delivery', 'Delivery'], ['returns', 'Returns']].map(([key, label]) => (
          <div key={key} style={{ borderTop: `1px solid ${MID_GREY}` }}>
            <button onClick={() => toggleAccordion(key)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: CHARCOAL }}>
              {label}
              <ChevronDown size={18} style={{ transform: accordions[key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {accordions[key] && (
              <div style={{ paddingBottom: 16, fontSize: 12, color: TEXT_GREY, lineHeight: 1.6 }}>
                {key === 'description' && 'Create a personalised greeting card with your own message and chosen card format, ready for fast collection or home delivery. Ideal for birthdays, weddings, anniversaries and everyday occasions.'}
                {key === 'delivery' && 'Free Standard Delivery on orders over £50 with code FREEDELIVERY50. Standard delivery £4.95. Same-day Click & Collect is available at selected stores.'}
                {key === 'returns' && 'As this is a personalised item, returns are only accepted if the finished card arrives faulty or damaged. Please contact customer services if you need help with an order.'}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        position: 'fixed', bottom: `calc(env(safe-area-inset-bottom, 0px) + ${TAB_BAR_HEIGHT}px)`, left: 0, right: 0, zIndex: 40,
        background: '#fff', borderTop: `1px solid ${MID_GREY}`,
        padding: '12px 16px 16px',
      }}>
        <button style={{ width: '100%', background: GREEN, color: '#fff', border: 'none', borderRadius: 12, height: 48, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Personalise</button>
      </div>
    </div>
  )
}

function PDPScreen() {
  const [qty, setQty] = useState(1)
  const [accordions, setAccordions] = useState<Record<string, boolean>>({ description: false, delivery: false, returns: false })
  const productImages = [stationeryGiftsImg, premiumStationeryImg, fashionStationeryImg, essentialStationeryImg]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleAccordion = (k: string) => setAccordions(a => ({ ...a, [k]: !a[k] }))

  return (
    <div style={{ background: '#fff', paddingBottom: 176 }}>
      {/* Product Image */}
      <div style={{ background: LIGHT_GREY }}>
        <div style={{ position: 'relative', background: '#fff' }}>
          <img
            src={productImages[currentImageIndex]}
            alt="Pastel Desk Stationery Gift Set"
            style={{
              width: '100%',
              aspectRatio: '4/3.5',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              background: '#fff',
            }}
          />
          <button
            onClick={() => setCurrentImageIndex(i => Math.max(0, i - 1))}
            disabled={currentImageIndex === 0}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#000',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentImageIndex === 0 ? 'default' : 'pointer',
              color: '#fff',
              opacity: currentImageIndex === 0 ? 0.38 : 1,
            }}
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>
          <button
            onClick={() => setCurrentImageIndex(i => Math.min(productImages.length - 1, i + 1))}
            disabled={currentImageIndex === productImages.length - 1}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#000',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentImageIndex === productImages.length - 1 ? 'default' : 'pointer',
              color: '#fff',
              opacity: currentImageIndex === productImages.length - 1 ? 0.38 : 1,
            }}
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
        {/* Thumbnail strip */}
        <div style={{ display: 'flex', gap: 6, padding: '10px 12px', overflowX: 'auto' }}>
          {productImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              style={{ width: 52, height: 52, borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === currentImageIndex ? RED : MID_GREY}`, flex: '0 0 auto', padding: 0, background: 'none', cursor: 'pointer' }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        <h1 style={{ fontSize: 19, fontWeight: 700, color: CHARCOAL, margin: '0 0 4px', lineHeight: 1.3 }}>Pastel Desk Stationery Gift Set</h1>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 2 }}>
            <span style={{ fontSize: 12, color: TEXT_GREY }}>
              Was <span style={{ textDecoration: 'line-through' }}>£16.49</span>
            </span>
            <span style={{ background: RED, color: '#fff', borderRadius: 4, padding: '3px 8px', fontSize: 12, fontWeight: 800, lineHeight: 1.1 }}>
              3 for 2
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: CHARCOAL, fontFamily: '"Encode Sans", "Arial", "Helvetica", sans-serif' }}>£12.99</div>
        </div>

        <DeliveryOptionsCard
          deliveryOptions={[
            {
              id: 'standard',
              title: 'Home Delivery by Monday, 27th July',
              copy: 'Free Standard Delivery on orders over £50 with code FREEDELIVERY50 otherwise £4.95',
            },
            {
              id: 'zoom',
              title: 'Ryman Zoom Express Delivery',
              copy: 'In as little as 25 minutes, powered by Deliveroo',
            },
          ]}
          collectLabel="FREE Click & Collect TODAY *"
          defaultTab="delivery"
          defaultDeliveryOptionId="standard"
        />

        <p style={{ fontSize: 12, color: TEXT_GREY, margin: '0 0 6px' }}>Product code: 2511040017</p>

        {/* Accordions */}
        {[['description', 'Description'], ['delivery', 'Delivery'], ['returns', 'Returns']].map(([key, label]) => (
          <div key={key} style={{ borderTop: `1px solid ${MID_GREY}` }}>
            <button onClick={() => toggleAccordion(key)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', border: 'none', background: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: CHARCOAL }}>
              {label}
              <ChevronDown size={18} style={{ transform: accordions[key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {accordions[key] && (
              <div style={{ paddingBottom: 16, fontSize: 12, color: TEXT_GREY, lineHeight: 1.6 }}>
                {key === 'description' && 'A coordinated pastel stationery gift set with pen, notepad and desk accessories, designed to brighten up school, study or workspace setups. A simple all-in-one gift option for stationery lovers.'}
                {key === 'delivery' && 'Free Standard Delivery on orders over £50 with code FREEDELIVERY50. Standard delivery £4.95. Express Zoom delivery available in selected areas.'}
                {key === 'returns' && 'We accept returns within 30 days of purchase. Items must be in their original packaging and unused condition. Contact our customer service team to arrange a return.'}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky Add to Basket */}
      <div style={{
        position: 'fixed', bottom: `calc(env(safe-area-inset-bottom, 0px) + ${TAB_BAR_HEIGHT}px)`, left: 0, right: 0, zIndex: 40,
        background: '#fff', borderTop: `1px solid ${MID_GREY}`,
        padding: '12px 16px 16px',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <QuantityStepper
          value={qty}
          onDecrement={() => setQty(q => Math.max(1, q - 1))}
          onIncrement={() => setQty(q => q + 1)}
        />
        <button style={{ flex: 1, background: GREEN, color: '#fff', border: 'none', borderRadius: 12, height: 48, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Add to Basket</button>
      </div>
    </div>
  )
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover')
  }, [])

  const [screen, setScreen] = useState<Screen>('home')
  const [navOpen, setNavOpen] = useState(false)
  const [categoryLanding, setCategoryLanding] = useState({ title: 'Stationery', heroImg: essentialStationeryImg })
  const [basketReturnScreen, setBasketReturnScreen] = useState<Screen>('home')
  const [useRewardsPoints, setUseRewardsPoints] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [basketItems, setBasketItems] = useState<BasketItem[]>([
    { id: products[0].id, name: products[0].name, price: products[0].price, img: products[0].img, qty: 1 },
    { id: products[1].id, name: products[1].name, price: products[1].price, img: products[1].img, qty: 1 },
    { id: products[2].id, name: products[2].name, price: products[2].price, img: products[2].img, qty: 1 },
  ])
  const basketCount = basketItems.reduce((sum, item) => sum + item.qty, 0)

  const navigate = (s: Screen) => { setScreen(s); setNavOpen(false); setCheckoutOpen(false) }
  const openCategoryLanding = (title: string, heroImg: string) => {
    setCategoryLanding({ title, heroImg })
    setScreen('categorylanding')
    setNavOpen(false)
    setCheckoutOpen(false)
  }
  const openBasket = () => {
    if (screen !== 'basket') setBasketReturnScreen(screen)
    setScreen('basket')
    setNavOpen(false)
    setCheckoutOpen(false)
  }
  const removeBasketItem = (id: number) => setBasketItems(items => {
    const nextItems = items.filter(item => item.id !== id)
    if (!nextItems.length) setCheckoutOpen(false)
    return nextItems
  })

  const showBack = ['greetingcards', 'printshop', 'printyourdoc', 'posterprinting', 'shop', 'categorylanding', 'plp', 'cardsplp', 'pdp', 'cardpdp', 'basket', 'storefinder'].includes(screen)
  const backTarget: Partial<Record<Screen, Screen>> = {
    printyourdoc: 'printshop',
    posterprinting: 'printshop',
    categorylanding: 'shop',
    plp: 'categorylanding',
    cardsplp: 'greetingcards',
    pdp: 'plp',
    cardpdp: 'cardsplp',
  }
  const goBack = () => {
    if (checkoutOpen) {
      setCheckoutOpen(false)
      return
    }
    if (screen === 'basket') {
      setScreen(basketReturnScreen)
      return
    }
    if (screen === 'plp') {
      setCategoryLanding({ title: 'Stationery', heroImg: essentialStationeryImg })
      setScreen('categorylanding')
      return
    }
    setScreen(backTarget[screen] ?? 'home')
  }

  const tabBarActive =
    screen === 'basket'
      ? (basketReturnScreen === 'cardsplp' || basketReturnScreen === 'cardpdp' ? 'greetingcards' : basketReturnScreen)
      : screen === 'storefinder'
        ? 'home'
        : screen

  return (
    <>
      <div className="app-shell" style={{ width: '100%', maxWidth: 430, margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', minHeight: '100vh', background: '#fff', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <Header
          onMenu={!showBack ? () => setNavOpen(true) : undefined}
          onBack={showBack ? goBack : undefined}
          onHome={() => { setScreen('home'); setCheckoutOpen(false) }}
          onBasket={openBasket}
          basketCount={basketCount}
        />

        <main className="app-main" style={{ overflowY: 'auto' }}>
          {screen === 'home' && <HomeScreen onNavigate={navigate} />}
          {screen === 'basket' && (
            <BasketScreen
              items={basketItems}
              onRemove={removeBasketItem}
              useRewardsPoints={useRewardsPoints}
              onToggleRewardsPoints={() => setUseRewardsPoints(value => !value)}
              onCheckout={() => setCheckoutOpen(true)}
            />
          )}
          {screen === 'greetingcards' && <GreetingCardsScreen onNavigate={navigate} />}
          {screen === 'printshop' && <PrintShopScreen onNavigate={navigate} />}
          {screen === 'printyourdoc' && <PrintYourDocScreen />}
          {screen === 'posterprinting' && <PosterPrintingScreen />}
          {screen === 'storefinder' && <StoreFinderScreen />}
          {screen === 'shop' && <ShopScreen onNavigate={navigate} onOpenCategory={openCategoryLanding} />}
          {screen === 'categorylanding' && <CategoryLandingScreen title={categoryLanding.title} heroImg={categoryLanding.heroImg} onNavigate={navigate} />}
          {screen === 'plp' && <PLPScreen onNavigate={navigate} title={categoryLanding.title} />}
          {screen === 'cardsplp' && <GreetingCardsPLPScreen onNavigate={navigate} />}
          {screen === 'rewards' && <RewardsScreen />}
          {screen === 'pdp' && <PDPScreen />}
          {screen === 'cardpdp' && <GreetingCardPDPScreen />}
        </main>

        <TabBar active={tabBarActive} onChange={navigate} />

        {navOpen && <NavDrawer onClose={() => setNavOpen(false)} onNavigate={navigate} />}
        {screen === 'basket' && checkoutOpen && (
          <CheckoutOverlay
            items={basketItems}
            useRewardsPoints={useRewardsPoints}
            onClose={() => setCheckoutOpen(false)}
          />
        )}
      </div>

      <div className="prototype-build-label">{BUILD_LABEL}</div>
    </>
  )
}
