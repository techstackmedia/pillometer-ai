## Pilometer AI Documentation

### Authentication Components

#### 1. **Agreement Component**

- **Description:** Renders an agreement content.
- **Usage:** Used within the login component to display terms of use and privacy policy.
- **Props:**
  - `children`: Content of the agreement.

#### 2. **Login Component**

- **Description:** Renders a login form.
- **Usage:** Used for user authentication.
- **Props:**
  - `email`: User email.
  - `password`: User password.
  - `showPassword`: Boolean value indicating whether the password is visible.
  - `keepSignedIn`: Boolean value indicating whether to keep the user signed in.
  - `handleEmailChange`: Function to handle email input change.
  - `handlePasswordChange`: Function to handle password input change.
  - `handleLoginCheckboxChange`: Function to handle checkbox input change.
  - `togglePasswordVisibility`: Function to toggle password visibility.

#### 3. **Register Component**

- **Description:** Renders a registration form.
- **Usage:** Used for user registration.
- **Props:**
  - `discover`: How the user discovered the service.
  - `lastName`: User's last name.
  - `firstName`: User's first name.
  - `profession`: User's profession.
  - `phoneNumber`: User's phone number.
  - `keepUpWithCommunity`: Boolean value indicating whether to share conversations with the community.
  - `handleDiscoverChange`: Function to handle discover input change.
  - `handleLastNameChange`: Function to handle last name input change.
  - `handleFirstNameChange`: Function to handle first name input change.
  - `handleProfessionChange`: Function to handle profession input change.
  - `handlePhoneNumberChange`: Function to handle phone number input change.
  - `handleCommunityCheckboxChange`: Function to handle community checkbox input change.

#### 4. **Authentication Component**

- **Description:** Renders the authentication process.
- **Usage:** Used as the main component for authentication.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.
  - `navigateToNextPage`: Function to navigate to the next page.

#### 5. **AuthLiner Component**

- **Description:** Renders a line indicating 'OR'.
- **Usage:** Used for visual separation in the authentication process.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

#### 6. **OAuthorization Component**

- **Description:** Renders authorization buttons.
- **Usage:** Used for authorization through various platforms.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

#### 7. **Navbar Component**

- **Description:** Renders navigation bar.
- **Usage:** Used for navigation within the application.
- **Props:** None

#### 8. **Profile Component**

- **Description:** Renders user profile information.
- **Usage:** Used for displaying user details.
- **Props:** None

#### 9. **UsageInfoInput Component**

- **Description:** Renders input options for usage information.
- **Usage:** Used for collecting usage information.
- **Props:** None

#### 10. **Chat Component**

- **Description:** Renders a chat interface.
- **Usage:** Used for communicating with the AI chatbot.
- **Props:** None

### Home Components

#### 1. **Sidebar Component**

- **Description:** Renders a sidebar navigation menu.
- **Usage:** Used for navigation within the application.
- **Props:** None

#### 2. **Main Component**

- **Description:** Renders the main content area.
- **Usage:** Used for displaying the main content of the application.
- **Props:** None

### ProfileInfo Components

#### 1. **ProfileInfo Component**

- **Description:** Renders user profile information.
- **Usage:** Used for displaying and updating user profile information.
- **Props:** None

#### 2. **Alert Component**

- **Description:** Renders an alert message.
- **Usage:** Used for displaying important information or notifications.
- **Props:**
  - `children`: Content of the alert.

#### 3. **UsageInfoInput Component**

- **Description:** Renders input options for usage information.
- **Usage:** Used for collecting usage information.
- **Props:** None

#### 4. **Banner Component**

- **Description:** Renders a banner element.
- **Usage:** Used for displaying banner content.
- **Props:**
  - `children`: Content of the banner.
  - `sx`: Additional styles for the banner.

#### 5. **SymptomsSelectionInput Component**

- **Description:** Renders input options for selecting symptoms.
- **Usage:** Used for selecting symptoms during the health assessment process.
- **Props:**
  - `children`: Content of the input options.
  - `cn`: Additional classes for styling.
  - `sx`: Additional styles for styling.

#### 6. **Card Component**

- **Description:** Renders a card element.
- **Usage:** Used for grouping related information.
- **Props:**
  - `children`: Content of the card.
  - `cn`: Additional classes for styling.
  - `sx`: Additional styles for styling.

### Shared Components

#### 1. **Button Component**

- **Description:** Renders a button element.
- **Usage:** Used for various actions throughout the authentication process.
- **Props:**
  - `children`: Button text or content.
  - `sx`: Additional styles for the button.
  - `cn`: Additional classes for the button.
  - `navigateToNextPage`: Function to navigate to the next page.
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

#### 2. **Content Component**

- **Description:** Renders content.
- **Usage:** Used for displaying various content elements.
- **Props:**
  - `cn`: Additional classes for the content.
  - `sx`: Additional styles for the content.
  - `children`: Content to be displayed.

#### 3. **Input Component**

- **Description:** Renders an input field.
- **Usage:** Used for user input throughout the authentication process.
- **Props:**
  - `type`: Type of input field.
  - `placeholder`: Placeholder text for the input field.
  - `name`: Name of the input field.
  - `value`: Value of the input field.
  - `onChange`: Function to handle input change.
  - `sx`: Additional styles for the input field.
  - `cn`: Additional classes for the input field.

#### 4. **Card Component**

- **Description:** Renders a card element.
- **Usage:** Used for grouping related information.
- **Props:**
  - `children`: Content of the card.
  - `cn`: Additional classes for the card.
  - `sx`: Additional styles for the card.

#### 5. **Alert Component**

- **Description:** Renders an alert message.
- **Usage:** Used for displaying important information or notifications.
- **Props:**
  - `children`: Content of the alert.

### Routes

- **Description:** Defines routes for authentication pages.
- **Usage:** Used for navigation between authentication pages.

---

To run the application, use the following commands:

```
npm install
npm start
```
