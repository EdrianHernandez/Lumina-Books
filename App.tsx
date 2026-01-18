import React, { useState, useMemo } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import BookSearch from './components/BookSearch';
import CategoryFilter from './components/CategoryFilter';
import BookGrid from './components/BookGrid';
import AuthorSpotlight from './components/AuthorSpotlight';
import { MOCK_BOOKS, CATEGORIES, FEATURED_AUTHOR } from './constants';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2); // Simulated cart state

  // Filter logic
  const filteredBooks = useMemo(() => {
    if (!selectedCategory) return MOCK_BOOKS;
    // Check if category matches or if it matches a subcategory
    return MOCK_BOOKS.filter(book => {
      if (book.category === selectedCategory) return true;
      // Simple logic: in a real app, we'd check the tree properly
      const parentCat = CATEGORIES.find(c => c.name === selectedCategory);
      if (parentCat?.subcategories?.some(sub => sub.name === book.category)) return true;
      
      return false;
    });
  }, [selectedCategory]);

  const handleSearchSelect = (bookId: string) => {
    console.log("Navigating to book:", bookId);
    // In a real app, this would use a router
    alert(`Navigating to book ID: ${bookId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                  Lumina<span className="text-brand-600">Books</span>
                </span>
              </div>
            </div>

            {/* Central Search */}
            <div className="flex-1 max-w-2xl px-2 lg:px-0">
              <BookSearch books={MOCK_BOOKS} onSearchSelect={handleSearchSelect} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <div className="hidden sm:block h-8 w-8 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://picsum.photos/100/100" alt="User" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex-grow flex items-start pt-8 pb-12 px-4 sm:px-6 lg:px-8 gap-8">
        
        {/* Desktop Sidebar */}
        <aside className={`
          lg:block w-64 flex-none space-y-8
          ${mobileMenuOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden sticky top-24'}
        `}>
          {mobileMenuOpen && (
             <div className="flex justify-between items-center mb-6 lg:hidden">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500">Close</button>
             </div>
          )}
          
          <AuthorSpotlight author={FEATURED_AUTHOR} />
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
             <CategoryFilter 
              categories={CATEGORIES} 
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setMobileMenuOpen(false);
              }}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <BookGrid 
            books={filteredBooks} 
            title={selectedCategory ? `${selectedCategory} Books` : "New Arrivals & Best Sellers"} 
          />
        </main>

      </div>
    </div>
  );
};

export default App;