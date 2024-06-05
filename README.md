# FireX Login and Sign-Up System [MERN, Tailwind CSS, NodeMailer]

## PREVIEW
https://github.com/SathruwanCooray/Odessy_FlightChecker/assets/150252729/16a1b7fd-d7d3-4432-a80c-cd795bfda0d3

## Features

### Login

- **User Authentication:** Secure login functionality using email and password.
- **Session Management:** Maintains user sessions for authenticated access to features.

### Sign-Up

- **Registration Form:** Allows new users to create accounts with:
  - Name
  - Email address
  - Password
    

### Email Verification

- **6-Digit Code:** Sends a verification code to the user's email using SMTP service.
- **Code Entry:** Requires users to enter the code to verify their email address during registration.

## Implementation

1. **Login Page**
   - Provide fields for email and password.
   - Implement authentication logic using ExpressJS and MongoDB.
   - Manage sessions securely.

2. **Sign-Up Page**
   - Collect user information including email and password.
   - Implement validation and secure storage of user credentials.

3. **Email Verification**
   - Integrate SMTP service (such as Nodemailer) to send verification codes.
   - Generate and send a unique 6-digit code to the user's registered email.

4. **Code Verification**
   - Implement a form for users to enter the received code.
   - Validate the entered code against the generated code.

## Screenshots

![Login Page](https://imgur.com/qIFZhbi.png)

*Screenshot of the Login Page*

![Sign-Up Page](https://imgur.com/OWHc7kk.png)

*Screenshot of the Sign-Up Page*

![Verification Code](https://imgur.com/9V8xAJY.png)

*Screenshot of the Verification Code Page*

![Verification Code Mail](https://imgur.com/c6NFSTP.png)

*Screenshot of the Verification Code in Mail*

![Database](https://imgur.com/jv2L62X.png)

*Screenshot of Usern Information in database*


## Integration

- Ensure dependencies are installed using `npm install`.
- Run the application using `npm run dev` to test the functionality locally.
- Deploy securely to a production environment, ensuring sensitive data protection.

Create a `.env` file in the root directory of your project with the following content:

- `MONGODB_URI`: MongoDB connection URI for your database.
- `PORT`: Port number on which your ExpressJS server will run.
- `EMAIL_HOST`: SMTP server host for sending emails.
- `EMAIL_USER`: Your email address used for sending verification emails.
- `EMAIL_PASS`: Your email account's password or an app-specific password for SMTP authentication.

Ensure to securely manage and protect your `.env` file to prevent unauthorized access to sensitive information.
