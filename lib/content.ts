import { siteConfig } from '@/site.config';

/**
 * Copy strings interpolate the config values, exactly as the handoff specifies: changing
 * taxPercent or minHold updates the step body, the tax strip and the caption together.
 */
const tax = siteConfig.taxPercent;
const minHold = siteConfig.minHold;
const interval = siteConfig.payoutInterval;

export const tickerItems = [
  'hold → get paid',
  'no staking',
  'no claiming',
  'paid in $pons',
  `payouts every ${interval}`,
  `min ${minHold} to qualify`,
];

export const steps = [
  {
    n: '01',
    title: 'Buy and hold',
    body: `Any wallet holding at least ${minHold} $p-money is in. Nothing to sign, nothing to lock.`,
  },
  {
    n: '02',
    title: 'The tax buys pons',
    body: `${tax}% of every buy and sell routes to the treasury wallet, which market-buys $pons on-chain.`,
  },
  {
    n: '03',
    title: 'It lands in your wallet',
    body: 'The distributor splits the $pons pro-rata by holdings and sends it out. Rewards show up as $pons, not more p-money.',
  },
];

export const taxRows = [
  { k: 'buy tax', v: `${tax}%` },
  { k: 'sell tax', v: `${tax}%` },
  { k: 'min to qualify', v: minHold },
  { k: 'payout cadence', v: `every ${interval}` },
];

export const taxCaption = `${tax}% buy, ${tax}% sell — every ${interval === '15 min' ? '15 minutes' : interval} the treasury buys $pons and pays it out pro-rata.`;

export const ponsFacts = [
  { k: 'what it is', v: 'Robinhood launchpad token' },
  { k: 'mechanics', v: 'buyback & burn' },
  { k: 'market cap', v: siteConfig.ponsMarketCap },
  { k: 'partnership', v: 'Uniswap' },
];

export const ponsTimeline = [
  { when: 'May 2025', what: 'RootsFi on Berachain — MEAD stablecoin, defended in public governance posts' },
  { when: 'Mid-July 2026', what: 'Pons launches on Robinhood Chain' },
  { when: 'July 19', what: "Passes NOXA to lead the chain's launchpads by daily actives" },
  { when: 'July 21', what: 'Vlad Tenev follows @MEADGod; the token gaps to its peak' },
];

export const footerLinks = [
  { label: 'x / twitter', href: siteConfig.xUrl },
  { label: 'dexscreener', href: siteConfig.dexscreenerUrl },
];
