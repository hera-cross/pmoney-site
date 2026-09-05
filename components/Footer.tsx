import { siteConfig } from '@/site.config';
import { footerLinks } from '@/lib/content';

/**
 * The four addresses are mainnet contracts and wallets, so they always link to the mainnet
 * explorer — independent of whether the checker is reading fixture or live data.
 */
const EXPLORER = siteConfig.chains.live.explorer;

const TRANSPARENCY = [
  { label: 'fee / distribution wallet', address: siteConfig.addresses.keeper },
  { label: 'treasury', address: siteConfig.addresses.treasury },
  { label: 'disperse contract', address: siteConfig.addresses.disperse },
  { label: 'pons fee escrow', address: siteConfig.addresses.ponsEscrow },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #dbd7cd', padding: '44px 20px 56px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="p-money" style={{ width: 34, height: 34, display: 'block' }} />
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6760' }}>
            p-money · paid in pons
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href || '#'}
              className="pill-link"
              target={l.href ? '_blank' : undefined}
              rel="noreferrer"
              style={{ padding: '10px 15px', borderRadius: 4 }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Transparency: every wallet and contract the payout touches, verifiable on Blockscout. */}
      <div style={{ maxWidth: 1240, margin: '32px auto 0', border: '1px solid #dbd7cd' }}>
        <div style={{ background: '#e8e4da', padding: '12px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a857d', borderBottom: '1px solid #dbd7cd' }}>
          transparency · every payout is one on-chain transaction
        </div>
        {TRANSPARENCY.map((t) => (
          <div
            key={t.address}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
              gap: 4, padding: '12px 16px', borderTop: '1px solid #dbd7cd', background: '#f4f2ed',
              fontFamily: "'IBM Plex Mono',monospace", fontSize: 12,
            }}
          >
            <span style={{ letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a857d' }}>{t.label}</span>
            <a
              className="mono-link"
              href={`${EXPLORER}/address/${t.address}`}
              target="_blank"
              rel="noreferrer"
              style={{ wordBreak: 'break-all' }}
              title={t.address}
            >
              <span style={{ display: 'inline' }}>{t.address}</span>
            </a>
          </div>
        ))}
      </div>

      <p style={{ maxWidth: 1240, margin: '32px auto 0', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, lineHeight: 1.7, color: '#8a857d' }}>
        $p-money is a meme token with no intrinsic value or expectation of financial return. $pons is an unaffiliated
        third-party asset. Nothing here is investment advice.
      </p>
    </footer>
  );
}
