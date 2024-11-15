import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import supabase from "@/lib/supabase"; // Your Supabase client setup

// Sign-up route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user already exists
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (data) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the users table
    const { error: insertError } = await supabase.from("users").insert([
      {
        email,
        password: hashedPassword,
        role: "user", // Default role
      },
    ]);

    if (insertError) {
      return res.status(500).json({ error: "Error creating user" });
    }

    return res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
