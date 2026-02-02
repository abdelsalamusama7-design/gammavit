import '@/i18n';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AIChatWidget from "@/components/AIChatWidget";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

// Sales pages
import Orders from "./pages/sales/Orders";
import CreateSalesOrder from "./pages/sales/CreateOrder";
import Quotations from "./pages/sales/Quotations";
import CreateQuotation from "./pages/sales/CreateQuotation";
import Customers from "./pages/sales/Customers";

// Inventory pages
import Products from "./pages/inventory/Products";
import Materials from "./pages/inventory/Materials";
import StockMovement from "./pages/inventory/StockMovement";

// Products pages
import Categories from "./pages/products/Categories";

// Purchases pages
import PurchaseOrders from "./pages/purchases/PurchaseOrders";
import CreatePurchaseOrder from "./pages/purchases/CreatePurchaseOrder";
import Suppliers from "./pages/purchases/Suppliers";

// Other pages
import Manufacturing from "./pages/Manufacturing";
import CreateManufacturingOrder from "./pages/manufacturing/CreateOrder";
import WorkflowInstructions from "./pages/manufacturing/WorkflowInstructions";
import Users from "./pages/Users";
import TransferData from "./pages/users/TransferData";
import Roles from "./pages/users/Roles";
import CreateRole from "./pages/users/CreateRole";
import Notifications from "./pages/Notifications";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/tickets/CreateTicket";

// Finance pages
import Accounts from "./pages/finance/Accounts";
import Expenses from "./pages/finance/Expenses";
import Reports from "./pages/finance/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            
            {/* Sales routes */}
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/create" element={<ProtectedRoute><CreateSalesOrder /></ProtectedRoute>} />
            <Route path="/quotations" element={<ProtectedRoute><Quotations /></ProtectedRoute>} />
            <Route path="/quotations/create" element={<ProtectedRoute><CreateQuotation /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            
            {/* Inventory routes */}
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/materials" element={<ProtectedRoute><Materials /></ProtectedRoute>} />
            <Route path="/stock-movement" element={<ProtectedRoute><StockMovement /></ProtectedRoute>} />
            
            {/* Products routes */}
            <Route path="/products-list" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            
            {/* Purchases routes */}
            <Route path="/purchase-orders" element={<ProtectedRoute><PurchaseOrders /></ProtectedRoute>} />
            <Route path="/purchase-orders/create" element={<ProtectedRoute><CreatePurchaseOrder /></ProtectedRoute>} />
            <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
            
            {/* Other routes */}
            <Route path="/manufacturing" element={<ProtectedRoute><Manufacturing /></ProtectedRoute>} />
            <Route path="/manufacturing/create" element={<ProtectedRoute><CreateManufacturingOrder /></ProtectedRoute>} />
            <Route path="/manufacturing/instructions" element={<ProtectedRoute><WorkflowInstructions /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute requiredRole="admin"><Users /></ProtectedRoute>} />
            <Route path="/users/transfer" element={<ProtectedRoute requiredRole="admin"><TransferData /></ProtectedRoute>} />
            <Route path="/users/roles" element={<ProtectedRoute requiredRole="admin"><Roles /></ProtectedRoute>} />
            <Route path="/users/roles/create" element={<ProtectedRoute requiredRole="admin"><CreateRole /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
            <Route path="/tickets/create" element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />
            
            {/* Finance routes */}
            <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AIChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
