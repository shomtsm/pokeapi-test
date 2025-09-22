'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import PokemonRadarChart from './PokemonRadarChart';
import { useEffect } from 'react';
import { getTypeColor } from '@/lib/pokemon-utils';

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PokemonDetailModal({ pokemon, isOpen, onClose }: PokemonDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex sm:items-center sm:justify-center">
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 w-full h-full sm:rounded-lg sm:shadow-2xl sm:p-8 sm:max-w-md sm:max-h-[90vh] sm:mx-4 sm:overflow-y-auto overflow-y-auto p-4 transform transition-all duration-300 scale-100 animate-scale-in sm:h-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="absolute top-4 left-4 px-2 py-1">
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
        </div>

        <div className="text-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-4 sm:mb-6">
            <Image
              src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 192px, 256px"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 capitalize">
            {pokemon.name}
          </h2>

          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            {pokemon.types.map((type) => (
              <span
                key={type.slot}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
              <span>高さ: {pokemon.height / 10}m</span>
              <span>重さ: {pokemon.weight / 10}kg</span>
            </div>
          </div>

          <div className="space-y-4">
            <PokemonRadarChart pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
}
