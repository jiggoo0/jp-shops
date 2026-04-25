/* @identity เจ้าป่า */
"use client";

import { useState } from "react";

export default function Copyright({ authorName }: { authorName: string }) {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <p>
      © {year} JP-VISUAL&DOCS. All rights reserved. โดย {authorName}
    </p>
  );
}
