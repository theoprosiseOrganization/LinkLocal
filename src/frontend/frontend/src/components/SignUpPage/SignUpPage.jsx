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
import React, { use, useState } from "react";
import { createUser } from "../../api";
import { useNavigate } from "react-router";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    // location stores { address, latitude, longitude }
    location: {},
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
      // Redirect to profile page after successful signup
      alert("Signed up successfully!");
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  const placeAutocomplete = new google.maps.places.AutocompleteElement();
  placeAutocomplete.id = "location";
  placeAutocomplete.locationBias = center;
  const locationInput = document.getElementById("location");
  locationInput.appendChild(placeAutocomplete);

  placeAutocomplete.addListener("gmp-select", ({ placeGuess }) => {
    const place = placeGuess.toPlace();
    place.fetchFields({
      fields: ["displayName", "formattedAddress", "location"],
    });
    locationAddress = place.formattedAddress;
    locationCoords = place.location;
  });

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
                  <Label htmlFor="location">Location</Label>
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
