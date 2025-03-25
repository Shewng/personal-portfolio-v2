import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ links, path }) => {
  const [activeLink, setActiveLink] = useState(path);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // State to manage the indicator's style
  const [selectorStyle, setSelectorStyle] = useState({
    opacity: 0,
    width: 0,
    transform: "translateX(0px)",
    transition: "all 0.125s ease",
  });

  // Refs to directly access DOM elements of nav items
  const hoveredLinkRef = useRef([]);
  const lastHoveredIndexRef = useRef(null);

  // Update selector when hoveredIndex changes
  useEffect(() => {
    // Proceed if an item is being hovered, and we have a ref for it
    if (hoveredIndex !== null && hoveredLinkRef.current[hoveredIndex]) {
      const hoveredLink = hoveredLinkRef.current[hoveredIndex];

      // Get the first nav item as a reference point for positioning
      const containerLeft =
        hoveredLinkRef.current[0].getBoundingClientRect().left;
      const hoveredLinkRect = hoveredLink.getBoundingClientRect();

      // Calculate position and width for selector translate
      const left = hoveredLinkRect.left - containerLeft;

      // If before and after index is right next to each other (i.e. 1 2), then we should smooth slide
      const isLinkAdjacent =
        lastHoveredIndexRef.current !== null &&
        Math.abs(hoveredIndex - lastHoveredIndexRef.current) === 1;

      // Set indicator style
      setSelectorStyle({
        opacity: 0.6,
        width: `${hoveredLinkRect.width}px`,
        transform: `translateX(${left}px)`,
        transition: !isLinkAdjacent ? "opacity 0.125s ease" : "all 0.125s ease",
      });

      // Update last hovered index to this current one
      lastHoveredIndexRef.current = hoveredIndex;
    } else {
      // Reset selector because no link is hovered
      setSelectorStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));

      // Reset last hovered index too
      lastHoveredIndexRef.current = null;
    }
  }, [hoveredIndex]);

  // Set link index upon hover
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  // Reset link index when hovering off links
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <header>
      <nav>
        {/* Navigation links */}
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            ref={(el) => (hoveredLinkRef.current[index] = el)}
            className={`link${activeLink === link.href ? " active" : ""}`}
            onClick={() => setActiveLink(link.href)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {link.label}
          </a>
        ))}

        {/* Sliding background indicator */}
        <div className="selector" style={selectorStyle} />
      </nav>
    </header>
  );
};

export default Navbar;
