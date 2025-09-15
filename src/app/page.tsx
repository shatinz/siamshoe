'use client';

import { useState, useMemo } from 'react';
import { SHOES } from '@/lib/shoes';
import { Shoe } from '@/lib/types';
import ShoeCard from '@/components/shoe-card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const shoeTypes = ['All', 'Running', 'Casual', 'Formal', 'Training'];
const shoeColors = ['All', 'Black', 'White', 'Blue', 'Red', 'Green'];
const shoeSizes = ['All', '7', '8', '9', '10', '11', '12'];

export default function Home() {
  const [filters, setFilters] = useState({
    type: 'All',
    color: 'All',
    size: 'All',
    price: [0, 500],
  });
  const [sort, setSort] = useState('popularity-desc');

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, price: value }));
  };
  
  const handleFilterChange = (filterType: 'type' | 'color' | 'size', value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredAndSortedShoes = useMemo(() => {
    let result: Shoe[] = [...SHOES];

    // Filter
    if (filters.type !== 'All') {
      result = result.filter(shoe => shoe.type === filters.type);
    }
    if (filters.color !== 'All') {
      result = result.filter(shoe => shoe.colors.some(c => c.name === filters.color));
    }
    if (filters.size !== 'All') {
      result = result.filter(shoe => shoe.sizes.includes(Number(filters.size)));
    }
    result = result.filter(shoe => shoe.price >= filters.price[0] && shoe.price <= filters.price[1]);

    // Sort
    const [sortBy, order] = sort.split('-');
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'popularity') {
        comparison = b.popularity - a.popularity;
      } else if (sortBy === 'newness') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }

      return order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [filters, sort]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">فیلترها</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="sort-by" className="text-lg font-semibold">مرتب سازی بر اساس</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger id="sort-by" className="mt-2">
                  <SelectValue placeholder="مرتب سازی بر اساس" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity-desc">محبوبیت</SelectItem>
                  <SelectItem value="price-asc">قیمت: کم به زیاد</SelectItem>
                  <SelectItem value="price-desc">قیمت: زیاد به کم</SelectItem>
                  <SelectItem value="newness-desc">جدیدترین</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-2">نوع</h3>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {shoeTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">محدوده قیمت</h3>
              <Slider
                min={0}
                max={500}
                step={10}
                value={filters.price}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.price[0]} تومان</span>
                <span>{filters.price[1]} تومان</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">رنگ</h3>
              <Select value={filters.color} onValueChange={(value) => handleFilterChange('color', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                      {shoeColors.map(color => <SelectItem key={color} value={color}>{color}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">سایز</h3>
               <Select value={filters.size} onValueChange={(value) => handleFilterChange('size', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                      {shoeSizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
                  </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-8">کلکسیون ما</h1>
          {filteredAndSortedShoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredAndSortedShoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">کفشی با فیلترهای شما مطابقت ندارد.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
