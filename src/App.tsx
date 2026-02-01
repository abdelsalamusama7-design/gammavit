import '@/i18n';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Sales pages
import Orders from "./pages/sales/Orders";
import Quotations from "./pages/sales/Quotations";
import Customers from "./pages/sales/Customers";

// Inventory pages
import Products from "./pages/inventory/Products";
import Materials from "./pages/inventory/Materials";
import StockMovement from "./pages/inventory/StockMovement";

// Products pages
import Categories from "./pages/products/Categories";

// Purchases pages
import PurchaseOrders from "./pages/purchases/PurchaseOrders";
import Suppliers from "./pages/purchases/Suppliers";

// Other pages
import Manufacturing from "./pages/Manufacturing";
import Users from "./pages/Users";
import Tickets from "./pages/Tickets";

// Finance pages
import Accounts from "./pages/finance/Accounts";
import Expenses from "./pages/finance/Expenses";
import Reports from "./pages/finance/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Sales routes */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* Inventory routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/stock-movement" element={<StockMovement />} />
          
          {/* Products routes */}
          <Route path="/products-list" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          
          {/* Purchases routes */}
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          
          {/* Other routes */}
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tickets" element={<Tickets />} />
          
          {/* Finance routes */}
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
