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
    pseudo: string[];
    other: string[];
  };

  /**
   * Regular expressions for matching Tailwind CSS classes, categorized by
   * functionality such as sizes, layout, spacing, etc., with support for 
   * classes prefixed with `!` (important symbol) and media queries.
   */
  const classPatterns: Record<keyof TailwindGroups, RegExp> = {
    sizes: /^(?:sm:|md:|lg:|xl:|2xl:)?!?(w|h|p|m|size|min-h|min-w|max-w)-.+$/,
    spacing: /^(?:sm:|md:|lg:|xl:|2xl:)?!?(m|p|mt|mr|mb|ml|space-x|space-y|py|px|my|mx|gap)-.+$/,
    text: /^(?:sm:|md:|lg:|xl:|2xl:)?!?(text-|font-|leading-|tracking-|uppercase|lowercase|capitalize|decoration-|align-|indent-).+$/,
    layout: /^(?:sm:|md:|lg:|xl:|2xl:)?!?((flex|table|inline|block|grid|items|justify|order|col|row|place|contents|list-item|flow-root)-.+|flex|grid|hidden|visible|list-item|contents|table|flow-root|inline|block)$/,
    positioning: /^(?:sm:|md:|lg:|xl:|2xl:)?!?((top|right|left|bottom|z|inset|transform|float|clear|object)-.+|relative|static|fixed|absolute|sticky|transform)$/,
    borders: /^(?:sm:|md:|lg:|xl:|2xl:)?!?((border|rounded)-.+|border)$/,
    background: /^(?:sm:|md:|lg:|xl:|2xl:)?!?(bg|shadow|opacity)-.+$/,
    animation: /^(?:sm:|md:|lg:|xl:|2xl:)?!?(transition|animate|ease|duration|delay)-.+$/,
    accessibility: /^(!?sm:|!?md:|!?lg:)?(!?sr-only|!?not-sr-only|!?aria-)/,
    pseudo: /^(!?sm:|!?md:|!?lg:)?(hover:|focus:|focus-visible:|active:|group:|peer:|disabled:|first:|last:|even:|odd:|checked:|visited:|placeholder-shown:|open:|focus-within:)/,
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
