import { Link } from 'react-router-dom'
import Icon from './Icon'

const CategoryCard = ({ category, className = '' }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className={`group relative block overflow-hidden rounded-xl bg-surface-container-lowest dark:bg-surface-container-lowest-dark shadow-ambient transition-transform duration-160 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover active:scale-[0.97] aspect-[4/5] ${className}`}
    >
      <div className="absolute inset-0 bg-surface-container-highest dark:bg-surface-container-highest-dark">
        {category.image_url && (
          <img
            src={category.image_url}
            loading="lazy"
            className="w-full h-full object-cover opacity-85 transition-transform duration-500 ease-out-strong group-hover:scale-105"
            alt={category.name_ar}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-inverse-surface/90 to-transparent flex items-end justify-between">
        <div>
          {category.tagline && (
            <span className="text-label-caps font-label-caps text-primary-fixed tracking-wider mb-1 block uppercase">
              {category.tagline}
            </span>
          )}
          <h3 className="text-headline-md font-headline-md text-on-primary font-bold">
            {category.name_ar}
          </h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-on-primary transition-all duration-200 ease-out-strong group-hover:opacity-100 opacity-0 -translate-x-2 group-hover:translate-x-0">
          <Icon name="arrow_back" className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard
