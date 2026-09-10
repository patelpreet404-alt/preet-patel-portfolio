import { describe, it, expect } from 'vitest';
import { CalcError, evaluate } from '../../src/utils/calc';

describe('evaluate', () => {
  describe('basic arithmetic', () => {
    it('adds', () => expect(evaluate('2+2')).toBe(4));
    it('subtracts', () => expect(evaluate('5-3')).toBe(2));
    it('multiplies', () => expect(evaluate('4*5')).toBe(20));
    it('divides', () => expect(evaluate('10/4')).toBe(2.5));
    it('modulo', () => expect(evaluate('7 % 3')).toBe(1));
  });

  describe('precedence and associativity', () => {
    it('multiplication before addition', () => {
      expect(evaluate('2 + 3 * 4')).toBe(14);
    });
    it('division before subtraction', () => {
      expect(evaluate('20 - 8 / 2')).toBe(16);
    });
    it('left-associative division', () => {
      expect(evaluate('100 / 5 / 2')).toBe(10);
    });
    it('left-associative subtraction', () => {
      expect(evaluate('10 - 4 - 3')).toBe(3);
    });
    it('parentheses override precedence', () => {
      expect(evaluate('(2 + 3) * 4')).toBe(20);
    });
    it('nested parentheses', () => {
      expect(evaluate('((1+2) * (3+4))')).toBe(21);
    });
  });

  describe('decimals and signs', () => {
    it('decimals', () => expect(evaluate('1.5 + 2.5')).toBe(4));
    it('leading dot', () => expect(evaluate('.5 + .5')).toBe(1));
    it('unary minus', () => expect(evaluate('-5')).toBe(-5));
    it('unary minus on parenthesised expression', () => {
      expect(evaluate('-(3+4)')).toBe(-7);
    });
    it('unary plus', () => expect(evaluate('+5')).toBe(5));
    it('subtract a negative', () => expect(evaluate('5 - -3')).toBe(8));
    it('double negative', () => expect(evaluate('--5')).toBe(5));
  });

  describe('whitespace handling', () => {
    it('ignores leading/trailing/inner spaces', () => {
      expect(evaluate('  2  +  2  ')).toBe(4);
    });
    it('handles no spaces', () => expect(evaluate('2+2*3')).toBe(8));
    it('handles tabs', () => expect(evaluate('2\t+\t3')).toBe(5));
  });

  describe('errors', () => {
    it('division by zero', () => {
      expect(() => evaluate('100 / 0')).toThrow(CalcError);
      expect(() => evaluate('100 / 0')).toThrow('division by zero');
    });
    it('modulo by zero', () => {
      expect(() => evaluate('5 % 0')).toThrow('division by zero');
    });
    it("unknown ** operator", () => {
      expect(() => evaluate('2 ** 8')).toThrow("unknown operator '**'");
    });
    it("unknown ^ operator", () => {
      expect(() => evaluate('2 ^ 8')).toThrow("unknown operator '^'");
    });
    it('missing close paren', () => {
      expect(() => evaluate('(3 + 4')).toThrow();
    });
    it('unexpected character', () => {
      expect(() => evaluate('abc')).toThrow();
    });
    it('empty expression', () => {
      expect(() => evaluate('')).toThrow();
    });
    it('trailing garbage', () => {
      expect(() => evaluate('2+2 abc')).toThrow();
    });
    it('multiple decimal points', () => {
      expect(() => evaluate('1.2.3')).toThrow();
    });
    it('lone dot', () => {
      expect(() => evaluate('.')).toThrow();
    });
  });
});
