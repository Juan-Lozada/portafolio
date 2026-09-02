import { execFileSync } from 'node:child_process';

const baseReference = process.argv[2];

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

function changedFiles() {
  if (baseReference && /^[0-9a-f]{7,40}$/i.test(baseReference) && !/^0+$/.test(baseReference)) {
    return git(['diff', '--name-only', `${baseReference}...HEAD`]).split(/\r?\n/).filter(Boolean);
  }

  const tracked = git(['diff', '--name-only', 'HEAD']).split(/\r?\n/).filter(Boolean);
  const untracked = git(['ls-files', '--others', '--exclude-standard']).split(/\r?\n/).filter(Boolean);
  return [...new Set([...tracked, ...untracked])];
}

const files = changedFiles().map((file) => file.replaceAll('\\', '/'));
const codeChanged = files.some((file) =>
  /^(app|scripts)\//.test(file)
  || /^(package(-lock)?\.json|next\.config\.ts|tsconfig\.json|eslint\.config\.mjs|vitest\.config\.ts|vitest\.setup\.ts)$/.test(file),
);

if (!codeChanged) {
  console.log('Documentación: no se detectaron cambios de código o configuración.');
  process.exit(0);
}

const changelogChanged = files.includes('CHANGELOG.md');
const relatedDocumentationChanged = files.some((file) =>
  file !== 'CHANGELOG.md'
  && (/\.md$/i.test(file) || file === '.env.example')
  && (/^(docs|\.agents|prompts|\.github)\//.test(file)
    || /^(README|AGENTS|CONTRIBUTING|SECURITY)\.md$/.test(file)
    || file === '.env.example'),
);

if (!changelogChanged || !relatedDocumentationChanged) {
  console.error('Falta sincronización documental. Todo cambio de código requiere CHANGELOG.md y al menos un documento relacionado.');
  process.exit(1);
}

console.log('Documentación: changelog y documentos relacionados detectados.');
