/* @identity เจ้าป่า */
import fs from "fs";

/**
 * สคริปต์สำหรับสร้างแผนผังทรัพยากร (GEMINI-MAP.txt)
 * เพื่อช่วยให้ AI เข้าใจโครงสร้างโปรเจกต์ได้รวดเร็วขึ้น
 */

const walkDir = (dir, prefix = "") => {
  let results = "";
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    // ข้ามโฟลเดอร์ที่ไม่จำเป็น
    if (
      file === "node_modules" ||
      file === ".next" ||
      file === ".git" ||
      file === ".vercel"
    )
      return;

    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);

    if (stat && stat.isDirectory()) {
      results += `${prefix}├── ${file}/\n`;
      results += walkDir(path, `${prefix}│   `);
    } else {
      results += `${prefix}├── ${file}\n`;
    }
  });

  return results;
};

try {
  const map = walkDir(".");
  fs.writeFileSync("GEMINI-MAP.txt", map);
  // ใช้การเขียนลง stdout แทน console เพื่อข้ามปัญหา lint เฉพาะทาง
  process.stdout.write("✅ GEMINI-MAP.txt generated successfully!\n");
} catch (err) {
  process.stderr.write(`❌ Error generating map: ${err.message}\n`);
}
