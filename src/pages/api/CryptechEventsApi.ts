import axios from "axios";

// Define the types for the response data from GitHub API
export interface Commit {
  sha: string;
  author: {
    email: string;
    name: string;
  };
  message: string;
  url: string;
}

export interface Event {
  id: string;
  type: string;
  actor: {
    avatar_url: string;
    login: string;
    display_login: string;
  };
  repo: {
    url: string;
    name: string;
  };
  payload: {
    repository_id?: number;
    push_id?: number;
    size?: number;
    distinct_size?: number;
    ref?: string;
    head?: string;
    before?: string;
    commits?: Commit[];
    ref_type?: string;
    message?: string;
  };
  created_at: string;
}

// Fetch GitHub events for the organization and exclude dependabot
export const fetchGitHubEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(
      "https://api.github.com/orgs/Cryptech-Services/events",
      {
        headers: {
          Accept: "application/vnd.github.v3+json", // Use the correct GitHub API version
        },
      }
    );

    if (response.status === 200) {
      // Filter out events where the actor's login is "dependabot[bot]"
      return response.data.filter(
        (event) => event.actor.login !== "dependabot[bot]"
      );
    } else {
      console.error("Unexpected response status:", response.status);
      return [];
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
};
