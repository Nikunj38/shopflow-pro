import { Zap, Truck, ShieldCheck } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 md:p-8">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
      <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary-foreground/5" />
      
      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-primary-foreground mb-3">
            <Zap className="h-3 w-3" />
            TODAY'S SPECIALS
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground leading-tight">
            Farm-fresh groceries,<br />
            at your door in <span className="underline decoration-wavy decoration-primary-foreground/40 underline-offset-4">minutes</span>
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/70 max-w-md">
            From local farms to your kitchen. Free delivery on orders above ₹199.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Truck, label: "Free Delivery", desc: "Orders ₹199+" },
            { icon: Zap, label: "10 Min Delivery", desc: "Lightning fast" },
            { icon: ShieldCheck, label: "Fresh Promise", desc: "100% quality" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 border border-primary-foreground/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/20">
                <Icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary-foreground">{label}</p>
                <p className="text-[10px] text-primary-foreground/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
