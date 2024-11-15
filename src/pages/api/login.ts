import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import supabase from "@/lib/supabase"; // Your Supabase client setup

// Login route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Fetch user from the database
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Successful login
    return res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
