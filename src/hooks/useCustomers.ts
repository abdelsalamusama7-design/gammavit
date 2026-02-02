import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Factory {
  id: string;
  name: string;
  name_ar: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  type: string;
  factory_id: string | null;
  email: string | null;
  phone: string | null;
  tax_number: string | null;
  wallet_balance: number;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  factory?: Factory | null;
}

export interface CustomerContact {
  id: string;
  customer_id: string;
  name: string;
  position: string | null;
  email: string | null;
  phone: string | null;
  is_primary: boolean;
}

export interface NewCustomer {
  name: string;
  type: string;
  factory_id?: string | null;
  email?: string | null;
  phone?: string | null;
  tax_number?: string | null;
  wallet_balance?: number;
  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  notes?: string | null;
  contact_name?: string | null;
  contact_position?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
}

// Fetch all factories
export const useFactories = () => {
  return useQuery({
    queryKey: ["factories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("factories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Factory[];
    },
  });
};

// Fetch all customers with factory info
export const useCustomersQuery = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          factory:factories(*)
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Customer[];
    },
  });
};

// Fetch customer contacts
export const useCustomerContacts = (customerId: string | null) => {
  return useQuery({
    queryKey: ["customer_contacts", customerId],
    queryFn: async () => {
      if (!customerId) return [];
      
      const { data, error } = await supabase
        .from("customer_contacts")
        .select("*")
        .eq("customer_id", customerId)
        .order("is_primary", { ascending: false });

      if (error) throw error;
      return data as CustomerContact[];
    },
    enabled: !!customerId,
  });
};

// Add new customer
export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customer: NewCustomer) => {
      // Insert customer
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .insert({
          name: customer.name,
          type: customer.type,
          factory_id: customer.factory_id || null,
          email: customer.email || null,
          phone: customer.phone || null,
          tax_number: customer.tax_number || null,
          wallet_balance: customer.wallet_balance || 0,
          address_line1: customer.address_line1 || null,
          address_line2: customer.address_line2 || null,
          city: customer.city || null,
          state: customer.state || null,
          postal_code: customer.postal_code || null,
          country: customer.country || null,
          notes: customer.notes || null,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Insert primary contact if provided
      if (customer.contact_name) {
        const { error: contactError } = await supabase
          .from("customer_contacts")
          .insert({
            customer_id: customerData.id,
            name: customer.contact_name,
            position: customer.contact_position || null,
            email: customer.contact_email || null,
            phone: customer.contact_phone || null,
            is_primary: true,
          });

        if (contactError) throw contactError;
      }

      return customerData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Delete customer (soft delete)
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customerId: string) => {
      const { error } = await supabase
        .from("customers")
        .update({ is_active: false })
        .eq("id", customerId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
