"use client";

import React, { useEffect } from "react";
import SiteShell from "@/components/site-shell";

// Preserve original Date constructor to restore on unmount
const OriginalDate = Date;

// Module-level override runs immediately on client when this module is evaluated.
// This ensures `new Date()` inside the production component sees the mocked date.
if (typeof window !== "undefined") {
  const mockIso = "2026-08-15T12:00:00.000Z";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockDate: any = class extends OriginalDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        super(mockIso);
      } else {
        // eslint-disable-next-line prefer-rest-params
        // @ts-ignore
        super(...args);
      }
    }
    static now() {
      return new OriginalDate(mockIso).getTime();
    }
  };
  // @ts-ignore
  window.Date = MockDate;
}

export default function IndependencePreviewPage() {
  useEffect(() => {
    // Ensure the popup isn't marked closed so it shows in the preview session
    try {
      sessionStorage.removeItem("skillyug_independence_popup_closed_2026-08-15");
    } catch (e) {}

    return () => {
      // restore original Date when leaving preview
      try {
        // @ts-ignore
        window.Date = OriginalDate;
      } catch (e) {}
    };
  }, []);

  return (
    <SiteShell>
      <div className="page-wrap" style={{ padding: 40 }}>
        <h1 style={{ color: '#fff', marginBottom: 12 }}>Independence Day Popup Preview</h1>
        <p style={{ color: '#cbd5e1' }}>
          This preview simulates the local date as <strong>15 August 2026</strong> without changing production logic.
        </p>
        <p style={{ color: '#9ca3af' }}>Close the popup to verify sessionStorage prevents repeated showing.</p>
      </div>
    </SiteShell>
  );
}
