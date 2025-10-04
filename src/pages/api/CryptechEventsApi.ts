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

// Fetch GitHub events for both organizations
export const fetchGitHubEvents = async (): Promise<Event[]> => {
  const orgs = ["Cryptech-Services", "CryptechTest"];
  const allEvents: Event[] = [];

  try {
    const responses = await Promise.all(
      orgs.map((org) =>
        axios.get<Event[]>(`https://api.github.com/orgs/${org}/events`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        })
      )
    );

    for (const response of responses) {
      if (response.status === 200 && Array.isArray(response.data)) {
        allEvents.push(...response.data);
      } else {
        console.warn("Unexpected response:", response.status);
      }
    }

    // Optionally, sort all events by newest first
    return allEvents.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return [];
  }
};
