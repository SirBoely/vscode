# Dependency security remediation — 2026-08-13

Automated remediation branch for the Dependabot digest received on 2026-08-13.

## npm resolved versions and lockfile paths

- **esbuild**: not present
- **tar-fs**:
  - 2.1.2 — `node_modules/prebuild-install/node_modules/tar-fs`
  - 3.1.3 — `node_modules/tar-fs`
- **form-data**: not present
- **tmp**: not present
- **@octokit/request-error**:
  - 5.1.1 — `node_modules/@octokit/request-error`
- **@octokit/plugin-paginate-rest**:
  - 9.2.2 — `node_modules/@octokit/plugin-paginate-rest`
- **@octokit/request**:
  - 5.6.3 — `node_modules/@octokit/graphql/node_modules/@octokit/request`
  - 8.4.1 — `node_modules/@octokit/request`
- **brace-expansion**:
  - 1.1.18 — `node_modules/brace-expansion`
  - 2.0.2 — `node_modules/mocha/node_modules/brace-expansion`
  - 2.1.4 — `node_modules/@ts-morph/common/node_modules/brace-expansion`
  - 2.1.4 — `node_modules/@vscode/l10n-dev/node_modules/brace-expansion`
  - 2.1.4 — `node_modules/@vscode/test-cli/node_modules/brace-expansion`
  - 2.1.4 — `node_modules/editorconfig/node_modules/brace-expansion`
  - 2.1.4 — `node_modules/js-beautify/node_modules/brace-expansion`
  - 5.0.9 — `node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion`
  - 5.0.9 — `node_modules/@vscode/test-web/node_modules/brace-expansion`
- **katex**: not present
- **dompurify**: not present
- **tar**:
  - 2.2.2 — `node_modules/gulp-untar/node_modules/tar`
  - 6.2.1 — `node_modules/tar`
- **xml2js**:
  - 0.5.0 — `node_modules/xml2js`
- **postcss**:
  - 8.4.31 — `node_modules/@gulp-sourcemaps/identity-map/node_modules/postcss`
  - 8.5.26 — `node_modules/postcss`
- **braces**:
  - 3.0.3 — `node_modules/braces`
- **serialize-javascript**:
  - 6.0.2 — `node_modules/serialize-javascript`
- **koa**:
  - 2.16.1 — `node_modules/koa`

## Cargo resolved versions

- **russh**: 0.37.1
- **idna**: 1.1.0
- **openssl**: 0.10.81
- **tokio**: 1.53.1

## Remediation policy

- npm: update all packages allowed by existing semver constraints, plus narrowly-scoped overrides for the vulnerable ranges from the digest.
- Cargo: raise the direct Tokio floor to 1.38.2 and refresh the full CLI lockfile, including git-based russh patches.
- Merge only after pull-request CI is green.

