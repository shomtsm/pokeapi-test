'use client';

import { Pokemon } from '@/types/pokemon';

interface PokemonRadarChartProps {
    pokemon: Pokemon;
}

export default function PokemonRadarChart({ pokemon }: PokemonRadarChartProps) {
    const getStatName = (statName: string) => {
        const statNames: { [key: string]: string } = {
            hp: 'HP',
            attack: '攻撃',
            defense: '防御',
            'special-attack': '特攻',
            'special-defense': '特防',
            speed: '速さ',
        };
        return statNames[statName] || statName;
    };

    const maxStat = 150;
    const centerX = 100;
    const centerY = 100;
    const maxRadius = 70;

    return (
        <div className="flex justify-center">
            <div className="relative w-48 h-48">
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    className="absolute inset-0 mr-4"
                >
                    {/* 六角形のグリッド */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => {
                        const radius = maxRadius * scale;
                        const points = Array.from({ length: 6 }, (_, i) => {
                            const angle = (i * 60 - 90) * (Math.PI / 180);
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            return `${x},${y}`;
                        }).join(' ');

                        return (
                            <polygon
                                key={index}
                                points={points}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-gray-200 dark:text-gray-600"
                            />
                        );
                    })}

                    {/* 中心から各頂点への放射線 */}
                    {pokemon.stats.map((_, index) => {
                        const angle = (index * 60 - 90) * (Math.PI / 180);
                        const x = centerX + maxRadius * Math.cos(angle);
                        const y = centerY + maxRadius * Math.sin(angle);

                        return (
                            <line
                                key={index}
                                x1={centerX}
                                y1={centerY}
                                x2={x}
                                y2={y}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-gray-200 dark:text-gray-600"
                            />
                        );
                    })}

                    {/* ステータスのデータポイント */}
                    {pokemon.stats.map((stat, index) => {
                        const angle = (index * 60 - 90) * (Math.PI / 180);
                        const normalizedValue = stat.base_stat / maxStat;
                        const radius = maxRadius * normalizedValue;
                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);

                        return (
                            <circle
                                key={stat.stat.name}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="currentColor"
                                className="text-blue-500"
                            />
                        );
                    })}

                    {/* ステータスの線と塗りつぶし */}
                    <polygon
                        points={pokemon.stats.map((stat, index) => {
                            const angle = (index * 60 - 90) * (Math.PI / 180);
                            const normalizedValue = stat.base_stat / maxStat;
                            const radius = maxRadius * normalizedValue;
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500"
                    />

                    {/* ステータス名のラベル */}
                    {pokemon.stats.map((stat, index) => {
                        const angle = (index * 60 - 90) * (Math.PI / 180);
                        const x = centerX + (maxRadius + 20) * Math.cos(angle);
                        const y = centerY + (maxRadius + 20) * Math.sin(angle);

                        return (
                            <text
                                key={stat.stat.name}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs fill-current text-gray-600 dark:text-gray-400 font-medium"
                            >
                                {getStatName(stat.stat.name)}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
