
import React from 'react';
import { Character, CharacterRole } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const getRoleBadge = (role: CharacterRole) => {
    switch (role) {
      case CharacterRole.MAIN: return 'bg-blue-100 text-blue-700 border-blue-200';
      case CharacterRole.SPECIAL: return 'bg-purple-100 text-purple-700 border-purple-200';
      case CharacterRole.SYSTEM: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="ui-card relative h-80 cursor-pointer"
    >
      {/* Image Container */}
      <div className="h-52 overflow-hidden relative bg-slate-100">
        <img 
          src={character.avatarUrl} 
          alt={character.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6 bg-white/80 backdrop-blur-sm border-t border-white/50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-win-accent transition-colors truncate pr-2">
            {character.name}
          </h3>
        </div>
        
        <div className={`inline-block px-2.5 py-1 rounded text-xs font-bold border uppercase tracking-wider mb-3 ${getRoleBadge(character.role)}`}>
          {character.role}
        </div>

        <p className="text-slate-500 text-sm line-clamp-1 font-mono flex items-center gap-2">
          <span className="w-2 h-2 bg-slate-400 rounded-full inline-block"></span>
          {character.locations[0]}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
