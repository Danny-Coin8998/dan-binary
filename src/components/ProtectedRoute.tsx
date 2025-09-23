"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import unprotectedRoutes from "./routes-config/unprotectroutes.json";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const hasChecked = useRef(false);

  const {
    verifyToken,
    isAuthenticated: storeIsAuthenticated,
    jwtToken,
  } = useAuthStore();

  const handleCheck = async () => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    // Check if current path is in unprotected routes
    if (unprotectedRoutes.includes(pathname)) {
      setIsAuthenticated(true);
      setIsChecked(true);
      return;
    }

    // Check if we have a token in localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      setIsAuthenticated(false);
      setIsRedirecting(true);
      router.push("/login");
      return;
    }

    // If store already has authentication state, use it
    if (storeIsAuthenticated && jwtToken) {
      setIsAuthenticated(true);
      setIsChecked(true);
      return;
    }

    // Verify the token with the server
    try {
      const response = await verifyToken(token);
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        // Token is invalid, remove it and redirect
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setIsRedirecting(true);
        router.push("/login");
        return;
      }
    } catch {
      // Error verifying token, remove it and redirect
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setIsRedirecting(true);
      router.push("/login");
      return;
    }

    setIsChecked(true);
  };

  useEffect(() => {
    handleCheck();
  }, [pathname]);

  // Show loading state while checking authentication or redirecting
  if (!isChecked || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If not authenticated, return null to allow redirect to complete
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render children
  return <Fragment>{children}</Fragment>;
};
