# Mini Blog: learning project

This is a **learning project**. The user is a beginner and wants to learn Python, FastAPI, PostgreSQL and Next.js by building this app **themselves**, step by step.

## The app
Users sign up, write blog posts, and comment on posts.
- **Backend:** Python + FastAPI + SQLAlchemy + PostgreSQL, in `backend/`
- **Frontend:** Next.js (App Router), in `frontend/`
- **Database:** PostgreSQL, running in Postgres.app on the user's Mac and viewed in pgAdmin. Database name: `blog`. Connection: `localhost:5432`, user `postgres`.

## How to teach (important)
- **One step at a time.** Give one step, then stop. Do NOT give the next step until the user says "next".
- **Short, precise, easy words.** No long explanations or big tables unless asked. Beginner-friendly.
- Every step has three parts: **what was done or what to do**, **why** (a one- or two-line purpose), and **how to check** it worked.

## Who does what (important)
- **The user does EVERY step themselves: all code and all commands.** Claude is a teacher, not a builder.
- **Code:** Claude does NOT create or edit code files. Claude shows the code to write, says which file and where to put it, and explains each line in easy words. The user types it (or pastes it) themselves. When the user says it's done, Claude may read the file to check it and point out mistakes.
- **Commands:** Claude does NOT run terminal commands or database actions. Claude gives the exact command, explains what it does and why, and waits for the user to run it and paste the result. This covers:
  - Python / venv: `python -m venv`, `source .../activate`, `pip install`
  - FastAPI / server: `uvicorn main:app --reload`
  - Database: starting Postgres.app, pgAdmin steps (connecting, creating a database, viewing tables), `createdb`, SQL
  - Next.js / npm: `npx create-next-app`, `npm install`, `npm run dev`
  - Testing in Swagger (`/docs`) or the browser: tell the user what to click and what to type
