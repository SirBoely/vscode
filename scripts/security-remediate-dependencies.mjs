/*
 * One-time dependency security remediation helper.
 * Scope: npm lockfile + CLI Cargo lockfile.
 */
import fs from 'node:fs';

const packagePath = new URL('../package.json', import.meta.url);
const cargoPath = new URL('../cli/Cargo.toml', import.meta.url);
const reportPath = new URL('../SECURITY_REMEDIATION_2026-08-13.md', import.meta.url);

const npmFixes = {
  'esbuild@<=0.24.2': '0.25.0',
  'tar-fs@>=2.0.0 <2.1.2': '2.1.2',
  'form-data@>=4.0.0 <4.0.4': '4.0.4',
  'tmp@<=0.2.3': '0.2.4',
  '@octokit/request-error@>=1.0.0 <5.1.1': '5.1.1',
  '@octokit/plugin-paginate-rest@>=1.0.0 <9.2.2': '9.2.2',
  '@octokit/request@>=1.0.0 <8.4.1': '8.4.1',
  'brace-expansion@>=2.0.0 <=2.0.1': '2.0.2',
  'katex@>=0.12.0 <=0.16.20': '0.16.21',
  'dompurify@<3.2.4': '3.2.4',
  'tar@<3.2.2': '3.2.2',
  'xml2js@<0.5.0': '0.5.0',
  'postcss@<8.4.31': '8.4.31',
  'braces@<3.0.3': '3.0.3',
  'serialize-javascript@>=6.0.0 <6.0.2': '6.0.2',
  'koa@<2.16.1': '2.16.1'
};

function prepare() {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg.overrides = { ...(pkg.overrides ?? {}), ...npmFixes };
  fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);

  let cargo = fs.readFileSync(cargoPath, 'utf8');
  cargo = cargo.replace(
    'tokio = { version = "1.28.2", features = ["full"] }',
    'tokio = { version = "1.38.2", features = ["full"] }'
  );
  fs.writeFileSync(cargoPath, cargo);
}

function collectNpmVersions() {
  const lock = JSON.parse(fs.readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const wanted = ['esbuild','tar-fs','form-data','tmp','@octokit/request-error','@octokit/plugin-paginate-rest','@octokit/request','brace-expansion','katex','dompurify','tar','xml2js','postcss','braces','serialize-javascript','koa'];
  const found = new Map(wanted.map(name => [name, new Set()]));

  for (const [path, meta] of Object.entries(lock.packages ?? {})) {
    if (!meta?.version) continue;
    for (const name of wanted) {
      const suffix = `node_modules/${name}`;
      if (path === suffix || path.endsWith(`/${suffix}`)) {
        found.get(name).add(meta.version);
      }
    }
  }
  return found;
}

function collectCargoVersions() {
  const text = fs.readFileSync(new URL('../cli/Cargo.lock', import.meta.url), 'utf8');
  const wanted = ['russh', 'idna', 'openssl', 'tokio'];
  const result = new Map(wanted.map(name => [name, new Set()]));
  const blocks = text.split('\n[[package]]\n');
  for (const block of blocks) {
    const name = block.match(/(?:^|\n)name = "([^"]+)"/)?.[1];
    const version = block.match(/(?:^|\n)version = "([^"]+)"/)?.[1];
    if (name && version && result.has(name)) result.get(name).add(version);
  }
  return result;
}

function report() {
  const npm = collectNpmVersions();
  const cargo = collectCargoVersions();
  const lines = [
    '# Dependency security remediation — 2026-08-13',
    '',
    'Automated remediation branch for the Dependabot digest received on 2026-08-13.',
    '',
    '## npm resolved versions',
    ''
  ];
  for (const [name, versions] of npm) lines.push(`- **${name}**: ${[...versions].sort().join(', ') || 'not present'}`);
  lines.push('', '## Cargo resolved versions', '');
  for (const [name, versions] of cargo) lines.push(`- **${name}**: ${[...versions].sort().join(', ') || 'not present'}`);
  lines.push('', '## Remediation policy', '', '- npm: update all packages allowed by existing semver constraints, plus narrowly-scoped overrides for the vulnerable ranges from the digest.', '- Cargo: raise the direct Tokio floor to 1.38.2 and refresh the full CLI lockfile, including git-based russh patches.', '- Merge only after pull-request CI is green.', '');
  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`);
}

if (process.argv.includes('--report')) report(); else prepare();
