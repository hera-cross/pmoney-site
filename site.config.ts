/**
 * Every launch-dependent value lives here and nowhere else.
 *
 * scripts/launch.mjs in the keeper repo rewrites `token.address` and flips `dataMode` to 'live'
 * on GO, so launch day does not involve hand-editing components.
 */

export type DataMode = 'fixture' | 'live';

/**
 * 'fixture' reads the seeded testnet round history and testnet chain; 'live' reads mainnet.
 * The `as DataMode` widens the literal so comparisons elsewhere type-check; scripts/launch.mjs
 * rewrites the quoted value on GO.
 */
export const dataMode = 'fixture' as DataMode;

export const siteConfig = {
  /** ---- filled at launch by scripts/launch.mjs ---- */
  token: {
    // p-money on Robinhood Chain mainnet. Empty until the Pons launch.
    address: '',
    decimals: 18,
  },

  /** Pons buy link — the launchpad page for p-money. Empty renders the button disabled. */
  buyUrl: '',
  xUrl: 'https://x.com/pmoneyonrh',
  dexscreenerUrl: '',

  /** Copy value in the "why we pay in pons" fact list. Update as PONS moves. */
  ponsMarketCap: '~$1B today',

  /** ---- economics, mirrored from the keeper's config.json ---- */
  taxPercent: 1,
  minHold: '10,000',
  minHoldTokens: 10_000,
  payoutInterval: '15 min',
  payoutIntervalMinutes: 15,

  /** ---- the round history the site reads (published by the keeper's LOG step) ---- */
  roundsUrl: 'https://raw.githubusercontent.com/hera-cross/p-money-data/main/rounds.json',
  fixtureUrl: '/rounds.testnet.json',

  /** ---- chain, per mode ---- */
  chains: {
    live: {
      chainId: 4663,
      rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
      explorer: 'https://robinhoodchain.blockscout.com',
    },
    fixture: {
      chainId: 46630,
      rpcUrl: 'https://rpc.testnet.chain.robinhood.com',
      explorer: 'https://explorer.testnet.chain.robinhood.com',
      // The seeded testnet stand-in for p-money, so the checker works before launch.
      tokenAddress: '0x3758100a06a2d255b4f488969cc48a49305e331c',
    },
  },

  /** ---- transparency block: public, verifiable, unchanging ---- */
  addresses: {
    keeper: '0x4733F517f02AC8ab3543A04B2b8145c69B0F596f',
    treasury: '0x63Faf7649c073a5AB0064Db4A488f191b76D5486',
    disperse: '0xF3Ec52A23Bce65339645A458B5d4934094C9812E',
    ponsEscrow: '0xd3AFEB2a57f70eF218Aa82451c51B2fb0416Ac9e',
  },

  /** ---- tiers, mirrored from the keeper's rules.tiers ---- */
  tiers: [
    { tier: '1', min: 10_000, max: 99_999, holding: '10,000 – 99,999', mult: '1.0x', multiplier: 1.0, bg: '#f4f2ed', color: '#4a463f' },
    { tier: '2', min: 100_000, max: 999_999, holding: '100,000 – 999,999', mult: '1.25x', multiplier: 1.25, bg: '#f4f2ed', color: '#4a463f' },
    { tier: '3', min: 1_000_000, max: 9_999_999, holding: '1,000,000 – 9,999,999', mult: '1.5x', multiplier: 1.5, bg: '#eef4f0', color: 'oklch(0.5 0.13 150)' },
    { tier: '4', min: 10_000_000, max: Infinity, holding: '10,000,000+', mult: '2.0x', multiplier: 2.0, bg: '#e4efe8', color: 'oklch(0.45 0.14 150)' },
  ],
} as const;

export const activeChain = dataMode === 'live' ? siteConfig.chains.live : siteConfig.chains.fixture;

/** In fixture mode the checker reads the seeded testnet token so it genuinely works pre-launch. */
export const activeTokenAddress: string =
  dataMode === 'live' ? siteConfig.token.address : siteConfig.chains.fixture.tokenAddress;
