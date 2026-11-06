import React from "react";
import { Link } from "react-router-dom";
import PolicyLayout, { ContactCard } from "./PolicyLayout";
import type { PolicySection } from "./PolicyLayout";

const PARTNER_PRIVACY = "https://privacy.microsoft.com/en-us/privacystatement";
const PARTNER_AD_SETTINGS = "https://account.microsoft.com/privacy/ad-settings";

const ExtLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const sections: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p><strong>Information you give us.</strong> When you fill in a form on our website, request a quote, or work with us on a project, we may collect:</p>
        <ul>
          <li>Your name, email address and phone number</li>
          <li>The service you are interested in and any message you send us</li>
          <li>Manuscripts, drafts, images, audio and other materials you share for your project</li>
          <li>Billing details needed to process payments (card payments are handled by our payment processors, not stored by us)</li>
        </ul>
        <p><strong>Information collected automatically.</strong> When you visit our website, we and our analytics partner may collect technical and usage information, such as your browser type, device, IP address, the pages you view, how you arrived at our site, and how you interact with our pages (for example clicks, scrolling and mouse movements). This is gathered through cookies and similar technologies, as described in the "Website analytics" section below.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your enquiries and prepare quotes</li>
          <li>Deliver the services you have hired us for, such as writing, editing, design, publishing, marketing and audiobook production</li>
          <li>Send project updates, invoices and service-related messages</li>
          <li>Process payments and keep business and tax records</li>
          <li>Understand how visitors use our website so we can improve it</li>
          <li>Detect fraud and keep our website secure</li>
          <li>Send occasional updates or offers, where permitted. You can opt out at any time.</li>
          <li>Meet legal obligations and protect our rights</li>
        </ul>
        <p>We do not show advertisements on our website.</p>
      </>
    ),
  },
  {
    id: "your-manuscript",
    title: "Your manuscript and creative work",
    content: (
      <>
        <p>We treat your manuscript and project materials as confidential. We use them only to carry out the work you have asked us to do. They are shared only with team members and contractors who need them for your project and who are bound by confidentiality obligations.</p>
        <p>You keep ownership of your original work. Ownership of project deliverables is covered in our <Link to="/terms-of-service">Terms of Service</Link> and your project agreement.</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share information",
    content: (
      <>
        <p><strong>We do not sell your personal information.</strong> We share it only in these situations:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run our business, such as website hosting, lead and customer management, live chat, email and payment processing</li>
          <li><strong>Our analytics partner</strong>, as described in the "Website analytics" section below</li>
          <li><strong>Publishing and distribution platforms</strong> when you ask us to publish or distribute your book on your behalf</li>
          <li><strong>Legal reasons</strong>, when required by law or to protect our rights, users or the public</li>
          <li><strong>Business transfers</strong>, if our business is merged, sold or reorganised</li>
        </ul>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Website analytics",
    content: (
      <>
        <p>We partner with a third-party analytics provider to capture how you use and interact with our website through behavioural metrics, heatmaps and session replay, so we can improve our website and services.</p>
        <p>Website usage data is captured using first-party and third-party cookies and other tracking technologies to understand which pages and services are popular and how visitors use the site. We also use this information for site optimisation and fraud and security purposes.</p>
        <p>The analytics service records how visitors move around our pages, including clicks, scrolling, mouse movements and the pages viewed, and turns this into heatmaps and session replays. Sensitive text you type into forms is masked before it is sent to our partner.</p>
        <p>Our analytics partner collects and receives this data as an independent party and may use it to provide and improve its own products and services, which can include advertising on other websites and services. It may process this data in the United States. For more information, see our <ExtLink href={PARTNER_PRIVACY}>analytics partner's privacy statement</ExtLink>.</p>
        <p>You can block or delete cookies in your browser settings, and you can control how our analytics partner uses your data for personalised ads in their <ExtLink href={PARTNER_AD_SETTINGS}>ad settings</ExtLink>.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    content: (
      <p>We keep personal information for as long as we need it to provide our services, keep proper business records and meet legal requirements. When it is no longer needed, we delete it or make it anonymous.</p>
    ),
  },
  {
    id: "security",
    title: "How we protect information",
    content: (
      <p>We use reasonable technical and organisational measures to protect your information and your project files. No method of sending or storing data online is completely secure, so we cannot guarantee absolute security.</p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Ask what personal information we hold about you</li>
          <li>Ask us to correct or delete it</li>
          <li>Opt out of marketing messages</li>
          <li>Opt out of the sale or sharing of your information (we do not sell it)</li>
          <li>Withdraw consent you have given us</li>
        </ul>
        <p>Residents of some US states, including California, may have additional rights under state law. To make a request, contact us using the details below. We will not treat you differently for using these rights.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    content: (
      <p>Our website and services are intended for adults aged 18 and over. We do not knowingly collect personal information from anyone under 18. If you believe a minor has sent us information, please contact us and we will delete it.</p>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    content: (
      <p>Our website may link to other websites, such as publishing platforms or retailers. We are not responsible for their privacy practices, so please read their policies.</p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>We may update this Privacy Policy from time to time. The date at the top of this page shows when it was last changed. Continuing to use our website after an update means you accept the revised policy.</p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>If you have questions about this policy or want to make a privacy request, contact us:</p>
        <ContactCard />
      </>
    ),
  },
];

const PrivacyPolicy: React.FC = () => (
  <PolicyLayout
    current="privacy"
    title="Privacy Policy"
    updated="October 1, 2026"
    intro={
      <>
        <p>This Privacy Policy explains how Bristol Publishers ("we", "us", "our") collects, uses and protects your personal information when you visit our website or use our writing, editing, design, publishing, marketing and audiobook services. It also explains how we use website analytics.</p>
        <p>By using our website or services, you agree to the practices described here.</p>
      </>
    }
    sections={sections}
  />
);

export default PrivacyPolicy;