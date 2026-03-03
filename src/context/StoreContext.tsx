import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductVariant } from "@/data/products";
import { Json } from "@/integrations/supabase/types";

interface StoreContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Omit<Product, "id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function parseVariants(json: Json): ProductVariant[] {
  if (!Array.isArray(json)) return [];
  return json.map((v: any) => ({
    id: v.id || crypto.randomUUID(),
    label: v.label || "",
    price: Number(v.price) || 0,
    mrp: v.mrp ? Number(v.mrp) : undefined,
    stock: Number(v.stock) || 0,
    outOfStock: Boolean(v.outOfStock),
  }));
}

function mapRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image: row.image,
    category: row.category,
    unit: row.unit,
    variants: parseVariants(row.variants),
    tag: row.tag,
    is_active: row.is_active,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapRow);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (product: Omit<Product, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("products").insert({
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
        unit: product.unit,
        variants: product.variants as unknown as Json,
        tag: product.tag,
        is_active: product.is_active,
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Omit<Product, "id">> }) => {
      const payload: any = { ...updates };
      if (updates.variants) {
        payload.variants = updates.variants as unknown as Json;
      }
      const { error } = await supabase.from("products").update(payload).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const addProduct = async (product: Omit<Product, "id" | "created_at" | "updated_at">) => {
    await addMutation.mutateAsync(product);
  };

  const updateProduct = async (id: string, updates: Partial<Omit<Product, "id">>) => {
    await updateMutation.mutateAsync({ id, updates });
  };

  const deleteProduct = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <StoreContext.Provider value={{ products, isLoading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
