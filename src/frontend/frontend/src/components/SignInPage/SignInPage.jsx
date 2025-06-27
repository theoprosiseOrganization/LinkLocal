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
import { loginUser } from "../../api";
import { useNavigate } from "react-router";

/**
 * SignInPage component function.
 *
 * @function SignInPage
 * @returns {JSX.Element} The JSX element representing the sign in page.
 */
export default function SignInPage() {
  /**
   * State variable to store the user's login data (email and password).
   *
   * @type {Object}
   * @property {string} email - The user's email address.
   * @property {string} password - The user's password.
   */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /**
   * Updates user data on changes to the form input fields.
   *
   * @param {Event} e - The event object triggered by the input field change.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  /**
   * Checks the form submission and redirects to profile if successful.
   *
   * @param {Event} e - The event object triggered by the form submission.
   */
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
      // Redirect to profile page after successful login
      alert("Signed in successfully!");
      navigate("/profile");
    } catch (error) {
      alert(error.message);
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
