'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import PokemonRadarChart from './PokemonRadarChart';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const getTypeColor = (typeName: string) => {
    const typeColors: { [key: string]: string } = {
      normal: 'border-gray-400 text-gray-400',
      fire: 'border-red-500 text-red-500',
      water: 'border-blue-500 text-blue-500',
      electric: 'border-yellow-400 text-yellow-400',
      grass: 'border-green-500 text-green-500',
      ice: 'border-cyan-300 text-cyan-300',
      fighting: 'border-red-700 text-red-700',
      poison: 'border-purple-500 text-purple-500',
      ground: 'border-yellow-600 text-yellow-600',
      flying: 'border-indigo-400 text-indigo-400',
      psychic: 'border-pink-500 text-pink-500',
      bug: 'border-green-400 text-green-400',
      rock: 'border-yellow-800 text-yellow-800',
      ghost: 'border-purple-700 text-purple-700',
      dragon: 'border-indigo-700 text-indigo-700',
      dark: 'border-gray-800 text-gray-800',
      steel: 'border-gray-500 text-gray-500',
      fairy: 'border-pink-300 text-pink-300',
    };
    return typeColors[typeName] || 'border-gray-400 text-gray-400';
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
    <div className="pokemon-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-shadow duration-300 animate-fade-in relative">
      {/* ポケモン番号を右上に配置 */}
      <div className="absolute top-1 right-1 px-2 py-1">
        <p className="text-sm font-bold text-white opacity-10">
          {pokemon.id.toString().padStart(3, '0')}
        </p>
      </div>

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

        <div className="flex justify-center gap-1 mb-4">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(type.type.name)}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>高さ: {pokemon.height / 10}m</span>
            <span>重さ: {pokemon.weight / 10}kg</span>
          </div>
        </div>
        <div className="space-y-2 pt-4">
          <PokemonRadarChart pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
