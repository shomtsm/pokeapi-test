/**
 * ポケモンのタイプに応じた色のクラスを返す
 */
export const getTypeColor = (typeName: string): string => {
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

/**
 * ポケモンのステータス名を日本語に変換する
 */
export const getStatName = (statName: string): string => {
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
