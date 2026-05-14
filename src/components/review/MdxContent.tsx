import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { AffiliateButton } from "../AffiliateButton";
import { InArticleCTA } from "./InArticleCTA";
import { ComparisonTable } from "./ComparisonTable";
import { ProsCons } from "./ProsCons";
import { SpecsTable } from "./SpecsTable";
import { AdSlot } from "../AdSlot";

const components = {
  AffiliateButton,
  InArticleCTA,
  ComparisonTable,
  ProsCons,
  SpecsTable,
  AdSlot,
};

export function MdxContent({
  source,
  scope,
}: {
  source: string;
  scope?: Record<string, unknown>;
}) {
  return (
    <div className="article-prose">
      <MDXRemote
        source={source}
        components={components as never}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
          scope,
        }}
      />
    </div>
  );
}
