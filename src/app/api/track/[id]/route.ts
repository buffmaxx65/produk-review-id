import { NextResponse } from "next/server";
import { affiliateLinks } from "@/data/affiliate.config";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const link = affiliateLinks[params.id];
  if (!link) {
    return NextResponse.json(
      { error: "Link tidak ditemukan" },
      { status: 404 },
    );
  }

  const url = new URL(request.url);
  const source = url.searchParams.get("source") ?? null;
  const referer = request.headers.get("referer") ?? null;
  const ua = request.headers.get("user-agent") ?? null;

  // Log klik ke Supabase (best-effort, tidak blocking redirect).
  const supabase = getSupabaseAdmin();
  if (supabase) {
    void supabase
      .from("affiliate_clicks")
      .insert({
        affiliate_id: link.id,
        network: link.network,
        source,
        referer,
        user_agent: ua,
      })
      .then(({ error }) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error("[track] Supabase insert error:", error.message);
        }
      });
  }

  return NextResponse.redirect(link.url, 302);
}
