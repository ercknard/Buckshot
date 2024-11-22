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
    id: number;
    login: string;
    display_login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    repository_id: number;
    push_id: number;
    size: number;
    distinct_size: number;
    ref: string;
    head: string;
    before: string;
    commits: Commit[];
  };
  created_at: string;
  org: {
    id: number;
    login: string;
    avatar_url: string;
  };
}

// Fetch GitHub events for the organization
export const fetchGitHubEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get(
      "https://api.github.com/orgs/CryptechTest/events"
    );
    const events = response.data; // Get the event data from the API

    // Filter out events from the repository 'CryptechTest/announcement'
    const filteredEvents = events.filter(
      (event: Event) => event.repo.name !== "CryptechTest/announcement"
    );

    return filteredEvents; // Return the filtered event data
  } catch (error) {
    console.error("Error fetching events:", error);
    return []; // Return an empty array in case of an error
  }
};
