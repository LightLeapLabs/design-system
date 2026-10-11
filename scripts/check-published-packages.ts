import { realpath } from "node:fs/promises";
import { resolve, sep } from "node:path";

const expected = {
  "@ds-gn/tokens": "0.5.0",
  "@ds-gn/ui": "0.5.0",
} as const;

const examples = ["astro-ssr", "nextjs", "react", "vanilla-theming"];
const registryPackages = `${await realpath("node_modules")}${sep}`;

for (const example of examples) {
  const manifest = await Bun.file(`examples/${example}/package.json`).json();

  for (const section of [
    "dependencies",
    "devDependencies",
    "optionalDependencies",
  ]) {
    for (const name of Object.keys(manifest[section] ?? {})) {
      if (name.startsWith("@lightleaplabs/")) {
        throw new Error(`${example}: legacy dependency ${name}`);
      }
    }
  }

  for (const [name, version] of Object.entries(expected)) {
    if (manifest.dependencies?.[name] !== version) {
      throw new Error(`${example}: expected ${name}@${version}`);
    }

    const packagePath = await realpath(
      Bun.resolveSync(`${name}/package.json`, resolve(`examples/${example}`)),
    );
    if (!packagePath.startsWith(registryPackages)) {
      throw new Error(
        `${example}: ${name} resolves outside installed registry packages`,
      );
    }
    const installed = await Bun.file(packagePath).json();
    if (installed.name !== name || installed.version !== version) {
      throw new Error(
        `${example}: installed ${installed.name}@${installed.version}; expected ${name}@${version}`,
      );
    }
  }
}

const lockfile = await Bun.file("bun.lock").text();
if (lockfile.includes("@lightleaplabs/")) {
  throw new Error("Lockfile contains legacy LightLeap dependencies");
}
for (const [name, version] of Object.entries(expected)) {
  // Registry packages use name@version in Bun's text lockfile. Local links use
  // file:, link:, or workspace: instead and must not satisfy this check.
  if (!lockfile.includes(`"${name}": ["${name}@${version}",`)) {
    throw new Error(`Lockfile must resolve ${name}@${version} from the registry`);
  }
}

console.log(
  "Examples use pinned @ds-gn packages from the public registry.",
);
