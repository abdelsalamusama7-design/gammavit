-- Create factories table
CREATE TABLE public.factories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Factory', -- Factory or Representative
    factory_id UUID REFERENCES public.factories(id) ON DELETE SET NULL,
    email TEXT,
    phone TEXT,
    tax_number TEXT,
    wallet_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    address_line1 TEXT,
    address_line2 TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer_contacts table for contact persons
CREATE TABLE public.customer_contacts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    position TEXT,
    email TEXT,
    phone TEXT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.factories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_contacts ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user has sales role
CREATE OR REPLACE FUNCTION public.has_sales_role(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'factory_sales', 'representative_sales')
  )
$$;

-- Factories RLS Policies
CREATE POLICY "Anyone authenticated can view active factories"
ON public.factories FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage factories"
ON public.factories FOR ALL
TO authenticated
USING (is_admin(auth.uid()));

-- Customers RLS Policies
CREATE POLICY "Authenticated users can view customers"
ON public.customers FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Sales users can insert customers"
ON public.customers FOR INSERT
TO authenticated
WITH CHECK (has_sales_role(auth.uid()));

CREATE POLICY "Sales users can update customers"
ON public.customers FOR UPDATE
TO authenticated
USING (has_sales_role(auth.uid()));

CREATE POLICY "Admins can delete customers"
ON public.customers FOR DELETE
TO authenticated
USING (is_admin(auth.uid()));

-- Customer Contacts RLS Policies
CREATE POLICY "Authenticated users can view customer contacts"
ON public.customer_contacts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Sales users can manage customer contacts"
ON public.customer_contacts FOR ALL
TO authenticated
USING (has_sales_role(auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_factories_updated_at
BEFORE UPDATE ON public.factories
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial factories data
INSERT INTO public.factories (name, name_ar) VALUES
('GammaVet', 'جاما فيت'),
('Naturous', 'ناتورس');