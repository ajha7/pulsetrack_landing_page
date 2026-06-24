import React, { useState } from "react";
import "./App.css";

// 1. Create a free form at https://formspree.io and paste its ID below
//    (it looks like "xkgwabcd"). Submissions arrive at the email on that account.
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const FORM_CONFIGURED = !FORM_ENDPOINT.includes("YOUR_FORM_ID");

export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  async function handleSubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("submitting");

    // No Formspree wired up yet: confirm without sending so the button never
    // looks broken. NOTE: this does NOT capture the email anywhere — set a real
    // FORM_ENDPOINT (above) to actually collect signups.
    if (!FORM_CONFIGURED) {
      setTimeout(() => {
        setStatus("success");
        setEmail("");
      }, 600);
      return;
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "pulsetrack.ai landing" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="pt-page">
      <header>
        <div className="nav">
          <a className="mark" href="#top" aria-label="PulseTrack home">
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
              <line x1="4" y1="7" x2="18" y2="7" stroke="#6E78F0" strokeWidth="1.4" />
              <circle cx="4" cy="7" r="3" fill="#F0A93B" />
              <circle cx="18" cy="7" r="3" fill="#6E78F0" />
            </svg>
            PulseTrack
          </a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#uses">Use cases</a>
            <a href="#access" className="btn btn-primary">Request access</a>
          </nav>
        </div>
      </header>

      <span id="top" />

      <section className="hero">
        <p className="eyebrow c">Process intelligence from conversations</p>
        <h1>See how your company actually runs, and where it&rsquo;s breaking.</h1>
        <p className="sub">
          Your teams already work in Slack, email, and calls. PulseTrack reads
          those conversations, reconstructs how work actually flows, and shows
          you exactly where it stalls.
        </p>
        <div className="cta">
          <a href="#access" className="btn btn-primary">Request access</a>
          <a href="#how" className="btn btn-ghost">See how it works</a>
        </div>
      </section>

      <div className="graph-stage" aria-hidden="true">
        <svg viewBox="0 0 1000 430" role="img">
          <path className="conv" style={{ "--d": "1.0s" }} d="M205,77 C330,90 380,180 470,210" />
          <path className="conv" style={{ "--d": "1.1s" }} d="M225,168 C340,180 390,198 470,212" />
          <path className="conv" style={{ "--d": "1.2s" }} d="M205,262 C330,250 390,232 470,216" />
          <path className="conv" style={{ "--d": "1.3s" }} d="M300,352 C400,300 430,248 472,220" />
          <path className="spine-line" style={{ "--d": "1.5s" }} d="M478,215 L838,215" />

          <g className="frag" style={{ "--d": ".10s" }}>
            <rect className="frag-box" x="40" y="58" width="166" height="36" rx="9" />
            <text className="frag-text" x="56" y="81">&ldquo;approve the PO?&rdquo;</text>
          </g>
          <g className="frag" style={{ "--d": ".26s" }}>
            <rect className="frag-box" x="58" y="150" width="170" height="36" rx="9" />
            <text className="frag-text" x="74" y="173">&ldquo;waiting on legal&rdquo;</text>
          </g>
          <g className="frag" style={{ "--d": ".42s" }}>
            <rect className="frag-box" x="40" y="244" width="186" height="36" rx="9" />
            <text className="frag-text" x="56" y="267">&ldquo;vendor confirmed?&rdquo;</text>
          </g>
          <g className="frag" style={{ "--d": ".58s" }}>
            <rect className="frag-box" x="138" y="334" width="172" height="36" rx="9" />
            <text className="frag-text" x="154" y="357">&ldquo;who owns this?&rdquo;</text>
          </g>

          <text className="spine-cap" style={{ "--d": "1.5s" }} x="478" y="158">
            YOUR PROCESS, RECONSTRUCTED
          </text>

          <g>
            <circle className="node" style={{ "--d": "1.55s" }} cx="478" cy="215" r="6.5" />
            <text className="node-label" style={{ "--d": "1.75s" }} x="478" y="250">INTAKE</text>
          </g>
          <g>
            <circle className="node" style={{ "--d": "1.7s" }} cx="598" cy="215" r="6.5" />
            <text className="node-label" style={{ "--d": "1.9s" }} x="598" y="250">REVIEW</text>
          </g>
          <g>
            <circle className="ring" cx="718" cy="215" r="11" strokeWidth="1.4" />
            <circle className="node brk" style={{ "--d": "1.85s" }} cx="718" cy="215" r="7" />
            <text className="node-label" style={{ "--d": "2.05s" }} x="718" y="250" fill="#F0A93B">APPROVAL</text>
            <text className="break-flag" style={{ "--d": "2.25s" }} x="718" y="190">stalled &middot; 6 days</text>
          </g>
          <g>
            <circle className="node" style={{ "--d": "2.0s" }} cx="838" cy="215" r="6.5" />
            <text className="node-label" style={{ "--d": "2.2s" }} x="838" y="250">HANDOFF</text>
          </g>
        </svg>
      </div>

      {/* value band */}
      <section className="band">
        <div className="wrap center">
          <p className="eyebrow c">The problem</p>
          <h2>Stop chasing issues. Fix the processes underneath them.</h2>
          <p className="lead">
            A deal sits six days because approval is stuck with legal and no one
            owns it. A handoff quietly drops and no one notices for a week. None
            of it reaches your CRM or your dashboards. It only lives in the
            conversation. That&rsquo;s the work you can&rsquo;t see, and it&rsquo;s
            where your time and revenue actually go.
          </p>
          <p className="emphasis">
            PulseTrack turns that invisible layer into a map.{" "}
            <span className="hl">Every process, every owner, every stall.</span>
          </p>
        </div>
      </section>

      {/* how it works */}
      <section className="band" id="how">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2>From conversation to process map, automatically.</h2>
          <div className="steps4">
            <div className="stepc">
              <span className="k">01</span>
              <h3>Connect</h3>
              <p>Connect the channels where work happens: Slack, email, calls. Nothing new for your team to adopt.</p>
              <svg className="conn" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
            <div className="stepc">
              <span className="k">02</span>
              <h3>Classify</h3>
              <p>Every conversation is matched to a real business process using the APQC framework, the standard cross-industry taxonomy for how companies operate.</p>
              <svg className="conn" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
            <div className="stepc">
              <span className="k">03</span>
              <h3>Chain</h3>
              <p>References are linked across threads, meetings, and inboxes, reconstructing each process from start to finish.</p>
              <svg className="conn" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
            <div className="stepc">
              <span className="k">04</span>
              <h3>Surface</h3>
              <p>We surface every stall, dropped handoff, and missing owner, then rank them by what they&rsquo;re costing you so you know what to fix first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* use cases */}
      <section className="band" id="uses">
        <div className="wrap">
          <p className="eyebrow">Use cases</p>
          <h2 style={{ marginBottom: "50px" }}>The processes that run your business, finally visible.</h2>
          <div className="split">
            <div>
              <div className="feat">
                <h3>
                  <svg className="ic" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="4" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="5" r="2.4" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="15" r="2.4" stroke="currentColor" strokeWidth="1.4" /><path d="M6 9l8-3M6 11l8 3" stroke="currentColor" strokeWidth="1.4" /></svg>
                  Reconstruct the real process
                </h3>
                <p>See how work actually flows: activities, owners, and handoffs, drawn as a graph. The real thing, not the org chart.</p>
              </div>
              <div className="feat">
                <h3>
                  <svg className="ic" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l8 14H2L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M10 8v3" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="13.5" r=".9" fill="currentColor" /></svg>
                  Find where work stalls
                </h3>
                <p>Surface the stalls and dropped handoffs draining time and revenue, ranked by impact.</p>
              </div>
              <div className="feat">
                <h3>
                  <svg className="ic" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Issues mapped to process, not noise
                </h3>
                <p>Every problem sits inside the process where it happens, with the context to fix the cause, not the symptom.</p>
              </div>
            </div>
            <div className="panel" role="img" aria-label="Illustrative process health dashboard showing ranked breakages">
              <div className="panel-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="ttl">PROCESS HEALTH &middot; ILLUSTRATIVE</span>
              </div>
              <div className="row">
                <span className="sev hi" />
                <div className="meta"><div className="proc">Order-to-cash &middot; Approval</div><div className="subt">14 deals stalled awaiting sign-off</div></div>
                <span className="val">$340K</span>
              </div>
              <div className="row">
                <span className="sev hi" />
                <div className="meta"><div className="proc">Procurement &middot; Vendor confirm</div><div className="subt">handoff dropped to legal, no owner</div></div>
                <span className="val">9 days</span>
              </div>
              <div className="row">
                <span className="sev md" />
                <div className="meta"><div className="proc">Onboarding &middot; Provisioning</div><div className="subt">repeated back-and-forth on access</div></div>
                <span className="val">22 threads</span>
              </div>
              <div className="row">
                <span className="sev lo" />
                <div className="meta"><div className="proc">Support &middot; Escalation</div><div className="subt">within normal range</div></div>
                <span className="val dim">stable</span>
              </div>
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <svg className="ic" width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>
              <h3>Works with what you use</h3>
              <p>Unified across every channel your teams already use. No new tools, no migration.</p>
            </div>
            <div className="card">
              <svg className="ic" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2v18M2 11h18" stroke="currentColor" strokeWidth="1.4" /><circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.4" /></svg>
              <h3>Standardized out of the box</h3>
              <p>Built on the APQC framework, so every team&rsquo;s processes speak the same language from day one.</p>
            </div>
            <div className="card">
              <svg className="ic" width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 18V8M9 18V4M15 18v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <h3>Track it over time</h3>
              <p>Watch each process improve or slip week over week, and prove every fix actually worked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* closing cta */}
      <section className="band closing" id="access">
        <div className="wrap">
          <p className="eyebrow c">Get started</p>
          <h2>See where work is actually stuck.</h2>
          <p className="lead" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Connect one channel and see your first reconstructed process in days.
            Every stall, every owner, ranked by what it&rsquo;s costing you.
          </p>
          {status === "success" ? (
            <div className="form-done" role="status">
              <p className="form-done-t">Thanks, you&rsquo;re on the list.</p>
              <p className="form-done-s">We&rsquo;ll be in touch at the email you provided.</p>
            </div>
          ) : (
            <>
              <div className="form">
                <input
                  type="email"
                  placeholder="Work email"
                  aria-label="Work email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                  disabled={status === "submitting"}
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending\u2026" : "Request access"}
                </button>
              </div>
              {status === "error" && (
                <p className="form-err" role="alert">
                  Please enter a valid work email and try again.
                </p>
              )}
              <p className="fineprint">Early access &middot; Connect one channel to start</p>
            </>
          )}
        </div>
      </section>

      <footer>
        <div className="foot">
          <a className="mark" href="#top">
            <svg width="20" height="13" viewBox="0 0 22 14" aria-hidden="true"><line x1="4" y1="7" x2="18" y2="7" stroke="#6E78F0" strokeWidth="1.4" /><circle cx="4" cy="7" r="3" fill="#F0A93B" /><circle cx="18" cy="7" r="3" fill="#6E78F0" /></svg>
            PulseTrack
          </a>
          <span className="foot-r">
            &copy; 2024 PulseTrack &middot;{" "}
            <a className="foot-mail" href="mailto:founders@pulsetrack.ai">founders@pulsetrack.ai</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
