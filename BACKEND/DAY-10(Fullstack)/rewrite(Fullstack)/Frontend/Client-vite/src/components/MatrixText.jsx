
import { useEffect, useState } from "react";

const letters = "$%!*1$!*#-!_0?/:9;$%4!*$2!*#-7!_?/:;";

export default function MatrixText({
  text,
  as = "span", // span | input | textarea | button
  className = "",
  ...props
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      const output = text
        .split("")
        .map((char, index) => {
          if (index < iteration) return text[index];

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      setDisplay(output);

      iteration += 1.15;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  if (as === "input") {
    return (
      <input
        {...props}
        placeholder={display}
        className={className}
      />
    );
  }

  if (as === "textarea") {
    return (
      <textarea
        {...props}
        placeholder={display}
        className={className}
      />
    );
  }

  if (as === "button") {
    return (
      <button
        {...props}
        className={className}
      >
        {display}
      </button>
    );
  }

  return (
    <span className={className}>
      {display}
    </span>
  );
}