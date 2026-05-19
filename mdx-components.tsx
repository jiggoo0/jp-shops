import type { MDXComponents } from "mdx/types";
import { IconRenderer } from "@/components/ui/IconRenderer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Icon: IconRenderer,
  };
}
