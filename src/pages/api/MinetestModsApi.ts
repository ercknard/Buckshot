import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GITHUB_API_URL =
  "https://api.github.com/repos/CryptechTest/cryptech/contents/mods";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(GITHUB_API_URL);
    const files = response.data;

    const modNames = files
      .filter(
        (file: { type: string }) => file.type === "dir" || file.type === "file"
      )
      .map((file: { name: string; html_url: string }) => ({
        name: file.name,
        html_url: file.html_url,
      }));

    res.status(200).json(modNames);
  } catch (error) {
    // Assert the error to be an instance of Error
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to fetch mod list", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}
