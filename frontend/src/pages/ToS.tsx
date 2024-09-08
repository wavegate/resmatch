import { Link } from "react-router-dom";

const ToS = () => {
  return (
    <div className={`flex flex-col gap-4`}>
      <h1 className={`font-medium text-xl`}>
        Terms of Service for Residency Match
      </h1>
      <p>
        <strong>Last Updated: 9/7/2024</strong>
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using Residency Match, you agree to these Terms of
        Service and our Privacy Policy. Residency Match is designed for
        applicants to share information about their medical residency
        application cycle.
      </p>

      <h2>2. User Responsibilities</h2>
      <p>
        Users are responsible for providing accurate information regarding their
        residency application cycle. Misuse of the service, such as sabotaging
        data or sharing unrelated content, is strictly prohibited.
      </p>

      <h2>3. Account Terms</h2>
      <p>
        Users can create an account and manage their password. You are
        responsible for maintaining the confidentiality of your account
        credentials and all activities that occur under your account.
      </p>

      <h2>4. Suspension and Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account if we
        determine you are misusing the service. Examples of misuse include, but
        are not limited to, sabotaging data, sharing information unrelated to
        the residency application cycle, spamming, or participating in illegal
        activities.
      </p>

      <h2>5. Prohibited Activities</h2>
      <p>
        Users are prohibited from engaging in any illegal activities, including
        but not limited to hacking, spamming, and sharing illegal materials. Any
        violation may result in immediate account suspension or termination.
      </p>

      <h2>6. Privacy and Data Use</h2>
      <p>
        Please refer to our{" "}
        <Link to="/privacy-policy" className="text-blue-500 underline">
          Privacy Policy
        </Link>{" "}
        for information regarding how we collect, use, and store your data.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The intellectual property within Residency Match is owned by the
        community. Users are allowed to use this content for non-commercial
        purposes, provided that the use complies with these Terms of Service.
      </p>

      <h2>8. Data Retention</h2>
      <p>
        User data is retained for a period of one month. After this period, it
        will be deleted unless required for legal reasons.
      </p>

      <h2>9. Disclaimer of Warranties and Limitation of Liability</h2>
      <p>
        Residency Match is provided "as-is" without warranties of any kind. We
        do not guarantee that the service will be uninterrupted or free from
        bugs, errors, or technical issues. In no event shall Residency Match or
        its affiliates be held liable for any damages arising from the use or
        inability to use the service.
      </p>

      <h2>10. Changes to the Terms</h2>
      <p>
        We may update these Terms of Service at any time, and such updates will
        be posted on the site. Users are encouraged to review these terms
        periodically. Notifications of significant changes will be displayed on
        the site.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions regarding these Terms of Service, please
        contact us at{" "}
        <a href="mailto:cc.frankee@gmail.com">cc.frankee@gmail.com</a>.
      </p>
    </div>
  );
};

export default ToS;
