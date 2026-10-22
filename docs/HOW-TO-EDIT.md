# How to edit this site

Every list in `lib/data.ts` renders in **array order**. There is no `order` field
and nothing is sorted anywhere in the code — to reorder a list, cut and paste
the whole object. Adding or removing an item never needs a component edit.

Copy a template below, fill it in, and paste it into the matching array.
Fields marked OPTIONAL can be left out completely.

```
  project     -> projects[]
  otherRepo   -> otherRepos[]
  experience  -> experiences[]
  skillGroup  -> skillGroups[]
  skillItem   -> skillGroups[].items[]
  video       -> videos[]
  social link -> socials[]
  service     -> services[]
```

## Templates

### project → `projects[]`

```ts
{
  slug: "my-project",              // required, unique
  title: "My Project",             // required
  year: "2026",                    // required
  role: "Frontend Developer",      // required
  description: "One line about it.",// required
  tags: ["HTML", "CSS", "JS"],      // required, max 3
  featured: true,                  // required — only featured rows are shown
  category: "web",                 // OPTIONAL — "web" | "dsa" | "ml" | "game"
  image: "/work/my-project.webp",  // OPTIONAL — "/work/x.webp" or a full https URL
  liveUrl: "https://example.com",  // OPTIONAL
  repoUrl: "https://github.com/…", // OPTIONAL
  caseStudyHref: "#experience",    // OPTIONAL — internal anchor
}
```

`description` is one line. `tags` is max 3. `image` is either `"/work/x.webp"`
or a full https URL (e.g. Cloudinary). `caseStudyHref` is an internal anchor
like `"#experience"`.

### otherRepo → `otherRepos[]`

```ts
{
  name: "my-repo",                 // required, unique
  language: "TypeScript",          // required
  url: "https://github.com/…",     // required
}
```

### experience → `experiences[]`

```ts
{
  id: "my-role",                   // required, unique
  role: "Role title",              // required
  org: "Organisation",             // required
  dates: "2024 – 2026",            // required
  bullets: ["What you did.", "What you shipped."], // required, max 5
  tags: ["Tool", "Tool"],          // required
  location: "Remote",              // OPTIONAL
  summary: "One or two sentences.", // OPTIONAL
  stats: [{ label: "4-stage" }],   // OPTIONAL, max 3
}
```

### skillGroup → `skillGroups[]`

```ts
{
  label: "Group name",             // required, unique
  items: [{ name: "Skill" }],      // required, at least one item
  blurb: "One short sentence.",    // OPTIONAL
}
```

### skillItem → `skillGroups[].items[]`

```ts
{
  name: "Skill name",              // required
  status: "core",                  // OPTIONAL — "core" | "learning"
  note: "Short clarification.",    // OPTIONAL
}
```

### video → `videos[]`

```ts
{
  id: "YouTubeId",                 // required, unique
  title: "Video title",            // required
  caption: "After Effects · Edit", // OPTIONAL
  kind: "video",                   // required — "video" | "short"
  thumb: "/reel/my-short.jpg",     // OPTIONAL — local path or full URL
}
```

`id` is the YouTube video id — a video without an id is hidden. `kind: "short"`
puts the entry in the horizontal 9:16 rail, `kind: "video"` in the 16:9 grid.
`thumb` falls back to the YouTube thumbnail when omitted.

### social link → `socials[]`

```ts
{
  label: "GitHub",                 // required, unique
  url: "https://github.com/…",     // required
}
```

### service → `services[]`

```ts
{
  title: "Web",                    // required, unique
  line: "One line about the service.", // required
}
```

## `lib/data.ts` layout

```
contactSection / contactForm   Contact copy, form labels and error strings
email, socials, availability   Contact links and the availability line
heroCopy, heroLinks           Hero copy and the bottom-row link pills
githubSection                  GitHub section copy and stat labels
navLinks                       Primary navigation links
footer                         Copyright, signature and the link columns
privacy                        Privacy policy sections
workSection, projects          Work copy and the project list
otherRepos                     The small repository list
experienceSection, experiences Experience copy and the role list
aboutSection                   About copy, portrait and bio
skillGroups                    Skill groups and their items
services                       The three service blocks
reelSection, videos            Reel copy and the video list
stats                          Legacy counters, not rendered anywhere
```

`aboutSection.legacy` holds the original About / Skills copy. It has no slot in
the merged layout and is kept so nothing is lost.

The three `otherRepos` entries are placeholders — replace them when you have
real repositories to show.

## Rate limits

`lib/rate-limit.ts` applies, per client IP (SHA-256 hashed, never stored raw):

- 3 submissions per hour
- 10 submissions per day
- 25 submissions per day across every visitor (protects the Formspree quota)

The counters live in Upstash Redis when `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN` are set; otherwise they fall back to an in-memory
map that is cleared when the server restarts.

## Contact endpoint

`app/api/contact/route.ts` rejects bodies over 10KB, requires the consent flag,
ignores submissions sent less than 3 seconds after the page loaded, requires
the `Origin`/`Referer` host to match the request host (or `SITE_URL`), checks
that the service is one of the allowed options, and validates name, email and
message lengths. A filled honeypot field is answered with a fake success and
nothing is sent to Formspree.

## Environment variables

`FORMSPREE_FORM_ID` — the Formspree form id, used server-side only.
`GITHUB_TOKEN` — a GitHub token with read access, used server-side only. Without
it the contributions section is hidden.
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — optional, enable the
shared rate limiter.
`SITE_URL` — the public origin, used for metadata, robots.txt and sitemap.xml.

## Data validation

`lib/validate-data.ts` runs in development only (it is loaded through a guarded
dynamic import from `lib/data.ts`). Every check prints a `[data]` error naming
the list, the index and the field that is wrong.
