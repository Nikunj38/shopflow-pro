import { Category } from "@/data/products";

interface CategoryChipsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryChips = ({ categories, selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-2.5 overflow-x-auto scrollbar-hide py-1 px-1">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all shrink-0 ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-brand"
            : "bg-card text-foreground border border-border hover:border-primary/30"
        }`}
      >
        <span className="text-base">🛒</span>
        <span>All</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id === selected ? null : cat.id)}
          className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all shrink-0 ${
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-brand"
              : "bg-card text-foreground border border-border hover:border-primary/30"
          }`}
        >
          <span className="text-base">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
