'use client';

import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import PokemonRadarChart from './PokemonRadarChart';
import { useEffect } from 'react';
import { getTypeColor, getStatName } from '@/lib/pokemon-utils';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* オーバーレイ */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />
      
      {/* モーダルコンテンツ */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 animate-scale-in">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ポケモン番号を右上に配置 */}
        <div className="absolute top-4 left-4 px-2 py-1">
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
            #{pokemon.id.toString().padStart(3, '0')}
          </p>
        </div>

        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 capitalize">
            {pokemon.name}
          </h2>

          <div className="flex justify-center gap-2 mb-6">
            {pokemon.types.map((type) => (
              <span
                key={type.slot}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <div className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between text-lg text-gray-600 dark:text-gray-400">
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
