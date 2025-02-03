This is a solution for a coding interview homework assingment. [Task instructions](/REQUIREMENTS.MD)

## Deployed demo

Deployed demo [here](https://bwrt.vercel.app/)

## Local development

### Requirements:
- [node.js](https://nodejs.org/en) at lastest version
- [pnpm](https://pnpm.io/installation)

### Setup

Inside the root project folder run: `pnpm install`

Input your [coingecko api key](https://docs.coingecko.com/v3.0.1/reference/setting-up-your-api-key) into a new file called .env in the root folder.
The .env file should be in the following format:
```
COINGECKO_API_KEY=YOUR_API_KEY
```
### Running unit tests

Single run: `pnpm run test`
Watch mode: `pnpm run test:watch`

### Running dev server

`pnpm run dev`

## Bulding for production

`pnpm run build`

## Deploy demo

Push to main to deploy an updated demo.


