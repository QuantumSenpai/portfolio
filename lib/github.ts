import { githubSection } from "@/lib/data";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

export interface GithubActivity {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
}

const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 21600;

const QUERY = `
  query Contributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

// Server-side diagnostics: always log the failure reason (never the token) so
// a failed fetch is visible in build and server logs, including production.
function warn(message: string) {
  console.warn(`[github] ${message}`);
}

export async function getGithubActivity(): Promise<GithubActivity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    warn(
      "GITHUB_TOKEN is not set — the contributions graph is unavailable, rendering the fallback."
    );
    return null;
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "kisu-portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: githubSection.username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      warn(`GitHub request failed with status ${response.status}.`);
      return null;
    }

    const payload = (await response.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              totalContributions?: number;
              weeks?: { contributionDays?: ContributionDay[] }[];
            };
          };
        };
      };
      errors?: { message?: string }[];
    };

    const calendar =
      payload.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar || !Array.isArray(calendar.weeks)) {
      const reason = payload.errors?.[0]?.message;
      warn(
        `GitHub GraphQL response could not be read${reason ? `: ${reason}` : "."}`
      );
      return null;
    }

    return {
      totalContributions: calendar.totalContributions ?? 0,
      weeks: calendar.weeks.map((week) => ({
        contributionDays: week.contributionDays ?? [],
      })),
    };
  } catch (error) {
    warn(
      `GitHub request failed: ${error instanceof Error ? error.message : "unknown error"}`
    );
    return null;
  }
}
