# p-money site

Single-page marketing site for **p-money**, built from `design_handoff_pmoney_site`.

Live: https://pmoney-site.vercel.app

## Where things live

| What | File |
|---|---|
| Every launch-dependent value | `site.config.ts` |
| Copy that interpolates config (tax %, min hold, cadence) | `lib/content.ts` |
| Round history fetch + per-wallet maths | `lib/rounds.ts` |
| Chain reads (balance, supply, tier) | `lib/chain.ts` |
| Sections | `components/` |

## Data

The reward checker combines two sources:

- **balance and tier** — read live from the chain in the browser over public RPC
- **PONS received, rounds paid, last paid** — from `rounds.json`, which the p-money keeper
  commits and pushes at the end of every payout round to
  [p-money-data](https://github.com/hera-cross/p-money-data)

`dataMode` in `site.config.ts` selects between the seeded **testnet fixture**
(`public/rounds.testnet.json`, used before launch) and the **live** mainnet history. The keeper's
`scripts/launch.mjs` flips it and writes the token address on a GO.

## Deploys

Pushes to `main` deploy automatically via the connected Vercel project. Local:

```
npm install
npm run dev     # http://localhost:3000
npm run build
```
