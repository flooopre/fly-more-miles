import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1>Impressum</h1>
          <p className="text-muted-foreground">Legal Information (German Law § 5 TMG)</p>

          <h2>Information according to § 5 TMG</h2>
          <p>
            <strong>MilesTopUp</strong><br />
            Operated by: Florian Prenner<br />
            Austria
          </p>

          <h2>Contact</h2>
          <p>
            <strong>Email:</strong> <a href="mailto:hello@milestopup.com">hello@milestopup.com</a><br />
            <strong>Website:</strong> <a href="https://milestopup.com">milestopup.com</a>
          </p>

          <h2>EU Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR): 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>

          <h2>Liability for Content</h2>
          <p>
            As a service provider, we are responsible for our own content on these pages according to § 7 para.1 TMG 
            (German Telemedia Act). However, according to §§ 8 to 10 TMG, we are not obligated as a service provider 
            to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
          </p>
          <p>
            Obligations to remove or block the use of information under general law remain unaffected. However, 
            liability in this regard is only possible from the point in time at which knowledge of a concrete 
            infringement of the law is obtained. Upon becoming aware of corresponding violations, we will remove 
            this content immediately.
          </p>

          <h2>Liability for Links</h2>
          <p>
            Our website contains links to external third-party websites over whose content we have no influence. 
            Therefore, we cannot assume any liability for this third-party content. The respective provider or 
            operator of the pages is always responsible for the content of the linked pages.
          </p>
          <p>
            The linked pages were checked for possible legal violations at the time of linking. Illegal content 
            was not recognizable at the time of linking. However, permanent monitoring of the content of the 
            linked pages is not reasonable without concrete evidence of a violation. Upon becoming aware of 
            legal violations, we will remove such links immediately.
          </p>

          <h2>Copyright</h2>
          <p>
            The content and works created by the site operators on these pages are subject to German copyright law. 
            Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright 
            require the written consent of the respective author or creator.
          </p>
          <p>
            Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the 
            content on this site was not created by the operator, the copyrights of third parties are respected. 
            In particular, third-party content is identified as such. Should you nevertheless become aware of a 
            copyright infringement, please inform us accordingly. Upon becoming aware of legal violations, we 
            will remove such content immediately.
          </p>

          <h2>Privacy Policy</h2>
          <p>
            Information about the handling of your personal data can be found in our{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>

          <h2>Disclaimer</h2>
          <p>
            MilesTopUp is an independent service and is not affiliated with, endorsed by, or sponsored by 
            British Airways, Air France, KLM, or any other airline mentioned on this website. All airline 
            names, logos, and trademarks are the property of their respective owners.
          </p>
          <p>
            We facilitate the transfer of credit card reward points into airline loyalty programs using 
            official transfer partnerships. Results may vary, and we make no guarantees about availability 
            or pricing. All transactions are subject to our Terms of Service.
          </p>

          <p className="text-sm text-muted-foreground mt-8">
            Last updated: February 12, 2026
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Impressum;
