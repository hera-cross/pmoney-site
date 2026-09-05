import { siteConfig, dataMode } from '@/site.config';

/** The keeper's §10 round record, as published to rounds.json. */
export interface Payout {
  address: string;
  balanceRaw: string;
  tier: number;
  amountRaw: string;
}

export interface Round {
  roundId: number;
  status: 'PAID' | 'SKIPPED_LOW_FEES' | 'SKIPPED_NO_HOLDERS';
  snapshotBlock?: number;
  timestamp: string;
  ethSpentWei?: string;
  ponsDistributedRaw?: string;
  ponsDustRaw?: string;
  recipientCount?: number;
  swapTxHash?: string;
  payoutTxHashes?: string[];
  payouts?: Payout[];
  dryRun?: boolean;
  swapStubbed?: boolean;
}

/**
 * Reads the published history. The live file is a static object on raw.githubusercontent.com —
 * no API, no server. Before launch (or if the CDN is cold) it falls back to the bundled testnet
 * fixture so the page always renders something real rather than an error state.
 */
export async function fetchRounds(): Promise<{ rounds: Round[]; source: 'live' | 'fixture' }> {
  const tryUrl = async (url: string): Promise<Round[] | null> => {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) ? (data as Round[]) : null;
    } catch {
      return null;
    }
  };

  if (dataMode === 'live') {
    const live = await tryUrl(siteConfig.roundsUrl);
    if (live) return { rounds: live, source: 'live' };
  }
  const fixture = await tryUrl(siteConfig.fixtureUrl);
  return { rounds: fixture ?? [], source: 'fixture' };
}

export interface WalletHistory {
  rounds: Array<{ round: Round; payout: Payout }>;
  totalPonsRaw: bigint;
  roundsPaid: number;
  lastPaidAt: string | null;
}

/** Everything the checker shows about one wallet, derived from the published history. */
export function walletHistory(rounds: Round[], address: string): WalletHistory {
  const want = address.toLowerCase();
  const matched = rounds
    .filter((r) => r.status === 'PAID')
    .map((round) => {
      const payout = (round.payouts ?? []).find((p) => p.address.toLowerCase() === want);
      return payout ? { round, payout } : null;
    })
    .filter((x): x is { round: Round; payout: Payout } => x !== null)
    .sort((a, b) => Date.parse(b.round.timestamp) - Date.parse(a.round.timestamp));

  return {
    rounds: matched,
    totalPonsRaw: matched.reduce((s, m) => s + BigInt(m.payout.amountRaw), 0n),
    roundsPaid: matched.length,
    lastPaidAt: matched[0]?.round.timestamp ?? null,
  };
}
