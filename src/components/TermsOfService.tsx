import React from "react";

const termsCss = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #111111; color: #ffffff; line-height: 1.6; }
.container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
header { display: flex; align-items: center; margin-bottom: 50px; }
header img { height: 40px; transition: transform 0.3s ease; }
header img:hover { transform: scale(1.05); }
h1 { font-size: 32px; margin-bottom: 20px; font-weight: 600; color: #fff; }
h2 { font-size: 24px; margin-top: 40px; margin-bottom: 20px; font-weight: 600; color: #B4C7CC; position: relative; padding-left: 20px; }
h2::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 24px; background: linear-gradient(135deg, #B4C7CC 0%, rgba(180, 199, 204, 0.6) 100%); border-radius: 2px; }
p { line-height: 1.6; margin-bottom: 20px; color: #cccccc; font-size: 16px; }
ul { margin-bottom: 25px; padding-left: 0; list-style: none; }
ul li { position: relative; padding: 14px 20px 14px 40px; margin-bottom: 10px; background: rgba(180, 199, 204, 0.05); border: 1px solid rgba(180, 199, 204, 0.15); border-radius: 8px; transition: all 0.3s ease; backdrop-filter: blur(10px); }
ul li:hover { background: rgba(180, 199, 204, 0.08); border-color: rgba(180, 199, 204, 0.25); transform: translateX(4px); }
ul li::before { content: "•"; position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #B4C7CC; font-weight: bold; font-size: 16px; }
.terms-section { background: rgba(180, 199, 204, 0.03); border: 1px solid rgba(180, 199, 204, 0.1); border-radius: 12px; padding: 25px; margin-bottom: 25px; backdrop-filter: blur(10px); transition: all 0.3s ease; }
.terms-section:hover { background: rgba(180, 199, 204, 0.05); border-color: rgba(180, 199, 204, 0.2); }
.terms-section h2 { margin-top: 0; margin-bottom: 15px; }
.terms-section p:last-child, .terms-section ul:last-child { margin-bottom: 0; }
.header-section { background: linear-gradient(135deg, rgba(180, 199, 204, 0.08) 0%, rgba(180, 199, 204, 0.03) 100%); border: 1px solid rgba(180, 199, 204, 0.2); border-radius: 12px; padding: 25px; margin-bottom: 30px; backdrop-filter: blur(10px); }
.header-section h1 { margin-bottom: 10px; }
.header-section p:last-child { margin-bottom: 0; }
footer { margin-top: 80px; padding: 30px 0 20px; border-top: 1px solid rgba(180, 199, 204, 0.2); text-align: center; font-size: 14px; }
footer nav { margin-bottom: 20px; }
footer nav a { color: #999; margin: 0 15px; text-decoration: none; transition: color 0.3s ease; position: relative; }
footer nav a:hover { color: #B4C7CC; text-decoration: none; }
footer nav a::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -4px; left: 50%; background: #B4C7CC; transition: all 0.3s ease; transform: translateX(-50%); }
footer nav a:hover::after { width: 100%; }
footer p { color: #666; margin-bottom: 0; }
@media (max-width: 768px) {
  .container { padding: 30px 15px; }
  h1 { font-size: 28px; }
  h2 { font-size: 20px; padding-left: 16px; }
  h2::before { width: 3px; height: 20px; }
  .terms-section, .header-section { padding: 20px; }
  ul li { padding: 12px 16px 12px 36px; }
  ul li::before { left: 14px; }
}
`;

const TermsOfService: React.FC = () => (
  <>
    <style>{termsCss}</style>
    <div className="container">
      <header>
        <img src="https://storage.googleapis.com/rev-logo-files/Asset%204%403x-8.png" alt="Revalate Logo" />
      </header>
      <main>
        <div className="header-section">
          <h1>Terms of Service</h1>
          <p><em>Last Updated: July 20, 2025</em></p>
        </div>

        <div className="terms-section">
          <p>
            These Terms of Service ("Terms", "Agreement") are entered into by and between you ("you", "your", "Customer", or "User") and Revalate Inc. ("Revalate", "we", "us", or "our"), a corporation incorporated in Toronto, Ontario, Canada. These Terms govern your access to and use of the Revalate AI Studio application, platform, websites, products, features, and services (collectively, the "Service" or "Services"), including any software, documentation, content, and related materials made available by Revalate Inc.
          </p>
          <p>
            By registering for, accessing, or using the Service in any manner, you agree to be legally bound by these Terms. If you do not agree to these Terms, you may not use the Service. If you are accepting these Terms on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms.
          </p>
        </div>

        {/* ---- Section 1 ---- */}
        <div className="terms-section">
          <h2>1. Eligibility, Account Registration, and Security</h2>
          <ul>
            <li><strong>Business Use Only.</strong> The Service is intended solely for use by businesses and their authorized employees, representatives, or contractors. By using the Service, you represent and warrant that you are acting on behalf of a business entity.</li>
            <li><strong>Age Requirements.</strong> You must be at least 18 years of age to use the Service. If you are between 13 and 18 years of age, you may only use the Service with the consent and supervision of a parent or legal guardian who agrees to be bound by these Terms.</li>
            <li><strong>Account Registration.</strong> To access and use the Service, you must register for an account and provide accurate, complete, and up-to-date information as requested during the registration process. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</li>
            <li><strong>Account Restrictions.</strong> You shall not (a) create an account using false identity or information, or on behalf of someone other than yourself or your business; (b) use bots, scripts, or automated methods to register accounts or access the Service; (c) impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
            <li><strong>Account Security.</strong> You agree to notify Revalate immediately at <a href="mailto:support@revalate.ai">support@revalate.ai</a> of any unauthorized access to or use of your account or any breach of security. Revalate is not liable for any loss or damage arising from your failure to comply with this provision.</li>
          </ul>
        </div>
        {/* ---- Section 2 ---- */}
        <div className="terms-section">
          <h2>2. Grant of License and Acceptable Use</h2>
          <ul>
            <li><strong>License Grant.</strong> Subject to these Terms, Revalate grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Service for your internal business purposes only.</li>
            <li>
              <strong>Acceptable Use.</strong> You agree to use the Service only for lawful purposes and in accordance with these Terms. You shall not:
              <ul>
                <li>Upload, transmit, generate, or distribute content that is unlawful, abusive, harassing, defamatory, obscene, fraudulent, infringing, or otherwise objectionable;</li>
                <li>Use the Service to engage in, promote, or facilitate illegal or fraudulent activity;</li>
                <li>Interfere with, disrupt, or damage the Service or servers or networks connected to the Service;</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Service;</li>
                <li>Attempt to gain unauthorized access to the Service, other accounts, computer systems, or networks connected to the Service;</li>
                <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code or underlying ideas or algorithms of the Service;</li>
                <li>Copy, modify, adapt, translate, or create derivative works based on the Service or any part thereof, except as expressly permitted by these Terms;</li>
                <li>Use the Service for competitive analysis to build a competing product or service, including but not limited to systematic downloading of content, benchmarking against competitors, or reverse engineering for competitive purposes;</li>
                <li>Use the Service to generate content that violates applicable laws, regulations, or third-party rights.</li>
              </ul>
            </li>
            <li><strong>Export Control.</strong> You agree to comply with all applicable export laws and regulations that may apply to your use of the Service.</li>
          </ul>
        </div>
        {/* ---- Section 3 ---- */}
        <div className="terms-section">
          <h2>3. User Content and Data</h2>
          <ul>
            <li><strong>User Content.</strong> You may upload, create, store, or otherwise make available certain data, files, documents, images, notes, and other content ("User Content") via the Service.</li>
            <li><strong>Ownership and License.</strong> As between you and Revalate, you retain all rights, title, and interest in and to your User Content. By submitting User Content, you grant Revalate a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, process, store, display, and transmit your User Content solely as necessary to provide the Service to you and to comply with applicable law.</li>
            <li><strong>Representations.</strong> You represent and warrant that you have all necessary rights, permissions, and consents to submit your User Content and to grant the license above, and that your User Content will not violate any applicable law or third-party rights.</li>
            <li><strong>Content Monitoring.</strong> Revalate reserves the right, but is not obligated, to review, monitor, or remove any User Content that violates these Terms or is otherwise objectionable.</li>
            <li><strong>Data Retention and Deletion.</strong> User Content will be retained for the duration of your account and for up to 90 days after account termination, unless otherwise required by law or requested by you. You may request deletion of your User Content at any time by contacting support.</li>
          </ul>
        </div>
        {/* ---- Section 4 ---- */}
        <div className="terms-section">
          <h2>4. Artificial Intelligence and Machine Learning</h2>
          <ul>
            <li>
              <strong>AI-Generated Content.</strong> The Service uses artificial intelligence and machine learning technologies to generate, analyze, and process content. You acknowledge and agree that:
              <ul>
                <li>AI-generated content may not be accurate, complete, or suitable for your specific needs;</li>
                <li>You are solely responsible for reviewing, validating, and determining the appropriateness of any AI-generated content before use;</li>
                <li>AI systems may exhibit biases, limitations, or errors inherent in the training data and algorithms;</li>
                <li>Revalate makes no warranties regarding the accuracy, reliability, or fitness for purpose of AI-generated content.</li>
              </ul>
            </li>
            <li><strong>User Responsibility.</strong> You agree to use AI-generated content responsibly and in compliance with applicable laws and professional standards. You shall not rely solely on AI-generated content for critical business decisions without appropriate human oversight and validation.</li>
            <li><strong>Intellectual Property in AI Content.</strong> AI-generated content created through the Service does not vest any intellectual property rights in Revalate. However, you acknowledge that AI-generated content may not be eligible for copyright protection under applicable law.</li>
          </ul>
        </div>
        {/* ---- Section 5 ---- */}
        <div className="terms-section">
          <h2>5. Third-Party Services and Integrations</h2>
          <ul>
            <li><strong>Third-Party Services.</strong> The Service may integrate, interoperate, or communicate with third-party services, platforms, APIs, and products, including but not limited to OpenAI, QuickBooks Online, Stripe, and other similar services ("Third-Party Services").</li>
            <li><strong>Your Use of Third-Party Services.</strong> Certain Third-Party Services may require you to register for an account or agree to separate terms of service and privacy policies. Your use of Third-Party Services is governed solely by your agreement with those third parties, and Revalate does not endorse, control, or assume any responsibility for any Third-Party Service.</li>
            <li><strong>No Liability.</strong> You acknowledge and agree that Revalate shall not be liable for any damages, losses, claims, data loss, interruption, or other liability arising from or related to (a) your use of any Third-Party Service, (b) the acts or omissions of any third-party provider, or (c) any failure, inaccuracy, or delay of Third-Party Services.</li>
            <li><strong>Changes to Integrations.</strong> Revalate reserves the right to add, remove, or modify any Third-Party Service integrations at any time, with or without notice.</li>
          </ul>
        </div>
        {/* ---- Section 6 ---- */}
        <div className="terms-section">
          <h2>6. Data Processing and Privacy</h2>
          <ul>
            <li>
              <strong>Privacy Policy.</strong> Your use of the Service is subject to the Revalate Privacy Policy, which is incorporated herein by reference. Please review the Privacy Policy carefully at <a href="/privacy-policy">Privacy Policy</a>. By using the Service, you consent to the collection, use, and sharing of your information as described in the Privacy Policy.
            </li>
            <li>
              <strong>Data Processing.</strong> Revalate processes personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and other applicable privacy laws. You have the right to:
              <ul>
                <li>Access your personal information;</li>
                <li>Request correction of inaccurate personal information;</li>
                <li>Request deletion of your personal information, subject to legal and operational requirements;</li>
                <li>Withdraw consent for processing, where applicable;</li>
                <li>Data portability, where technically feasible.</li>
              </ul>
            </li>
            <li><strong>Cross-Border Data Transfer.</strong> Your data may be transferred to, stored, and processed in jurisdictions outside of Canada, including the United States. By using the Service, you consent to such transfers, which are subject to appropriate safeguards.</li>
            <li><strong>Data Security.</strong> Revalate implements commercially reasonable technical and organizational measures to protect your data, including encryption, access controls, and regular security assessments. However, no security measures are perfect or impenetrable, and Revalate cannot guarantee the absolute security of your data.</li>
            <li><strong>Data Breach Notification.</strong> In the event of a data breach that poses a risk of harm to you, Revalate will notify you within 72 hours of becoming aware of the breach, unless notification would compromise security or law enforcement efforts.</li>
          </ul>
        </div>
        {/* ---- Section 7 ---- */}
        <div className="terms-section">
          <h2>7. Fees, Payment, Subscription, and Free Trial</h2>
          <ul>
            <li>
              <strong>Fees and Subscriptions.</strong> Use of the Service may require payment of subscription fees, as set forth on the Revalate website or as otherwise communicated to you. Subscription fees are billed on a recurring basis (e.g., monthly, annually, or as specified during purchase) and will automatically renew at the end of each billing period unless canceled prior to renewal.
            </li>
            <li>
              <strong>Free Trial.</strong> Revalate may, at its sole discretion, offer a free trial for a limited period. The duration and terms of the free trial are subject to change at any time with reasonable notice. At the end of the free trial period, you must subscribe to a paid plan to continue using the Service. You may only be eligible for one free trial per account.
            </li>
            <li>
              <strong>Payment Processing.</strong> All payments are processed securely through Stripe or other payment processors designated by Revalate. By providing a payment method, you authorize Revalate to charge all applicable fees, including recurring subscription charges, to your chosen payment method.
            </li>
            <li>
              <strong>Subscription Cancellation and Renewal.</strong> You may cancel your subscription at any time via the account dashboard or by contacting <a href="mailto:support@revalate.ai">support@revalate.ai</a> before your renewal date. Cancellation will disable automatic renewal, and you will retain access to paid features until the end of the current billing period. Deleting your account or uninstalling the app does not automatically cancel your subscription. You must cancel your subscription separately to avoid future charges.
            </li>
            <li>
              <strong>Fee Changes.</strong> Revalate reserves the right to change subscription fees at any time with at least 30 days' notice. Changes will apply to the next billing cycle following such notice. If you do not accept the new fees, you may cancel your subscription prior to the next renewal.
            </li>
            <li>
              <strong>Refunds.</strong> Except as required by law or in cases of material service failure, all payments are non-refundable. No refunds or credits will be provided for partial subscription periods, changes to your subscription, or unused features. If you believe you were charged in error or experienced a service failure, contact <a href="mailto:support@revalate.ai">support@revalate.ai</a>.
            </li>
            <li>
              <strong>Taxes.</strong> You are responsible for any taxes, duties, or other governmental assessments associated with your use of the Service, excluding taxes on Revalate's net income.
            </li>
            <li>
              <strong>Email Responsibility.</strong> You are solely responsible for providing and maintaining a valid email address. Revalate is not responsible for missed notifications, renewal reminders, or account-related updates due to incorrect or outdated email information.
            </li>
          </ul>
        </div>
        {/* ---- Section 8 ---- */}
        <div className="terms-section">
          <h2>8. Service Level Agreement</h2>
          <ul>
            <li>
              <strong>Uptime Commitment.</strong> Revalate will use commercially reasonable efforts to maintain Service availability of 99.0% uptime per calendar month, excluding scheduled maintenance and force majeure events.
            </li>
            <li>
              <strong>Scheduled Maintenance.</strong> Revalate may perform scheduled maintenance with at least 24 hours' notice, typically during off-peak hours (9 PM - 6 AM Eastern Time).
            </li>
            <li>
              <strong>Service Credits.</strong> If uptime falls below 99.0% in any calendar month, you may be eligible for service credits equal to a pro-rated portion of your monthly fee, upon request within 30 days of the incident.
            </li>
          </ul>
        </div>
        {/* ---- Section 9 ---- */}
        <div className="terms-section">
          <h2>9. Beta Services and Changes to the Service</h2>
          <ul>
            <li>
              <strong>Beta Services.</strong> Certain features of the Service may be made available on a beta, preview, or early access basis ("Beta Services"). Beta Services may be modified or discontinued at any time and are provided "AS IS" and "AS AVAILABLE," without warranties or guarantees of any kind.
            </li>
            <li>
              <strong>Modifications.</strong> Revalate reserves the right to modify, suspend, discontinue, or remove any aspect of the Service, including features and integrations, at any time. Material changes will be communicated with 30 days' notice where feasible. Revalate is not liable for any damages or loss arising from any such changes.
            </li>
          </ul>
        </div>
        {/* ---- Section 10 ---- */}
        <div className="terms-section">
          <h2>10. Termination and Suspension</h2>
          <ul>
            <li>
              <strong>Termination by User.</strong> You may terminate your account and cease use of the Service at any time via your account dashboard or by contacting support at <a href="mailto:support@revalate.ai">support@revalate.ai</a>. Termination will be effective at the end of your current billing period.
            </li>
            <li>
              <strong>Termination or Suspension by Revalate.</strong> Revalate may, at its sole discretion, suspend or terminate your access to the Service (in whole or in part) for any reason, including but not limited to (a) violation of these Terms, (b) failure to pay fees (with 30 days' notice), (c) suspected fraudulent, abusive, or unlawful activity, or (d) as required by law. For non-payment, Revalate will provide 30 days' notice before termination.
            </li>
            <li>
              <strong>Effect of Termination.</strong> Upon termination of your account, your right to access and use the Service will immediately cease. Revalate will provide you with 30 days to export your data before deletion. Sections intended to survive termination (including but not limited to Sections 3, 5, 8, 12, 13, 14, and 15) shall survive any termination.
            </li>
          </ul>
        </div>
        {/* ---- Section 11 ---- */}
        <div className="terms-section">
          <h2>11. Intellectual Property Rights</h2>
          <ul>
            <li>
              <strong>Revalate Ownership.</strong> Except for User Content and any third-party components, all rights, title, and interest in and to the Service, including software, documentation, designs, trademarks, logos, and all related intellectual property, are and shall remain the exclusive property of Revalate Inc. and its licensors.
            </li>
            <li>
              <strong>Restrictions.</strong> You may not copy, modify, distribute, sell, lease, sublicense, or create derivative works based on the Service, except as expressly authorized by Revalate.
            </li>
            <li>
              <strong>Open Source and Third-Party Components.</strong> Certain features or integrations may include or use open-source software or third-party components, which are governed by their own respective licenses.
            </li>
            <li>
              <strong>Feedback.</strong> Any feedback, suggestions, or ideas submitted by you regarding the Service may be used by Revalate for any purpose, including product improvement, development, and marketing, without compensation or acknowledgment.
            </li>
          </ul>
        </div>
        {/* ---- Section 12 ---- */}
        <div className="terms-section">
          <h2>12. Confidentiality</h2>
          <ul>
            <li>
              <strong>Definition.</strong> "Confidential Information" means all non-public information disclosed by Revalate to you, whether orally, visually, or in writing, that is designated as confidential or that a reasonable person would understand to be confidential given the nature of the information and the circumstances of disclosure.
            </li>
            <li>
              <strong>Obligations.</strong> You agree not to disclose or use Confidential Information except as necessary to use the Service as permitted by these Terms. The foregoing obligations do not apply to information that is (a) publicly available through no fault of your own, (b) rightfully received from a third party without breach of confidentiality, or (c) independently developed without use of or reference to Confidential Information.
            </li>
          </ul>
        </div>
        {/* ---- Section 13 ---- */}
        <div className="terms-section">
          <h2>13. Disclaimer of Warranties</h2>
          <ul>
            <li>
              <strong>As-Is Basis.</strong> THE SERVICE, INCLUDING ALL SOFTWARE, FEATURES, DOCUMENTATION, AND INTEGRATIONS, IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.
            </li>
            <li>
              <strong>No Warranties.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVALATE EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, OR THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </li>
            <li>
              <strong>Third-Party Services.</strong> REVALATE MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THIRD-PARTY SERVICES OR CONTENT ACCESSED THROUGH THE SERVICE.
            </li>
            <li>
              <strong>AI Disclaimers.</strong> REVALATE SPECIFICALLY DISCLAIMS ANY WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, OR RELIABILITY OF AI-GENERATED CONTENT.
            </li>
          </ul>
        </div>
        {/* ---- Section 14 ---- */}
        <div className="terms-section">
          <h2>14. Limitation of Liability</h2>
          <ul>
            <li>
              <strong>Exclusion of Damages.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL REVALATE INC., ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </li>
            <li>
              <strong>Limitation of Liability.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, REVALATE'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID REVALATE FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED DOLLARS ($100 USD).
            </li>
          </ul>
        </div>
        {/* ---- Section 15 ---- */}
        <div className="terms-section">
          <h2>15. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Revalate Inc., its officers, directors, employees, contractors, agents, licensors, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to (a) your use of or access to the Service, (b) your violation of these Terms, (c) your violation of any applicable law or the rights of a third party, or (d) your User Content.
          </p>
        </div>
        {/* ---- Section 16 ---- */}
        <div className="terms-section">
          <h2>16. Force Majeure</h2>
          <ul>
            <li>
              <strong>Definition.</strong> "Force Majeure Event" means any event or circumstance beyond Revalate's reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, pandemic, government regulations, labor disputes, or failures of third-party services or infrastructure.
            </li>
            <li>
              <strong>Effect.</strong> Revalate's performance under these Terms will be excused during any Force Majeure Event. Revalate will use reasonable efforts to notify you of any Force Majeure Event and resume performance as soon as practicable.
            </li>
          </ul>
        </div>
        {/* ---- Section 17 ---- */}
        <div className="terms-section">
          <h2>17. Dispute Resolution</h2>
          <ul>
            <li>
              <strong>Informal Resolution.</strong> Before initiating any formal dispute resolution, the parties agree to attempt to resolve disputes through good faith negotiation for at least 30 days.
            </li>
            <li>
              <strong>Mediation.</strong> If informal resolution fails, disputes will be submitted to mediation before a mutually agreed mediator in Toronto, Ontario.
            </li>
            <li>
              <strong>Jurisdiction.</strong> Any legal proceedings that cannot be resolved through mediation shall be instituted exclusively in the courts of the Province of Ontario, Canada, and you irrevocably submit to the jurisdiction of such courts.
            </li>
          </ul>
        </div>
        {/* ---- Section 18 ---- */}
        <div className="terms-section">
          <h2>18. Enterprise Provisions</h2>
          <ul>
            <li>
              <strong>Audit Rights.</strong> For enterprise customers paying annual fees exceeding $10,000, Revalate will, upon reasonable notice and no more than once per year, provide access to relevant compliance documentation and certifications.
            </li>
            <li>
              <strong>Custom Agreements.</strong> Enterprise customers may enter into separate agreements that modify these Terms, in which case such agreements will govern.
            </li>
          </ul>
        </div>
        {/* ---- Section 19 ---- */}
        <div className="terms-section">
          <h2>19. Changes to the Terms</h2>
          <ul>
            <li>
              <strong>Right to Update.</strong> Revalate reserves the right to update, modify, or change these Terms at any time. Material changes will be communicated at least 30 days in advance via email or Service notification. Non-material changes will be effective immediately upon posting. Your continued use of the Service after such changes constitutes your acceptance of the revised Terms.
            </li>
          </ul>
        </div>
        {/* ---- Section 20 ---- */}
        <div className="terms-section">
          <h2>20. General Provisions</h2>
          <ul>
            <li>
              <strong>Governing Law; Jurisdiction.</strong> These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.
            </li>
            <li>
              <strong>Entire Agreement.</strong> These Terms (together with any documents referenced herein) constitute the entire agreement between you and Revalate regarding your use of the Service and supersede all prior agreements or understandings, whether written or oral.
            </li>
            <li>
              <strong>Assignment.</strong> You may not assign or transfer these Terms, or any rights or obligations hereunder, without the prior written consent of Revalate. Revalate may freely assign or transfer these Terms.
            </li>
            <li>
              <strong>Waiver and Severability.</strong> The failure of Revalate to enforce any right or provision of these Terms will not constitute a waiver of such right or provision. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
            </li>
            <li>
              <strong>Notices.</strong> All notices to Revalate must be sent to <a href="mailto:support@revalate.ai">support@revalate.ai</a>. Revalate may provide notices to you via the Service, your account, or the email address associated with your account.
            </li>
            <li>
              <strong>Language.</strong> These Terms are provided in English only. Any translations are for convenience only and the English version shall control.
            </li>
          </ul>
        </div>
        {/* ---- Section 21 ---- */}
        <div className="terms-section">
          <h2>21. Contact Information</h2>
          <p>
            For any questions, support, or legal inquiries regarding these Terms or the Service, please contact:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:support@revalate.ai">support@revalate.ai</a></li>
            <li><strong>Address:</strong> Toronto, Ontario, Canada</li>
            <li><strong>Phone:</strong> 416-254-9814</li>
          </ul>
        </div>
        <div className="terms-section">
          <p style={{ textAlign: "center", color: "#999", fontStyle: "italic", marginTop: 40 }}>
            [END OF TERMS]
          </p>
        </div>
      </main>
      <footer>
        <nav>
          <a href="/terms">Terms of Service</a> |
          <a href="/privacy-policy">Privacy Policy</a>
        </nav>
        <p>Copyright © Revalate Inc. 2025</p>
      </footer>
    </div>
  </>
);

export default TermsOfService;
