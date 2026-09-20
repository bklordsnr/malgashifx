import site from "@/config/site";

interface VerificationEmailProps {
  verificationUrl: string;
}

export const verificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => {
  const logoUrl = `${site.url}/logo-image/logo.png`;

  return {
    subject: `Verify your ${site.name} email`,

    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify your email</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f4f7f5;
            font-family: Arial, Helvetica, sans-serif;
            color: #171717;
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="background-color: #f4f7f5; padding: 40px 16px;"
          >
            <tr>
              <td align="center">

                <!-- Main container -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width: 560px;
                    background-color: #ffffff;
                    border: 1px solid #e5e9e6;
                    border-radius: 16px;
                    overflow: hidden;
                  "
                >

                  <!-- Brand header -->
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 32px 32px 28px;
                        border-bottom: 1px solid #edf0ee;
                      "
                    >
                      <img
                        src="${logoUrl}"
                        alt="${site.name}"
                        width="170"
                        style="
                          display: block;
                          width: 170px;
                          max-width: 100%;
                          height: auto;
                          margin: 0 auto;
                          border: 0;
                          outline: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="padding: 42px 40px 38px;">

                      <!-- Label -->
                      <p
                        style="
                          margin: 0 0 14px;
                          font-size: 11px;
                          line-height: 1.4;
                          font-weight: 700;
                          letter-spacing: 1.4px;
                          text-transform: uppercase;
                          color: ${site.primaryColor};
                        "
                      >
                        Email Verification
                      </p>

                      <!-- Heading -->
                      <h1
                        style="
                          margin: 0 0 18px;
                          font-size: 30px;
                          line-height: 1.25;
                          font-weight: 700;
                          letter-spacing: -0.5px;
                          color: #171717;
                        "
                      >
                        Verify your email address
                      </h1>

                      <!-- Intro -->
                      <p
                        style="
                          margin: 0 0 16px;
                          font-size: 15px;
                          line-height: 1.75;
                          color: #555b57;
                        "
                      >
                        Welcome to ${site.name}.
                        Please confirm your email address to complete your
                        account registration and secure your account.
                      </p>

                      <!-- CTA -->
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="margin: 30px 0;"
                      >
                        <tr>
                          <td
                            align="center"
                            style="
                              border-radius: 8px;
                              background-color: ${site.primaryColor};
                            "
                          >
                            <a
                              href="${verificationUrl}"
                              style="
                                display: inline-block;
                                padding: 14px 26px;
                                border-radius: 8px;
                                background-color: ${site.primaryColor};
                                color: #ffffff;
                                font-size: 14px;
                                line-height: 1;
                                font-weight: 700;
                                text-decoration: none;
                              "
                            >
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Expiration notice -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          margin: 0 0 28px;
                          background-color: #f7f9f7;
                          border: 1px solid #e7ebe8;
                          border-radius: 10px;
                        "
                      >
                        <tr>
                          <td style="padding: 16px 18px;">
                            <p
                              style="
                                margin: 0;
                                font-size: 13px;
                                line-height: 1.6;
                                color: #555b57;
                              "
                            >
                              <strong style="color: #252825;">
                                Verification link expires in 24 hours.
                              </strong>
                              Please verify your email before the link expires.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Fallback link -->
                      <p
                        style="
                          margin: 0 0 9px;
                          font-size: 12px;
                          line-height: 1.5;
                          color: #777d79;
                        "
                      >
                        If the button above doesn't work, copy and paste this
                        link into your browser:
                      </p>

                      <p
                        style="
                          margin: 0 0 28px;
                          font-size: 12px;
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

                      <!-- Spam notice -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background-color: #fffaf0;
                          border: 1px solid #f1e6c9;
                          border-radius: 10px;
                        "
                      >
                        <tr>
                          <td style="padding: 16px 18px;">
                            <p
                              style="
                                margin: 0 0 5px;
                                font-size: 13px;
                                line-height: 1.5;
                                font-weight: 700;
                                color: #4b4433;
                              "
                            >
                              Can't find the email?
                            </p>

                            <p
                              style="
                                margin: 0;
                                font-size: 13px;
                                line-height: 1.6;
                                color: #6d6654;
                              "
                            >
                              Please check your Spam or Junk folder. If you
                              still can't find it, you can request another
                              verification email.
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 26px 32px 30px;
                        border-top: 1px solid #edf0ee;
                        background-color: #fafbfa;
                      "
                    >
                      <p
                        style="
                          margin: 0 0 7px;
                          font-size: 13px;
                          line-height: 1.5;
                          font-weight: 700;
                          color: #333733;
                        "
                      >
                        ${site.name}
                      </p>

                      <p
                        style="
                          margin: 0;
                          font-size: 11px;
                          line-height: 1.6;
                          color: #8a908c;
                        "
                      >
                        This is an automated security email.
                        Please do not reply to this message.
                      </p>
                    </td>
                  </tr>

                </table>

                <!-- Bottom text -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="max-width: 560px;"
                >
                  <tr>
                    <td
                      align="center"
                      style="padding: 18px 20px 0;"
                    >
                      <p
                        style="
                          margin: 0;
                          font-size: 10px;
                          line-height: 1.5;
                          color: #9ba19d;
                        "
                      >
                        © ${new Date().getFullYear()} ${site.name}
                      </p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </body>
      </html>
    `,

    text: `
Welcome to ${site.name}

Please verify your email address to complete your account registration and secure your account.

Verify your email:
${verificationUrl}

This verification link expires in 24 hours.

Can't find the email?
Please check your Spam or Junk folder. If you still can't find it, you can request another verification email.

${site.name}
This is an automated security email.
Please do not reply to this message.
    `.trim(),
  };
};
