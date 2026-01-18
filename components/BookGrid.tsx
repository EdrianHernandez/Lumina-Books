import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Book } from '../types';

interface BookGridProps {
  books: Book[];
  title: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title }) => {
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`rating-star-icon w-3.5 h-3.5 ${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-200 fill-slate-200'
            }`}
          />
        ))}
        <span className="text-xs text-slate-400 ml-1 font-medium pt-0.5">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <span className="text-sm text-slate-500">{books.length} items</span>
      </div>

      {books.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
           <p className="text-slate-500 text-lg">No books found matching this criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="book-card group relative flex flex-col bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-100 transition-all duration-300"
            >
              {book.isBestSeller && (
                <div className="absolute top-2 left-2 z-10 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
                  Best Seller
                </div>
              )}
              
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-lg bg-slate-100">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="book-cover-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                   <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg hover:bg-brand-50 hover:text-brand-700 transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                   </button>
                </div>
              </div>

              <div className="flex flex-col flex-grow p-4">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors line-clamp-1" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">{book.author}</p>
                </div>

                <div className="mt-auto space-y-3">
                   {/* Stars Alignment Container */}
                  <div className="flex items-center justify-between">
                     {renderStars(book.rating)}
                     <span className="text-xs text-slate-400">({book.reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <span className="text-xl font-bold text-slate-900">
                      ${book.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {book.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookGrid;