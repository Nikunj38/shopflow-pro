import { Zap, Truck, ShieldCheck } from "lucide-react";

const PromoBanner = () => {
  return (
    <div className="bg-brand-green-light border border-primary/10 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground mb-3">
            <Zap className="h-3 w-3" />
            FRESH DEALS
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
            Fresh groceries,<br />
            delivered in <span className="text-primary">10 minutes</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            From farm to your doorstep. Enjoy the freshest produce, dairy, and pantry essentials with free delivery on orders above ₹199.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { icon: Truck, label: "Free Delivery", desc: "Orders ₹199+" },
            { icon: Zap, label: "10 Min Delivery", desc: "Lightning fast" },
            { icon: ShieldCheck, label: "Fresh Guarantee", desc: "100% quality" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{label}</p>
                <p className="text-[10px] text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
