"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { githubSection } from "@/lib/data";
import type { ContributionDay, GithubActivity } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_CLASS = [
  "bg-[var(--heatmap-empty)]",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
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

const WEEKDAYS = [
  { weekday: 1, label: "Mon" },
  { weekday: 3, label: "Wed" },
  { weekday: 5, label: "Fri" },
];

const DAYS_PER_WEEK = 7;
const CELL_SIZE = 13;
const GAP = 4;

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

function computeStats(days: ContributionDay[]) {
  let activeDays = 0;
  let longest = 0;
  let run = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      activeDays += 1;
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let index = days.length - 1;
  if (index >= 0 && days[index].contributionCount === 0) index -= 1;

  let current = 0;
  for (; index >= 0; index -= 1) {
    if (days[index].contributionCount > 0) current += 1;
    else break;
  }

  return { activeDays, currentStreak: current, longestStreak: longest };
}

export function GitHubActivity({ activity }: { activity: GithubActivity }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
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

  const { activeDays, currentStreak, longestStreak } = useMemo(
    () => computeStats(days),
    [days]
  );

  const [focusIndex, setFocusIndex] = useState(() =>
    Math.max(0, days.length - 1)
  );

  const firstWeekday = days.length ? parseDay(days[0].date).getUTCDay() : 0;

  const weekdayLabels = useMemo(
    () =>
      WEEKDAYS.map(({ weekday, label }) => ({
        label,
        row: ((weekday - firstWeekday + DAYS_PER_WEEK) % DAYS_PER_WEEK) + 1,
      })),
    [firstWeekday]
  );

  const monthLabels = useMemo(() => {
    const labels: (string | null)[] = [];
    let lastLabelIndex = -99;
    let lastLabelMonth = -1;
    let lastLabelYear = -1;

    activity.weeks.forEach((week, index) => {
      const first = week.contributionDays[0];
      if (!first) {
        labels.push(null);
        return;
      }

      const start = parseDay(first.date);
      const month = start.getUTCMonth();
      const year = start.getUTCFullYear();

      if (month === lastLabelMonth && year === lastLabelYear) {
        labels.push(null);
        return;
      }

      let weeksInMonth = 0;
      for (let i = index; i < activity.weeks.length; i += 1) {
        const day = activity.weeks[i].contributionDays[0];
        if (!day) continue;
        const value = parseDay(day.date);
        if (
          value.getUTCMonth() !== month ||
          value.getUTCFullYear() !== year
        ) {
          break;
        }
        weeksInMonth += 1;
      }

      const isFirstLabel = lastLabelIndex === -99;
      if (isFirstLabel && weeksInMonth < 3) {
        labels.push(null);
        return;
      }
      if (index - lastLabelIndex < 3) {
        labels.push(null);
        return;
      }

      labels.push(MONTHS[month]);
      lastLabelIndex = index;
      lastLabelMonth = month;
      lastLabelYear = year;
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
    const wrapper = wrapperRef.current;
    if (!tooltip || !wrapper) return;

    const cellRect = cell.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const above = cellRect.top - wrapperRect.top;
    const placeBelow = above < 48;

    tooltip.textContent = `${day.contributionCount} contributions on ${dayLabel(
      day.date
    )}`;
    tooltip.style.left = `${cellRect.left - wrapperRect.left + cellRect.width / 2}px`;
    tooltip.style.top = placeBelow
      ? `${cellRect.bottom - wrapperRect.top}px`
      : `${above}px`;
    tooltip.style.transform = placeBelow
      ? "translate(-50%, 0)"
      : "translate(-50%, -100%)";
    tooltip.style.opacity = "1";
  }

  function hideTooltip() {
    const tooltip = tooltipRef.current;
    if (tooltip) tooltip.style.opacity = "0";
  }

  const weeks = activity.weeks.length;
  const gridWidth = `max(100%, ${weeks * (CELL_SIZE + GAP)}px)`;
  const gridColumns = `repeat(${weeks}, minmax(${CELL_SIZE}px, 1fr))`;

  const stats = [
    { label: githubSection.stats.total, value: activity.totalContributions },
    { label: githubSection.stats.active, value: activeDays },
    { label: githubSection.stats.currentStreak, value: currentStreak },
    { label: githubSection.stats.longestStreak, value: longestStreak },
  ];

  return (
    <section id="github" className="relative w-full py-24 sm:py-32 scroll-mt-[72px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10 lg:px-16">
        <span className="font-mono text-[13px] uppercase tracking-widest text-accent">
          {githubSection.eyebrow}
        </span>

        <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <h2
            style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
            className="font-display text-ink text-[length:var(--text-h2)] [text-wrap:balance]"
          >
            {githubSection.heading}
          </h2>
          <a
            href={githubSection.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-base text-ink transition-colors [@media(hover:hover)]:hover:text-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div ref={wrapperRef} className="relative mt-12 flex gap-2">
          <div
            aria-hidden="true"
            className="mt-8 hidden shrink-0 sm:grid sm:grid-rows-7"
          >
            {weekdayLabels.map(({ label, row }) => (
              <span
                key={label}
                className="text-sm text-ink-dim"
                style={{ gridRow: row }}
              >
                {label}
              </span>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="min-w-0 flex-1 overflow-x-auto"
            data-lenis-prevent
          >
            <div
              className="grid gap-[4px]"
              style={{ gridTemplateColumns: gridColumns, width: gridWidth }}
            >
              {monthLabels.map((label, index) => (
                <span
                  key={index}
                  className="relative h-6 text-sm text-ink-dim"
                  style={{ gridColumn: index + 1, gridRow: 1 }}
                >
                  {label ? (
                    <span className="absolute left-0 whitespace-nowrap">
                      {label}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            <div
              ref={gridRef}
              role="group"
              aria-label={`${activity.totalContributions} ${githubSection.stats.total.toLowerCase()}`}
              onKeyDown={handleKeyDown}
              className={cn(
                "mt-2 grid grid-flow-col grid-rows-7 gap-[4px]",
                inView && "github-grid-in"
              )}
              style={{ gridTemplateColumns: gridColumns, width: gridWidth }}
            >
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
                    "github-cell aspect-square rounded-[3px]",
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
          </div>

          <div
            ref={tooltipRef}
            role="status"
            className="pointer-events-none absolute z-20 rounded-lg border border-ink/15 bg-surface px-4 py-2 text-sm text-ink opacity-0 transition-opacity"
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-ink-dim">
          <span>Less</span>
          {LEVEL_CLASS.map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className={cn("h-4 w-4 rounded-[3px]", level)}
            />
          ))}
          <span>More</span>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-ink/10 pt-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-ink-dim">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
