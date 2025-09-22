'use client';

import { useState, useMemo } from 'react';
import { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemon: Pokemon[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'height' | 'weight'>('id');

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    pokemon.forEach(p => {
      p.types.forEach(t => types.add(t.type.name));
    });
    return Array.from(types).sort();
  }, [pokemon]);

  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemon.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.id.toString().includes(searchTerm);
      const matchesType = typeFilter === 'all' || 
                         p.types.some(t => t.type.name === typeFilter);
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'height':
          return b.height - a.height;
        case 'weight':
          return b.weight - a.weight;
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemon, searchTerm, typeFilter, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8 space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            ポケモン図鑑
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            初代151匹のポケモン ({filteredAndSortedPokemon.length}匹表示中)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="ポケモン名または番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">全タイプ</option>
            {allTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="id">図鑑番号順</option>
            <option value="name">名前順</option>
            <option value="height">高さ順</option>
            <option value="weight">重さ順</option>
          </select>
        </div>
      </div>

      {filteredAndSortedPokemon.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            検索条件に一致するポケモンが見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
}
