import React from "react";
import { Link } from "react-router-dom";
import PolicyLayout, { ContactCard } from "./PolicyLayout";
import type { PolicySection } from "./PolicyLayout";    

const sections: PolicySection[] = [
  {
    id: "overview",
    title: "How refunds work",
    content: (
      <p>Our services are custom creative work, and our team starts investing time in your project as soon as it begins. Because of this, whether you can get a refund depends on how far your project has progressed.</p>
    ),
  },
  {
    id: "before-work-starts",
    title: "Cancelling before work starts",
    content: (
      <p>If you cancel before any work has begun on your project, you will receive a full refund of what you have paid.</p>
    ),
  },
  {
    id: "after-work-starts",
    title: "Cancelling after work starts",
    content: (
      <>
        <p>If you cancel after work has started, we will refund the amount you have paid minus the value of the work already completed.</p>
        <ul>
          <li>For projects with milestones, any milestone that has been completed and delivered is not refundable.</li>
          <li>For work in progress, we will calculate the completed portion fairly and share the breakdown with you.</li>
        </ul>
      </>
    ),
  },
  {
    id: "non-refundable",
    title: "What is not refundable",
    content: (
      <>
        <p>The following cannot be refunded once paid or delivered:</p>
        <ul>
          <li>Work that you have approved or that has been delivered in final form</li>
          <li>Third-party costs we have already paid for you, such as ISBNs, copyright registration fees, printing, distribution or platform fees, stock image or font licences, and narrator or studio fees</li>
          <li>Advertising spend and marketing activities that have already run</li>
          <li>Rush or priority fees once the expedited work has started</li>
        </ul>
      </>
    ),
  },
  {
    id: "revisions-first",
    title: "Not happy with the work?",
    content: (
      <p>Tell us first. Every project includes revision rounds so we can get things right. We will always try to fix any concern through revisions before a refund is considered.</p>
    ),
  },
  {
    id: "how-to-request",
    title: "How to request a refund",
    content: (
      <>
        <p>Email <a href="mailto:info@bristolpublishers.com">info@bristolpublishers.com</a> and include:</p>
        <ul>
          <li>Your full name and the email address used for your project</li>
          <li>Your project name or invoice number</li>
          <li>The reason for your request</li>
        </ul>
        <p>We will reply within 5 business days. If a refund is approved, it will be sent to your original payment method within 10 business days. Your bank or card provider may take a few extra days to show it.</p>
      </>
    ),
  },
  {
    id: "chargebacks",
    title: "Chargebacks",
    content: (
      <p>If you have a billing problem, please contact us before raising a dispute with your bank. Most issues can be sorted out quickly by talking to us directly.</p>
    ),
  },
  {
    id: "project-agreements",
    title: "Your project agreement",
    content: (
      <p>If your signed project agreement includes different refund terms, those terms apply to that project. This policy should be read alongside our <Link to="/terms-of-service">Terms of Service</Link>.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>Questions about a payment or refund? We're happy to help:</p>
        <ContactCard />
      </>
    ),
  },
];

const RefundPolicy: React.FC = () => (
  <PolicyLayout
    current="refund"
    title="Refund Policy"
    updated="October 1, 2026"
    intro={
      <p>We want every author to feel confident working with Bristol Publishers. This policy explains when refunds are available and how to request one.</p>
    }
    sections={sections}
  />
);

export default RefundPolicy;