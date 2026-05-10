import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Coffee, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

 return (
  <div className="h-screen w-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2">
    
    {/* Left Side - Image */}
    <div className="hidden lg:block relative h-screen">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1682979358243-816a75830f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzc0MzUxNDkyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Coffee Shop Interior"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-end p-10">
        <div className="text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Welcome Back to CoffeeCRM
          </h2>

          <p className="text-lg text-gray-200">
            Manage your coffee shop with orders, inventory, and reports in one dashboard.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Login */}
    <div className="flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-2xl mb-4">
            <Coffee className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Sign In
          </h1>

          <p className="text-gray-600 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Form */}
        <Card className="p-6 shadow-xl border-0 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <a
                href="#"
                className="text-amber-600 hover:text-amber-700"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Card>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-600 font-medium hover:text-amber-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}
