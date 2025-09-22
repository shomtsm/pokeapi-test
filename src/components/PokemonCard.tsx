'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const getTypeColor = (typeName: string) => {
    const typeColors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-cyan-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return typeColors[typeName] || 'bg-gray-400';
  };

  const getStatName = (statName: string) => {
    const statNames: { [key: string]: string } = {
      hp: 'HP',
      attack: '攻撃',
      defense: '防御',
      'special-attack': '特攻',
      'special-defense': '特防',
      speed: '素早さ',
    };
    return statNames[statName] || statName;
  };

  return (
    <div className="pokemon-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-shadow duration-300 animate-fade-in">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="128px"
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 capitalize">
          {pokemon.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          No. {pokemon.id.toString().padStart(3, '0')}
        </p>
        
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(type.type.name)}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">ステータス</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  {getStatName(stat.stat.name)}
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>高さ: {pokemon.height / 10}m</span>
            <span>重さ: {pokemon.weight / 10}kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
