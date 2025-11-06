# Paysol DApp

A small Solana web3 dApp built with React, TypeScript and Vite that demonstrates connecting wallets, signing messages, and sending/previewing transactions. This repository contains UI components and wiring to the Solana wallet adapter ecosystem.

---

## Table of contents

- Project overview
- Tech stack
- Quick start
- Scripts
- Project structure
- Important components
- Development notes (Solana & wallets)
- Common issues & troubleshooting
- Contributing
- License

---

## Project overview

Paysol DApp is a lightweight front-end demonstration that integrates the Solana Wallet Adapter to let users connect a wallet, sign messages, and interact with Solana transactions. It is intended as a starter/demo app and a learning reference for wallet integrations.

Key goals:
- Demonstrate connecting to wallets using @solana/wallet-adapter
- Show message signing and verification using ed25519
- Provide small, focused React components (sign message, transaction flow, balance display)

## Tech stack

- Framework: React 19 + TypeScript
- Bundler: Vite
- Solana libraries: @solana/web3.js, @solana/wallet-adapter-*
- Crypto: @noble/curves (ed25519)
- Styling: Tailwind CSS (project includes tailwind-related deps)

You can find the exact versions in `package.json`.

## Quick start (dev)

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Open http://localhost:5173 (default Vite port) and connect a Solana wallet (Phantom, etc.) via the provided wallet adapter UI.

## Scripts

From `package.json`:

- `dev` - start Vite dev server
- `build` - run TypeScript build then Vite production build
- `preview` - preview the production build locally
- `lint` - run ESLint

Run them with `npm run <script>`.

## Project structure

Top-level files you'll care about:

- `index.html` - Vite entry
- `src/main.tsx` - React entry point
- `src/App.tsx` - App shell and routing
- `src/signmessage.tsx` - component to sign and verify messages using the connected wallet
- `src/transaction.tsx` - transaction example component
- `src/currentBalance.tsx` - current balance display component
- `vite.config.ts` - Vite config
- `tsconfig*.json` - TypeScript configuration

Note: The repository uses TypeScript and Tailwind-enabled styles (check `index.css` and `App.css`).

## Important components & how they work

- `SignMessage` (`src/signmessage.tsx`)
  - Uses `@noble/curves/ed25519` and the wallet adapter's `signMessage` method to sign and locally verify a message.
  - Typical flow: the user types a message -> submit -> message encoded -> wallet.signMessage called -> ed25519.verify used to confirm signature (client-side verification).

- `transaction.tsx`
  - Contains examples to create and send Solana transactions using `@solana/web3.js` (check the file to see how instructions and connections are composed).

- `currentBalance.tsx`
  - Small component to fetch and show the connected wallet's SOL balance.

## Development notes (Solana & wallets)

- The app uses `@solana/wallet-adapter-react` and related packages. The wallet adapter exposes `signMessage`, `signTransaction`, and connection helpers depending on the connected wallet. Not all wallets implement the same methods — always guard calls with feature checks (the code in `signmessage.tsx` does this).
- In local dev, if you use Phantom, install the Phantom extension and connect to devnet (or set endpoint accordingly).
- When verifying signatures on the client, the public key from the wallet is used with `ed25519.verify`.

Security note: Never send untrusted raw private keys anywhere. Use the wallet provider to request signatures only when necessary and always validate user intent.

## Environment variables

This starter does not include environment variables by default. If you add RPC endpoints or API keys, keep them in a `.env` file and never commit secrets. Example:

```
VITE_SOLANA_RPC=https://api.devnet.solana.com
```

## Common issues & troubleshooting

- "Wallet not connecting" — ensure your wallet extension is installed and unlocked. Check the browser console for adapter errors.
- "signMessage is undefined" — not every wallet supports `signMessage`. Use the wallet adapter's feature detection before calling.
- TypeScript errors after adding packages — run `npm install` and ensure your `tsconfig` includes the right paths; some wallet adapter types require @types packages.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch
3. Add tests or build artifacts if needed
4. Open a PR with a clear description of changes

Coding style: Prefer small, focused commits. Use TypeScript types for component props and avoid `any` when possible.

## Files changed in this repo (quick map)

- `src/` — main app source
  - `App.tsx` — app shell
  - `main.tsx` — bootstraps the app + wallet providers
  - `signmessage.tsx` — message signing demo
  - `transaction.tsx` — transaction demo
  - `currentBalance.tsx` — simple balance viewer

## License

This project is licensed under the MIT License — see `LICENSE` for details.

---

If you'd like, I can also:
- add a short demo GIF or screenshots
- expand the README's API examples (small code snippets showing connecting wallet + sending transaction)
- add CI checks or a simple GitHub Actions workflow to run lint and typecheck

If you want any of those, tell me which and I'll add them.

