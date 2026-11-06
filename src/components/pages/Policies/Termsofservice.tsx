import React from "react";
import { Link } from "react-router-dom";
import PolicyLayout, { ContactCard } from "./PolicyLayout";
import type { PolicySection } from "./PolicyLayout";

const sections: PolicySection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    content: (
      <p>By using our website, requesting a quote or hiring us for a project, you agree to these Terms of Service. If you do not agree, please do not use our website or services.</p>
    ),
  },
  {
    id: "services",
    title: "Our services",
    content: (
      <>
        <p>Bristol Publishers offers ghostwriting and writing support, editing and proofreading, book cover design, book publishing, book marketing and promotion, and audiobook production.</p>
        <p>The exact scope, deliverables, timeline and price for each project are set out in a written proposal or project agreement. If that agreement conflicts with these terms, the project agreement takes priority for that project.</p>
      </>
    ),
  },
  {
    id: "quotes-payments",
    title: "Quotes and payments",
    content: (
      <>
        <p>Quotes are based on the information you give us and are valid for the period stated in the quote. If the project scope changes, the price and timeline may change too. We will agree any changes with you before going ahead.</p>
        <p>Payments are due according to the schedule in your project agreement. If a payment is overdue, we may pause work until it is received, and timelines will move accordingly.</p>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    content: (
      <>
        <p>You agree to:</p>
        <ul>
          <li>Give us accurate information and the materials we need on time</li>
          <li>Review drafts and give feedback within the agreed timeframes</li>
          <li>Only send us content you own or have permission to use</li>
          <li>Not ask us to create content that is unlawful, defamatory, or infringes anyone else's rights</li>
        </ul>
        <p>We may decline or stop work on content that we reasonably believe breaks these rules.</p>
      </>
    ),
  },
  {
    id: "ownership",
    title: "Ownership and intellectual property",
    content: (
      <>
        <p><strong>Your work stays yours.</strong> You keep all rights to the manuscript and materials you provide.</p>
        <p>Once your project is paid in full, you own the final deliverables we create specifically for you, such as ghostwritten or edited text and your final cover design, unless your project agreement says otherwise.</p>
        <p>We keep ownership of our own tools, templates, methods and any pre-existing materials. Stock images, fonts, music or other licensed assets used in your project stay subject to their own licence terms.</p>
      </>
    ),
  },
  {
    id: "portfolio",
    title: "Portfolio use",
    content: (
      <p>Once your book is published, we may show its title and cover in our portfolio and marketing. If you would prefer that we don't, tell us in writing and we will respect that.</p>
    ),
  },
  {
    id: "revisions-timelines",
    title: "Revisions and timelines",
    content: (
      <p>Each project includes the number of revision rounds stated in your project agreement. Extra revisions or changes outside the agreed scope may cost more. Timelines are estimates and depend on you providing feedback and materials on time.</p>
    ),
  },
  {
    id: "results",
    title: "Publishing and marketing results",
    content: (
      <>
        <p>We work hard to help your book succeed, but we cannot guarantee specific sales, rankings, reviews, awards or income.</p>
        <p>Publishing, retail and distribution platforms, such as online bookstores and audiobook services, have their own rules and approval processes. We do not control their decisions, fees or policy changes.</p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: (
      <p>We keep your unpublished work and project details confidential and use them only to deliver your project. How we handle personal information is explained in our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations and refunds",
    content: (
      <p>Cancellations and refunds are covered by our <Link to="/refund-policy">Refund Policy</Link> and your project agreement.</p>
    ),
  },
  {
    id: "website-use",
    title: "Using our website",
    content: (
      <p>You agree not to misuse our website. This includes trying to access it without permission, interfering with how it works, or using it for unlawful purposes. Website content, including text, graphics and logos, belongs to Bristol Publishers or its licensors and may not be copied without permission.</p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>To the fullest extent allowed by law, Bristol Publishers is not liable for indirect, incidental or consequential losses, such as lost profits or lost sales.</p>
        <p>Our total liability for any claim relating to a project is limited to the amount you paid us for that specific project.</p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>You agree to cover any claims, losses or costs that arise because content you supplied infringes someone else's rights, or because you broke these terms.</p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>These terms are governed by the laws of the State of [State], United States, without regard to its conflict-of-law rules.</p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>We may update these terms from time to time. The date at the top of this page shows the latest version. Changes do not affect projects already under a signed agreement unless both sides agree.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>Questions about these terms? Get in touch:</p>
        <ContactCard />
      </>
    ),
  },
];

const TermsOfService: React.FC = () => (
  <PolicyLayout
    current="terms"
    title="Terms of Service"
    updated="October 1, 2026"
    intro={
      <p>These Terms of Service set out the rules for using the Bristol Publishers website and working with us on your book. Please read them carefully before starting a project.</p>
    }
    sections={sections}
  />
);

export default TermsOfService;