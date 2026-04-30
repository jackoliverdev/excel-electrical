export type LegalPolicy = {
  id: string;
  title: string;
  lastUpdated: string;
  markdown: string;
};

export const legalPolicies: LegalPolicy[] = [
  {
    id: "terms-of-use",
    title: "Terms of Use",
    lastUpdated: "29/04/2026",
    markdown: `These terms govern your use of this website and your relationship with Excel Electrics when you enquire or book services through it.

### Using this website
By using this site you agree to these terms. If you do not agree, please do not use the site.

### Enquiries and services
Information on this website is for general guidance. Quotes, contracts, and on-site work are subject to separate agreement and our standard terms of business where applicable.

### Liability
Nothing in these terms excludes or limits liability that cannot be excluded under applicable law. We do not accept liability for any loss arising from reliance on website content where it is not reasonably foreseeable.

### Changes
We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.

For questions, contact us at info@excelelectrics.com.`,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    lastUpdated: "11/04/2026",
    markdown: `Excel Electrical Ltd is committed to protecting your personal data and handling it responsibly.

### What we collect
- Your name, email address, phone number, and any information you submit through contact forms.
- Basic technical information, such as browser type and pages viewed.

### How we use your information
- To respond to enquiries and provide electrical services.
- To manage bookings, quotations, and customer support.
- To improve website performance and user experience.

### Data sharing
We do not sell your personal data. We only share information with trusted providers where necessary to operate our business or comply with legal obligations.

### Data retention
We keep personal data only for as long as needed for operational, legal, and contractual purposes.

### Your rights
You may request access, correction, or deletion of your personal data by contacting us at info@excel-electrical.co.uk.
`,
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy",
    lastUpdated: "11/04/2026",
    markdown: `This site uses cookies to ensure the website functions correctly and to understand usage trends.

### What cookies are used
- Essential cookies required for core site functionality.
- Analytics cookies that help us measure website usage and performance.

### How we use cookies
- To maintain secure, reliable website operation.
- To review anonymised traffic data and improve content and services.

### Managing cookies
You can manage or disable cookies through your browser settings. Disabling some cookies may affect parts of the website functionality.

For questions about cookies or personal data, please contact info@excel-electrical.co.uk.
`,
  },
];
