'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';
import PokemonDetailModal from './PokemonDetailModal';

interface PokemonListProps {
    pokemon: Pokemon[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || '');
    const [typeFilter, setTypeFilter] = useState(() => searchParams.get('type') || 'all');
    const [sortBy, setSortBy] = useState<'id' | 'name' | 'height' | 'weight'>(() =>
        (searchParams.get('sort') as 'id' | 'name' | 'height' | 'weight') || 'id'
    );
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const writeURL = useCallback((newSearch: string, newType: string, newSort: string) => {
        const params = new URLSearchParams();
        if (newSearch) params.set('search', newSearch);
        if (newType !== 'all') params.set('type', newType);
        if (newSort !== 'id') params.set('sort', newSort);

        const qs = params.toString();
        const href = qs ? `${pathname}?${qs}` : pathname;

        window.history.replaceState(null, '', href);
    }, [pathname]);

    const debouncedWriteURL = useCallback((newSearch: string, newType: string, newSort: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => writeURL(newSearch, newType, newSort), 300);
    }, [writeURL]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => () => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
    }, []);

    const handlePokemonClick = useCallback((pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedPokemon(null);
    }, []);

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
            <div className="space-y-4 my-24">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                        ポケモン図鑑
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        初代151匹のポケモン ({filteredAndSortedPokemon.length}匹表示中)
                    </p>
                </div>

                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch justify-center transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-lg' : ''}`}>
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="ポケモン名または番号で検索..."
                            value={searchTerm}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setSearchTerm(newValue);
                                debouncedWriteURL(newValue, typeFilter, sortBy);
                            }}
                            className="w-full h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        />
                    </div>

                    <select
                        value={typeFilter}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            setTypeFilter(newValue);
                            writeURL(searchTerm, newValue, sortBy);
                        }}
                        className="h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        onChange={(e) => {
                            const newValue = e.target.value as typeof sortBy;
                            setSortBy(newValue);
                            writeURL(searchTerm, typeFilter, newValue);
                        }}
                        className="h-9 sm:h-10 px-3 sm:px-4 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white bg-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
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
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            onClick={() => handlePokemonClick(pokemon)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        検索条件に一致するポケモンが見つかりませんでした。
                    </p>
                </div>
            )}

            <PokemonDetailModal
                pokemon={selectedPokemon}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
