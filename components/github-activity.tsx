"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { githubSection } from "@/lib/data";
import type { ContributionDay, GithubActivity } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_CLASS = [
  "bg-accent/0",
  "bg-accent/20",
  "bg-accent/40",
  "bg-accent/65",
  "bg-accent",
];

const LEVEL_BY_NAME: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS_PER_WEEK = 7;
const TOTAL_LABEL = "Contributions in the last year";

function parseDay(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function dayLabel(date: string) {
  const value = parseDay(date);
  const weekday = value.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${weekday} ${day}, ${value.getUTCFullYear()}`;
}

function computeStreaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let current = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].contributionCount > 0) current += 1;
    else break;
  }

  return { currentStreak: current, longestStreak: longest };
}

export function GitHubActivity({ activity }: { activity: GithubActivity }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const cells = useMemo(() => {
    const list: { day: ContributionDay; weekIndex: number }[] = [];
    activity.weeks.forEach((week, weekIndex) => {
      week.contributionDays.forEach((day) => list.push({ day, weekIndex }));
    });
    return list;
  }, [activity]);

  const days = useMemo(() => cells.map((cell) => cell.day), [cells]);

  const { currentStreak, longestStreak } = useMemo(
    () => computeStreaks(days),
    [days]
  );

  const [focusIndex, setFocusIndex] = useState(() =>
    Math.max(0, days.length - 1)
  );

  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = [];
    let previousMonth = -1;
    let lastLabelIndex = -99;

    activity.weeks.forEach((week, index) => {
      const first = week.contributionDays[0];
      if (!first) {
        labels.push(null);
        return;
      }
      const month = parseDay(first.date).getUTCMonth();
      const changed = month !== previousMonth;
      previousMonth = month;
      if (changed && index - lastLabelIndex >= 3) {
        labels.push(MONTHS[month]);
        lastLabelIndex = index;
      } else {
        labels.push(null);
      }
    });

    return labels;
  }, [activity]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollLeft = container.scrollWidth;
  }, []);

  function focusCell(index: number) {
    const clamped = Math.max(0, Math.min(days.length - 1, index));
    setFocusIndex(clamped);
    const cell = gridRef.current?.querySelector<HTMLElement>(
      `[data-cell-index="${clamped}"]`
    );
    cell?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const key = event.key;

    if (key === "Home") {
      event.preventDefault();
      focusCell(0);
      return;
    }

    if (key === "End") {
      event.preventDefault();
      focusCell(days.length - 1);
      return;
    }

    const row = focusIndex % DAYS_PER_WEEK;
    let target: number | null = null;

    if (key === "ArrowLeft") {
      target = focusIndex - DAYS_PER_WEEK;
    } else if (key === "ArrowRight") {
      target = focusIndex + DAYS_PER_WEEK;
    } else if (key === "ArrowUp") {
      if (row > 0) target = focusIndex - 1;
    } else if (key === "ArrowDown") {
      if (row < DAYS_PER_WEEK - 1) target = focusIndex + 1;
    }

    if (target === null) return;
    if (target < 0 || target >= days.length) return;

    event.preventDefault();
    focusCell(target);
  }

  function showTooltip(cell: HTMLElement, day: ContributionDay) {
    const tooltip = tooltipRef.current;
    const grid = gridRef.current;
    if (!tooltip || !grid) return;
    const cellRect = cell.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    tooltip.textContent = `${day.contributionCount} contributions on ${dayLabel(
      day.date
    )}`;
    tooltip.style.left = `${cellRect.left - gridRect.left + cellRect.width / 2}px`;
    tooltip.style.top = `${cellRect.top - gridRect.top}px`;
    tooltip.style.opacity = "1";
  }

  function hideTooltip() {
    const tooltip = tooltipRef.current;
    if (tooltip) tooltip.style.opacity = "0";
  }

  const stats = [
    { label: TOTAL_LABEL, value: activity.totalContributions },
    { label: "Current streak", value: currentStreak },
    { label: "Longest streak", value: longestStreak },
  ];

  return (
    <section id="github" className="relative w-full py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
          {githubSection.eyebrow}
        </span>
        <h2
          style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
          className="mt-4 font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
        >
          {githubSection.heading}
        </h2>

        <div
          ref={scrollRef}
          className="mt-12 overflow-x-auto pt-12"
          data-lenis-prevent
        >
          <div
            ref={gridRef}
            role="group"
            aria-label={`${activity.totalContributions} ${TOTAL_LABEL.toLowerCase()}`}
            onKeyDown={handleKeyDown}
            className={cn("relative w-max", inView && "github-grid-in")}
          >
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: `repeat(${activity.weeks.length}, 13px)`,
              }}
            >
              {monthLabels.map((label, index) => (
                <span key={index} className="relative h-5 text-sm text-ink-dim">
                  {label ? (
                    <span className="absolute left-0 whitespace-nowrap">
                      {label}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {cells.map((cell, index) => (
                <button
                  key={cell.day.date}
                  type="button"
                  data-cell-index={index}
                  tabIndex={index === focusIndex ? 0 : -1}
                  aria-label={`${cell.day.contributionCount} contributions on ${dayLabel(
                    cell.day.date
                  )}`}
                  style={{ "--i": cell.weekIndex } as React.CSSProperties}
                  className={cn(
                    "github-cell h-[13px] w-[13px] rounded-[3px]",
                    LEVEL_CLASS[LEVEL_BY_NAME[cell.day.contributionLevel] ?? 0]
                  )}
                  onMouseEnter={(event) =>
                    showTooltip(event.currentTarget, cell.day)
                  }
                  onMouseLeave={hideTooltip}
                  onFocus={(event) => showTooltip(event.currentTarget, cell.day)}
                  onBlur={hideTooltip}
                />
              ))}
            </div>

            <div
              ref={tooltipRef}
              role="status"
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg border border-ink/15 bg-surface px-3 py-2 text-sm text-ink opacity-0 transition-opacity"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-ink-dim">
          <span>Less</span>
          {LEVEL_CLASS.map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className={cn("h-[13px] w-[13px] rounded-[3px]", level)}
            />
          ))}
          <span>More</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-bold text-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ink-dim">{stat.label}</p>
            </div>
          ))}
        </div>

        <a
          href={githubSection.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex min-h-11 items-center gap-2 text-base text-ink transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
        >
          View on GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
