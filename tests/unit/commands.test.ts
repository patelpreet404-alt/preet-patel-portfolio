import { describe, it, expect, beforeEach, vi } from 'vitest';
import { commands } from '../../src/utils/commands';
import { history } from '../../src/stores/history';
import { theme } from '../../src/stores/theme';

describe('commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('location', { hostname: 'test-host' });
  });

  describe('help', () => {
    it('should return available commands by category', () => {
      const result = commands.help([]);
      expect(result).toContain('Available commands:');
      expect(result).toContain('Profile & Background');
      expect(result).toContain('Interactive Benchmarks & Engineering Demos');
      expect(result).toContain('Contact & Socials');
      expect(result).toContain('System Utilities');
      expect(result).toContain('achievements');
      expect(result).toContain('help        Displays this organized command menu');
    });

    it('should list commands under each category', () => {
      const result = commands.help([]);
      expect(result).toContain('education');
      expect(result).toContain('skills');
      expect(result).toContain('resume');
      expect(result).toContain('clear');
      expect(result).toContain('todo');
      expect(result).toContain('theme');
      expect(result).toContain('hostname');
    });
  });

  describe('hostname', () => {
    it('should return current hostname', () => {
      const result = commands.hostname([]);
      expect(result).toBe('preet-patel');
    });
  });

  describe('whoami', () => {
    it('should return the portfolio username', () => {
      const result = commands.whoami([]);
      expect(result).toBe('preet-patel');
    });
  });

  describe('date', () => {
    it('should return formatted date', () => {
      const result = commands.date([]);
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });

  describe('editor commands', () => {
    it('vi should suggest emacs', () => {
      const result = commands.vi([]);
      expect(result).toBe('why use vi? try \'emacs\'');
    });

    it('vim should suggest emacs', () => {
      const result = commands.vim([]);
      expect(result).toBe('why use vim? try \'emacs\'');
    });

    it('emacs should suggest vim', () => {
      const result = commands.emacs([]);
      expect(result).toBe('why use emacs? try \'vim\'');
    });
  });

  describe('echo', () => {
    it('should echo arguments', () => {
      const result = commands.echo(['hello', 'world']);
      expect(result).toBe('hello world');
    });

    it('should handle single argument', () => {
      const result = commands.echo(['test']);
      expect(result).toBe('test');
    });

    it('should handle no arguments', () => {
      const result = commands.echo([]);
      expect(result).toBe('');
    });
  });

  describe('sudo', () => {
    it('should open YouTube and deny permission', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.sudo(['ls']);

      expect(mockOpen).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      );
      expect(result).toContain('Permission denied');
      expect(result).toContain('ls');
    });
  });

  describe('theme', () => {
    it('should return usage when no args provided', () => {
      const result = commands.theme([]);
      expect(result).toContain('Usage: theme [args]');
    });

    it('should list themes with ls command', () => {
      const result = commands.theme(['ls']);
      expect(result).toContain(',');
      expect(result).toContain('github.com');
    });

    it('should set theme with set command', () => {
      const result = commands.theme(['set', 'gruvboxdark']);
      expect(result).toContain('Theme set to gruvboxdark');
    });

    it('should return error for unknown theme', () => {
      const result = commands.theme(['set', 'unknown']);
      expect(result).toContain('not found');
    });

    it('should return usage for invalid subcommand', () => {
      const result = commands.theme(['invalid']);
      expect(result).toContain('Usage: theme [args]');
    });
  });

  describe('repo', () => {
    it('should open repository URL', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.repo([]);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining('github.com'),
        '_blank',
      );
      expect(result).toContain('Opening repository...');
    });
  });

  describe('email', () => {
    it('should open mailto link', () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      const result = commands.email([]);

      expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining('mailto:'));
      expect(result).toContain('Opening mailto:');
    });
  });

  describe('portfolio profile commands', () => {
    it('should render the complete education record and skills taxonomy', () => {
      const education = commands.education([]);
      const skills = commands.skills([]);

      expect(education).toContain('Delhi Technological University');
      expect(education).toContain('Sep 2023 - May 2027');
      expect(education).toContain('23/CS/494');
      expect(education).toContain('International Indian School Al Jubail');
      expect(education).toContain('85.6%');
      expect(education).toContain('92.6%');
      expect(education).toContain('PCM with Computer Science');
      expect(skills).toContain('Java, C, C++');
      expect(skills).toContain('Scikit-learn, TensorFlow, Pandas, NumPy');
      expect(skills).toContain('LangSmith');
    });

    it('should expose all four projects and achievements', () => {
      const projects = commands.projects([]);

      expect(projects).toContain('Pre-Encryption and Identification of Crypto Ransomwares');
      expect(projects).toContain('AI Learning Management System');
      expect(projects).toContain('ResearchPaper AI');
      expect(projects).toContain('OptiLang - Mini Compiler');
      expect(projects).toContain('https://github.com/patelpreet404-alt/OptiLang');
      expect(commands.achievements([])).toContain('Smart India Hackathon (SIH) 2024');
    });

    it('should open the exact resume and social profiles', async () => {
      const mockOpen = vi.fn();
      vi.stubGlobal('open', mockOpen);

      await commands.resume([]);
      await commands.github([]);
      await commands.linkedin([]);

      expect(mockOpen).toHaveBeenNthCalledWith(
        1,
        'https://drive.google.com/file/d/1wJ8Kj22-lA1ZZn6f3LUmQoYsJYKjWzJR/view?usp=drivesdk',
        '_blank',
      );
      expect(mockOpen).toHaveBeenNthCalledWith(
        2,
        'https://github.com/patelpreet404-alt',
        '_blank',
      );
      expect(mockOpen).toHaveBeenNthCalledWith(
        3,
        'https://www.linkedin.com/in/preet-patel-162631317/',
        '_blank',
      );
    });
  });

  describe('clear', () => {
    it('should clear history', () => {
      const setSpy = vi.spyOn(history, 'set');

      const result = commands.clear([]);

      expect(setSpy).toHaveBeenCalledWith([]);
      expect(result).toBe('');
    });
  });

  describe('weather', async () => {
    it('should return usage when no city provided', async () => {
      const result = await commands.weather([]);
      expect(result).toContain('Usage: weather [city]');
    });

    it('should fetch weather for city', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve('Weather report'),
      });

      const result = await commands.weather(['Brussels']);
      expect(result).toBe('Weather report');
    });
  });

  describe('exit', () => {
    it('should return close tab message', () => {
      const result = commands.exit([]);
      expect(result).toBe('Please close the tab to exit.');
    });
  });

  describe('curl', async () => {
    it('should return error when no URL provided', async () => {
      const result = await commands.curl([]);
      expect(result).toContain('no URL provided');
    });

    it('should fetch URL content', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        text: () => Promise.resolve('<html>content</html>'),
      });

      const result = await commands.curl(['https://example.com']);
      expect(result).toBe('<html>content</html>');
    });

    it('should handle fetch errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await commands.curl(['https://example.com']);
      expect(result).toContain('could not fetch URL');
      expect(result).toContain('Network error');
    });
  });

  describe('banner', () => {
    it('should display the Preet Patel ASCII art banner', async () => {
      const result = await commands.banner([]);
      expect(result).toContain('██████╗');
      expect(result).toContain("Welcome to Preet Patel's Interactive Terminal Portfolio!");
      expect(result).toContain("Type 'resume' to open or download my PDF resume.");
      expect(result).toContain("Type 'projects' or 'optilang --metrics' for software engineering projects.");
    });
  });

  describe('todo', () => {
    it('should return usage when no subcommand provided', () => {
      const result = commands.todo([]);
      expect(result).toContain('Usage: todo [command]');
    });

    it('should add todo with add subcommand', () => {
      const result = commands.todo(['add', 'Buy groceries']);
      expect(result).toContain('✓ Added todo');
      expect(result).toContain('Buy groceries');
    });

    it('should return error when add has no text', () => {
      const result = commands.todo(['add']);
      expect(result).toContain('Error: Please provide todo text');
    });

    it('should list todos with ls subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['ls']);
      expect(result).toContain('Test todo');
    });

    it('should list pending todos with filter', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['ls', 'pending']);
      expect(result).toContain('Test todo');
    });

    it('should return error for invalid filter', () => {
      const result = commands.todo(['ls', 'invalid']);
      expect(result).toContain('Error: Invalid filter');
    });

    it('should complete todo with done subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['done', '1']);
      expect(result).toContain('✓ Completed todo');
    });

    it('should return error for non-numeric ID', () => {
      const result = commands.todo(['done', 'abc']);
      expect(result).toContain('Error: Please provide a valid todo ID');
    });

    it('should remove todo with rm subcommand', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['rm', '1']);
      expect(result).toContain('✗ Removed todo');
    });

    it('should clear all todos', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      const result = commands.todo(['clear']);
      expect(result).toContain('Cleared');
    });

    it('should clear completed todos', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      commands.todo(['add', 'Test todo']);
      commands.todo(['done', '1']);
      const result = commands.todo(['clear', 'completed']);
      expect(result).toContain('Cleared');
    });

    it('should show statistics', () => {
      const result = commands.todo(['stats']);
      expect(result).toContain('📊 Todo Statistics');
    });

  it('should return error for unknown subcommand', () => {
    const result = commands.todo(['unknown']);
    expect(result).toContain('Unknown todo command');
  });
});

  describe('calc', () => {
    it('returns usage when no expression', () => {
      const result = commands.calc([]);
      expect(result).toContain('Usage: calc');
    });

    it('evaluates a simple expression', () => {
      expect(commands.calc(['2+2'])).toBe('4');
    });

    it('joins multi-arg expressions', () => {
      expect(commands.calc(['2', '+', '3', '*', '4'])).toBe('14');
    });

    it('handles parentheses', () => {
      expect(commands.calc(['(3', '+', '4)', '*', '2', '-', '1'])).toBe('13');
    });

    it("returns error message for unknown operator '**'", () => {
      const result = commands.calc(['2', '**', '8']);
      expect(result).toContain("unknown operator '**'");
    });

    it('returns error for division by zero', () => {
      expect(commands.calc(['100', '/', '0'])).toContain('division by zero');
    });

    it('returns error for invalid input', () => {
      expect(commands.calc(['abc'])).toContain('error');
    });
  });

  describe('convert', () => {
    it('returns usage when no args', () => {
      const result = commands.convert([]);
      expect(result).toContain('Usage: convert');
      expect(result).toContain('length');
      expect(result).toContain('temperature');
    });

    it('returns usage when "to" keyword missing', () => {
      const result = commands.convert(['100', 'km', 'mi']);
      expect(result).toContain('Usage: convert');
    });

    it('converts km to mi', () => {
      const result = commands.convert(['100', 'km', 'to', 'mi']);
      expect(result).toContain('100 km =');
      expect(result).toContain('mi');
    });

    it('converts 0 C to 32 F', () => {
      const result = commands.convert(['0', 'C', 'to', 'F']);
      expect(result).toContain('= 32');
    });

    it('converts 1 GiB to 1024 MiB', () => {
      const result = commands.convert(['1', 'GiB', 'to', 'MiB']);
      expect(result).toContain('1 GiB = 1024 MiB');
    });

    it('rejects cross-category conversion', () => {
      const result = commands.convert(['1', 'km', 'to', 'kg']);
      expect(result).toContain('cannot convert');
    });

    it('rejects unknown unit', () => {
      const result = commands.convert(['1', 'foo', 'to', 'm']);
      expect(result).toContain("unknown unit 'foo'");
    });

    it('rejects non-numeric value', () => {
      const result = commands.convert(['abc', 'km', 'to', 'mi']);
      expect(result).toContain('not a valid number');
    });
  });
});
