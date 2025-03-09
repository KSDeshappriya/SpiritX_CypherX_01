import { PrismaClient } from "@prisma/client"; // Import PrismaClient from @prisma/client
const prisma = new PrismaClient(); // Create a new instance of PrismaClient
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWT tokens

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  // Extract username and password from request body
  const { username, password } = req.body;

  // Find the user in the database by username
  const user = await prisma.user.findUnique({ where: { username } });
  // If user is not found or password does not match, return 401 Unauthorized
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Create a JWT token with user id and username
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'default_secret', {
  });

  // Return success response with the token
  res.status(200).json({ message: "Login successful", token });
}
