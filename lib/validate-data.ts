/**
 * Development-only data checks.
 *
 * This module is never imported in production — `lib/data.ts` loads it with a
 * guarded dynamic import, so it costs nothing in a production build.
 *
 * Every check prints a clear `[data]` error naming the list, the index and the
 * field that is wrong.
 */

import {
  aboutSection,
  availability,
  contactForm,
  contactSection,
  email,
  experiences,
  experienceSection,
  footer,
  otherRepos,
  privacy,
  projects,
  reelSection,
  services,
  skillGroups,
  socials,
  stats,
  videos,
  workSection,
} from "./data";

const SECTION_IDS = ["work", "experience", "about", "reel", "contact"];

function error(where: string, message: string) {
  console.error(`[data] ${where} — ${message}`);
}

function isFilled(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function checkUrl(where: string, field: string, value: unknown, required = false) {
  if (value === undefined || value === null || value === "") {
    if (required) error(where, `"${field}" is required`);
    return;
  }
  if (!isFilled(value)) {
    error(where, `"${field}" must be a non-empty string`);
    return;
  }
  if (!isHttpUrl(value)) {
    error(where, `"${field}" is not a valid http(s) URL — "${value}"`);
  }
}

function checkAnchor(where: string, field: string, value: unknown) {
  if (value === undefined) return;
  if (!isFilled(value)) {
    error(where, `"${field}" must be a non-empty string`);
    return;
  }
  if (!value.startsWith("#")) {
    error(where, `"${field}" must be an internal anchor like "#experience"`);
    return;
  }
  if (!SECTION_IDS.includes(value.slice(1))) {
    error(
      where,
      `"${field}" points at "${value}" but there is no section with that id (known ids: ${SECTION_IDS.join(
        ", "
      )})`
    );
  }
}

function checkDuplicates(where: string, values: string[], field: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      error(where, `duplicate ${field} "${value}"`);
    }
    seen.add(value);
  }
}

/* ------------------------------- projects ------------------------------- */

function validateProjects() {
  projects.forEach((project, index) => {
    const where = `projects[${index}]`;
    if (!isFilled(project.slug)) error(where, `"slug" is required`);
    if (!isFilled(project.title)) error(where, `"title" is required`);
    if (!isFilled(project.year)) error(where, `"year" is required`);
    if (!isFilled(project.role)) error(where, `"role" is required`);
    if (!isFilled(project.description)) error(where, `"description" is required`);
    if (typeof project.featured !== "boolean") {
      error(where, `"featured" must be true or false`);
    }
    if (!Array.isArray(project.tags) || project.tags.length === 0) {
      error(where, `"tags" must be a non-empty array`);
    } else if (project.tags.length > 3) {
      error(where, `"tags" has ${project.tags.length} entries — max 3`);
    }
    project.tags?.forEach((tag, tagIndex) => {
      if (!isFilled(tag)) error(`${where}.tags[${tagIndex}]`, "must not be empty");
    });

    checkUrl(where, "liveUrl", project.liveUrl);
    checkUrl(where, "repoUrl", project.repoUrl);
    checkAnchor(where, "caseStudyHref", project.caseStudyHref);
    if (project.image !== undefined && !isFilled(project.image)) {
      error(where, `"image" must be a non-empty string`);
    }
  });

  checkDuplicates(
    "projects",
    projects.map((project) => project.slug),
    "slug"
  );
}

/* ------------------------------ other repos ----------------------------- */

function validateOtherRepos() {
  otherRepos.forEach((repo, index) => {
    const where = `otherRepos[${index}]`;
    if (!isFilled(repo.name)) error(where, `"name" is required`);
    if (!isFilled(repo.language)) error(where, `"language" is required`);
    checkUrl(where, "url", repo.url, true);
  });

  checkDuplicates(
    "otherRepos",
    otherRepos.map((repo) => repo.name),
    "name"
  );
}

/* ------------------------------ experiences ----------------------------- */

function validateExperiences() {
  experiences.forEach((entry, index) => {
    const where = `experiences[${index}]`;
    if (!isFilled(entry.id)) error(where, `"id" is required`);
    if (!isFilled(entry.role)) error(where, `"role" is required`);
    if (!isFilled(entry.org)) error(where, `"org" is required`);
    if (!isFilled(entry.dates)) error(where, `"dates" is required`);
    if (!Array.isArray(entry.bullets) || entry.bullets.length === 0) {
      error(where, `"bullets" must be a non-empty array`);
    } else {
      const max = 5;
      if (entry.bullets.length > max) {
        error(
          where,
          `"bullets" has ${entry.bullets.length} entries — max ${max}`
        );
      }
      entry.bullets.forEach((bullet, bulletIndex) => {
        if (!isFilled(bullet)) {
          error(`${where}.bullets[${bulletIndex}]`, "must not be empty");
        }
      });
    }
    if (!Array.isArray(entry.tags) || entry.tags.length === 0) {
      error(where, `"tags" must be a non-empty array`);
    }
    if (entry.stats !== undefined) {
      if (!Array.isArray(entry.stats)) {
        error(where, `"stats" must be an array`);
      } else if (entry.stats.length > 3) {
        error(where, `"stats" has ${entry.stats.length} entries — max 3`);
      } else {
        entry.stats.forEach((stat, statIndex) => {
          if (!isFilled(stat?.label)) {
            error(`${where}.stats[${statIndex}]`, `"label" is required`);
          }
        });
      }
    }
  });

  checkDuplicates(
    "experiences",
    experiences.map((entry) => entry.id),
    "id"
  );
}

/* ------------------------------ skill groups ---------------------------- */

