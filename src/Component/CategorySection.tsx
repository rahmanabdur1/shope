import React from 'react';

// Define a type for Category
interface Category {
  id: number;
  title: string;
  childrens?: Category[]; // Optional children, which is an array of Category
}

interface CategorySectionProps {
  categories: Category[]; // Categories will be an array of Category objects
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  // Recursive function to render categories and subcategories
  const renderCategories = (categories: Category[]) => {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="category">
            {category.title}
            {/* Render children categories if they exist */}
            {category.childrens && category.childrens.length > 0 && (
              <div className="subcategory">
                {renderCategories(category.childrens)} {/* Recursive call */}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div id="category-container">{renderCategories(categories)}</div>;
};
