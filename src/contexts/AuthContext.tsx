
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

type UserStatus = "free" | "subscribed";

type AuthContextType = {
  user: User | null;
  userStatus: UserStatus;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  invoicesCreated: number;
  hasReachedLimit: boolean;
  isSubscribed: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>("free");
  const [loading, setLoading] = useState(true);
  const [invoicesCreated, setInvoicesCreated] = useState(0);

  const isSubscribed = userStatus === "subscribed";
  const hasReachedLimit = !isSubscribed && (
    !user ? invoicesCreated >= 1 : invoicesCreated >= 5
  );

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkUserSubscription(session.user.id);
        await getUserInvoiceCount(session.user.id);
      }
      
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await checkUserSubscription(session.user.id);
          await getUserInvoiceCount(session.user.id);
        } else {
          setUserStatus("free");
          setInvoicesCreated(0);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if user has an active subscription
  const checkUserSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("status")
        .eq("user_id", userId)
        .eq("status", "active")
        .single();

      if (data) {
        setUserStatus("subscribed");
      } else {
        setUserStatus("free");
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setUserStatus("free");
    }
  };

  // Get user's invoice count
  const getUserInvoiceCount = async (userId: string) => {
    try {
      const { count, error } = await supabase
        .from("invoices")
        .select("*", { count: "exact" })
        .eq("user_id", userId);

      if (!error && count !== null) {
        setInvoicesCreated(count);
      }
    } catch (error) {
      console.error("Error getting invoice count:", error);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      }
    });
  };

  // Sign out
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    userStatus,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    invoicesCreated,
    hasReachedLimit,
    isSubscribed,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
