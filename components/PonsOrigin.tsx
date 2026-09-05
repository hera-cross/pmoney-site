import { ponsTimeline } from '@/lib/content';

export default function PonsOrigin() {
  return (
    <section id="pons-origin" style={{ borderTop: '1px solid #2c2a25', background: '#14130f', color: '#f4f2ed' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(48px,7vw,104px) 20px' }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9ab63', marginBottom: 16 }}>
          the pons origin story
        </div>
        <h2 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(34px,5.6vw,72px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.015em', margin: '0 0 16px' }}>
          A dog avatar and a launchpad
        </h2>
        <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', lineHeight: 1.5, color: '#a39e96', maxWidth: '58ch', margin: '0 0 44px' }}>
          The asset we pay you in came out of nowhere in five days. Short version, for anyone who missed July.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 20, alignItems: 'start' }}>
          <div style={{ border: '1px solid #2c2a25', borderRadius: 8, padding: 'clamp(24px,3vw,36px)', display: 'grid', gap: 18 }}>
            <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', lineHeight: 1.55, color: '#c9c4ba', margin: 0 }}>
              Pons was built by a pseudonymous developer posting as <strong style={{ color: '#f4f2ed' }}>Ozzy</strong> under
              the <strong style={{ color: '#c9ab63' }}>@MEADGod</strong> handle — public face, a Pomeranian. His documented
              prior work is RootsFi, a Berachain lending protocol minting the MEAD stablecoin, argued out in
              governance-forum posts through May 2025.
            </p>
            <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', lineHeight: 1.55, color: '#c9c4ba', margin: 0 }}>
              Pons landed on Robinhood Chain in mid-July 2026 and became the chain&apos;s busiest launchpad inside a week.
              Then Robinhood&apos;s CEO followed the account, and the token repriced within hours. Fee revenue moved
              on-chain where holders can watch it; buybacks and burns followed.
            </p>
            <p style={{ fontSize: 'clamp(16px,1.8vw,19px)', lineHeight: 1.55, color: '#a39e96', margin: 0 }}>
              That is the asset behind our payouts: a launchpad token with real fee flow and a burn — and a chart that
              has nothing to do with ours.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ border: '1px solid #2c2a25', borderRadius: 8, padding: 'clamp(24px,3vw,32px)' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c9ab63', marginBottom: 20 }}>
                five days, july 2026
              </div>
              <div style={{ display: 'grid', gap: 14 }}>
                {ponsTimeline.map((t) => (
                  <div key={t.when} style={{ display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed #2c2a25', paddingBottom: 12 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.06em', color: '#8a857d', whiteSpace: 'nowrap' }}>
                      {t.when}
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.4, color: '#f4f2ed', textAlign: 'right' }}>{t.what}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: '1px solid #2c2a25', borderRadius: 8, padding: 'clamp(24px,3vw,32px)' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c9ab63', marginBottom: 16 }}>
                the numbers
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
                <div>
                  <div style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1 }}>$30M</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a857d', marginTop: 6 }}>
                    mcap, first 5 days
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(30px,4vw,44px)', lineHeight: 1 }}>58,000</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a857d', marginTop: 6 }}>
                    daily active addresses
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, lineHeight: 1.7, color: '#6b6760', margin: '20px 0 0' }}>
                reported july 2026 · phemex academy
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
