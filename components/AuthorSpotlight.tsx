import React from 'react';
import { Award, Book } from 'lucide-react';
import { Author } from '../types';

interface AuthorSpotlightProps {
  author: Author;
}

const AuthorSpotlight: React.FC<AuthorSpotlightProps> = ({ author }) => {
  return (
    <div className="author-spotlight-card bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-yellow-400">
          <Award className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Writer of the Month</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={author.imageUrl} 
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
              {author.bio}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase mb-3 flex items-center gap-2">
             <Book className="w-3 h-3" /> Selected Bibliography
          </h4>
          <ul className="space-y-2">
            {author.notableWorks.map((work, index) => (
              <li key={index} className="text-sm text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                {work}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthorSpotlight;