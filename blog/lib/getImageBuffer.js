import fs from "node:fs/promises";
import path from "node:path";

export async function getImageBuffer(src) {
  if (src.startsWith("http")) {
    const res = await fetch(src);
    return await Buffer.from(await res.arrayBuffer());
  } else {
    return await fs.readFile(path.join("./public", src));
  }
}
