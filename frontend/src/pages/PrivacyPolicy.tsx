const PrivacyPolicy = () => {
  return (
    <div className={`flex flex-col gap-4`}>
      <h1 className={`font-medium text-xl`}>
        Privacy Policy for Residency Match
      </h1>
      <p>
        <strong>Last Updated: 9/7/2024</strong>
      </p>
      <p>
        At Residency Match, we are committed to safeguarding the privacy of our
        users. This Privacy Policy outlines how we collect, use, and protect
        your personal data. By using Residency Match, you agree to the
        collection and use of information in accordance with this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information:</p>
      <ul>
        <li>
          <strong>Email Address</strong>: Collected when users sign up or
          interact with our services, such as through Google OAuth.
        </li>
        <li>
          <strong>Medical Residency Application Information</strong>: Includes
          data related to your residency applications, which is used to improve
          services.
        </li>
      </ul>

      <h2>2. How We Use the Information</h2>
      <p>The information we collect is used solely for:</p>
      <ul>
        <li>Improving our services to provide a better user experience.</li>
        <li>
          Analyzing user engagement to understand how users interact with our
          site and make improvements.
        </li>
      </ul>
      <p>
        We do not share this data with any third parties, except as mentioned in
        the "Third-Party Services" section below.
      </p>

      <h2>3. Third-Party Services</h2>
      <p>We use the following third-party services to enhance our platform:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong>: We use this tool to track user
          engagement and gather insights about site usage.
        </li>
        <li>
          <strong>Sentry</strong>: We use this service for error logging and to
          identify and resolve issues within the site.
        </li>
      </ul>
      <p>
        These third parties are bound by their own privacy policies and may
        collect non-personal information about your interaction with Residency
        Match.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        As a user, you have the following rights regarding your personal
        information:
      </p>
      <ul>
        <li>
          <strong>Update Your Information</strong>: You can request updates to
          your personal data at any time.
        </li>
        <li>
          <strong>Delete Your Information</strong>: You can request that your
          personal data be deleted by contacting us at the email below.
        </li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We take the security of your personal data seriously and implement
        appropriate measures to protect it. However, no method of transmission
        over the internet or method of electronic storage is 100% secure.
      </p>

      <h2>6. Changes to the Privacy Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. When we make
        changes, we will update the "Last Updated" date at the top of this page.
        We encourage users to review this policy periodically.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or wish
        to exercise your rights, please contact us at:
      </p>
      <p>
        <strong>Email</strong>:{" "}
        <a href="mailto:cc.frankee@gmail.com">cc.frankee@gmail.com</a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
