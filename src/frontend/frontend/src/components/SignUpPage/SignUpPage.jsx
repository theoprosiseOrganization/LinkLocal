import Layout from "../Layout/Layout";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import React, { use, useState } from "react";
import { createUser } from "../../../src/api";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userName: "",
    location: "",
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
    const { userName, location, email, password } = formData;

    if (!userName || !location || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (password.length < 7) {
      alert("Password must be at least 7 characters long.");
      return;
    }

    try {
      const response = await createUser({
        name: userName,
        location,
        email,
        password,
      });
      alert(response.message);
      // Redirect or perform further actions after successful signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Sign Up </CardTitle>
            <CardDescription>
              Enter your information below to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="location"
                    placeholder="San Francisco, CA"
                    required
                  />
                </div>
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
                    Sign Up
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
