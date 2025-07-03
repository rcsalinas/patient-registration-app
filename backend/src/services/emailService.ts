import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Sends a registration confirmation email to a new patient.
 * @param patientName - The full name of the patient.
 * @param patientEmail - The email address of the patient.
 */
export const sendRegistrationConfirmation = async (patientName: string, patientEmail: string): Promise<void> => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: patientEmail,
    subject: 'Registration Successful!',
    html: `
      <h1>Welcome, ${patientName}!</h1>
      <p>Thank you for registering with our service.</p>
      <p>Your patient profile has been created successfully.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${patientEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${patientEmail}:`, error);
  }
};