import { PrismaClient } from "@prisma/client"; // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Instantiate PrismaClient
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  // Destructure username, password, and confirmPassword from request body
  const { username, password, confirmPassword } = req.body;

  // Validate input fields
  if (!username || !password || password !== confirmPassword) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Check if password length is at least 8 characters
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  // Check if the username already exists in the database
  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists." });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create a new user in the database with the hashed password
  await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  // Send a success response
  res.status(201).json({ message: "User registered successfully" });
}
