import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { Book } from '../types';

interface BookSearchProps {
  books: Book[];
  onSearchSelect: (bookId: string) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ books, onSearchSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query, books]);

  const handleSelect = (book: Book) => {
    setQuery('');
    setIsOpen(false);
    onSearchSelect(book.id);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
        </div>
        <input
          type="text"
          className="search-input block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all shadow-sm"
          placeholder="Search by title, author, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
        {query && (
          <div 
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-xl max-h-96 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {suggestions.map((book) => (
            <div
              key={book.id}
              className="search-dropdown-item cursor-pointer select-none relative py-3 pl-3 pr-9 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-100 last:border-0"
              onClick={() => handleSelect(book)}
            >
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="h-12 w-8 object-cover rounded shadow-sm flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-slate-900 truncate block">
                  {book.title}
                </span>
                <span className="text-xs text-slate-500">
                  by {book.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length > 0 && suggestions.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-4 px-4 text-center text-slate-500 ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <BookOpen className="h-6 w-6 text-slate-300" />
            <p>No books found for "{query}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;