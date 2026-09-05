import { ponsFacts } from '@/lib/content';

export default function Story() {
  return (
    <section id="story" style={{ borderTop: '1px solid #14130f', background: '#14130f', color: '#f4f2ed' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(48px,7vw,104px) 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,5vw,72px)' }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a857d', marginBottom: 18 }}>
              origin story
            </div>
            <h2 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(36px,6vw,76px)', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.015em', margin: '0 0 24px' }}>
              Why we pay in pons
            </h2>
            <p style={{ fontSize: 'clamp(17px,1.9vw,20px)', lineHeight: 1.5, color: '#c9c4ba', maxWidth: '50ch', margin: '0 0 18px' }}>
              Reflection tokens that pay in themselves are a treadmill: the reward sells the reward, and the chart eats
              its own yield. So we picked a different payout asset.
            </p>
            <p style={{ fontSize: 'clamp(17px,1.9vw,20px)', lineHeight: 1.5, color: '#c9c4ba', maxWidth: '50ch', margin: '0 0 18px' }}>
              $pons is the token of the Robinhood launchpad — buyback-and-burn mechanics, a Uniswap partnership, and a
              market cap approaching ten figures. It is not a meme dependent on us. It has its own gravity.
            </p>
            <p style={{ fontSize: 'clamp(17px,1.9vw,20px)', lineHeight: 1.5, color: '#c9c4ba', maxWidth: '50ch', margin: 0 }}>
              So your bag of p-money stays whole while the yield arrives as something with a floor under it. Two charts
              working, one wallet collecting.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 1, background: '#2c2a25', border: '1px solid #2c2a25', alignContent: 'start', alignSelf: 'start' }}>
            {ponsFacts.map((f) => (
              <div key={f.k} style={{ background: '#14130f', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', padding: '22px 24px' }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a857d' }}>
                  {f.k}
                </span>
                <span style={{ fontSize: 17, fontWeight: 500, textAlign: 'right' }}>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
