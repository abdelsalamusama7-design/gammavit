import { createContext, useContext, useState, ReactNode } from "react";

export interface Customer {
  id: string;
  name: string;
  type: string;
  factoryId: string;
  factoryName: string;
  email: string;
  phone: string;
  walletBalance: string;
  contacts: string[];
}

interface CustomersContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id">) => void;
  removeCustomer: (id: string) => void;
}

const CustomersContext = createContext<CustomersContextType | undefined>(undefined);

// Initial customers data
const initialCustomers: Customer[] = [
  { id: "1", name: "omar Magdy", type: "Factory", factoryId: "2", factoryName: "Naturous", email: "omar.adapq32@dslapl.com", phone: "01554945448", walletBalance: "6,000.00", contacts: ["Omar"] },
  { id: "2", name: "Eslam 1", type: "Factory", factoryId: "1", factoryName: "GammaVet", email: "", phone: "01000000000", walletBalance: "0.00", contacts: ["Eslam"] },
  { id: "3", name: "Abo Elleif", type: "Factory", factoryId: "2", factoryName: "Naturous", email: "", phone: "01212123457", walletBalance: "0.00", contacts: ["Abo Elleif"] },
  { id: "4", name: "Abo Ady", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Abo Ady"] },
  { id: "5", name: "El Sheikh Mostafa", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["El Sheikh Mostafa"] },
  { id: "6", name: "Proxy", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Proxy"] },
  { id: "7", name: "Dr. Ibrahim", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Dr. Ibrahim"] },
  { id: "8", name: "Dr. Ahmed Enab", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Dr. Ahmed Enab"] },
  { id: "9", name: "Dr. Ahmed Mamdouh", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Dr. Ahmed Mamdouh"] },
  { id: "10", name: "Dr. Islam Mubarak", type: "Factory", factoryId: "3", factoryName: "N/A", email: "", phone: "", walletBalance: "0.00", contacts: ["Dr. Islam Mubarak"] },
];

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const addCustomer = (customerData: Omit<Customer, "id">) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const removeCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CustomersContext.Provider value={{ customers, addCustomer, removeCustomer }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }
  return context;
};
