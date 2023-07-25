# WebFlare - React App

## What is it?
WebFlare is a 100% Personal Project (it's **not** a course project). It's a web app developed to simulate a marketplace of digital assets.

The application was created in order to let a user:
- Register his profile and businesses.
- Send and receive offers for acquiring digital businesses.

## How to use it

1. Visit [WebFlare](https://webflare.vercel.app/).
2. Click on the Login Button to be redirected to the Login Form.
3. Log In or Sign Up (you can switch by clicking on the text that says "Click Here").
4. Fill out the Form (for validation, invalid data will provide feedback):
     - For demo purposes, you can copy the following link for the Image URL: `https://thispersondoesnotexist.com/`
     - For demo purposes, you can set the LinkedIn domain only in the Linkedin URL: `https://www.linkedin.com/`
5. Once everything is filled, the sign-up (or login) button will be available. Click on it to be redirected to the HomePage.
6. HomePage:
     - It will render a list of registered businesses.
     - You can filter by selecting options in the sidebar or using the "Search" bar.
     - Clicking on "View Details" will redirect you to the business Details Page.
7. Business Details:
     - Here you can see more details about the business and the offer.
     - Clicking on "Offer details" will open a modal, allowing you to make an offer or buy it for the offered price.
     - If it's a business of your own, you will have the option to Edit the Business Info and be redirected to the Edit Business Form.
8. Other Navigation Pages (accessible via the sandwich menu for mobile devices):
     1. My Profile:
          - It shows your profile info and your registered businesses info.
          - From here, you can Edit your Profile or Edit each Business.
     2. My Offers:
          - It will display your Received Offers or your Sent Offers (selectable in the top right of the page).
          - You can accept or deny each received Offer.
              - If denied, it will be deleted from the Database.
              - If Accepted, it will show a success message.
     3. Add Business (same page as Edit Business):
          - You will be redirected to a Business Form.
          - When all the inputs are set, you will be able to create your new business.
          - In editing mode, the current values are filled as default.
     4. Logout:
          - It will log you out and redirect to the Home Page.
      
## How it was made

- This app was created using React and React Router, and the data is stored in Firebase. The next topics will cover and detail the main parts of the App Structure.

### Forms
- The Forms were created using a custom hook (useForm) that handles the form data, validity, and styles.
- All the data is handled using React Hooks (useState, useRef, useReducer), event listeners (onClick, onFocus, onBlur), and Conditional Rendering. A logic was created to do basic validation and return feedback to the user.

### Storage and Authentication

- The Storage was Developed using the FireBase Realtime Database Rest API.
- Authentication was developed using the Firebase Auth Rest API.
- For each DataBase entity (User, Business, Offer), there's a context file to handle the data in the frontend and fetch it via the Rest API.

## Next Steps to Improve the Logic

1. Develop My Own Rest Api
   - The focus of this first version was to build the Front End with React. (The Firebase approach was defined only for the usage of this 1st version).
   - The next steps are to develop my own backend logic working with Node, Express, and MongoDB.

2. Implement Authentication Features
   - Authentication will be improved as the BackEnd is developed.

3. Upgrade Business Logic
   - Some business features could be optimized, such as limiting an offer to less than the Asked Price for a business.
   - Send some emails to formalize some steps (such as getting a response for an offer).

## Conclusion and Results of the Project

- As the main goal of this project was to build the Front End using React, it succeeded. The application contains various React Hooks and React Features, such as:
  - useState, useContext, useRef, useEffect, useCallback, useReducer.
  - Custom Hooks.
  - Portals.
  - React.lazy().
  - Suspense.
  - HTTP Requests.
  - Conditional Rendering.
  - UI / UX:
    - Loading Spinner.
    - Form Validation and Styling.
  - Routing.
  - JWT Authentication.
