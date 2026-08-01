const expected = {
  "@lightleaplabs/tokens": "0.4.0",
  "@lightleaplabs/ui": "0.4.0",
} as const;

const examples = ["astro-ssr", "react", "vanilla-theming"];

for (const example of examples) {
  const manifest = await Bun.file(`examples/${example}/package.json`).json();

  for (const [name, version] of Object.entries(expected)) {
    if (manifest.dependencies?.[name] !== version) {
      throw new Error(`${example}: expected ${name}@${version}`);
    }
  }
}

for (const [name, version] of Object.entries(expected)) {
  const installed = await Bun.file(`node_modules/${name}/package.json`).json();
  if (installed.version !== version) {
    throw new Error(
      `installed ${name}@${installed.version}; expected ${version}`,
    );
  }
}

console.log(
  "Examples use pinned @lightleaplabs packages from the public registry.",
);
