import { Link } from 'react-router-dom';

function CategoryItem({ category, isFunctional }) {
  const commonClasses = "bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden";
  const contentClasses = "p-4 text-center";
  const imageClasses = "w-full h-48 object-cover";
  const titleClasses = "text-xl font-semibold mb-2 text-gray-800";

  return (
    <div className={commonClasses}>
      {isFunctional ? (
        <Link to={`/category/${category.slug}`} className="block no-underline">
          <img src={category.imageUrl} alt={category.name} className={imageClasses} />
          <div className={contentClasses}>
            <h3 className={titleClasses}>{category.name}</h3>
            <p className="text-f1-red hover:underline transition duration-300 text-sm font-medium">Shop Now</p>
          </div>
        </Link>
      ) : (
        <div className="block cursor-not-allowed">
          <img src={category.imageUrl} alt={category.name} className={`${imageClasses} opacity-70`} />
          <div className={contentClasses}>
            <h3 className={`${titleClasses} text-gray-500`}>{category.name}</h3>
            <p className="text-gray-400 text-sm font-medium">Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryItem;