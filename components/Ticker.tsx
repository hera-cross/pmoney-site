import { tickerItems } from '@/lib/content';

export default function Ticker() {
  const row = (key: string) => (
    <div key={key} style={{ display: 'flex', gap: 36, paddingRight: 36 }}>
      {tickerItems.map((t, i) => (
        <span key={`${key}-${i}`} style={{ whiteSpace: 'nowrap', color: '#c9c4ba' }}>
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div
      style={{
        borderTop: '1px solid #14130f', borderBottom: '1px solid #14130f', background: '#14130f',
        color: '#f4f2ed', overflow: 'hidden', padding: '13px 0',
      }}
    >
      {/* The list appears twice so the -50% translate loops seamlessly. */}
      <div
        data-marquee
        style={{
          display: 'flex', width: 'max-content', animation: 'marq 30s linear infinite',
          fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}
      >
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}
