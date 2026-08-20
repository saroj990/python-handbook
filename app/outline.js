export const sections = [
  {
    id: "basics",
    title: "01 Basics",
    blurb: "Take an order and save it.",
    hours: "6 h",
    pages: [
      { path: "01-basics/01-getting-started.md", title: "Getting started", minutes: 20 },
      { path: "01-basics/02-variables-and-data-types.md", title: "Variables and types", minutes: 25 },
      { path: "01-basics/03-operators.md", title: "Operators", minutes: 20 },
      { path: "01-basics/04-strings.md", title: "Strings", minutes: 25 },
      { path: "01-basics/05-collections.md", title: "Collections", minutes: 35 },
      { path: "01-basics/06-control-flow.md", title: "Control flow", minutes: 30 },
      { path: "01-basics/07-functions.md", title: "Functions", minutes: 35 },
      { path: "01-basics/08-modules-and-files.md", title: "Modules and files", minutes: 30 },
      { path: "01-basics/09-hands-on.md", title: "Hands-on examples", minutes: 40 },
      { path: "01-basics/10-practice.md", title: "Practice questions", minutes: 40 },
    ],
  },
  {
    id: "intermediate",
    title: "02 Intermediate",
    blurb: "Objects, errors, and a log.",
    hours: "6 h",
    pages: [
      { path: "02-intermediate/01-comprehensions.md", title: "Comprehensions", minutes: 25 },
      { path: "02-intermediate/02-error-handling.md", title: "Error handling", minutes: 30 },
      { path: "02-intermediate/03-object-oriented-python.md", title: "Object-oriented Python", minutes: 40 },
      { path: "02-intermediate/04-iterators-and-generators.md", title: "Iterators and generators", minutes: 35 },
      { path: "02-intermediate/05-decorators-and-context-managers.md", title: "Decorators and context managers", minutes: 35 },
      { path: "02-intermediate/06-functional-tools.md", title: "Functional tools", minutes: 30 },
      { path: "02-intermediate/07-datetime-and-regex.md", title: "Datetime and regex", minutes: 35 },
      { path: "02-intermediate/08-hands-on.md", title: "Hands-on examples", minutes: 40 },
      { path: "02-intermediate/09-practice.md", title: "Practice questions", minutes: 40 },
    ],
  },
  {
    id: "advanced",
    title: "03 Advanced",
    blurb: "Types, tests, and measurement.",
    hours: "6 h",
    pages: [
      { path: "03-advanced/01-type-hints.md", title: "Type hints", minutes: 30 },
      { path: "03-advanced/02-dataclasses.md", title: "Dataclasses", minutes: 30 },
      { path: "03-advanced/03-async-and-concurrency.md", title: "Async and concurrency", minutes: 40 },
      { path: "03-advanced/04-testing.md", title: "Testing", minutes: 35 },
      { path: "03-advanced/05-performance-and-internals.md", title: "Performance and internals", minutes: 30 },
      { path: "03-advanced/06-packaging-and-tooling.md", title: "Packaging and tooling", minutes: 30 },
      { path: "03-advanced/07-hands-on.md", title: "Hands-on examples", minutes: 40 },
      { path: "03-advanced/08-practice.md", title: "Practice questions", minutes: 40 },
    ],
  },
  {
    id: "data-science",
    title: "04 Data science",
    blurb: "Answer Ada with a plot.",
    hours: "8 h",
    pages: [
      { path: "04-data-science/01-numpy.md", title: "NumPy", minutes: 50 },
      { path: "04-data-science/02-pandas.md", title: "pandas", minutes: 50 },
      { path: "04-data-science/03-visualization.md", title: "Visualization", minutes: 40 },
      { path: "04-data-science/04-scipy-and-stats.md", title: "SciPy and statistics", minutes: 45 },
      { path: "04-data-science/05-end-to-end-project.md", title: "End-to-end project", minutes: 60 },
    ],
  },
];

export const studio = [
  { path: "labs/northside-cafe/README.md", title: "Café lab", kind: "lab" },
  { path: "practice/README.md", title: "Practice drills", kind: "drill" },
  { path: "PROGRESS.md", title: "Progress checklist", kind: "progress" },
  { path: "quizzes/01-basics.md", title: "Quiz · Basics", kind: "quiz" },
  { path: "quizzes/02-intermediate.md", title: "Quiz · Intermediate", kind: "quiz" },
  { path: "quizzes/03-advanced.md", title: "Quiz · Advanced", kind: "quiz" },
  { path: "quizzes/04-data-science.md", title: "Quiz · Data science", kind: "quiz" },
];

export function allLessonPages() {
  return sections.flatMap((section) => section.pages);
}

export function findPage(path) {
  return (
    allLessonPages().find((page) => page.path === path) ||
    studio.find((page) => page.path === path) ||
    null
  );
}

export function neighbors(path) {
  const pages = allLessonPages();
  const index = pages.findIndex((page) => page.path === path);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: pages[index - 1] || null,
    next: pages[index + 1] || null,
  };
}
