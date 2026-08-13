# Dependency security remediation — 2026-08-13

Automated remediation branch for the Dependabot digest received on 2026-08-13.

## npm resolved versions

- **esbuild**: not present
- **tar-fs**: 2.1.2, 3.1.3
- **form-data**: not present
- **tmp**: not present
- **@octokit/request-error**: 5.1.1
- **@octokit/plugin-paginate-rest**: 9.2.2
- **@octokit/request**: 5.6.3, 8.4.1
- **brace-expansion**: 1.1.18, 2.0.2, 2.1.4, 5.0.9
- **katex**: not present
- **dompurify**: not present
- **tar**: 2.2.2, 6.2.1
- **xml2js**: 0.5.0
- **postcss**: 8.4.31, 8.5.26
- **braces**: 3.0.3
- **serialize-javascript**: 6.0.2
- **koa**: 2.16.1

## Cargo resolved versions

- **russh**: 0.37.1
- **idna**: 1.1.0
- **openssl**: 0.10.81
- **tokio**: 1.53.1

## Remediation policy

- npm: update all packages allowed by existing semver constraints, plus narrowly-scoped overrides for the vulnerable ranges from the digest.
- Cargo: raise the direct Tokio floor to 1.38.2 and refresh the full CLI lockfile, including git-based russh patches.
- Merge only after pull-request CI is green.

