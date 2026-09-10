export const projects = (): string => `Featured projects:

1. Pre-Encryption and Identification of Crypto Ransomwares [Ongoing Research]
  Technologies: OS | Cuckoo Sandbox | Python | Random Forest | SHA-256 | RSA | MySQL
  - Designed a ransomware detection framework combining Random Forest classification and SHA-256 signature matching for early threat identification.
  - Analyzed malware behavior using Cuckoo Sandbox and extracted behavioral features for ransomware classification.

2. AI Learning Management System
  Technologies: Next.js | Clerk | Drizzle ORM | Neon PostgreSQL | Google Gemini | Inngest
  - Developed an AI-driven course generation system supporting 5 course types including exam prep, job interviews, and coding practice, producing structured JSON outlines via Google Gemini.
  - Generated 4 study material formats: chapter notes, flashcards, quizzes, and Q&A, rendered with react-markdown and interactive flip-card/quiz UIs.
  - Orchestrated 4 background Inngest functions across 5 REST API routes for asynchronous AI content generation and user sync.
  - Structured the 11,000+ line codebase using Drizzle ORM over Neon Serverless PostgreSQL, with Clerk authentication and real-time generation-status tracking.
  GitHub: https://github.com/patelpreet404-alt/ai-learning-management-system

3. ResearchPaper AI - RAG Document Q&A Platform
  Technologies: Python | FastAPI | LangChain | FAISS | OpenAI Responses API | SQLite
  - Architected a Clean Architecture RAG pipeline across 8 modular services with 1,000-character chunks and 150-character overlap.
  - Integrated OpenAI's Responses API with FAISS persistent semantic retrieval and SQLite-backed multi-turn conversational memory.
  - Streamed token-by-token responses using SSE with page-level citation tracing across a 4,871-line FastAPI codebase.
  - Automated an offline-runnable pytest suite with 10 tests across 6 files, plus ruff linting and mypy type-checking.
  GitHub: https://github.com/patelpreet404-alt/researchpaper-ai

4. OptiLang - Mini Compiler
  Technologies: C++17 | Flex | Bison | LALR(1) Parsing | LLVM IR | Compiler Optimization
  - Constructed an 8-stage compiler pipeline across 3,786 lines of code: lexer, LALR(1) parser, semantic analysis, TAC generation, optimizer, and LLVM IR emission.
  - Implemented 5 optimization passes including constant folding/propagation, CSE, DCE, unreachable block elimination, and LICM.
  - Reduced instruction count by 35% (57 -> 37), non-label instructions by 41% (27 -> 16), and achieved 0.34ms average optimizer runtime across 5 runs.
  - Added a Clang LLVM IR backend with -O3 comparison and a 12-test CI suite covering compilation, errors, and CLI flags.
  GitHub: https://github.com/patelpreet404-alt/OptiLang`;
