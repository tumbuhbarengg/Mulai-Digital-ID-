import { useState, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   MULAI DIGITAL ID
   Style: Quote-card minimalism (img1) + scrapbook badge (img2)
   → Solid royal-blue BG · floating white cards · bold accents
══════════════════════════════════════════════════════════════ */

const BLUE    = "#2B7FD4";   // main bg (like img1)
const BLUE_D  = "#1A5FAA";
const BLUE_L  = "#3D95E8";
const BLUE_LL = "#5AABF5";
const BLUE_G  = "#B8D9F8";   // ghost decorative (img1 quotemark color)
const WHITE   = "#FFFFFF";
const OFF_W   = "#F0F6FF";
const DARK    = "#0D1B3E";
const NAVY    = "#12266A";
const TEXT    = "#1A2B5A";
const MUTED   = "#6B8CC8";
const YELLOW  = "#FFD600";
const GREEN   = "#00D68F";
const PINK    = "#FF4FA0";
const ORANGE  = "#FF6B35";
const CYAN    = "#00C8FF";

/* ── Logo SVG faithful ──────────────────────────────────────── */
const Logo = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <defs>
      <radialGradient id="lg" cx="30%" cy="25%" r="85%">
        <stop offset="0%"   stopColor="#3B8FFF"/>
        <stop offset="55%"  stopColor="#1400FF"/>
        <stop offset="100%" stopColor="#00AAFF"/>
      </radialGradient>
    </defs>
    <rect width="200" height="200" rx="44" fill="url(#lg)"/>
    <rect x="34" y="34" width="132" height="132" rx="28" fill="white"/>
    <path d="M72 62 L72 138 L148 100 Z" fill="#0800CC"/>
    <path d="M107 72 L96 100 L108 100 L93 128 L118 96 L106 96 Z" fill="white"/>
  </svg>
);

