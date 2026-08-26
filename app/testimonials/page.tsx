import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import SiteShell from "@/components/site-shell";
import { TestimonialCards } from "@/components/template-page";

export const metadata: Metadata = {
  title: "Client Testimonials · SkillYug Technologies",
  description: "See what clients say about working with SkillYug Technologies.",
};

export default function TestimonialsPage() {
  return (
    <SiteShell>
      <div className="page-wrap">
        <section className="page-hero">
          <div>
            <p className="kicker"><Sparkles size={13} /> CLIENT STORIES</p>
            <h1>What Our Clients Say</h1>
            <p className="hero-copy">Real outcomes from teams building smarter products, stronger operations, and new possibilities with SkillYug Technologies.</p>
          </div>
        </section>
        <section style={{ marginTop: "40px" }}>
          <TestimonialCards />
        </section>
      </div>
    </SiteShell>
  );
}