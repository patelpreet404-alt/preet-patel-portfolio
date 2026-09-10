import packageJson from "../../package.json";
import themes from "../../themes.json";
import config from "../../config.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import {
  about,
  achievements,
  banner,
  education,
  experience,
  github,
  help,
  linkedin,
  optilang,
  projects,
  rag,
  resume,
  skills,
} from "./bin";
import { CalcError, evaluate } from "./calc";
import { convert, listSupportedUnits } from "./convert";
import { todoManager } from "./todo";

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => help(),
  hostname: () => hostname,
  whoami: () => "preet-patel",
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(" "),
  about: () => about(),
  achievements: () => achievements(),
  education: () => education(),
  projects: () => projects(),
  experience: () => experience(),
  skills: () => skills(),
  optilang: (args: string[]) => optilang(args),
  rag: () => rag(),
  sudo: (args: string[]) => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    const themeCommand = args[0] === "set" ? args[1] : args[0];

    switch (args[0]) {
      case "ls": {
        let result = themes.map((t) => t.name.toLowerCase()).join(", ");
        result += `You can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;

        return result;
      }

      case "set": {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        if (args.length !== 1 || !themeCommand) {
          return usage;
        }

        const selectedTheme = themes.find(
          (t) => t.name.toLowerCase() === themeCommand,
        );

        if (!selectedTheme) {
          return usage;
        }

        theme.set(selectedTheme);

        return `Theme set to ${themeCommand}`;
      }
    }
  },
  repo: () => {
    window.open(`https://github.com/${config.social.github}`, "_blank");

    return "Opening repository...";
  },
  clear: () => {
    history.set([]);

    return "";
  },
  email: () => {
    window.open(`mailto:${config.email}`);

    return `Email: ${config.email}\nOpening mailto:${config.email}...`;
  },
  weather: async (args: string[]) => {
    const city = args.join("+");

    if (!city) {
      return "Usage: weather [city]. Example: weather Brussels";
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return "Please close the tab to exit.";
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return "curl: no URL provided";
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: (args: string[]) => banner(args),
  resume: (args: string[]) => resume(args),
  github: (args: string[]) => github(args),
  linkedin: (args: string[]) => linkedin(args),
  todo: (args: string[]) => {
    const usage = `Usage: todo [command] [args]

Commands:
  add <text>     Add a new todo
  ls [filter]    List todos (filter: all, completed, pending)
  done <id>      Mark todo as completed
  rm <id>        Remove a todo
  clear [completed]  Clear todos (add 'completed' to clear only completed)
  stats          Show todo statistics

Examples:
  todo add Buy groceries
  todo ls
  todo ls pending
  todo done 1
  todo rm 2
  todo clear completed`;

    if (args.length === 0) {
      return usage;
    }

    const [subCommand, ...subArgs] = args;

    switch (subCommand) {
      case "add":
        if (subArgs.length === 0) {
          return "Error: Please provide todo text. Example: todo add Buy milk";
        }
        return todoManager.add(subArgs.join(" "));

      case "ls":
      case "list":
        const filter = subArgs[0] as
          | "all"
          | "completed"
          | "pending"
          | undefined;
        if (filter && !["all", "completed", "pending"].includes(filter)) {
          return "Error: Invalid filter. Use: all, completed, or pending";
        }
        return todoManager.list(filter);

      case "done":
      case "complete":
        const completeId = parseInt(subArgs[0]);
        if (isNaN(completeId)) {
          return "Error: Please provide a valid todo ID number";
        }
        return todoManager.complete(completeId);

      case "rm":
      case "remove":
      case "delete":
        const removeId = parseInt(subArgs[0]);
        if (isNaN(removeId)) {
          return "Error: Please provide a valid todo ID number";
        }
        return todoManager.remove(removeId);

      case "clear":
        const onlyCompleted = subArgs[0] === "completed";
        return todoManager.clear(onlyCompleted);

      case "stats":
        return todoManager.stats();

      default:
        return `Unknown todo command: ${subCommand}\n\n${usage}`;
    }
  },
  calc: (args: string[]) => {
    const usage = `Usage: calc <expression>

Examples:
  calc 2+2
  calc (3 + 4) * 2 - 1
  calc 100 / 7

Supported: + - * / % and parentheses.`;

    if (args.length === 0) {
      return usage;
    }

    const expr = args.join(" ").trim();
    if (expr === "") {
      return usage;
    }

    try {
      const result = evaluate(expr);
      return result.toString();
    } catch (e) {
      if (e instanceof CalcError) {
        return e.message;
      }
      return `error: ${(e as Error).message}`;
    }
  },
  convert: (args: string[]) => {
    const usage = `Usage: convert <value> <from> to <to>

Examples:
  convert 100 km to mi
  convert 0 C to F
  convert 1 GiB to MiB

Supported units:
${listSupportedUnits()}`;

    if (args.length === 0) {
      return usage;
    }
    if (args.length !== 4 || args[2] !== "to") {
      return usage;
    }

    const value = Number(args[0]);
    if (Number.isNaN(value)) {
      return `error: '${args[0]}' is not a valid number`;
    }

    const result = convert(value, args[1], args[3]);
    if (!result.ok) {
      return result.error;
    }
    return `${value} ${result.fromUnit} = ${result.value} ${result.toUnit}`;
  },
};
