/**
 * Groups Tailwind CSS classes into predefined categories for better organization.
 * 
 * The function splits a string of classes into an array, matches each class
 * against a set of regular expressions, and organizes them into groups such
 * as layout, spacing, sizes, etc.
 *
 * @param {string} classes - A string containing Tailwind CSS class names.
 * @returns {string[]} - An array of grouped and concatenated class strings,
 *                       each representing a category of Tailwind CSS classes.
 */
export const groupTailwindClasses = (classes: string): string[] => {
  /**
   * Type definition for Tailwind CSS groups, with each key representing a category
   * of classes and each value being an array of matched class names.
   */
  type TailwindGroups = {
    sizes: string[];
    spacing: string[];
    text: string[];
    layout: string[];
    positioning: string[];
    borders: string[];
    background: string[];
    animation: string[];
    accessibility: string[];
    visibility: string[];
    pseudo: string[];
    other: string[];
  };

  /**
   * Regular expressions for matching Tailwind CSS classes, categorized by
   * functionality such as sizes, layout, and spacing.
   */
  const classPatterns: Record<keyof TailwindGroups, RegExp> = {
    sizes: /^(w-|h-|min-w-|min-h-|max-w-|max-h-)/,
    spacing: /^(m-|p-|gap-|space-)/,
    text: /^(text-|font-|leading-|tracking-)/,
    layout: /^(flex|grid|items-|justify-|gap-|place-)/,
    positioning: /^(absolute|relative|fixed|sticky|top-|left-|z-)/,
    borders: /^(border-|rounded-|outline-|divide-)/,
    background: /^(bg-|shadow-|opacity-)/,
    animation: /^(transition-|duration-|animate-)/,
    accessibility: /^(sr-only|not-sr-only|aria-)/,
    visibility: /^(block|hidden|invisible)/,
    pseudo: /^(hover:|focus:|group-|peer-)/,
    other: /.*/, // Matches any class not captured by the other classPatterns.
  };

  // Split input classes into an array, removing any extra spaces.
  const classArray = classes.split(/\s+/).filter(Boolean);

  // Initialize an object to store classes grouped by their categories.
  const groupedClasses: TailwindGroups = {
    layout: [],
    sizes: [],
    positioning: [],
    borders: [],
    background: [],
    spacing: [],
    text: [],
    animation: [],
    accessibility: [],
    visibility: [],
    pseudo: [],
    other: [],
  };

  // Categorize each class by matching it against the regular expressions
  classArray.forEach(cls => {
    const group = Object.entries(classPatterns).find(([_, regex]) => regex.test(cls))?.[0];
    if (group) {
      groupedClasses[group as keyof TailwindGroups].push(cls);
    } else {
      groupedClasses.other.push(cls); // Add unmatched classes to "other"
    }
  });

  // Return the grouped classes as an array of concatenated strings
  return Object.values(groupedClasses)
    .map(group => group.join(" ")) // Join classes within each group
    .filter(Boolean); // Remove empty groups
};
