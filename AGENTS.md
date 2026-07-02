<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Dev server, ports & build verification

- **Package manager:** npm (`package-lock.json`). **Dev server:** `npm run dev` → http://localhost:3000.
- This repo is often run alongside the main **gridironhq** app during cross-repo work (e.g. SCOUT→ARGUS rename sweeps). Both default to port 3000 and can't share it — if 3000 is taken, use the next free port and do **not** kill the other project's server.
- **Dev-server cleanup:** stop ONLY this project's dev server (match the specific PID/port you started), never a global `pkill -f "next dev"`.
- **Build verification:** run `npm run build` in the **foreground** and read the result directly; never a backgrounded build + log-sentinel poller.
- **Slash commands:** `/slice <feature>` and `/gate-merge [branch]` encode the branch→orient→build→gate→merge protocol.
