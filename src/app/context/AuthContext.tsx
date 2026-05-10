import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

const STORAGE_KEY = "coffeecrm_auth";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    null
  );

  const [isLoading, setIsLoading] =
    useState(true);

  // Load user securely
  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem(STORAGE_KEY);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // Validate required fields
        if (
          parsedUser?.id &&
          parsedUser?.email &&
          parsedUser?.token
        ) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load auth data",
        error
      );

      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate secure token
  const generateToken = () => {
    return crypto.randomUUID();
  };

  // Validate email
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  };

  // Login
  const login = async (
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      // Validation
      if (!email || !password) {
        throw new Error(
          "Email and password are required"
        );
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (password.length < 6) {
        throw new Error(
          "Password must be at least 6 characters"
        );
      }

      // Simulate API request
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const authUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0],
        token: generateToken(),
      };

      // Save securely
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(authUser)
      );

      setUser(authUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup
  const signup = async (
    name: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      // Validation
      if (!name || !email || !password) {
        throw new Error(
          "All fields are required"
        );
      }

      if (name.length < 3) {
        throw new Error(
          "Name must be at least 3 characters"
        );
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (password.length < 6) {
        throw new Error(
          "Password must be at least 6 characters"
        );
      }

      // Simulate API request
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const authUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        token: generateToken(),
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(authUser)
      );

      setUser(authUser);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);

    sessionStorage.clear();

    setUser(null);
  };

  // Auto logout after inactivity
  useEffect(() => {
  let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logout();
      }, 1000 * 60 * 30); // 30 minutes
    };

    window.addEventListener(
      "mousemove",
      resetTimer
    );

    window.addEventListener(
      "keypress",
      resetTimer
    );

    resetTimer();

    return () => {
      clearTimeout(timeout);

      window.removeEventListener(
        "mousemove",
        resetTimer
      );

      window.removeEventListener(
        "keypress",
        resetTimer
      );
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}