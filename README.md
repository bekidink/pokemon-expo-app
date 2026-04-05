# Pokémon Expo App

**A modern, production-ready Pokémon mobile app built with Expo for the Senior Developer Assessment.**

![Pokémon App Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Pok%C3%A9dex+Preview)  
*(Replace with actual screenshots after running the app)*

## ✨ Overview

This is a complete Pokémon mobile application that meets **and exceeds** all requirements from the Senior Developer Assessment (Expo):

- ✅ Pokémon list screen with search
- ✅ Pokémon detail screen with rich information
- ✅ Real-time data from PokeAPI
- ✅ Smooth navigation (Expo Router)
- ✅ Professional loading & error states
- ✅ Senior-level code quality, architecture, and best practices

The UI has been significantly improved beyond the reference mockup for a premium, modern feel while staying faithful to the Pokémon theme.

## 🚀 Features

- **List Screen**
  - Beautiful grid layout with official artwork
  - Real-time search ("Who are you looking for?")
  - Pull-to-refresh support
  - Skeleton loading states

- **Detail Screen** (Winning UI)
  - Dynamic header color based on primary type
  - Large hero artwork with animation
  - Floating type badges
  - Segmented tabs: **About • Stats • Moves**
  - Flavor text from Pokémon species API
  - Beautiful animated stat bars
  - Breeding info (height/weight)
  - Preview of moves

- **Technical Highlights**
  - Full TypeScript with strict mode
  - TanStack React Query v5 (caching, loading, error handling, retries)
  - NativeWind (Tailwind CSS) + React Native Paper
  - Clean architecture (hooks, services, types, utils)
  - Reusable components
  - Basic unit tests

## 🛠 Tech Stack

| Technology              | Version    | Purpose                          |
|-------------------------|------------|----------------------------------|
| Expo                    | ~52        | Framework & build tool           |
| Expo Router             | ~4         | File-based navigation            |
| React Native            | 0.76       | Core framework                   |
| TypeScript              | ^5         | Type safety                      |
| NativeWind              | ^4         | Tailwind CSS styling             |
| React Native Paper      | ^5         | High-quality UI components       |
| TanStack React Query    | ^5         | Data fetching & caching          |
| Lucide React Native     | ^1         | Icons                            |


## 🏗 Architecture Highlights

- **Senior best practices** followed:
  - Feature-based folder structure
  - Separation of concerns (API service, hooks, components)
  - Centralized query client with smart defaults
  - Fully type-safe PokeAPI integration
  - Reusable, testable components
  - Clean, maintainable, and scalable code
pokemon-expo-app/
├── app/
│   ├── _layout.tsx              # Root layout + providers
│   ├── index.tsx                # Pokémon List Screen
│   └── pokemon/[name].tsx       # Pokémon Detail Screen
├── components/
│   ├── PokemonCard.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorState.tsx
├── hooks/
│   ├── usePokemonList.ts
│   └── usePokemonDetail.ts
├── services/
│   └── pokeApi.ts
├── types/
│   └── pokemon.ts
├── lib/
│   └── queryClient.ts
├── utils/
│   └── formatters.ts
├── tests/                       # Basic tests
│   └── components/PokemonCard.test.tsx
├── app.json
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── README.md
└── .env.example
## 📲 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/bekidink/pokemon-expo-app.git
cd pokemon-expo-app

npm install
npx expo start
npm run start      # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web (for quick testing)
npm test           # Run Jest tests

