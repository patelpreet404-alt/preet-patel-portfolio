export const optilang = (args: string[] = []): string => {
  if (args.length > 0 && !args.includes("--metrics") && !args.includes("-m")) {
    return "Usage: optilang [--metrics|-m]";
  }

  return `OptiLang (Mini Compiler)

8-stage C++17 compiler pipeline:
  Lexer -> LALR(1) Parser -> Semantic Analyzer -> TAC Generator
  -> Optimizer -> LLVM IR Emitter

  Optimization passes: constant folding/propagation, common subexpression elimination, dead code elimination, unreachable block elimination, and LICM
    3,786 lines of code
    Result: 35% instruction count reduction (57 -> 37)
    Non-label instructions: 41% reduction (27 -> 16)
    Average optimizer runtime: 0.34ms across 5 benchmark runs
    LLVM IR backend via Clang with -O3 comparison and a 12-test CI suite
  GitHub: https://github.com/patelpreet404-alt/OptiLang`;
};
