import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Info, HelpCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const menuItems = [
    { icon: <Info className="w-4 h-4" />, label: 'About', path: '/about' },
    { icon: <Heart className="w-4 h-4" />, label: 'Support', path: '/support' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {item.icon}
              <span className="text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};