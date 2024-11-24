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
  const [hoveredChild, setHoveredChild] = useState<number | null>(null); // Track hovered child ID

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

  const handleMouseEnterCategory = (category: Category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeaveCategory = () => {
    setHoveredCategory(null);
    setHoveredChild(null); // Reset child hover state
  };

  const handleMouseEnterChild = (childId: number) => {
    setHoveredChild(childId);
  };

  const handleMouseLeaveChild = () => {
    setHoveredChild(null);
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
      onMouseLeave={handleMouseLeaveCategory}
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
              onMouseEnter={() => handleMouseEnterCategory(category)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link
                href={category.link}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '15.6px',
                  color: hoveredCategory?.id === category.id ? 'rgba(249, 115, 22, 1)' : '#374151',
                  textDecoration: 'none',
                }}
              >
                {category.title}
              </Link>
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  fill: hoveredCategory?.id === category.id ? 'rgba(249, 115, 22, 1)' : '#F97316',
                }}
              >
                <path d="M1.57997 1.04207C1.3961 0.859829 1.09931 0.861153 0.917068 1.04503C0.734828 1.2289 0.736152 1.52569 0.920026 1.70793L2.02188 2.8C2.46906 3.24321 2.77582 3.54824 2.98338 3.80669C3.185 4.05775 3.25417 4.21901 3.27258 4.36343C3.28414 4.45412 3.28414 4.54588 3.27258 4.63656C3.25417 4.78099 3.185 4.94225 2.98338 5.19331C2.77582 5.45176 2.46907 5.75679 2.02188 6.2L0.920026 7.29207C0.736153 7.47431 0.734829 7.7711 0.917069 7.95497C1.09931 8.13885 1.3961 8.14017 1.57997 7.95793L2.70168 6.84619C3.12416 6.42748 3.46946 6.08526 3.71434 5.78034C3.96898 5.46326 4.15332 5.14142 4.20256 4.7551C4.22415 4.58571 4.22415 4.41429 4.20256 4.2449C4.15332 3.85858 3.96898 3.53674 3.71434 3.21966C3.46946 2.91474 3.12417 2.57253 2.70168 2.15381L1.57997 1.04207Z" />
              </svg>
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
              <li
                key={child.id}
                onMouseEnter={() => handleMouseEnterChild(child.id)}
                onMouseLeave={handleMouseLeaveChild}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Link
                  href={child.link}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '15.6px',
                    color: hoveredChild === child.id ? 'rgba(249, 115, 22, 1)' : '#374151',
                    textDecoration: 'none',
                  }}
                >
                  {child.title}
                </Link>
                <svg
                  width="5"
                  height="9"
                  viewBox="0 0 5 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fill: hoveredChild === child.id ? 'rgba(249, 115, 22, 1)' : '#F97316',
                  }}
                >
                  <path d="M1.57997 1.04207C1.3961 0.859829 1.09931 0.861153 0.917068 1.04503C0.734828 1.2289 0.736152 1.52569 0.920026 1.70793L2.02188 2.8C2.46906 3.24321 2.77582 3.54824 2.98338 3.80669C3.185 4.05775 3.25417 4.21901 3.27258 4.36343C3.28414 4.45412 3.28414 4.54588 3.27258 4.63656C3.25417 4.78099 3.185 4.94225 2.98338 5.19331C2.77582 5.45176 2.46907 5.75679 2.02188 6.2L0.920026 7.29207C0.736153 7.47431 0.734829 7.7711 0.917069 7.95497C1.09931 8.13885 1.3961 8.14017 1.57997 7.95793L2.70168 6.84619C3.12416 6.42748 3.46946 6.08526 3.71434 5.78034C3.96898 5.46326 4.15332 5.14142 4.20256 4.7551C4.22415 4.58571 4.22415 4.41429 4.20256 4.2449C4.15332 3.85858 3.96898 3.53674 3.71434 3.21966C3.46946 2.91474 3.12417 2.57253 2.70168 2.15381L1.57997 1.04207Z" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySection;
