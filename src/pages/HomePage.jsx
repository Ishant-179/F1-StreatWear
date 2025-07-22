import { Link } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem';
import { categoriesData } from '../data/categories';

function HomePage() {
  return (
    <div className="min-h-screen">
      <section
        className="relative bg-cover bg-center h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] flex flex-col justify-center items-center text-white p-4"
        style={{ backgroundImage: "url('https://www.pacsun.com/on/demandware.static/-/Sites-pacsun-Library/default/dw1428d3c3/2025/banners/05/22/f1_banner_desktop_250522.jpg?')" }} 
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-display font-extrabold text-center mb-6 leading-tight drop-shadow-lg">
          F1 Streetwear
        </h1>
        <p className="relative z-10 text-lg md:text-2xl text-center max-w-3xl mb-10 font-sans tracking-wide">
          Unleash Your Inner Racer. Style Driven by Speed.
        </p>
        <Link
          to="/category/tees" 
          className="relative z-10 bg-f1-red hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          View Collection
        </Link>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto"> 
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoriesData.map((category, index) => (
            <CategoryItem
              key={category.id}
              category={category}
              isFunctional={index === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;