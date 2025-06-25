import Layout from "../Layout/Layout";
import { Button } from "../../../components/ui/button";
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
import { loginUser } from "../../../src/api";

export default function SignInPage() {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }
    try {
      const response = loginUser({
        email,
        password,
      });
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
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
