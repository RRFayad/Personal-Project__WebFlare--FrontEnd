# WebFlare - React App

## Overview

WebFlare is a 100% Personal Project (it's **not** a course project). It's a web application developed to simulate a marketplace of digital assets.

Users can:

- Register their profile;
- Register their businesses;
- Send and receive offers for acquiring digital businesses.

## Usage

1. Visit [WebFlare](https://webflare.vercel.app/).
2. Click the "Login" button to access the Login Form.
3. Log In or Sign Up (you can switch between the two by clicking "Click Here").
4. Fill out the Form (for validation, invalid data will provide feedback):
   - For demo purposes:
      - dummy.user@gmail.com
      - Dummy123+
5. Once the form is completed, the sign-up (or login) button will be available. Click on it to be redirected to the HomePage.
6. HomePage:
   - It shows a list of registered businesses.
   - You can filter by selecting options in the sidebar or using the "Search" bar.
   - Click "View Details" to explore business Details.
7. Business Details:
   - Here you can see more details about the business and the offer.
   - Click "Offer Details" to make an offer or purchase it for the listed price.
   - If it's your own business, you can edit its information and be redirected to the Edit Business Form.
8. Other Navigation Pages (accessible via the sandwich menu for mobile devices):
   1. My Profile:
      - View your profile and registered business information.
      - Edit your profile or individual businesses.
   2. My Offers:
      - View received or sent offers (selectable in the top-right corner).
      - Accept or deny received offers.
   3. Add Business (also used for editing):
      - Access a business form.
      - Create a new business once all fields are completed.
      - In editing mode, pre-fill current values as defaults.
   4. Logout:
      - Log out and return to the homepage.

## How it was made

- This app was developed using React and React Router. It communicates with the [WebFlare Rest API](https://github.com/RRFayad/Personal-Project__WebFlare--BackEnd) for data.

### Forms

- Custom forms are created using a custom hook (useForm) to handle form data, validity, and styles.
- All data is managed with React Hooks (useState, useRef, useReducer), event listeners (onClick, onFocus, onBlur), and conditional rendering for validation feedback.

### Back End and Authentication

- For server-side details, refer to the [Webflare Rest API](https://github.com/RRFayad/Personal-Project__WebFlare--BackEnd).
- Authentication is managed using JWT, and tokens are stored in the browser. Auto-logout occurs when tokens expire.
- Context files are implemented for each database entity (User, Business, Offer) to handle frontend data and fetch it from the REST API.

## Future Enhancements

1. Enhance Existing Features
   - Implement email notifications for key actions, such as receiving offers.
   - Add a "Forgot Password" feature.

## Conclusion

WebFlare successfully achieves its primary goal of building a frontend using React. It leverages various React features and hooks, making it a valuable project for learning and understanding modern web development.

- Key Features:
  - State management using useState, useContext, useRef, useEffect, useCallback, and useReducer.
  - Custom hooks, portals, React.lazy, and Suspense for code splitting.
  - Handling HTTP requests.
  - Implementing JWT-based authentication.
  - User interface enhancements, including loading spinners and form validation.
  - Navigation and routing.

Feel free to explore, use, or contribute to this project.
