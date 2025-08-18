import React from "react";

export default function TechBlogLogo({
  size = 48,
  primaryText = "Tech",
  secondaryText = "Blog",
  primaryColor = "#f9fafb", 
  secondaryColor = "#9ca3af",
  gradientStart = "#06b6d4",
  gradientEnd = "#8b5cf6" 

}) {
  const iconSize = size;
  const totalWidth = iconSize * 5; // adjust as needed for wordmark spacing

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalWidth}
      height={iconSize}
      viewBox={`0 0 240 48`}
      fill="none"
      role="img"
      aria-labelledby="title"
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
      <path
        d="M24 12 L30 24 L24 36 L18 24 Z"
        fill="url(#tb-accent)"
      />
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
        x={54 + primaryText.length * 12} // basic spacing calc
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
