import { activeChain, activeTokenAddress, siteConfig } from '@/site.config';

/**
 * Minimal JSON-RPC reads, done straight from the browser against the public endpoint. No wallet
 * connection, no library: the checker only ever reads, so eth_call with two hand-built selectors
 * is the whole surface — and it keeps the client bundle tiny.
 */

const BALANCE_OF = '0x70a08231';
const TOTAL_SUPPLY = '0x18160ddd';

async function ethCall(to: string, data: string): Promise<string> {
  const res = await fetch(activeChain.rpcUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to, data }, 'latest'] }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message ?? 'rpc error');
  return json.result as string;
}

export const isAddress = (a: string) => /^0x[0-9a-fA-F]{40}$/.test(a.trim());

export interface ChainRead {
  balanceRaw: bigint;
  totalSupplyRaw: bigint;
}

export async function readWallet(address: string): Promise<ChainRead> {
  if (!activeTokenAddress) throw new Error('token address not configured yet');
  const padded = address.trim().toLowerCase().replace(/^0x/, '').padStart(64, '0');
  const [bal, supply] = await Promise.all([
    ethCall(activeTokenAddress, BALANCE_OF + padded),
    ethCall(activeTokenAddress, TOTAL_SUPPLY),
  ]);
  return { balanceRaw: BigInt(bal || '0x0'), totalSupplyRaw: BigInt(supply || '0x0') };
}

/** Tier for a whole-token balance, mirroring the keeper's tierFor(): highest floor reached. */
export function tierFor(tokens: number) {
  let found = null as (typeof siteConfig.tiers)[number] | null;
  for (const t of siteConfig.tiers) if (tokens >= t.min) found = t;
  return found;
}

export const txUrl = (hash: string) => `${activeChain.explorer}/tx/${hash}`;
export const addressUrl = (addr: string) => `${activeChain.explorer}/address/${addr}`;