function validateSkillGroups() {
  const allNames: string[] = [];

  skillGroups.forEach((group, index) => {
    const where = `skillGroups[${index}]`;
    if (!isFilled(group.label)) error(where, `"label" is required`);
    if (!Array.isArray(group.items) || group.items.length === 0) {
      error(where, `"items" must be a non-empty array`);
      return;
    }
    group.items.forEach((item, itemIndex) => {
      const itemWhere = `${where}.items[${itemIndex}]`;
      if (!isFilled(item?.name)) error(itemWhere, `"name" is required`);
      else allNames.push(item.name);
      if (
        item?.status !== undefined &&
        item.status !== "core" &&
        item.status !== "learning"
      ) {
        error(itemWhere, `"status" must be "core" or "learning"`);
      }
      if (item?.note !== undefined && !isFilled(item.note)) {
        error(itemWhere, `"note" must be a non-empty string`);
      }
    });
  });

  checkDuplicates(
    "skillGroups",
    skillGroups.map((group) => group.label),
    "label"
  );
  checkDuplicates("skillGroups.items", allNames, "skill name");
}

/* -------------------------------- videos -------------------------------- */

function validateVideos() {
  videos.forEach((video, index) => {
    const where = `videos[${index}]`;
    if (!isFilled(video.id)) {
      error(where, `"id" is required — a video without an id is hidden`);
    } else if (!/^[A-Za-z0-9_-]{11}$/.test(video.id)) {
      error(where, `"id" is not a YouTube video id — "${video.id}"`);
    }
    if (!isFilled(video.title)) error(where, `"title" is required`);
    if (video.caption !== undefined && !isFilled(video.caption)) {
      error(where, `"caption" must be a non-empty string`);
    }
  });

  checkDuplicates(
    "videos",
    videos.map((video) => video.id),
    "id"
  );
}

/* ------------------------------- socials -------------------------------- */

function validateSocials() {
  socials.forEach((social, index) => {
    const where = `socials[${index}]`;
    if (!isFilled(social.label)) error(where, `"label" is required`);
    checkUrl(where, "url", social.url, true);
  });

  checkDuplicates(
    "socials",
    socials.map((social) => social.label),
    "label"
  );
}

/* ------------------------------- services ------------------------------- */

function validateServices() {
  services.forEach((service, index) => {
    const where = `services[${index}]`;
    if (!isFilled(service.title)) error(where, `"title" is required`);
    if (!isFilled(service.line)) error(where, `"line" is required`);
  });

  checkDuplicates(
    "services",
    services.map((service) => service.title),
    "title"
  );
}

/* --------------------------- section copy ------------------------------- */

function validateSectionCopy() {
  const sections: [string, { eyebrow?: string; heading?: string }][] = [
    ["workSection", workSection],
    ["experienceSection", experienceSection],
    ["aboutSection", aboutSection],
    ["reelSection", reelSection],
    ["contactSection", contactSection],
  ];

  for (const [name, section] of sections) {
    if (!isFilled(section.eyebrow)) error(name, `"eyebrow" is required`);
    if (!isFilled(section.heading)) error(name, `"heading" is required`);
  }

  aboutSection.bio?.forEach((paragraph, index) => {
    if (!isFilled(paragraph)) {
      error(`aboutSection.bio[${index}]`, "must not be empty");
    }
  });

  if (!isFilled(aboutSection.education?.line)) {
    error("aboutSection.education", `"line" is required`);
  }
  if (!isFilled(aboutSection.portrait?.src)) {
    error("aboutSection.portrait", `"src" is required`);
  }
  if (!isFilled(aboutSection.portrait?.alt)) {
    error("aboutSection.portrait", `"alt" is required`);
  }
  if (!isFilled(aboutSection.portrait?.caption)) {
    error("aboutSection.portrait", `"caption" is required`);
  }

  if (!isFilled(availability.text)) error("availability", `"text" is required`);
  if (!isFilled(footer.copyright)) error("footer", `"copyright" is required`);
  if (!isFilled(footer.signatureAlt)) {
    error("footer", `"signatureAlt" is required`);
  }
  if (!isFilled(footer.signatureText)) {
    error("footer", `"signatureText" is required`);
  }

  if (!isFilled(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    error("email", `"${email}" is not a valid email address`);
  }

  contactForm.fields.forEach((field, index) => {
    if (!isFilled(field)) error(`contactForm.fields[${index}]`, "must not be empty");
  });
  contactForm.services.forEach((service, index) => {
    if (!isFilled(service)) {
      error(`contactForm.services[${index}]`, "must not be empty");
    }
  });

  if (!isFilled(privacy.updated)) error("privacy", `"updated" is required`);
  privacy.sections.forEach((section, index) => {
    const where = `privacy.sections[${index}]`;
    if (!isFilled(section.heading)) error(where, `"heading" is required`);
    if (!Array.isArray(section.paragraphs) || section.paragraphs.length === 0) {
      error(where, `"paragraphs" must be a non-empty array`);
    }
  });

  stats.forEach((stat, index) => {
    if (!isFilled(stat.label)) error(`stats[${index}]`, `"label" is required`);
    if (
      stat.value === undefined ||
      stat.value === null ||
      String(stat.value).trim() === ""
    ) {
      error(`stats[${index}]`, `"value" is required`);
    }
  });
}

/** Runs every check. Only called in development. */
export function validateData() {
  validateProjects();
  validateOtherRepos();
  validateExperiences();
  validateSkillGroups();
  validateVideos();
  validateSocials();
  validateServices();
  validateSectionCopy();
}
