registerController
Purpose: Register a new user in the application.
- [ ] Extract username, email and password from req.body.
- [ ] Check whether all required fields are provided.
- [ ] Check whether the username or email already exists.
- [ ] Hash the user's password using a password hashing algorithm.
- [ ] Create a new user in MongoDB.
- [ ] Generate a 6-digit OTP.
- [ ] Hash the OTP using SHA-256.
- [ ] Store the hashed OTP in the OTP collection.
- [ ] Generate an HTML email template.
- [ ] Send the OTP to the user's email.
- [ ] Return a registration success response.
Expected result
 User is registered but cannot log in until email verification is completed.
2. verifyOtpController
Purpose: Verify the user's email address using OTP.
- [ ] Extract email and otp from req.body.
- [ ] Validate that both fields are provided.
- [ ] Hash the incoming OTP using SHA-256.
- [ ] Find the OTP record matching the email and hashed OTP.
- [ ] Delete the OTP record atomically after successful verification.
- [ ] Reject invalid or expired OTPs.
- [ ] Update the user's isVerified field to true.
- [ ] Return OTP verification success.
Expected result
 User's email becomes verified.

Important: Your current implementation deletes the OTP but does not yet update user.isVerified. You need to add that database update.
3. loginController
Purpose: Authenticate an existing user and establish a session.
- [ ] Extract email and password.
- [ ] Validate the input.
- [ ] Find the user using their email.
- [ ] Check whether the user exists.
- [ ] Check whether the email is verified.
- [ ] Hash the incoming password.
- [ ] Compare the hashed password with the stored password hash.
- [ ] Generate a refresh token (7 days).
- [ ] Hash the refresh token.
- [ ] Create a new session in MongoDB.
- [ ] Generate an access token (15 minutes).
- [ ] Store the refresh token in an HTTP-only cookie.
- [ ] Return the access token and user information.
Expected result
 User successfully logs in and receives an authenticated session.
4. refreshTokenController
Purpose: Generate a new access token when the existing access token expires.
- [ ] Extract refresh token from cookies.
- [ ] Check whether the refresh token exists.
- [ ] Verify the refresh token using JWT.
- [ ] Hash the incoming refresh token.
- [ ] Find the corresponding active session in MongoDB.
- [ ] Reject invalid, expired or revoked sessions.
- [ ] Generate a new access token.
- [ ] Generate a new refresh token (token rotation).
- [ ] Hash the new refresh token.
- [ ] Update the existing session with the new refresh-token hash.
- [ ] Set the new refresh token in the HTTP-only cookie.
- [ ] Return the new access token.
Expected result
 User remains authenticated without entering their password again.
5. getMeController
Purpose: Retrieve the currently authenticated user's information.
- [ ] Extract the access token from the Authorization header.
- [ ] Extract the token using Bearer TOKEN.
- [ ] Check whether the token exists.
- [ ] Verify the JWT signature and expiration.
- [ ] Extract the user ID from the decoded token.
- [ ] Find the user in MongoDB.
- [ ] Check whether the associated session is active.
- [ ] Return the authenticated user's information.
Expected result
 Frontend receives the currently logged-in user's details.

Note: Your current controller only verifies the JWT and returns the decoded payload. It still needs the database lookup and active-session check.
6. logoutController
Purpose: Log out the user from the current device only.
- [ ] Extract the refresh token from cookies.
- [ ] Check whether the refresh token exists.
- [ ] Hash the refresh token.
- [ ] Find the matching active session.
- [ ] Reject invalid or revoked sessions.
- [ ] Mark the session as revoked: true.
- [ ] Save the updated session.
- [ ] Clear the refresh-token cookie.
- [ ] Return logout success response.
Expected result
 Current device session is revoked. Other devices remain logged in.
7. logoutAllController
Purpose: Log out the user from all devices.
- [ ] Extract the refresh token from cookies.
- [ ] Verify the refresh token.
- [ ] Extract the user ID from the decoded token.
- [ ] Find all active sessions belonging to that user.
- [ ] Update all matching sessions to revoked: true.
- [ ] Clear the refresh-token cookie.
- [ ] Return logout success response.
Expected result
 All active sessions belonging to the user are revoked.

Important: Your current implementation only searches for the current refresh-token hash. It does not yet revoke all sessions.







10. Additional features to implement later
These are useful additions if you want to make this authentication system production-grade.
- [ ] Forgot password controller.
- [ ] Reset password controller.
- [ ] Resend OTP controller with rate limiting.
- [ ] Logout from a specific device.
- [ ] Get all active sessions controller.
- [ ] Revoke a specific device session.
- [ ] Refresh-token reuse detection.
- [ ] OTP attempt limiting.
- [ ] Login rate limiting.
- [ ] Password change controller.