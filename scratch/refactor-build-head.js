const fs = require("fs");
const path = require("path");

const routesDir = path.join(__dirname, "..", "src", "routes");

const files = [
  "vision.tsx",
  "uses.tsx",
  "testimonials.tsx",
  "terms.tsx",
  "tags.tsx",
  "speaking.tsx",
  "social.tsx",
  "recommendations.tsx",
  "privacy.tsx",
  "media-kit.tsx",
  "links.tsx",
  "goals.tsx",
  "gallery.tsx",
  "faq.tsx",
  "community.tsx",
  "categories.tsx",
  "bookmarks.tsx",
  "awards.tsx",
];

files.forEach((file) => {
  const filePath = path.join(routesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipped: ${file} (does not exist)`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Replace buildHead import with buildScaffoldHead
  content = content.replace(
    /import\s+{(.*?)buildHead(.*?)}\s+from\s+["']@\/lib\/scaffold["']/g,
    (match, p1, p2) => {
      let imports = (p1 + p2)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s && s !== "buildHead");
      imports.push("buildScaffoldHead");
      return `import { ${imports.join(", ")} } from "@/lib/scaffold"`;
    },
  );

  // Replace buildHead(meta) call
  content = content.replace(/head:\s*buildHead\((.*?)\)/g, "head: buildScaffoldHead($1)");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated: ${file}`);
});
