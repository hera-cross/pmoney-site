import { siteConfig } from '@/site.config';
import { steps, taxRows, taxCaption } from '@/lib/content';

export default function Yield() {
  return (
    <section id="yield" style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(48px,7vw,104px) 20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 44 }}>
        <h2 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(36px,6vw,76px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.015em', margin: 0 }}>
          How the yield works
        </h2>
        <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a857d', margin: 0 }}>
          three steps · zero clicks
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 1, background: '#dbd7cd', border: '1px solid #dbd7cd' }}>
        {steps.map((st) => (
          <div key={st.n} style={{ background: '#f4f2ed', padding: '30px 26px 34px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', color: 'oklch(0.55 0.14 148)', marginBottom: 22 }}>
              {st.n}
            </div>
            <h3 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 26, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 12px' }}>
              {st.title}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: '#4a463f', margin: 0 }}>{st.body}</p>
          </div>
        ))}
      </div>

      {/* Shares the border with the steps grid above it. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 1, background: '#dbd7cd', border: '1px solid #dbd7cd', borderTop: 0 }}>
        {taxRows.map((r) => (
          <div key={r.k} style={{ background: '#e8e4da', padding: '20px 26px' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a857d', marginBottom: 8 }}>
              {r.k}
            </div>
            <div style={{ fontSize: 19, fontWeight: 700 }}>{r.v}</div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#8a857d', margin: '18px 0 0' }}>{taxCaption}</p>

      <div style={{ marginTop: 'clamp(36px,5vw,60px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22 }}>
          <h3 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>
            Holder tiers
          </h3>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a857d', margin: 0 }}>
            bigger bag · bigger share
          </p>
        </div>
        <div style={{ border: '1px solid #14130f', overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '64px minmax(160px,1fr) 110px', minWidth: 340, background: '#14130f', color: '#c9c4ba', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <div style={{ padding: '13px 16px' }}>tier</div>
            <div style={{ padding: '13px 16px' }}>holding</div>
            <div style={{ padding: '13px 16px', textAlign: 'right' }}>multiplier</div>
          </div>
          {siteConfig.tiers.map((t) => (
            <div key={t.tier} style={{ display: 'grid', gridTemplateColumns: '64px minmax(160px,1fr) 110px', minWidth: 340, borderTop: '1px solid #dbd7cd', background: t.bg }}>
              <div style={{ padding: '18px 16px', fontFamily: 'Anton,Impact,sans-serif', fontSize: 22, lineHeight: 1 }}>{t.tier}</div>
              <div style={{ padding: '18px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, color: '#4a463f', alignSelf: 'center' }}>{t.holding}</div>
              <div style={{ padding: '18px 16px', textAlign: 'right', fontFamily: 'Anton,Impact,sans-serif', fontSize: 22, lineHeight: 1, color: t.color }}>{t.mult}</div>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, lineHeight: 1.6, color: '#8a857d', margin: '16px 0 0', maxWidth: '66ch' }}>
          Multiplier scales your pro-rata share of each $pons distribution. Tier is read live from your balance at
          snapshot — no locking, no opting in.
        </p>
      </div>
    </section>
  );
}
