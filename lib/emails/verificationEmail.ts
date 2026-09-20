import site from "@/config/site";

interface VerificationEmailProps {
  verificationUrl: string;
}

export const verificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => {
  return {
    subject: `Verify your ${site.name} email`,

    html: `
      <div
        style="
          margin: 0;
          padding: 40px 20px;
          background-color: #f6f7f6;
          font-family: Arial, Helvetica, sans-serif;
          color: #171717;
        "
      >
        <div
          style="
            max-width: 560px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #e5e7e5;
            border-radius: 12px;
            overflow: hidden;
          "
        >
          <div
            style="
              padding: 28px 32px;
              border-bottom: 1px solid #e5e7e5;
              text-align: center;
            "
          >
            <div
              style="
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 0.3px;
                color: ${site.primaryColor};
              "
            >
              ${site.name}
            </div>
          </div>

          <div style="padding: 36px 32px;">
            <h1
              style="
                margin: 0 0 16px;
                font-size: 24px;
                line-height: 1.3;
                font-weight: 700;
                color: #171717;
              "
            >
              Verify your email
            </h1>

            <p
              style="
                margin: 0 0 16px;
                font-size: 15px;
                line-height: 1.7;
                color: #525252;
              "
            >
              Welcome to ${site.name}. Please verify your email
              address to complete your account registration.
            </p>

            <p
              style="
                margin: 0 0 28px;
                font-size: 15px;
                line-height: 1.7;
                color: #525252;
              "
            >
              Click the button below to verify your email address.
              This link will expire in 24 hours.
            </p>

            <div style="margin-bottom: 28px;">
              <a
                href="${verificationUrl}"
                style="
                  display: inline-block;
                  padding: 13px 24px;
                  background-color: ${site.primaryColor};
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 7px;
                  font-size: 15px;
                  font-weight: 600;
                "
              >
                Verify Email
              </a>
            </div>

            <p
              style="
                margin: 0 0 8px;
                font-size: 13px;
                line-height: 1.6;
                color: #737373;
              "
            >
              If the button doesn't work, copy and paste this link
              into your browser:
            </p>

            <p
              style="
                margin: 0 0 28px;
                font-size: 13px;
                line-height: 1.6;
                word-break: break-all;
              "
            >
              <a
                href="${verificationUrl}"
                style="
                  color: ${site.primaryColor};
                  text-decoration: underline;
                "
              >
                ${verificationUrl}
              </a>
            </p>

            <div
              style="
                padding: 16px;
                background-color: #f6f7f6;
                border-radius: 8px;
              "
            >
              <p
                style="
                  margin: 0;
                  font-size: 13px;
                  line-height: 1.6;
                  color: #666666;
                "
              >
                Didn't receive this email in your inbox?
                Please check your Spam or Junk folder.
              </p>
            </div>
          </div>

          <div
            style="
              padding: 24px 32px;
              border-top: 1px solid #e5e7e5;
              text-align: center;
            "
          >
            <p
              style="
                margin: 0;
                font-size: 12px;
                line-height: 1.6;
                color: #8a8a8a;
              "
            >
              This is an automated security email from
              ${site.name}.
            </p>
          </div>
        </div>
      </div>
    `,

    text: `
Welcome to ${site.name}

Please verify your email address to complete your account registration.

Verify your email:
${verificationUrl}

This link will expire in 24 hours.

If you don't see this email in your inbox, please check your Spam or Junk folder.

${site.name}
This is an automated security email.
    `.trim(),
  };
};
