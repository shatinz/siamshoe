'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (shoeId: string, shoeName: string) => void;
  removeFromWishlist: (shoeId: string, shoeName: string) => void;
  isInWishlist: (shoeId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedWishlist = localStorage.getItem('solemate_wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('solemate_wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Failed to save wishlist to localStorage', error);
      }
    }
  }, [wishlist, isMounted]);

  const addToWishlist = useCallback((shoeId: string, shoeName: string) => {
    setWishlist((prev) => {
      const newWishlist = [...new Set([...prev, shoeId])];
      if (newWishlist.length > prev.length) {
        toast({
          title: 'Added to Wishlist',
          description: `${shoeName} has been added to your wishlist.`,
        });
      }
      return newWishlist;
    });
  }, [toast]);

  const removeFromWishlist = useCallback((shoeId: string, shoeName: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((id) => id !== shoeId);
      if (newWishlist.length < prev.length) {
        toast({
          title: 'Removed from Wishlist',
          description: `${shoeName} has been removed from your wishlist.`,
        });
      }
      return newWishlist;
    });
  }, [toast]);

  const isInWishlist = useCallback((shoeId: string) => {
    return wishlist.includes(shoeId);
  }, [wishlist]);

  const value = { wishlist, addToWishlist, removeFromWishlist, isInWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
