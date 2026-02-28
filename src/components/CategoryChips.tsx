import { Category } from "@/data/products";

interface CategoryChipsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

const CategoryChips = ({ categories, selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-1 px-1">
      <button
        onClick={() => onSelect(null)}
        className={`flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 text-xs font-semibold transition-all shrink-0 min-w-[72px] ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-brand"
            : "bg-card text-foreground shadow-card hover:shadow-elevated"
        }`}
      >
        <span className="text-lg">🛒</span>
        <span>All</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id === selected ? null : cat.id)}
          className={`flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 text-xs font-semibold transition-all shrink-0 min-w-[72px] ${
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-brand"
              : `bg-card text-foreground shadow-card hover:shadow-elevated`
          }`}
        >
          <span className="text-lg">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
