import crypto from 'crypto';

/**
 * Generates a cryptographically secure 6-digit numeric OTP.
 * @returns {string} A 6-digit OTP string (e.g., "048291")
 */
export function generateOtp() {
    // Generates a random number between 100000 and 999999 (inclusive)
    const otp = crypto.randomInt(100000, 1000000);
    return otp.toString();
}
export function getOtpHtml(otp) {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333333; text-align: center;">Verify Your Account</h2>
        <p style="font-size: 16px; color: #555555; line-height: 1.5;">
            Hello, <br><br>
            Thank you for registering. Please use the following One-Time Password (OTP) to complete your verification process. This code is valid for 5 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px; background-color: #f3f4f6; padding: 10px 24px; border-radius: 4px; display: inline-block;">
                ${otp}
            </span>
        </div>
        <p style="font-size: 12px; color: #999999; text-align: center; margin-top: 4px;">
            If you did not request this code, please ignore this email.
        </p>
    </div>
    `;
}