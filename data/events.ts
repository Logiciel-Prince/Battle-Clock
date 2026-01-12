
import { GameType, EventType, EsportsEvent } from '../types';

/**
 * Fallback demo data used when the Gemini API quota is exceeded or fails.
 * This ensures the app can still demonstrate functionality.
 */
export const demoEvents: EsportsEvent[] = [
  {
    id: 'demo-bgmi-update-1',
    game: GameType.BGMI,
    eventName: 'BGMI 3.6 Update',
    eventType: EventType.UPDATE,
    startDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    version: '3.6.0',
    description: 'Major update featuring new weapons, map improvements, and gameplay optimizations for enhanced tactical combat experience.',
    highlights: [
      'New Assault Rifle: ACE32',
      'Erangel 2.0 Visual Overhaul',
      'Enhanced Anti-Cheat System',
      'New Battle Pass Season'
    ]
  },
  {
    id: 'demo-bgmi-royalpass-1',
    game: GameType.BGMI,
    eventName: 'BGMI Royal Pass Season 15',
    eventType: EventType.ROYAL_PASS,
    startDateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Started 5 days ago
    description: 'Elite tactical gear and exclusive rewards await in the latest Royal Pass season. Complete missions to unlock premium content.',
    highlights: [
      'Mythic Outfit: Shadow Operative',
      'Legendary Vehicle Skins',
      '100+ Exclusive Rewards',
      'Special Emotes & Effects'
    ]
  },
  {
    id: 'demo-bgmi-tournament-1',
    game: GameType.BGMI,
    eventName: 'BGMI Masters Series 2026',
    eventType: EventType.EVENT,
    startDateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    description: 'India\'s premier BGMI tournament featuring top esports teams competing for glory and substantial prize pool.',
    highlights: [
      'Prize Pool: ₹2 Crore',
      '24 Top Teams',
      'Live Broadcast on YouTube',
      'Special In-Game Items'
    ]
  },
  {
    id: 'demo-pubg-update-1',
    game: GameType.PUBG,
    eventName: 'PUBG Mobile 3.5 Global Update',
    eventType: EventType.UPDATE,
    startDateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    version: '3.5.0',
    description: 'Global version update bringing new content, balance changes, and performance improvements to PUBG Mobile worldwide.',
    highlights: [
      'New Map: Rondo (Arena)',
      'Weapon Balance Updates',
      'Performance Optimization',
      'New Game Mode: Intense Battle'
    ]
  },
  {
    id: 'demo-pubg-royalpass-1',
    game: GameType.PUBG,
    eventName: 'PUBG Mobile RP M20',
    eventType: EventType.ROYAL_PASS,
    startDateTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // Started 10 days ago
    description: 'Month 20 Royal Pass featuring futuristic themes and cutting-edge cosmetic rewards for elite players.',
    highlights: [
      'Futuristic Theme',
      'Upgradable Gun Skins',
      'Exclusive Parachute',
      'Premium Crate Coupons'
    ]
  },
  {
    id: 'demo-pubg-tournament-1',
    game: GameType.PUBG,
    eventName: 'PMGC 2026 Grand Finals',
    eventType: EventType.EVENT,
    startDateTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    description: 'PUBG Mobile Global Championship 2026 - The ultimate showdown of the world\'s best mobile esports teams.',
    highlights: [
      'Prize Pool: $4 Million USD',
      '32 Teams Worldwide',
      'Live from Dubai',
      'Championship Skins'
    ]
  }
];

// Legacy export for backward compatibility
export const events: EsportsEvent[] = demoEvents;
