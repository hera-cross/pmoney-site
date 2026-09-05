import { siteConfig } from '@/site.config';

const NAV = [
  { href: '#yield', label: 'yield' },
  { href: '#story', label: 'story' },
  { href: '#pons-origin', label: 'pons' },
  { href: '#checker', label: 'checker' },
];

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 16, padding: '12px 20px',
        background: 'rgba(244,242,237,0.86)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #dbd7cd',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="/logo.png" alt="p-money"
          style={{ width: 38, height: 38, display: 'block', filter: 'drop-shadow(0 2px 5px rgba(96,150,116,0.3))' }}
        />
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          p-money
        </span>
      </div>
      <nav
        style={{
          display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap',
          fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}
      >
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="nav-link" style={{ padding: '8px 10px' }}>
            {n.label}
          </a>
        ))}
        <a
          href={siteConfig.buyUrl || '#'}
          target={siteConfig.buyUrl ? '_blank' : undefined}
          rel="noreferrer"
          className="buy-pill"
          style={{ padding: '10px 18px', marginLeft: 8, borderRadius: 4, fontWeight: 500 }}
        >
          buy
        </a>
      </nav>
    </header>
  );
}