- Exception: Claude may do read-only checks (reading the user's files, checking syntax) to review the user's work, but never create, edit, install, start or change anything.
- If the user explicitly asks Claude to write a file or run a command, Claude may do it that one time, then explain what it did.
- The only file Claude edits on its own is this `CLAUDE.md`, to tick off finished steps.
- After each step, the user writes a **summary in their own words**. Say what's right and fix anything that's wrong, gently and briefly, before moving on.
- When the user pastes an error, explain **why** it happened in simple words, then how to fix it.
- Use simple real-life comparisons, for example: engine = a road, session = a taxi ride, CORS = a guest list.
- When comparing to things the user knows: they know React, npm, axios and XAMPP.

## What the user already knows
They finished a products CRUD project (FastAPI + PostgreSQL + React) and understand:
1. venv: `python -m venv myenv`, then `source myenv/bin/activate` in each new terminal
2. `pip install "fastapi[standard]" uvicorn sqlalchemy psycopg2-binary`
3. `app = FastAPI()`, `@app.get("/")`, `uvicorn main:app --reload`, Swagger at `/docs`
4. Pydantic `BaseModel` checks the data (a 422 error means wrong data)
5. CRUD with a Python list (GET / POST / PUT / DELETE)
6. PostgreSQL, Postgres.app and pgAdmin ("Add New Server" = saved connection info; create the database there, and use `template0` if there's a locale error)
7. `database.py`: `db_url`, `engine`, `SessionLocal`
8. `database_models.py`: `Base`, table classes, `create_all(bind=engine)`
9. Filling the table from a list (`init_db`, `add()`, `commit()`)
10. APIs using the database: `SessionLocal()` → query → `commit()` → `close()`
11. CORS and matching the frontend paths
12. Running the backend and frontend in two terminals

Build on this knowledge: say "like you did in the products project" when it helps.

## The plan
Track progress by updating the checkboxes below as steps are finished.

### Phase 1: Basics (review)
- [x] Folder structure (`backend/`, `frontend/`), venv, install packages
- [x] First FastAPI app + Swagger
- [x] Pydantic `Post` model (title, content, author)
- [x] CRUD for posts with a dummy Python list
- [x] Python practice: lists, dicts, loops, functions, classes

### Phase 2: Database
- [x] Create the `blog` database in pgAdmin
- [x] `database.py` (engine, SessionLocal)
- [x] `posts` table in `database_models.py`
- [x] Fill the table from the dummy list
- [x] Switch the APIs to the database
- [x] NEW: `Depends(get_db)`, the proper way to open and close sessions

### Phase 3: Better APIs
- [x] `HTTPException`: a real 404 instead of a plain text message
- [x] Search and filters: `/posts?search=python`
- [x] Pagination: `/posts?skip=0&limit=10`
- [x] Response models (`response_model=`)
- [x] Routers: split into `routers/posts.py`, `routers/users.py` (users.py comes in Phase 4)

### Phase 4: Users and relationships
- [x] `users` table
- [x] Foreign keys: user → posts (post → comments is done with the comments table)
- [x] SQLAlchemy `relationship()`
- [x] `comments` table + comment APIs

### Phase 5: Authentication
- [x] Sign up + password hashing
- [x] Login + JWT tokens
- [x] Protected routes (only logged-in users can post)
- [x] Users can only edit or delete their own posts

### Phase 6: Next.js frontend
- [x] Create the Next.js app (App Router) — TypeScript, in `frontend/blogs-frontend/`
- [x] Home page: list of posts (fetch from FastAPI, CORS)
- [x] Single post page with comments
- [x] Write / edit post form
- [x] Sign up / log in pages, storing the token
- [x] Components, state, loading and error states

### Phase 7: Extras (optional)
- [x] `.env` file for secrets (database password, JWT secret)
- [x] Image upload for post covers
- [x] Alembic migrations

### Phase 8: Frontend testing (Jest, React Testing Library, Playwright)
- [x] Lesson: what testing is, and the three kinds (unit, component, end-to-end)
- [x] Install and set up Jest in `frontend/blogs-frontend/`
- [x] First Jest test: a plain function (for example in `lib/`)
- [x] React Testing Library: test a component renders (`PostCard`)
- [x] RTL: user actions (typing and clicking in `PostForm` / `CommentForm`)
- [x] RTL: mocking `fetch` (loading and error states)
- [x] Install and set up Playwright
- [x] First Playwright test: home page shows posts
- [x] Playwright: sign up → log in → write a post (full flow)
- [x] Add `npm test` scripts and explain what to say in interviews

### Phase 9: CI/CD pipelines, the way a real company team works
Goal: learn CI/CD from 0 to 100 on this project, and learn the daily team workflow used in corporate offices (branches, PRs, reviews, approvals, environments, releases). Teach each item as "this is how teams do it at work", and point out what the user will see on a normal workday.

Note: a real team has several people. The user works alone, so some steps are **simulated**: the user plays both "developer" and "team lead", and a second GitHub account (or a friend) can act as the reviewer. GitHub doesn't let you approve your own PR.

**A. Concepts**
- [x] Lesson: what CI/CD is (CI vs CD, pipeline)
- [x] Lesson: environments: local → dev → staging (QA / UAT) → production, and why each exists
- [x] Lesson: the team roles: developer, team lead / tech lead, QA, DevOps, and who can do what

**B. Git, the daily basics**
- [x] `git init`, `.gitignore` (never commit `.env`, `node_modules`, `myenv`), first commit
- [ ] Create a GitHub repo and push the project
- [ ] Daily commands: `status`, `add`, `commit`, `push`, `pull`, `log`, `diff`
- [ ] Commit messages the team way (Conventional Commits: `feat:`, `fix:`, `chore:`, `test:`), with a ticket id, like `feat(posts): add search [BLOG-12]`

**C. Branching strategy (Git Flow, as used in offices)**
- [ ] Long-lived branches: `main` = production, `staging` = testing / QA, `dev` = shared developer branch
- [ ] Short-lived branches with naming rules: `feature/BLOG-12-post-search`, `bugfix/...`, `hotfix/...`
- [ ] Never push directly to `main` / `staging` / `dev`; always go through a PR
- [ ] Keeping a branch up to date: `git pull`, `merge` vs `rebase`
- [ ] Merge conflicts: why they happen and how to fix them

**D. Pull requests and code review (daily routine)**
- [ ] Open a PR: title, description, linked ticket, screenshots
- [ ] PR template (`.github/pull_request_template.md`): what changed, how tested, checklist
- [ ] Code review: reviewers comment, request changes, approve; the developer fixes and pushes again
- [ ] Merge types: merge commit vs squash vs rebase (most teams squash into `dev`)
- [ ] Delete the branch after merge

**E. CI with GitHub Actions**
- [ ] First workflow: lint + Jest on every push and PR
- [ ] Backend CI: a first `pytest` test, run in GitHub Actions
- [ ] Playwright in CI (Postgres service container, start backend + frontend in the pipeline)
- [ ] Reading a failed pipeline: logs, re-run jobs, fix and push

**F. Rules and permissions (who can merge)**
- [ ] Branch protection / rulesets on `main`, `staging`, `dev`: no direct push, PR required
- [ ] Required status checks: a PR can only merge when CI is green ✅
- [ ] Required approvals: at least 1–2 reviewers must approve
- [ ] `CODEOWNERS`: the team lead must approve changes (for example to `backend/` or workflows)
- [ ] Only the team lead / maintainers can merge into `staging` and `main` (repo roles: read, write, maintain, admin)
- [ ] Dismiss old approvals when new commits are pushed

**G. Environments, secrets and CD**
- [ ] Secrets and variables in GitHub (repo secrets vs environment secrets: dev / staging / production)
- [ ] GitHub Environments with a **manual approval** before deploying to production
- [ ] CD for the frontend (Vercel): preview deploy for every PR, staging, production
- [ ] CD for the backend + PostgreSQL (for example Render): a separate database per environment
- [ ] Database migrations in the pipeline (Alembic `upgrade head` on deploy)

**H. Releases and the full flow**
- [ ] The full flow: `feature/*` → PR → `dev` → PR → `staging` (QA tests) → PR → `main` (production)
- [ ] Keeping `dev`, `staging` and `main` in sync (merge back after a release or hotfix)
- [ ] Release tags and versions (`v1.2.0`, semantic versioning) and release notes / changelog
- [ ] Hotfix flow: an urgent bug in production → `hotfix/*` from `main` → merge back to `staging` and `dev`
- [ ] Rollback: going back to the last good version when a deploy breaks

**I. Extras used at work**
- [ ] Docker basics: a Dockerfile for the backend, and why teams use it
- [ ] Dependabot: automatic PRs for package updates
- [ ] Tickets and boards (Jira / GitHub Projects): ticket → branch → PR → done
- [ ] Notifications (PR and deploy messages in Slack / Teams)

**J. Wrap up**
- [ ] A "day in the life" walkthrough: pick a ticket → branch → code → PR → review → merge → deploy
- [ ] What to say in interviews about CI/CD

## Starting
When the user says "start", begin with Phase 1, Step 1: the folder structure and venv. One step only.
