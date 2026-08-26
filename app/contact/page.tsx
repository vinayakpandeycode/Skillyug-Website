import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";
import { Sparkles, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/template-page";

export const metadata: Metadata = {
  title: "Contact Us · SkillYug Technologies",
  description: "Get in touch with SkillYug Technologies to start your software, AI automation, or custom platform engineering project.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="page-wrap">
        <div className="split-layout">
          <div className="sticky-column column-content">
            <div>
              <p className="kicker">
                <Sparkles size={13} /> CONNECT WITH US
              </p>
              <h1 style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.1, margin: "12px 0 24px", color: "#ffffff", textShadow: "0 2px 20px rgba(0, 0, 0, 0.6)" }}>
                Start Your Project
              </h1>
              <p className="hero-copy" style={{ fontSize: "18px", color: "#cbd5e1", lineHeight: 1.7, borderLeft: "3px solid var(--electric)", paddingLeft: "18px" }}>
                Whether you&apos;re launching a startup, modernizing your business, or building the next AI-powered platform, SkillYug Technologies is ready to help.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginTop: "10px" }}>
              <div className="timeline-card" style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "18px", color: "#ffffff", margin: "0 0 10px" }}>Contact Us</h3>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--electric)", fontWeight: "600", display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Mail size={16} />
                  <a href="mailto:consultantskillyug@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>consultantskillyug@gmail.com</a>
                </p>
                <p style={{ margin: 0, fontSize: "15px", color: "var(--electric)", fontWeight: "600", display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Phone size={16} />
                  <a href="tel:+919450935939" style={{ color: 'inherit', textDecoration: 'underline' }}>9450935939</a>
                </p>
                <p style={{ margin: 0, fontSize: "15px", color: "#cbd5e1", display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Clock size={16} />
                  Office hours: 9:00 AM to 8:00 PM
                </p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEQ2YLNjB5N9exUh16Izbw3D8PrzXMps1JiA8-OTgodks3uA/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="primary-button" style={{ marginTop: "8px", alignSelf: "flex-start" }}>
                  Book a Consultation <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="column-content">
            <div style={{ background: "rgba(22, 22, 26, 0.5)", borderRadius: "18px", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "10px" }}>
              <ContactForm apply={false} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", margin: "20px 0 0" }}>Let&apos;s Talk</h2>
              <div className="card-grid">
                <article className="template-card">
                  <div className="card-number">01</div>
                  <h3>Phone</h3>
                  <p>Call us during office hours</p>
                  <p style={{ marginTop: "10px", color: "var(--electric)" }}>9450935939</p>
                </article>
                <article className="template-card">
                  <div className="card-number">02</div>
                  <h3>Email</h3>
                  <p>Send us your project brief</p>
                  <p style={{ marginTop: "10px", color: "var(--electric)" }}>consultantskillyug@gmail.com</p>
                </article>
                <article className="template-card">
                  <div className="card-number">03</div>
                  <h3>Consultation</h3>
                  <p>Choose a time to discuss your idea</p>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEQ2YLNjB5N9exUh16Izbw3D8PrzXMps1JiA8-OTgodks3uA/viewform?pli=1" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "10px", color: "var(--electric)" }}>Open consultation form</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
