import { writable } from 'svelte/store';
import type { Command } from '../interfaces/command';

export const sanitizeHistory = (entries: Command[]): Command[] =>
  entries.map((entry) => ({
    ...entry,
    outputs: entry.outputs.map((output) =>
      output
        .replace(/<div[^>]*>\s*<span[^>]*>\s*Phone:\s*<\/span>[\s\S]*?<\/div>/gi, '')
        .replace(/<a\b[^>]*href=["']tel:[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, ''),
    ),
  }));

const loadHistory = (): Command[] => {
  try {
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? sanitizeHistory(JSON.parse(savedHistory) as Command[]) : [];
  } catch {
    return [];
  }
};

export const history = writable<Array<Command>>(loadHistory());

history.subscribe((value) => {
  localStorage.setItem('history', JSON.stringify(value));
});
