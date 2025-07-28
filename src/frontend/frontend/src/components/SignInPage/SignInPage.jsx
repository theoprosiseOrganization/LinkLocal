/**
 * Sign In Page component.
 *
 * This component renders a sign in form, allowing users to enter their email and password to access their account.
 * It includes form validation to ensure that both fields are filled out before submission.
 * Upon successful login, it redirects the user to their profile page.
 *
 * @component
 * @example
 * <SignInPage />
 * @returns {JSX.Element} The rendered SignInPage component.
 */

import Layout from "../Layout/Layout";
import { Button } from "../../../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import React, { useState } from "react";
import { loginUser } from "../../api";
import { useNavigate } from "react-router";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = await loginUser({ email, password });
      if (response.error || response.success === false) {
        alert(
          response.message ||
            "Invalid email or password. Check your credentials."
        );
        return;
      }
      alert("Signed in successfully!");
      navigate("/profile");
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    }
  };

  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email below to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:underline focus:outline-none"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
