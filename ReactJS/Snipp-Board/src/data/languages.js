   export const languages = [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "Python",
        "Java",
        "C",
        "C++",
        "C#",
        "Go",
        "Rust",
        "PHP",
        "SQL",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "Git",
        "JSON",
        "YAML",
        "Markdown",
        "GraphQL",
    ];

    export const snippets = [
  {
    id: 1,
    title: "Center a Div",
    language: "HTML",
    code: `<div class="container">
  <h1>Hello World</h1>
</div>`,
    tags: ["html", "layout", "beginner"],
    favorite: true,
  },
  {
    id: 2,
    title: "Flex Center",
    language: "CSS",
    code: `display: flex;
justify-content: center;
align-items: center;`,
    tags: ["css", "flexbox"],
    favorite: false,
  },
  {
    id: 3,
    title: "Debounce Function",
    language: "JavaScript",
    code: `const debounce = (fn, delay) => {
  let timer;
};`,
    tags: ["javascript", "performance"],
    favorite: true,
  },
  {
    id: 4,
    title: "useState Example",
    language: "React",
    code: `const [count, setCount] = useState(0);`,
    tags: ["react", "hooks"],
    favorite: false,
  },
  {
    id: 5,
    title: "Python For Loop",
    language: "Python",
    code: `for i in range(5):
    print(i)`,
    tags: ["python", "loops"],
    favorite: false,
  },

  // ...continue until 30
];