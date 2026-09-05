'use client';

import { useCallback, useEffect, useState } from 'react';
import { siteConfig, activeTokenAddress, dataMode } from '@/site.config';
import { fetchRounds, walletHistory, type Round, type WalletHistory } from '@/lib/rounds';
import { isAddress, readWallet, tierFor, txUrl } from '@/lib/chain';
import { commas, fromRaw, nextPayoutIn, ponsAmount, timeAgo } from '@/lib/format';

interface Result {
  address: string;
  tokens: number;
  supplyTokens: number;
  tier: ReturnType<typeof tierFor>;
  history: WalletHistory;
}

export default function Checker() {
  const [addr, setAddr] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rounds, setRounds] = useState<Round[] | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);

  // The round history is small and static; fetch it once and reuse for every check.
  useEffect(() => {
    fetchRounds().then(({ rounds }) => setRounds(rounds));
  }, []);

  // Rendered only after mount so the server and client markup agree.
  useEffect(() => {
    const tick = () => setCountdown(nextPayoutIn(siteConfig.payoutIntervalMinutes));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const check = useCallback(async () => {
    const value = addr.trim();
    if (!value) return; // no-op on empty, per the design
    setError(null);
    if (!isAddress(value)) {
      setResult(null);
      setError('that does not look like a wallet address — it should be 0x followed by 40 characters');
      return;
    }
    setChecking(true);
    try {
      const history = walletHistory(rounds ?? (await fetchRounds()).rounds, value);
      const { balanceRaw, totalSupplyRaw } = await readWallet(value);
      const tokens = fromRaw(balanceRaw, siteConfig.token.decimals);
      setResult({
        address: value,
        tokens,
        supplyTokens: fromRaw(totalSupplyRaw, siteConfig.token.decimals),
        tier: tierFor(tokens),
        history,
      });
    } catch (e) {
      setResult(null);
      setError(`could not reach the chain just now — ${(e as Error).message}`);
    } finally {
      setChecking(false);
    }
  }, [addr, rounds]);

  const onAddrChange = (v: string) => {
    setAddr(v);
    setResult(null); // result persists until the input changes
    setError(null);
  };

  const mono11 = {
    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em',
    textTransform: 'uppercase' as const, color: '#8a857d',
  };
  const cell = { background: '#f4f2ed', padding: '24px 22px' };

  const stats = result
    ? [
        { k: 'p-money held', v: commas(result.tokens, result.tokens < 1 ? 4 : 0) },
        { k: 'pons earned', v: ponsAmount(result.history.totalPonsRaw) },
        { k: 'next payout', v: countdown ?? '—' },
      ]
    : [];

  const belowMinimum = result !== null && result.tokens < siteConfig.minHoldTokens;

  return (
    <section id="checker" style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(48px,7vw,104px) 20px' }}>
      <h2 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(36px,6vw,76px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.015em', margin: '0 0 12px' }}>
        Reward checker
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.5, color: '#4a463f', maxWidth: '52ch', margin: '0 0 32px' }}>
        Paste a wallet to see its $pons distributions. The distributor settles every 15 minutes, so balances here move
        on the same clock.
      </p>

      <div style={{ border: '1px solid #14130f', background: '#e8e4da' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderBottom: '1px solid #cac5ba' }}>
          <input
            value={addr}
            onChange={(e) => onAddrChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            placeholder="0x… wallet address"
            spellCheck={false}
            aria-label="wallet address"
            style={{ flex: '1 1 260px', minWidth: 0, padding: '20px 22px', border: 0, background: 'transparent', fontSize: 15, color: '#14130f', outline: 'none' }}
          />
          <button
            onClick={check}
            disabled={checking}
            className="check-button"
            style={{ cursor: 'pointer', flex: '0 0 auto', padding: '20px 30px', border: 0, borderLeft: '1px solid #cac5ba', fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            {checking ? 'checking' : 'check'}
          </button>
        </div>

        {error && (
          <div style={{ padding: '24px 22px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#8a857d' }}>
            {error}
          </div>
        )}

        {!error && !result && (
          <div style={{ padding: '24px 22px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#8a857d' }}>
            awaiting address —
          </div>
        )}

        {result && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,160px),1fr))', gap: 1, background: '#cac5ba' }}>
              {stats.map((s) => (
                <div key={s.k} style={cell}>
                  <div style={{ ...mono11, marginBottom: 10 }}>{s.k}</div>
                  <div style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(26px,3.2vw,36px)', lineHeight: 1 }}>{s.v}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px 22px', display: 'grid', gap: 12 }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#8a857d' }}>
                {result.history.roundsPaid > 0
                  ? `tier ${result.tier?.tier ?? '—'} · ${result.history.roundsPaid} rounds paid · last ${timeAgo(result.history.lastPaidAt!)}`
                  : belowMinimum
                    ? `below minimum — hold ${siteConfig.minHold} $p-money to qualify`
                    : 'no rewards yet — the next distribution will include this wallet'}
              </div>
              {result.history.rounds.slice(0, 5).map(({ round, payout }) => (
                <div key={round.roundId} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#4a463f', borderBottom: '1px dashed #cac5ba', paddingBottom: 10 }}>
                  <span>{timeAgo(round.timestamp)}</span>
                  <span style={{ color: '#14130f' }}>+{ponsAmount(payout.amountRaw)} PONS</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {result && result.history.rounds.length > 0 && (
        <div style={{ marginTop: 'clamp(36px,5vw,60px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22 }}>
            <h3 style={{ fontFamily: 'Anton,Impact,sans-serif', fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: 0 }}>
              Recent payouts
            </h3>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a857d', margin: 0 }}>
              every round · on-chain
            </p>
          </div>
          <div style={{ border: '1px solid #14130f', overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(110px,1fr) minmax(120px,1fr) 104px 70px minmax(130px,1fr) 92px', minWidth: 680, background: '#14130f', color: '#c9c4ba', fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <div style={{ padding: '13px 16px' }}>round</div>
              <div style={{ padding: '13px 16px' }}>balance</div>
              <div style={{ padding: '13px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>% supply</div>
              <div style={{ padding: '13px 16px', textAlign: 'right' }}>tier</div>
              <div style={{ padding: '13px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>pons received</div>
              <div style={{ padding: '13px 16px', textAlign: 'right' }}>tx</div>
            </div>
            {result.history.rounds.map(({ round, payout }) => {
              const held = fromRaw(payout.balanceRaw, siteConfig.token.decimals);
              const pct = result.supplyTokens > 0 ? (held / result.supplyTokens) * 100 : 0;
              const tierDef = siteConfig.tiers[payout.tier];
              const hash = round.payoutTxHashes?.[0];
              return (
                <div key={round.roundId} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px,1fr) minmax(120px,1fr) 104px 70px minmax(130px,1fr) 92px', minWidth: 680, borderTop: '1px solid #dbd7cd', background: tierDef?.bg ?? '#f4f2ed' }}>
                  <div style={{ padding: '16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#4a463f' }}>{timeAgo(round.timestamp)}</div>
                  <div style={{ padding: '16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#4a463f' }}>{commas(held)}</div>
                  <div style={{ padding: '16px', textAlign: 'right', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#4a463f' }}>{pct < 0.01 ? '<0.01%' : `${pct.toFixed(2)}%`}</div>
                  <div style={{ padding: '16px', textAlign: 'right', fontFamily: 'Anton,Impact,sans-serif', fontSize: 18, lineHeight: 1, color: tierDef?.color ?? '#4a463f' }}>{tierDef?.mult ?? '—'}</div>
                  <div style={{ padding: '16px', textAlign: 'right', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: '#14130f' }}>+{ponsAmount(payout.amountRaw)}</div>
                  <div style={{ padding: '16px', textAlign: 'right', fontFamily: "'IBM Plex Mono',monospace", fontSize: 13 }}>
                    {hash ? (
                      <a className="mono-link" href={txUrl(hash)} target="_blank" rel="noreferrer" style={{ whiteSpace: 'nowrap' }}>view →</a>
                    ) : (
                      <span style={{ color: '#8a857d' }}>—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, lineHeight: 1.6, color: '#8a857d', margin: '16px 0 0', maxWidth: '66ch' }}>
            Balance and % supply are the snapshot taken at the moment of each round, not today&apos;s balance.
            {dataMode === 'fixture' ? ' Showing testnet rehearsal rounds until launch.' : ''}
          </p>
        </div>
      )}
    </section>
  );
}
