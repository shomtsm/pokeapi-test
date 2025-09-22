import { Suspense } from 'react';
import { getFirstGenerationPokemon } from '@/lib/pokemon-api';
import PokemonList from '@/components/PokemonList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Pokemon } from '@/types/pokemon';

async function PokemonContent() {
  let pokemon: Pokemon[] = [];
  let error: string | null = null;

  try {
    pokemon = await getFirstGenerationPokemon();
  } catch (err) {
    error = err instanceof Error ? err.message : 'ポケモンデータの取得に失敗しました';
    console.error('Error fetching Pokemon data:', err);
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            ページを再読み込みしてください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PokemonList pokemon={pokemon} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PokemonContent />
    </Suspense>
  );
}
