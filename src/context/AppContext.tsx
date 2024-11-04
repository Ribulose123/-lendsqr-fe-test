import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: number;
  phone: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  status: "pending" | "inactive" | "active" | "blacklisted";
  organization?: string;
  marital?: string;
  dateJoined: string;
  loan?: boolean;
  savings?: boolean;
  children?: boolean;
  salary?: number;
}

interface AppContextType {
  isAuthenticated: boolean;
  users: User[];
  setUsers(value: React.SetStateAction<User[]>): void;
  userName: string;
  login: (name: string) => void;
  logout: () => void;
  getUserById: (id: number | string) => User | undefined;
  customers: User[];
  setCustomers(value: React.SetStateAction<User[]>): void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userName, setUserName] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);

  const login = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem("isAuthenticated");
  };

  const getUserById = (id: number | string) => {
    return customers.find((customer) => customer.id === Number(id));
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=500"
        );
        const customerData = response.data.results;

        const organizations = ["Lendsqr", "Irorun", "Lendstar"];
        const statuses = ["pending", "inactive", "active", "blacklisted"];
        const maritalStatusOptions = [
          "Single",
          "Divorced",
          "Married",
          "Widowed",
        ];

        const formattedCustomers = customerData.map(
          (customer: any, index: number) => {
            const randomOrganization =
              organizations[Math.floor(Math.random() * organizations.length)];
            const randomStatus =
              statuses[Math.floor(Math.random() * statuses.length)];
            const randomMaritalStatus =
              maritalStatusOptions[
                Math.floor(Math.random() * maritalStatusOptions.length)
              ];

            const childrenCount = Math.floor(Math.random() * 7); // 0-6 range

            return {
              id: index + 1,
              name: {
                first: customer.name.first,
                last: customer.name.last,
              },
              phone: customer.phone,
              email: customer.email,
              organization: randomOrganization,
              status: randomStatus,
              dateJoined: new Date().toLocaleDateString(),
              marital: randomMaritalStatus,
              loan: Math.random() < 0.35,
              savings: Math.random() < 0.42,
              children: childrenCount > 0,
              salary: Math.floor(Math.random() * (100000 - 20000 + 1)) + 20000,
            };
          }
        );

        setCustomers(formattedCustomers);
        localStorage.setItem("customers", JSON.stringify(formattedCustomers));
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const storedCustomers = JSON.parse(
      localStorage.getItem("customers") || "[]"
    ) as User[];
    if (storedCustomers.length > 0) {
      setCustomers(storedCustomers);
    } else {
      fetchCustomers();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        users,
        setUsers,
        userName,
        login,
        logout,
        getUserById,
        customers,
        setCustomers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
