import { describe, it, expect } from 'vitest';
import { convert } from '../../src/utils/convert';

function expectOk(r: ReturnType<typeof convert>): asserts r is { ok: true; value: number; fromUnit: string; toUnit: string } {
  if (!r.ok) {
    throw new Error(`expected ok result, got error: ${r.error}`);
  }
}

describe('convert', () => {
  describe('length', () => {
    it('km to m', () => {
      const r = convert(1, 'km', 'm');
      expectOk(r);
      expect(r.value).toBe(1000);
    });
    it('m to cm', () => {
      const r = convert(1, 'm', 'cm');
      expectOk(r);
      expect(r.value).toBe(100);
    });
    it('km to mi', () => {
      const r = convert(100, 'km', 'mi');
      expectOk(r);
      expect(r.value).toBeCloseTo(62.13711922, 5);
    });
    it('ft to m', () => {
      const r = convert(1, 'ft', 'm');
      expectOk(r);
      expect(r.value).toBeCloseTo(0.3048, 6);
    });
    it('round-trips mi -> km -> mi', () => {
      const there = convert(5, 'mi', 'km');
      expectOk(there);
      const back = convert(there.value, 'km', 'mi');
      expectOk(back);
      expect(back.value).toBeCloseTo(5, 6);
    });
  });

  describe('mass', () => {
    it('kg to g', () => {
      const r = convert(2, 'kg', 'g');
      expectOk(r);
      expect(r.value).toBe(2000);
    });
    it('lb to kg', () => {
      const r = convert(1, 'lb', 'kg');
      expectOk(r);
      expect(r.value).toBeCloseTo(0.45359237, 6);
    });
    it('t to kg', () => {
      const r = convert(1, 't', 'kg');
      expectOk(r);
      expect(r.value).toBe(1000);
    });
  });

  describe('temperature', () => {
    it('0 C = 32 F', () => {
      const r = convert(0, 'C', 'F');
      expectOk(r);
      expect(r.value).toBeCloseTo(32, 6);
    });
    it('100 C = 212 F', () => {
      const r = convert(100, 'C', 'F');
      expectOk(r);
      expect(r.value).toBeCloseTo(212, 6);
    });
    it('-40 C = -40 F', () => {
      const r = convert(-40, 'C', 'F');
      expectOk(r);
      expect(r.value).toBeCloseTo(-40, 6);
    });
    it('0 K = -273.15 C', () => {
      const r = convert(0, 'K', 'C');
      expectOk(r);
      expect(r.value).toBeCloseTo(-273.15, 6);
    });
    it('0 K = -459.67 F', () => {
      const r = convert(0, 'K', 'F');
      expectOk(r);
      expect(r.value).toBeCloseTo(-459.67, 4);
    });
    it('temperature is case-insensitive', () => {
      const r = convert(0, 'c', 'f');
      expectOk(r);
      expect(r.value).toBeCloseTo(32, 6);
      expect(r.fromUnit).toBe('C');
      expect(r.toUnit).toBe('F');
    });
  });

  describe('data', () => {
    it('1 KB = 1000 B', () => {
      const r = convert(1, 'KB', 'B');
      expectOk(r);
      expect(r.value).toBe(1000);
    });
    it('1 GiB = 1024 MiB', () => {
      const r = convert(1, 'GiB', 'MiB');
      expectOk(r);
      expect(r.value).toBe(1024);
    });
    it('1 TiB = 1024^4 bytes', () => {
      const r = convert(1, 'TiB', 'B');
      expectOk(r);
      expect(r.value).toBe(1024 ** 4);
    });
    it('1 MB ≠ 1 MiB', () => {
      const decimal = convert(1, 'MB', 'B');
      const binary = convert(1, 'MiB', 'B');
      expectOk(decimal);
      expectOk(binary);
      expect(decimal.value).not.toBe(binary.value);
    });
  });

  describe('case handling', () => {
    it('KG works (uppercase mass)', () => {
      const r = convert(1, 'KG', 'g');
      expectOk(r);
      expect(r.value).toBe(1000);
      expect(r.fromUnit).toBe('kg');
    });
    it('MM works (uppercase length)', () => {
      const r = convert(1000, 'MM', 'm');
      expectOk(r);
      expect(r.value).toBe(1);
    });
  });

  describe('errors', () => {
    it('unknown source unit', () => {
      const r = convert(1, 'foo', 'm');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toContain("unknown unit 'foo'");
    });
    it('unknown target unit', () => {
      const r = convert(1, 'm', 'foo');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toContain("unknown unit 'foo'");
    });
    it('cross-category length to mass', () => {
      const r = convert(1, 'km', 'kg');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toContain('cannot convert length to mass');
    });
    it('cross-category temperature to data', () => {
      const r = convert(1, 'C', 'KB');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toContain('cannot convert');
    });
  });
});
