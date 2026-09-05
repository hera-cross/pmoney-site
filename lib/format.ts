/** Fixed-point helpers. All chain amounts arrive as base-10 strings of wei-like integers. */

export function fromRaw(raw: string | bigint, decimals = 18): number {
  const v = typeof raw === 'bigint' ? raw : BigInt(raw || '0');
  const base = 10n ** BigInt(decimals);
  const whole = v / base;
  const frac = v % base;
  return Number(whole) + Number(frac) / Number(base);
}

export const commas = (n: number, dp = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

/** PONS amounts are small; show enough decimals to be meaningful without noise. */
export function ponsAmount(raw: string | bigint): string {
  const n = fromRaw(raw, 18);
  if (n === 0) return '0';
  if (n < 0.0001) return n.toExponential(2);
  if (n < 1) return n.toFixed(4);
  if (n < 1000) return n.toFixed(3);
  return commas(n, 2);
}

export function timeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - Date.parse(iso)) / 1000);
  if (!Number.isFinite(secs) || secs < 0) return '—';
  if (secs < 90) return `${secs} sec ago`;
  const mins = Math.round(secs / 60);
  if (mins < 90) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 36) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} days ago`;
}

export const shortAddr = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;

/** Countdown to the end of the current payout epoch. Always reads under the interval. */
export function nextPayoutIn(intervalMinutes: number, now = Date.now()): string {
  const period = intervalMinutes * 60_000;
  const remaining = period - (now % period);
  const total = Math.floor(remaining / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (x: number) => String(x).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
