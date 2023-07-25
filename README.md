# WebFlare - React App

## What is it?
WebFlare is a 100% Personal Project (it's **not** a course project). It's a web app developed to simulate a marketplace of digital assets.

The application was created in order to let a user register his profile, register his businesses and send / receive offers for aquiring digital businesses.

## How to use it

1. Visit [WebFLare](https://webflare.vercel.app/);
2. Click in the Login Button - You will be redirected to the Login Form;
3. Log In or Sign Up (you can switch clicking on the text that says "Click Here");
4. Fill the Form (for the validation, whenever the inserted data is not valid, it will give some feedback);
     1. For demo purposes, you can copy the following link for the Image Url: https://thispersondoesnotexist.com/
     2. For demo purposes, you can set the linkedin domain only in the Linkedin URL  https://www.linkedin.com/
5. When everything is filled, the sign up (or login) button will be available. You click on it, and you will be Redirected to the HomePage.
6. HomePage (whenever you want to be redirected to the HomePage, click at the logo in the Navigation Bar)
     - It will be rendered a list of registered businesses;
     - You can filter by selectiong the options in the sidebar (or in the menu shown after you click in the filter button in mobile), or by inserting a text in the "Search" bar;
     - When You click in the View Details, you will be redirected to the business Details Page
7. Business Details
     - Here you can see more details about the business, and details about the offer;
     - When you click in Offer details, it will open a modal, that you can make an offer (you will be redirected to an Offer Form) or buy it for the offered price;
     - If it's a business of your own, you will have the option to Edit the Business Info, and you will be Redirected to the Edit Business Form);
8. Other Navigation Pages (In the sandwich menu for mobile devices)
     1. My Profile
          - It will show your profile info, and your registered businesses info;
          - From here you can Edit your Profile, of Edit each Business;
     2. My Offers
          - It will be rendered your Received Offers or your Sent Offers (you can select on the option in the right top of the page);
          - You can accept or Deny each received Offer
              - If denied, it will be deleted from the Database;
              - If Accepted there's no action to be taken (it will show a success message)
     3. Add Business (same page as edit business)
          - You will be redirected to a Business Form;
          - When all the inputs are set, you will be able to create your new business;
          - When you are in the editing mode, the current values are filled as default
     4. Logout
          - It will logout and redirect to the Home Page
      

## How it was made

- This app was created using React and React Router, and the data is stored in Firebase. The next topics will cover and detail the main parts of the App Structure.

### Forms
- The Forms were created using a custom hook (useForm), that handles the form data, validity and styles;
- All the data is handled using React Hooks (useState, useRef, useReducer), event listeners (onClick, onFocus, onBlur), and Conditional Rendering a logic was created to do basic validation and return the user some feedback;

### Storage and Authentication

- The Storage was Developed using the FireBase Realtime Database Rest API;
- Authentication was developed using the Firebase Auth Rest API;
- For each DataBase entity (User, Business, Offer), there's a context file to handle the data in the front end, and fetch it via Rest API.

## Next Steps to Improve the Logic

1. Develop My Own Rest Api

   - The focus of this first version was to build the Front End wit React. (The Firebase approach was defined only for the uisage of this 1st version);
   - The next Steps are to develop my own backend logic Working with Node, Express and MongoDb.

2. Implement Authentication Features

   - It will be improved as the BackEnd will be done;

3. Upgrade Business Logic
     - Some business features could be optimized, such as limit a offer to less than the Asked Price for a business;
     - Send some e-mails to formalize some steps (such as getting response for an offer)

## Conclusion and Results of the Project

- As the main goal of this project was build the Front End using React, it succeeded, as it's an application that contains the main React Hooks and React Features, such as:
  - useState, useContext, useRef, useEffect, useCallback, useReducer;
  - Portals;
  - React.lazy();
  - Suspense;
  - HTTP Requests;
  - Conditional Rendering;
  - UI / UX:
    - Loading Spinner;
    - Form Validation and Styling;
  - Routing;
  - JWT Authentication.
