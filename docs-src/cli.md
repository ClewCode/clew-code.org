# Clew CLI Docs

Open-source, local-first AI coding agent CLI. Runs on your own hardware using your own API keys — supporting 29 LLM providers.

---

## Introduction

Clew Code is an autonomous coding agent that runs directly in your terminal. It features a complete Ink-based React REPL interface, automatic context compaction, SQLite-backed long-term memory, LAN peer discovery for multi-machine swarms, and modular tool integrations.

---

## Installation

Choose your preferred installation method below:

### One-liner (Quick)
```bash
# Install globally via npm
npm install -g clew-code
```

### From Source (Bun)
```bash
# Clone the repository
git clone https://github.com/ClewCode/ClewCode.git
cd ClewCode

# Install dependencies & build
bun install
bun run build

# Link globally
bun link
```

---

## First Run

Simply type `clew` in your terminal inside any project directory to launch the interactive REPL:

```bash
clew
```

To resume a past conversation or launch a specific session, use the session flags:

```bash
# Resume your last active session
clew --resume last

# Start a plan-mode session (bypasses prompt confirmations)
clew --plan
```

---

## 29 Providers

Clew Code is provider-agnostic, supporting 29 native LLM engines. Setup your API key as an environment variable before launching the CLI:

| Provider | Environment Variable |
| :--- | :--- |
| OpenAI | `OPENAI_API_KEY` |
| Google Gemini / Code Assist | `GOOGLE_API_KEY` |
| DeepSeek | `DEEPSEEK_API_KEY` |
| Groq | `GROQ_API_KEY` |
| Ollama (Local) | `OLLAMA_HOST` (defaults to `http://localhost:11434`) |
| Sakana AI | `SAKANA_API_KEY` |
| Clew Gateway | `CLEW_GATEWAY_KEY` |

Switch between providers or models at any time inside a session using the `/model` slash command.

---

## Persistent Memory

Clew Code contains a MiMo-inspired, SQLite-backed long-term memory system. It automatically:

*   Aggregates factoids, style preferences, and architectural decisions about your codebase.
*   Ranks memory importance and frequency of access.
*   Injects relevant context chunks back into the prompt cycles.
*   Stores human-readable markdown summaries locally under `~/.clew/memory/`.

---

## LAN Peer Swarm

With zero configuration, Clew Code instances discover each other on the local network (LAN) using UDP multicast. You can:

*   Sync project databases and memories across developer machines.
*   Delegate execution tasks to other machines on the LAN.
*   Broadcast bash commands to run concurrently on all peers (Swarm execution).

---

## Execution Layers

Tasks are distributed across four isolated layers depending on your workflow:

*   **Agent:** The root agent session coordinating permissions, UI, and active memory context.
*   **Subagent:** Focus-oriented, short-lived child processes spawned in the background (typically read-only) to solve specific sub-tasks without cluttering your main session.
*   **Peer:** Network-connected nodes coordinating LAN swarms.
*   **Process Peer:** External CLI/Codex process delegation for running separate specialized model loops.

---

## Slash Commands

Control the session directly using terminal slash commands:

| Command | Purpose |
| :--- | :--- |
| `/model` | Switch provider or model |
| `/status` | Provider, session, context info |
| `/doctor` | Diagnostics and provider health checks |
| `/profile` | Personal profile mode (coding / command center) |
| `/context` | Active context usage |
| `/compact` | Compress conversation history + extract memories |
| `/goal` | Track and verify overall task completion |
| `/maxmode` | Toggle parallel candidate generation |
| `/mcp` | Model Context Protocol server management |
| `/code-review` | Review changed files for bugs |
| `/simplify` | Cleanup-focused review |
| `/plugin` | Plugin and hook management |
| `/bridge` | Bridge mode configuration |
| `/agent` | Background agent dispatch |
| `/agents` | TUI Agent dashboard |
| `/peer` | LAN peers: share, discover, swarm, dashboard |
| `/remote` | WebSocket remote control |
| `/daemon` | Autonomous daemon dashboard |
| `/task` | Scheduled tasks |
| `/memory` | SQLite memory system management |
| `/tasks` | Curated task checklist |
| `/effort` | Set reasoning effort |
| `/stats` | Session statistics |
| `/guardian` | Auto-review mode using secondary LLM |
| `/approve` | Override guardian denials |
| `/pr` | GitHub PR lifecycle |
| `/voice` | Voice input |
| `/buddy` | Companion card |
| `/team` | Team dashboard |
| `/bg` | Background sessions |
| `/plan` | Plan mode |
| `/vim` | Vim keybindings |
| `/research` | Research dossier management |
| `/workflow` | Multi-step workflow automation |
| `/rewind` | Undo last response |
| `/upgrade` | Check for updates |
| `/session` | Session management |
| `/theme` | Theme switcher |
| `/skills` | List and manage skills |
| `/login` | Sign in to Clew Gateway for cloud models and syncing |

---

## Configuration

Settings files are stored in your home directory under `~/.clew/`:

*   `~/.clew/settings.json` — Shared global configurations, default models, and UI preferences.
*   `~/.clew/settings.local.json` — Local overrides (private config and custom developer setups).
