# Dependency security remediation — 2026-08-13

## Status

**PARTIAL PASS — merge blocked by russh security debt.**

The npm dependency graph and the non-russh Cargo dependency graph were refreshed from the 2026-08-13 Dependabot digest. Generated lockfiles parsed successfully and `cargo metadata --locked` passed in the remediation workflow.

## Remediated alert paths

| Dependency | Resolved state | Gate |
|---|---:|---|
| esbuild | vulnerable path no longer present | PASS |
| tar-fs | 2.1.2 / 3.1.3 | PASS |
| form-data | vulnerable path no longer present | PASS |
| tmp | vulnerable path no longer present | PASS |
| @octokit/request-error | 5.1.1 | PASS |
| @octokit/plugin-paginate-rest | 11.4.4-cjs.2 | PASS |
| @octokit/request | 8.4.1 | PASS |
| brace-expansion | affected 2.0.x path is 2.0.2 | PASS |
| katex | vulnerable path no longer present | PASS |
| dompurify | vulnerable path no longer present | PASS |
| tar | 6.2.1; legacy tar 2.x chain removed | PASS |
| xml2js | 0.5.0 | PASS |
| postcss | 8.4.31 / 8.5.26 | PASS |
| braces | 3.0.3 | PASS |
| serialize-javascript | 6.0.2 | PASS |
| koa | 2.16.1 | PASS |
| idna | 1.1.0 | PASS |
| openssl | 0.10.81 | PASS |
| tokio | 1.53.1 | PASS |

## Build-tool compatibility remediation

`@vscode/gulp-electron` remains on the Node-20-compatible `1.37.0` line. Its legacy Octokit subtree was lifted to:

- `@octokit/rest` 20.1.2
- `@octokit/core` 5.2.2
- `@octokit/graphql` 7.1.1
- `@octokit/request` 8.4.1

The unused `gulp-untar` dependency was removed, eliminating its nested `tar 2.2.2` chain.

## Remaining blocker — russh

The CLI still resolves `russh 0.37.1` because `microsoft/dev-tunnels` currently declares `russh = 0.37.1` and VS Code patches crates.io to `microsoft/vscode-russh`.

This cannot be considered green by version alone. GitHub's reviewed advisory data includes 2026 russh fixes newer than this compatibility line, including:

- CVE-2026-42189 → fixed in 0.60.1
- CVE-2026-46673 → fixed in 0.60.3
- CVE-2026-48110 → fixed in 0.61.0
- CVE-2026-46702 → fixed in 0.61.1
- CVE-2026-68930 → fixed in 0.62.5

Therefore **do not merge this branch as a complete security closure** until the tunnels/russh compatibility layer is migrated or the relevant fixes are demonstrably backported and independently validated.

## Durable repository improvements

`.github/dependabot.yml` now covers:

- GitHub Actions at `/`
- npm at `/`
- Cargo at `/cli`

This turns future dependency drift into scheduled repository-level update signals instead of relying only on digest emails.

## Merge policy

1. Open PR from `security/dependency-remediation-2026-08-13` to `main`.
2. Require repository CI to pass.
3. Treat russh as a blocking security exception, not an ignored alert.
4. Merge only after the russh/tunnels migration gate is green.
