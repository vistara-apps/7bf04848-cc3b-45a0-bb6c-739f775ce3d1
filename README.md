# CollabCraft - Base Mini App

A platform for creative individuals to discover collaborators with complementary skills and collectively build projects through an intuitive, version-controlled, and remixtable workflow, all within a social context.

## Features

- **Skill-Based Matching**: Tinder-like interface to discover potential collaborators
- **Project Creation**: Tools to create structured project descriptions and define roles
- **Collaboration Workflow**: Version control and remixing capabilities
- **Social Integration**: Built for Base App with Farcaster identity

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Identity**: OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion
- **TypeScript**: Full type safety

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   └── layout/           # Layout components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # App constants
│   ├── utils.ts          # Utility functions
│   └── mock-data.ts      # Mock data for development
└── public/               # Static assets
```

## Design System

The app uses a custom design system with:
- **Colors**: Primary blue, accent cyan, with glass morphism effects
- **Typography**: Clean, readable font hierarchy
- **Components**: Modular, reusable UI components
- **Motion**: Smooth animations with Framer Motion

## Base Mini App Integration

This app is built as a Base Mini App with:
- MiniKit provider configuration
- OnchainKit components for identity and wallet
- Proper manifest configuration for Base App discovery
- Mobile-first responsive design

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