/* ── Decorative play-marks (like the " " in img1) ──────────── */
const PlayMark = ({ size = 120, opacity = 0.12, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={style}>
    <rect width="200" height="200" rx="44" fill={`rgba(255,255,255,${opacity})`}/>
    <rect x="34" y="34" width="132" height="132" rx="28" fill={`rgba(255,255,255,${opacity + 0.04})`}/>
    <path d="M72 62 L72 138 L148 100 Z" fill={`rgba(255,255,255,${opacity + 0.08})`}/>
    <path d="M107 72 L96 100 L108 100 L93 128 L118 96 L106 96 Z" fill={`rgba(255,255,255,${opacity + 0.05})`}/>
  </svg>
);

/* ── Arrow icon (img1 style) ────────────────────────────────── */
const ArrowIcon = ({ size = 20, color = WHITE }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Data ────────────────────────────────────────────────────── */
const KELAS = [
  { icon:"🎬", name:"Kelas Editing CapCut",         desc:"Video viral untuk TikTok & Reels",      link:"https://drive.google.com/drive/u/3/folders/1POU7CEJ6gBjsMTUbJfdK-iJMIzDiJrRX", btn:"Buka Kelas", accent:PINK },
  { icon:"🎨", name:"Kelas Desain Canva",            desc:"Desain profesional untuk konten digital",link:"https://drive.google.com/drive/folders/1hI0IjDJr8BKNNlxgGWeBgC3kXOoMLWI7",  btn:"Buka Kelas", accent:CYAN },
  { icon:"📱", name:"10.000+ Faceless Viral Videos", desc:"Ribuan video viral tanpa rekam sendiri",
    links:[
      { label:"Folder Part 1", url:"https://drive.google.com/drive/folders/1ld5Kk2xYRDqTjsSPdJDtl_4Kbxje6nxi" },
      { label:"Folder Part 2", url:"https://drive.google.com/drive/folders/1HOPv2ua4NtCftWYlRMNVEaJ9Gl3MxcwS" },
      { label:"Folder Part 3", url:"https://drive.google.com/drive/folders/1pRX34Kn8YVfPripo4cxr0FU11YfMHOk8" },
    ], accent:YELLOW },
  { icon:"🛍️", name:"Konten Affiliate Shopee",      desc:"4.000+ template konten afiliasi Shopee", link:"https://drive.google.com/drive/folders/18hFrrnawQqL8ujwQwVex8Az1azd8L_iB",  btn:"Buka Folder", accent:ORANGE },
  { icon:"✨", name:"Template Social Media",         desc:"Posting promosi tanpa desain dari nol",  link:"https://drive.google.com/drive/folders/1g0kJTUx0_GAlgsQZznT2Fu0kUBpQ-aXP",  btn:"Buka Template", accent:GREEN },
];

const RIGHTS = [
  "Jual ulang seluruh bundle — satuan atau bundling",
  "Pembeli Anda juga berhak dapat lisensi U-PLR yang sama",
  "Bebas rebrand: desain, warna, font, teks, logo",
  "Gunakan untuk konten promosi, social media, landing page",
  "Jadikan bonus dalam kursus atau produk digital berbayar",
];
const LIMITS = [
  "Dilarang mengklaim hak cipta atau ajukan DMCA",
  "Dilarang distribusi gratis, freebie, atau giveaway",
  "Dilarang untuk konten SARA atau promosi ilegal",
  "Tidak boleh jadi bonus untuk produk gratis / murah",
];
const LIC_TYPES = [
  { t:"U-PLR",     c:"#3D95E8", d:"Jual + Edit + Wariskan lisensi ke pembeli" },
  { t:"PLR & MRR", c:CYAN,      d:"Edit + Jual ulang, tidak bisa wariskan" },
  { t:"PLR",       c:GREEN,     d:"Edit & jual ulang, lisensi tidak transferable" },
  { t:"MRR",       c:YELLOW,    d:"Jual tanpa edit, tidak bisa diwariskan" },
  { t:"Commercial",c:ORANGE,    d:"Branding pribadi saja, tidak boleh dijual" },
  { t:"Personal",  c:PINK,      d:"Konsumsi pribadi saja" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("home");
  const [open, setOpen] = useState(null);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    setAnim(false);
    const t = setTimeout(() => { setAnim(true); setOpen(null); }, 30);
    return () => clearTimeout(t);
  }, [tab]);

  /* ── Floating card wrapper (img1 style) ─────────────────── */
  const FloatCard = ({ children, style = {}, tilt = 0 }) => (
    <div style={{
      background: WHITE,
      borderRadius: 20,
      padding: "20px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)",
      transform: `rotate(${tilt}deg)`,
      position: "relative",
      ...style,
    }}>
      {children}
    </div>
  );

  /* ── Section heading (img2 style bold bar) ───────────────── */
  const SectionHead = ({ label, color = WHITE }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap: 8,
                    background: DARK, borderRadius: 6, padding:"4px 12px 4px 4px" }}>
        <div style={{ width: 4, height: 22, background: color, borderRadius: 3 }} />
        <span style={{ fontSize: 11, fontWeight: 800, color: color, letterSpacing:"2px" }}>{label}</span>
      </div>
    </div>
  );

  /* ── Sticker badge (img2 element) ─────────────────────────── */
  const Sticker = ({ text, color = YELLOW }) => (
    <div style={{
      display: "inline-flex", alignItems: "center",
      padding: "4px 12px",
      background: color,
      borderRadius: 20,
      fontSize: 10, fontWeight: 800, color: DARK,
      letterSpacing: "1px",
      boxShadow: `0 3px 10px ${color}60`,
    }}>{text}</div>
  );

  /* ── Access button ──────────────────────────────────────────  */
  const AccessBtn = ({ href, label, color = BLUE, textColor = WHITE }) => (
    <a href={href} target="_blank" rel="noreferrer" style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: "13px 20px", background: color, borderRadius: 14,
      fontSize: 13, fontWeight: 800, color: textColor, textDecoration: "none",
      boxShadow: `0 4px 16px ${color}50`,
      letterSpacing: ".3px",
    }}>
      <ArrowIcon size={15} color={textColor} />
      {label}
    </a>
  );

  return (
    <div style={{ display:"flex", justifyContent:"center", background: "#1A3B6B", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{display:none}
        a{text-decoration:none;color:inherit}
        @keyframes up{from{opacity:0;transform:translateY(20px) rotate(var(--r,0deg))}to{opacity:1;transform:translateY(0) rotate(var(--r,0deg))}}
        @keyframes floatY{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-5px) rotate(var(--r,0deg))}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .card-up{animation:up .35s cubic-bezier(.2,.8,.3,1) both}
        .float-anim{animation:floatY 4s ease-in-out infinite}
        .pulse{animation:pulse 2.5s ease infinite}
        .press{transition:transform .12s;cursor:pointer;-webkit-user-select:none}
        .press:active{transform:scale(.94) !important}
        .tab-btn{border:none;background:none;cursor:pointer;outline:none;transition:all .18s}
        .tab-btn:active{transform:scale(.88)}
        .row-tap{cursor:pointer;transition:opacity .12s;-webkit-user-select:none}
        .row-tap:active{opacity:.7}
      `}</style>

      <div style={{
        width:"100%", maxWidth:430, minHeight:"100vh",
        background: BLUE, fontFamily:"'Nunito', sans-serif",
        display:"flex", flexDirection:"column", position:"relative", overflow:"hidden",
      }}>

        {/* ── DECORATIVE MARKS (img1 style) ───────────────── */}
        <PlayMark size={160} opacity={0.10} style={{ position:"fixed", top:-30, right:-30, zIndex:0 }} />
        <PlayMark size={100} opacity={0.07} style={{ position:"fixed", top:200, left:-30, zIndex:0 }} />
        <PlayMark size={200} opacity={0.06} style={{ position:"fixed", bottom:80, right:-60, zIndex:0 }} />

        {/* ── TOP BAR (img2 header style) ─────────────────── */}
        <div style={{
          position:"sticky", top:0, zIndex:200,
          background: DARK, padding:"0 18px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          height:60,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}>
          {/* Blue accent top line */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:3,
                        background:`linear-gradient(90deg,${BLUE_L},${CYAN})` }} />
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Logo size={34} />
            <div>
              <div style={{ fontSize:15, fontWeight:900, color:WHITE, letterSpacing:"-.4px", lineHeight:1 }}>
                Mulai Digital <span style={{ color:BLUE_LL }}>ID</span>
              </div>
              <div style={{ fontSize:8, color:MUTED, letterSpacing:"2px", marginTop:1 }}>MEMBER AREA</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6,
                        background:`${BLUE}22`, border:`1px solid ${BLUE}40`,
                        padding:"5px 11px", borderRadius:20 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:GREEN }} className="pulse" />
            <span style={{ fontSize:9, color:BLUE_LL, fontWeight:800, letterSpacing:"1.5px" }}>AKTIF</span>
          </div>
        </div>

        {/* ── SCROLLABLE BODY ─────────────────────────────── */}
        <div style={{ flex:1, overflowY:"auto", paddingBottom:96, position:"relative", zIndex:1 }}>

          {/* ═══ HOME ══════════════════════════════════════ */}
          {tab === "home" && (
            <div style={{ padding:"24px 18px 0" }}>

              {/* HERO — floating card (img1 bubble style) */}
              <div className="card-up float-anim" style={{ "--r":"0deg",
                   background:WHITE, borderRadius:24, padding:"24px 22px",
                   boxShadow:"0 16px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)",
                   marginBottom:16, position:"relative", overflow:"hidden",
                   animationDelay:".0s" }}>
                {/* Arrow icon (img1) */}
                <div style={{ position:"absolute", top:18, left:18,
                              width:36, height:36, borderRadius:"50%",
                              background:BLUE, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowIcon size={16} color={WHITE} />
                </div>
                <div style={{ paddingLeft:50 }}>
                  <Sticker text="⚡ AKSES PENUH AKTIF" color={YELLOW} />
                  <h1 style={{ fontSize:26, fontWeight:900, color:DARK,
                               lineHeight:.95, letterSpacing:"-1px", margin:"12px 0 8px" }}>
                    Semua aset<br />untuk<br />
                    <span style={{ color:BLUE }}>cuan digital.</span>
                  </h1>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.75, marginBottom:16 }}>
                    8 Juta+ produk berlisensi, kelas premium, dan ribuan aset konten siap pakai.
                  </p>
                  <div style={{ display:"flex", gap:10 }}>
                    <button className="press" onClick={() => setTab("paket1")} style={{
                      flex:1, padding:"12px 8px",
                      background:`linear-gradient(135deg,#1400FF,${BLUE})`,
                      border:"none", borderRadius:14, fontSize:12, fontWeight:800,
                      color:WHITE, cursor:"pointer",
                      boxShadow:`0 4px 14px ${BLUE}60`,
                    }}>Paket 1 · PLR →</button>
                    <button className="press" onClick={() => setTab("paket2")} style={{
                      flex:1, padding:"12px 8px",
                      background:OFF_W, border:`1.5px solid ${BLUE_G}`,
                      borderRadius:14, fontSize:12, fontWeight:800,
                      color:DARK, cursor:"pointer",
                    }}>Paket 2 · Kelas</button>
                  </div>
                </div>
              </div>

              {/* STATS — 2 col tilted cards (img2 badge style) */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                {[
                  { n:"8 Juta+",  s:"Produk Digital",         i:"📦", c:BLUE,   tilt:"-1" },
                  { n:"1.000+",   s:"Produk Terlaris",        i:"🏆", c:"#E8A000", tilt:"1" },
                  { n:"10.000+",  s:"Viral Videos",           i:"📱", c:PINK,   tilt:"-.5" },
                  { n:"4.000+",   s:"Konten Affiliate",       i:"🛍️", c:ORANGE, tilt:".8" },
                ].map(({ n,s,i,c,tilt }, idx) => (
                  <div key={n} className="card-up press" style={{
                    "--r": `${tilt}deg`,
                    background:WHITE, borderRadius:18,
                    padding:"18px 16px", textAlign:"left",
                    boxShadow:"0 8px 28px rgba(0,0,0,0.15)",
                    transform:`rotate(${tilt}deg)`,
                    animationDelay:`${.05 + idx*.06}s`,
                  }}>
                    <div style={{ fontSize:26, marginBottom:6 }}>{i}</div>
                    <div style={{ fontSize:24, fontWeight:900, color:c, lineHeight:1, marginBottom:4 }}>{n}</div>
                    <div style={{ fontSize:10, fontWeight:700, color:MUTED, letterSpacing:".5px" }}>{s}</div>
                    {/* color dot */}
                    <div style={{ position:"absolute", top:14, right:14, width:8, height:8, borderRadius:"50%", background:c }} />
                  </div>
                ))}
              </div>

              {/* QUICK ACCESS — card with list */}
              <div className="card-up" style={{ background:WHITE, borderRadius:22, padding:"20px",
                   boxShadow:"0 10px 32px rgba(0,0,0,0.14)", marginBottom:16,
                   animationDelay:".18s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <span style={{ fontSize:11, fontWeight:900, color:DARK, letterSpacing:"1px" }}>AKSES CEPAT</span>
                  <div style={{ width:28, height:3, background:`linear-gradient(90deg,${BLUE},${CYAN})`, borderRadius:2 }} />
                </div>
                {[
                  { label:"Katalog 8 Juta+ Produk",  url:"https://majestic-glove-b03.notion.site/30ef5ee2488e81389ab2ebd80bd3b901?v=30ef5ee2488e81b4ad6a000c78a84308", i:"📦", c:BLUE },
                  { label:"Kelas Editing CapCut",     url:"https://drive.google.com/drive/u/3/folders/1POU7CEJ6gBjsMTUbJfdK-iJMIzDiJrRX", i:"🎬", c:PINK },
                  { label:"Kelas Desain Canva",       url:"https://drive.google.com/drive/folders/1hI0IjDJr8BKNNlxgGWeBgC3kXOoMLWI7",  i:"🎨", c:CYAN },
                  { label:"10K Viral Videos",         url:"https://drive.google.com/drive/folders/1ld5Kk2xYRDqTjsSPdJDtl_4Kbxje6nxi",  i:"📱", c:YELLOW },
                  { label:"Konten Affiliate Shopee",  url:"https://drive.google.com/drive/folders/18hFrrnawQqL8ujwQwVex8Az1azd8L_iB",  i:"🛍️", c:ORANGE },
                  { label:"Template Social Media",    url:"https://drive.google.com/drive/folders/1g0kJTUx0_GAlgsQZznT2Fu0kUBpQ-aXP",  i:"✨", c:GREEN },
                ].map(({ label,url,i,c }, idx) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" className="row-tap"
                    style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                             padding:"11px 12px", marginBottom:6,
                             background:OFF_W, borderRadius:12,
                             borderLeft:`3px solid ${c}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:18 }}>{i}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:TEXT }}>{label}</span>
                    </div>
                    <ArrowIcon size={14} color={c} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PAKET 1 ══════════════════════════════════ */}
          {tab === "paket1" && (
            <div style={{ padding:"24px 18px 0" }}>

              {/* Header card (img1 bubble) */}
              <div className="card-up float-anim" style={{ "--r":"0deg",
                   background:WHITE, borderRadius:24, padding:"22px",
                   boxShadow:"0 14px 44px rgba(0,0,0,0.20)", marginBottom:14 }}>
                <div style={{ position:"absolute", top:18, left:18,
                              width:36, height:36, borderRadius:"50%",
                              background:`linear-gradient(135deg,#1400FF,${BLUE})`,
                              display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowIcon size={16} color={WHITE} />
                </div>
                <div style={{ paddingLeft:50 }}>
                  <Sticker text="PAKET 01 · PLR/MRR" color={BLUE_LL} />
                  <h2 style={{ fontSize:28, fontWeight:900, color:DARK, lineHeight:.95, letterSpacing:"-1px", margin:"10px 0 8px" }}>
                    8 Juta+<br /><span style={{ color:BLUE }}>Produk Digital.</span>
                  </h2>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>
                    Beli sekali. Jual berkali-kali. 100% profit. Lisensi U-PLR resmi siap diteruskan ke pembeli.
                  </p>
                </div>
              </div>

              {/* Product cards (img2 card style) */}
              {[
                { icon:"📦", name:"8 Juta+ Produk Digital Berlisensi PLR/MRR",
                  desc:"Ribuan produk siap jual dengan hak penuh",
                  link:"https://majestic-glove-b03.notion.site/30ef5ee2488e81389ab2ebd80bd3b901?v=30ef5ee2488e81b4ad6a000c78a84308",
                  btn:"Akses Katalog", c:BLUE, tilt:"-0.5" },
                { icon:"🏆", name:"1000+ Produk Terlaris – Best Seller 2026",
                  desc:"Shortcut: produk yang sudah terbukti laku",
                  link:"https://majestic-glove-b03.notion.site/30ef5ee2488e81389ab2ebd80bd3b901?v=30ef5ee2488e81b4ad6a000c78a84308",
                  btn:"Akses Terlaris", c:"#E8A000", tilt:"0.5" },
              ].map((item, i) => (
                <div key={i} className="card-up" style={{
                  background:WHITE, borderRadius:20, padding:"18px",
                  boxShadow:"0 10px 32px rgba(0,0,0,0.15)",
                  transform:`rotate(${item.tilt}deg)`,
                  marginBottom:14,
                  animationDelay:`${i*.08}s`,
                  borderTop:`4px solid ${item.c}`,
                }}>
                  <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`${item.c}18`,
                                  display:"flex", alignItems:"center", justifyContent:"center",
                                  fontSize:22, flexShrink:0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:800, color:DARK, lineHeight:1.3, marginBottom:3 }}>{item.name}</div>
                      <div style={{ fontSize:11, color:MUTED }}>{item.desc}</div>
                    </div>
                  </div>
                  <AccessBtn href={item.link} label={item.btn} color={item.c}
                    textColor={item.c === "#E8A000" ? DARK : WHITE} />
                </div>
              ))}

              {/* License box */}
              <div className="card-up" style={{ background:WHITE, borderRadius:22, overflow:"hidden",
                   boxShadow:"0 12px 38px rgba(0,0,0,0.16)", marginBottom:14,
                   animationDelay:".15s" }}>
                {/* Colored header (img2 section head) */}
                <div style={{ background:`linear-gradient(135deg,#1400FF,${BLUE})`,
                              padding:"18px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,.7)", letterSpacing:"3px", fontWeight:800 }}>DOKUMEN RESMI</div>
                    <div style={{ fontSize:16, fontWeight:900, color:WHITE, marginTop:2 }}>U-PLR Licence</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,.6)", marginTop:1 }}>Unlimited Private Label Rights</div>
                  </div>
                  <div style={{ background:"rgba(255,255,255,.15)", borderRadius:12, padding:"8px 14px", textAlign:"center" }}>
                    <div style={{ fontSize:8, color:"rgba(255,255,255,.7)", letterSpacing:"1px" }}>STATUS</div>
                    <div style={{ fontSize:14, fontWeight:900, color:GREEN }}>✓ AKTIF</div>
                  </div>
                </div>

                <div style={{ padding:"18px" }}>
                  {/* Rights */}
                  <SectionHead label="✅ HAK YANG ANDA DAPAT" color={GREEN} />
                  {RIGHTS.map((r, i) => (
                    <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", marginBottom:6,
                                          background:"#E8FFF6", borderRadius:10, borderLeft:`3px solid ${GREEN}` }}>
                      <span style={{ color:GREEN, fontWeight:900, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:12, color:TEXT, lineHeight:1.55 }}>{r}</span>
                    </div>
                  ))}
                  <div style={{ height:12 }} />
                  {/* Limits */}
                  <SectionHead label="✕ BATASAN & LARANGAN" color="#FF4444" />
                  {LIMITS.map((r, i) => (
                    <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", marginBottom:6,
                                          background:"#FFF0F0", borderRadius:10, borderLeft:`3px solid #FF4444` }}>
                      <span style={{ color:"#FF4444", fontWeight:900, flexShrink:0 }}>✕</span>
                      <span style={{ fontSize:12, color:TEXT, lineHeight:1.55 }}>{r}</span>
                    </div>
                  ))}
                  <button className="press" onClick={() => setTab("lisensi")} style={{
                    marginTop:14, width:"100%", padding:"13px",
                    background:OFF_W, border:`1.5px solid ${BLUE_G}`,
                    borderRadius:14, fontSize:12, fontWeight:800, color:BLUE,
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                  }}>
                    Panduan Lengkap Lisensi →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ PAKET 2 ══════════════════════════════════ */}
          {tab === "paket2" && (
            <div style={{ padding:"24px 18px 0" }}>
              {/* Header */}
              <div className="card-up float-anim" style={{ "--r":"0deg",
                   background:WHITE, borderRadius:24, padding:"22px",
                   boxShadow:"0 14px 44px rgba(0,0,0,0.20)", marginBottom:14 }}>
                <div style={{ position:"absolute", top:18, left:18,
                              width:36, height:36, borderRadius:"50%",
                              background:`linear-gradient(135deg,${GREEN},${CYAN})`,
                              display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ArrowIcon size={16} color={WHITE} />
                </div>
                <div style={{ paddingLeft:50 }}>
                  <Sticker text="PAKET 02 · KELAS PREMIUM" color={GREEN} />
                  <h2 style={{ fontSize:28, fontWeight:900, color:DARK, lineHeight:.95, letterSpacing:"-1px", margin:"10px 0 8px" }}>
                    Kelas<br /><span style={{ color: BLUE_D }}>+ Ribuan Aset.</span>
                  </h2>
                  <p style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>
                    Semua yang dibutuhkan untuk buat, edit, dan promosikan konten — tanpa mulai dari nol.
                  </p>
                </div>
              </div>

              {/* Kelas list */}
              {KELAS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={i} className="card-up" style={{
                    background:WHITE, borderRadius:20,
                    boxShadow:"0 8px 28px rgba(0,0,0,0.13)",
                    marginBottom:12, overflow:"hidden",
                    borderTop:`4px solid ${item.accent}`,
                    animationDelay:`${i*.06}s`,
                  }}>
                    <div className="row-tap" onClick={() => setOpen(isOpen ? null : i)}
                      style={{ padding:"16px", display:"flex", alignItems:"center",
                               gap:12, justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:46, height:46, borderRadius:13,
                                      background:`${item.accent}18`,
                                      display:"flex", alignItems:"center", justifyContent:"center",
                                      fontSize:24, flexShrink:0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color:DARK, lineHeight:1.25, marginBottom:2 }}>{item.name}</div>
                          <div style={{ fontSize:11, color:MUTED }}>{item.desc}</div>
                        </div>
                      </div>
                      {/* Chevron pill */}
                      <div style={{
                        width:28, height:28, borderRadius:8,
                        background: isOpen ? `${item.accent}20` : OFF_W,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0, fontSize:12,
                        transform: isOpen ? "rotate(90deg)" : "none",
                        transition:"transform .2s",
                      }}>
                        <ArrowIcon size={13} color={isOpen ? item.accent : MUTED} />
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ padding:"0 16px 16px", borderTop:`1px dashed ${BLUE_G}` }}>
                        <div style={{ paddingTop:12 }}>
                          {item.links ? (
                            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                              {item.links.map(({ label, url }, j) => (
                                <a key={j} href={url} target="_blank" rel="noreferrer" className="row-tap"
                                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                                           padding:"12px 14px",
                                           background:`${item.accent}10`,
                                           border:`1.5px solid ${item.accent}30`,
                                           borderRadius:12 }}>
                                  <span style={{ fontSize:13, fontWeight:700, color:TEXT }}>📁 {label}</span>
                                  <span style={{ fontSize:11, fontWeight:800, color:item.accent }}>Buka →</span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <AccessBtn href={item.link} label={item.btn} color={item.accent}
                              textColor={[YELLOW, GREEN].includes(item.accent) ? DARK : WHITE} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ LISENSI ══════════════════════════════════ */}
          {tab === "lisensi" && (
            <div style={{ padding:"24px 18px 0" }}>
              {/* Certificate card (img1 quote bubble + img2 bold style) */}
              <div className="card-up float-anim" style={{ "--r":"0deg",
                   background:`linear-gradient(160deg,#1400FF,${BLUE},${BLUE_D})`,
                   borderRadius:24, padding:"28px 22px",
                   boxShadow:"0 16px 48px rgba(20,0,255,0.35)", marginBottom:14,
                   position:"relative", overflow:"hidden" }}>
                {/* ghost marks */}
                <PlayMark size={140} opacity={0.12} style={{ position:"absolute", top:-20, right:-30, zIndex:0 }} />
                <PlayMark size={80}  opacity={0.08} style={{ position:"absolute", bottom:10, left:-20, zIndex:0 }} />
                <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                  <div className="float-anim" style={{ "--r":"0deg", display:"inline-block", marginBottom:12 }}>
                    <Logo size={52} />
                  </div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,.65)", letterSpacing:"5px", fontWeight:800, marginBottom:6 }}>
                    UNLIMITED PRIVATE LABEL RIGHTS
                  </div>
                  <div style={{ fontSize:22, fontWeight:900, color:WHITE, marginBottom:8 }}>U-PLR LICENCE</div>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,.8)", lineHeight:1.8 }}>
                    Dokumen resmi yang memberikan hak legal untuk menjual kembali, memodifikasi, dan mewariskan lisensi atas produk dalam bundle.
                  </p>
                </div>
              </div>

              {/* Rights + Limits */}
              <div className="card-up" style={{ background:WHITE, borderRadius:22, padding:"20px",
                   boxShadow:"0 10px 32px rgba(0,0,0,0.13)", marginBottom:12,
                   animationDelay:".06s" }}>
                <SectionHead label="✅ HAK YANG ANDA DAPAT" color={GREEN} />
                {RIGHTS.map((r, i) => (
                  <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", marginBottom:6,
                                        background:"#E8FFF6", borderRadius:10, borderLeft:`3px solid ${GREEN}` }}>
                    <span style={{ color:GREEN, fontWeight:900, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:12, color:TEXT, lineHeight:1.5 }}>{r}</span>
                  </div>
                ))}
              </div>

              <div className="card-up" style={{ background:WHITE, borderRadius:22, padding:"20px",
                   boxShadow:"0 10px 32px rgba(0,0,0,0.13)", marginBottom:12,
                   animationDelay:".10s" }}>
                <SectionHead label="✕ BATASAN & LARANGAN" color="#FF4444" />
                {LIMITS.map((r, i) => (
                  <div key={i} style={{ display:"flex", gap:10, padding:"9px 12px", marginBottom:6,
                                        background:"#FFF0F0", borderRadius:10, borderLeft:`3px solid #FF4444` }}>
                    <span style={{ color:"#FF4444", fontWeight:900, flexShrink:0 }}>✕</span>
                    <span style={{ fontSize:12, color:TEXT, lineHeight:1.5 }}>{r}</span>
                  </div>
                ))}
                <div style={{ marginTop:12, padding:"11px 14px",
                              background:"#FFF8E0", border:"1px solid #FFD60040",
                              borderRadius:10 }}>
                  <div style={{ fontSize:11, color:"#7A5500", lineHeight:1.7 }}>
                    ⚠️ Pelanggaran dapat berakibat pencabutan hak akses dan tindakan hukum sesuai <strong>UU No. 28 Tahun 2014</strong>.
                  </div>
                </div>
              </div>

              {/* License types (img2 badge/card style) */}
              <div className="card-up" style={{ background:WHITE, borderRadius:22, padding:"20px",
                   boxShadow:"0 10px 32px rgba(0,0,0,0.13)", marginBottom:12,
                   animationDelay:".14s" }}>
                <SectionHead label="JENIS LISENSI DALAM BUNDLE" color={BLUE} />
                {LIC_TYPES.map(({ t,c,d }) => (
                  <div key={t} style={{ display:"flex", alignItems:"center", gap:12,
                                        padding:"10px 12px", marginBottom:7,
                                        background:OFF_W, borderRadius:12,
                                        borderLeft:`3px solid ${c}` }}>
                    <div style={{ padding:"3px 10px", background:`${c}20`,
                                  borderRadius:16, fontSize:9, fontWeight:900, color:c,
                                  letterSpacing:"1px", flexShrink:0, whiteSpace:"nowrap" }}>{t}</div>
                    <span style={{ fontSize:11, color:MUTED, lineHeight:1.5 }}>{d}</span>
                  </div>
                ))}
              </div>

              {/* How to sell */}
              <div className="card-up" style={{ background:WHITE, borderRadius:22, padding:"20px",
                   boxShadow:"0 10px 32px rgba(0,0,0,0.13)", marginBottom:12,
                   animationDelay:".18s" }}>
                <SectionHead label="PANDUAN JUAL ULANG" color={BLUE} />
                {[
                  { n:"1", t:"Re-brand",       d:"Edit nama, cover, atau visual sesuai brand (opsional)" },
                  { n:"2", t:"Tentukan Harga", d:"Bebas tentukan harga — tidak ada batas" },
                  { n:"3", t:"Sertakan Lisensi",d:"Kirimkan dokumen lisensi U-PLR ini ke pembeli" },
                  { n:"4", t:"Akses Aman",     d:"Duplikasi Notion — berikan link duplikasi, bukan asli" },
                  { n:"5", t:"Cek Update",     d:"Pantau Changelog untuk update produk terbaru" },
                ].map(({ n,t,d }) => (
                  <div key={n} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
                    <div style={{ width:32, height:32, borderRadius:10, flexShrink:0,
                                  background:`linear-gradient(135deg,#1400FF,${BLUE})`,
                                  display:"flex", alignItems:"center", justifyContent:"center",
                                  fontSize:13, fontWeight:900, color:WHITE }}>
                      {n}
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:800, color:DARK, marginBottom:2 }}>{t}</div>
                      <div style={{ fontSize:12, color:MUTED, lineHeight:1.6 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── BOTTOM TAB BAR ──────────────────────────────── */}
        <div style={{
          position:"fixed", bottom:0,
          left:"50%", transform:"translateX(-50%)",
          width:"100%", maxWidth:430,
          background:DARK,
          borderTop:`1px solid rgba(255,255,255,.08)`,
          padding:"10px 12px 22px",
          display:"flex", zIndex:200,
          boxShadow:"0 -8px 32px rgba(0,0,0,0.3)",
        }}>
          {/* Blue top line */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                        background:`linear-gradient(90deg,${BLUE_L},${CYAN})` }} />
          {[
            { id:"home",    emoji:"🏠", label:"Home"    },
            { id:"paket1",  emoji:"📦", label:"Paket 1" },
            { id:"paket2",  emoji:"🎬", label:"Kelas"   },
            { id:"lisensi", emoji:"📄", label:"Lisensi" },
          ].map(({ id, emoji, label }) => {
            const active = tab === id;
            return (
              <button key={id} className="tab-btn" onClick={() => setTab(id)} style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              }}>
                <div style={{
                  width:48, height:32, borderRadius:16,
                  background: active ? `linear-gradient(135deg,#1400FF,${BLUE_L})` : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18, transition:"all .2s",
                  boxShadow: active ? `0 4px 14px ${BLUE}60` : "none",
                }}>
                  {active ? <Logo size={20} /> : <span style={{ fontSize:18 }}>{emoji}</span>}
                </div>
                <span style={{ fontSize:9, fontWeight:800, letterSpacing:".5px",
                               color: active ? BLUE_LL : "rgba(255,255,255,.3)",
                               transition:"color .2s" }}>{label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
