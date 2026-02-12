import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: February 12, 2026</p>

          <h2>1. Introduction</h2>
          <p>
            MilesTopUp ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
            milestopup.com (the "Site") or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li><strong>Contact Information:</strong> Email address, name (when requesting a quote)</li>
            <li><strong>Transaction Information:</strong> Frequent flyer membership numbers, order details</li>
            <li><strong>Communication:</strong> Messages you send us via email or contact forms</li>
          </ul>

          <h3>2.2 Automatically Collected Information</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device information</li>
            <li><strong>Cookies:</strong> We use Google Analytics to understand how visitors use our Site</li>
            <li><strong>IP Address:</strong> For security and analytics purposes</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide quotes and process miles top-up orders</li>
            <li>Communicate with you about your requests</li>
            <li>Improve our Site and services</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2>4. Data Sharing</h2>
          <p>
            We <strong>do not sell</strong> your personal information. We may share data with:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors, email services (EmailJS), analytics (Google Analytics)</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>

          <h2>5. Cookies & Tracking</h2>
          <p>We use cookies for:</p>
          <ul>
            <li><strong>Google Analytics:</strong> To understand Site usage (anonymized data)</li>
            <li><strong>Essential Cookies:</strong> For Site functionality</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, but this may affect Site functionality.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data, including:
          </p>
          <ul>
            <li>SSL/TLS encryption (HTTPS)</li>
            <li>Secure hosting on Vercel</li>
            <li>Access controls and regular security reviews</li>
          </ul>
          <p>
            However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2>7. Your Rights (GDPR)</h2>
          <p>If you are in the European Union, you have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Portability:</strong> Receive your data in a structured format</li>
            <li><strong>Object:</strong> Object to processing of your data</li>
            <li><strong>Withdraw Consent:</strong> At any time</li>
          </ul>
          <p>
            To exercise these rights, contact us at: <a href="mailto:hello@milestopup.com">hello@milestopup.com</a>
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to provide our services and comply with legal obligations. 
            Typically:
          </p>
          <ul>
            <li><strong>Quote Requests:</strong> 12 months</li>
            <li><strong>Transaction Records:</strong> 7 years (legal requirement)</li>
            <li><strong>Analytics Data:</strong> 26 months (Google Analytics default)</li>
          </ul>

          <h2>9. Third-Party Links</h2>
          <p>
            Our Site may contain links to third-party websites (e.g., airline sites, credit card issuers). 
            We are not responsible for their privacy practices. Please review their privacy policies.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
            data from children.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with 
            an updated "Last updated" date.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:hello@milestopup.com">hello@milestopup.com</a></li>
            <li><strong>Website:</strong> <a href="https://milestopup.com">milestopup.com</a></li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
