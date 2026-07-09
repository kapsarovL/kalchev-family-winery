import { Resend } from "resend";

export function createEmailSender() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  return new Resend(apiKey);
}

export function getNotificationEmail(): string | null {
  return process.env.NOTIFICATION_EMAIL || null;
}

export function contactNotificationHtml(data: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
  date: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f2ed; padding: 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: #6b2737; padding: 24px 32px;">
              <h1 style="margin: 0; color: #f5f2ed; font-size: 20px; font-weight: 600;">✉️ New Contact Form Submission</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333;">${escapeHtml(data.email)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333;">${data.subject ? escapeHtml(data.subject) : "—"}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #999; margin: 0;">Received ${data.date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function newsletterNotificationHtml(data: { email: string; date: string }): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f2ed; padding: 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: #6b2737; padding: 24px 32px;">
              <h1 style="margin: 0; color: #f5f2ed; font-size: 20px; font-weight: 600;">📬 New Newsletter Subscriber</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333;">${escapeHtml(data.email)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #999; margin: 0;">Subscribed ${data.date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function orderNotificationHtml(data: {
  orderId: number;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  deliveryNotes: string | null;
  items: { wineName: string; winePrice: string; quantity: number }[];
  total: string;
  date: string;
}): string {
  const itemsRows = data.items
    .map(
      (item) => `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #333;">${escapeHtml(item.wineName)}</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #333; text-align: center;">${item.quantity}</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 14px; color: #333; text-align: right;">${escapeHtml(item.winePrice)}</td>
                </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f2ed; padding: 40px 20px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: #6b2737; padding: 24px 32px;">
              <h1 style="margin: 0; color: #f5f2ed; font-size: 20px; font-weight: 600;">📦 New Order #${data.orderId}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Customer</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333;">${escapeHtml(data.customerName)}</p>
                    <p style="margin: 2px 0 0; font-size: 14px; color: #666;">${escapeHtml(data.customerEmail)}</p>
                    <p style="margin: 2px 0 0; font-size: 14px; color: #666;">${escapeHtml(data.phone)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Delivery Address</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333; white-space: pre-wrap;">${escapeHtml(data.address)}</p>
                  </td>
                </tr>
                ${
                  data.deliveryNotes
                    ? `<tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Delivery Notes</strong>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #333; white-space: pre-wrap;">${escapeHtml(data.deliveryNotes)}</p>
                  </td>
                </tr>`
                    : ""
                }
                <tr>
                  <td style="padding-bottom: 16px;">
                    <strong style="color: #6b2737; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Items</strong>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 8px;">
                      <thead>
                        <tr>
                          <th style="text-align: left; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 4px; border-bottom: 2px solid #eee;">Wine</th>
                          <th style="text-align: center; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 4px; border-bottom: 2px solid #eee;">Qty</th>
                          <th style="text-align: right; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 4px; border-bottom: 2px solid #eee;">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${itemsRows}
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px; border-top: 2px solid #eee; text-align: right;">
                    <strong style="font-size: 18px; color: #6b2737;">Total: ${data.total}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #eee;">
                    <p style="font-size: 12px; color: #999; margin: 0;">Order placed ${data.date}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
