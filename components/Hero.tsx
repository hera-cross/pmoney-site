import { siteConfig } from '@/site.config';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative', maxWidth: 1240, margin: '0 auto',
        padding: 'clamp(40px,7vw,96px) 20px clamp(32px,5vw,64px)',
        background: 'radial-gradient(70% 60% at 78% 30%, rgba(163,212,182,0.28), transparent 70%)',
      }}
    >
      <div
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,330px),1fr))',
          gap: 'clamp(32px,5vw,72px)', alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(40px,7.5vw,128px)', lineHeight: 0.85,
              letterSpacing: '-0.02em', textTransform: 'uppercase', margin: '0 0 22px', textWrap: 'balance',
              hyphens: 'none', wordBreak: 'keep-all',
            }}
          >
            {/* U+2011 non-breaking hyphen: a normal hyphen breaks the word. */}
            Hold p&#8209;money.
            <br />
            <span
              data-sheen
              style={{
                backgroundImage:
                  'linear-gradient(100deg,#3d5a49 0%,#131d17 14%,#5f7f6d 27%,#a3812f 37%,#1d2c24 50%,#6f8a7c 63%,#16231c 78%,#a3812f 89%,#44614f 100%)',
                backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', animation: 'sheen 9s linear infinite',
                filter: 'drop-shadow(0 2px 0 rgba(255,255,255,0.85))',
              }}
            >
              Get paid pons.
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(17px,2vw,21px)', lineHeight: 1.45, color: '#4a463f', maxWidth: '44ch', margin: '0 0 30px' }}>
            A tax on every trade buys $pons on the open market and pushes it to holder wallets. No staking. No claiming.
            No lockups. You hold, it lands.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <a
              href={siteConfig.buyUrl || '#'}
              target={siteConfig.buyUrl ? '_blank' : undefined}
              rel="noreferrer"
              className="buy-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRadius: 4,
                fontWeight: 700, fontSize: 16,
                boxShadow: '0 8px 24px rgba(74,132,98,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              Buy $p-money →
            </a>
            <a
              href={siteConfig.xUrl || '#'}
              target={siteConfig.xUrl ? '_blank' : undefined}
              rel="noreferrer"
              className="x-button"
              style={{
                display: 'inline-flex', alignItems: 'center', padding: '16px 26px', borderRadius: 4, gap: 10,
                border: '1px solid #14130f', fontWeight: 500, fontSize: 16,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
              Follow on X
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 'min(100%,460px)', aspectRatio: '1', display: 'grid', placeItems: 'center' }}>
            <div
              style={{
                position: 'absolute', inset: '6%',
                background: 'radial-gradient(58% 50% at 48% 40%, rgba(170,212,186,0.4), transparent 72%)',
              }}
            />
            <img
              src="/logo.png" alt="p-money"
              style={{ width: '92%', maxWidth: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 20px 34px rgba(52,92,68,0.28))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
