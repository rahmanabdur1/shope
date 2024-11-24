import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  title: string;
  parent_id: number | null;
  category_id: number;
  icon: string;
  link: string;
  childrens?: Category[];
}

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.shope.com.bd/api/v1/public/hero-categories');
        const data = await response.json();

        // Ensure proper data structure
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        top: '0',
        left: '125px',
      }}
    >
      {/* Category Section */}
      <div
        style={{
          width: '220px',
          height: '335px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
      
        }}
      >
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
            >
              <Link href={category.link}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '15.6px',
                  color: '#374151',
                  textDecoration: 'none',
                }}
              >
                  {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Content Section */}
      <div
        style={{
          width: '220px',
          height: '335px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          marginLeft: '16px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        }}
      >
      
      </div>
    </div>
  );
};

export default CategorySection;
