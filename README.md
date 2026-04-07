# Blackjack (WIP)

A small Blackjack web app built with **React + TypeScript**.

## Project Structure

The project separates **game logic from UI**, which makes it easier to extend later.

```
src
 ├─ game
 │   ├─ types.ts
 │   ├─ deck.ts
 │   ├─ scoring.ts
 │   └─ blackjackEngine.ts
 │
 ├─ components
 │   └─ Card.tsx
 │
 ├─ App.tsx
 └─ main.tsx
```

- `game/` contains the Blackjack logic (deck, scoring, rules)
- `components/` contains React UI pieces
- `App.tsx` connects the UI to the game engine

## Running the Project

Requirements:

- Node 22 recommended
- npm

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Then open the local URL shown in the terminal.

## Planned Improvements

Some things I wanna add next:

- PNG card graphics
- hide dealer hole card
- basic chip / betting system
- simple card animations
- better mobile layout
