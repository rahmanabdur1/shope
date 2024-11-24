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
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.shope.com.bd/api/v1/public/hero-categories');
        const data = await response.json();

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

  const handleMouseEnter = (category: Category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        display: 'flex',
        top: '0',
        left: '125px',
      }}
      onMouseLeave={handleMouseLeave} // This ensures both parent and child sections remain visible on hover.
    >
      {/* Parent Categories */}
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
              onMouseEnter={() => handleMouseEnter(category)}
            >
              <Link
                href={category.link}
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

      {/* Child Categories */}
      {hoveredCategory?.childrens && (
        <div
          style={{
            width: '220px',
            height: '335px',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '16px',
          }}
        >
          <ul>
            {hoveredCategory.childrens.map((child) => (
              <li key={child.id}>
                <Link
                  href={child.link}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '15.6px',
                    color: '#374151',
                    textDecoration: 'none',
                  }}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
