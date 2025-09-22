'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { getTypeColor } from '@/lib/pokemon-utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {

  return (
    <div 
      className="pokemon-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300 animate-fade-in relative cursor-pointer hover:shadow-xl hover:scale-105"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 px-2 py-1">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500">
          #{pokemon.id.toString().padStart(3, '0')}
        </p>
      </div>

      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <Image
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            fill
            className="object-contain"
            sizes="96px"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 capitalize">
          {pokemon.name}
        </h3>

        <div className="flex justify-center gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type.slot}
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(type.type.name)}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
