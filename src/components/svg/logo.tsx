import React from "react";

export default function TechBlogLogo({
  primaryText = "Tech",
  secondaryText = "Blog",
  primaryColor = "#f9fafb",
  secondaryColor = "#9ca3af",
  gradientStart = "#06b6d4",
  gradientEnd = "#8b5cf6",
}) {
  const charWidth = 12;
  const textWidth =
    (primaryText.length + secondaryText.length) * charWidth;

  const iconWidth = 54;
  const viewBoxWidth = iconWidth + textWidth + 10;
  const viewBoxHeight = 48;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      role="img"
      aria-labelledby="title"
      className="h-10 w-auto"
      preserveAspectRatio="xMinYMid meet"
    >
      <title>{`${primaryText} ${secondaryText} Logo`}</title>
      <defs>
        <linearGradient id="tb-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={gradientStart} />
          <stop offset="1" stopColor={gradientEnd} />
        </linearGradient>
      </defs>

      {/* Icon */}
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="url(#tb-accent)"
        strokeWidth="3"
        fill="none"
      />
      <path d="M24 12 L30 24 L24 36 L18 24 Z" fill="url(#tb-accent)" />
      <circle cx="24" cy="24" r="3" fill={primaryColor} />

      {/* Wordmark */}
      <text
        x="54"
        y="30"
        fontFamily="Inter, ui-sans-serif, system-ui"
        fontSize="20"
        fontWeight="700"
        fill={primaryColor}
      >
        {primaryText}
      </text>
      <text
        x={54 + primaryText.length * charWidth}
        y="30"
        fontFamily="Inter, ui-sans-serif, system-ui"
        fontSize="20"
        fontWeight="400"
        fill={secondaryColor}
      >
        {secondaryText}
      </text>
    </svg>
  );
}
