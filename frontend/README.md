# Zorya Proxy Frontend

Frontend application for **Zorya Proxy** - Enterprise AI Security Gateway protecting data privacy & optimizing costs.

## Overview

This is the web interface for Zorya Proxy, built with React, TypeScript, and Vite. It provides an intuitive dashboard for managing and monitoring your AI security gateway.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **TanStack Query** - Data fetching and caching
- **Biome** - Linting and formatting
- **Radix UI** - Accessible components

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Build the application:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Code Quality

### Linting

Check for code issues:

```bash
npm run lint
```

Auto-fix issues:

```bash
npm run lint:fix
```

### Formatting

Format code:

```bash
npm run format
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React contexts
├── features/       # Feature-based modules
├── hooks/          # Custom React hooks
├── interfaces/     # TypeScript interfaces
├── layouts/        # Layout components
├── lib/            # Utility functions
├── pages/          # Page components
├── providers/      # React providers
└── types/          # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code with Biome
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome

## Contributing

Ensure all code passes linting and formatting checks before committing:

```bash
npm run lint:fix
npm run format
```

## License

Copyright © 2026 Zorya Proxy. All rights reserved.
