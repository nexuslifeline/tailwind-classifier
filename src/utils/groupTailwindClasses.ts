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
    other: string[];
  };

  /**
   * Regular expressions for matching Tailwind CSS classes, categorized by
   * functionality such as sizes, layout, spacing, etc., with support for 
   * classes prefixed with `!` (important symbol) and media queries.
   */
  const classPatterns: Record<keyof TailwindGroups, RegExp> = {
    sizes: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?(w|h|size|min-h|min-w|max-w)-.+$/,
    spacing: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?(m|p|mt|mr|mb|ml|space-x|space-y|py|px|my|mx|gap)-.+$/,
    text: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?(text-|font-|leading-|tracking-|uppercase|lowercase|capitalize|decoration-|align-|indent-).+$/,
    layout: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?((flex|table|inline|block|grid|items|justify|order|col|row|place|contents|list-item|flow-root)-.+|flex|grid|hidden|visible|list-item|contents|table|flow-root|inline|block)$/,
    positioning: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?((top|right|left|bottom|z|inset|transform|float|clear|object)-.+|relative|static|fixed|absolute|sticky|transform)$/,
    borders: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?((border|rounded)-.+|border)$/,
    background: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?(bg|shadow|opacity)-.+$/,
    animation: /^(?:sm:|md:|lg:|xl:|2xl:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?!?(transition|animate|ease|duration|delay)-.+$/,
    accessibility: /^(!?sm:|!?md:|!?lg:)?(?:hover:|focus:|active:|disabled:|group-hover:|group-focus:|even:|odd:|focus-within:|focus-visible:|first:|last:|not-first:|not-last:|visited:|checked:|placeholder-shown:|read-only:|focus-visible:|focus-within:|peer-)?(!?sr-only|!?not-sr-only|!?aria-)/,
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
