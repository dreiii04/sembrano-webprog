# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Vercel deployment

Deploy the app as two Vercel projects:

1. `sembrano-client`
	- Root directory: `sembrano-client`
	- Build command: `npm run build`
	- Output directory: `dist`
	- Environment variable: `VITE_API_URL=https://<your-server-project>.vercel.app/api`

2. `sembrano-server`
	- Root directory: `sembrano-server`
	- Deploy `index.js` with the included `vercel.json`
	- Environment variable: `MONGO_URI=<your-mongodb-connection-string>`

Verification steps:

- Open `https://<your-server-project>.vercel.app/api/health`
- Open `https://<your-client-project>.vercel.app`
- Make sure the client can reach the server URL in `VITE_API_URL`
