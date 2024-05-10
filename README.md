# Pillometer AI Documentation

## Authentication Components

### 1. **Agreement Component**

- **Description:** Renders an agreement content.
- **Usage:** Used within the login component to display terms of use and privacy policy.
- **Props:**
  - `children`: Content of the agreement.

### 2. **Login Component**

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

### 3. **Register Component**

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

### 4. **Authentication Component**

- **Description:** Renders the authentication process.
- **Usage:** Used as the main component for authentication.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.
  - `navigatePage`: Function to navigate to the next page.

### 5. **AuthLiner Component**

- **Description:** Renders a line indicating 'OR'.
- **Usage:** Used for visual separation in the authentication process.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

### 6. **OAuthorization Component**

- **Description:** Renders authorization buttons.
- **Usage:** Used for authorization through various platforms.
- **Props:**
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

### 7. **Navbar Component**

- **Description:** Renders navigation bar.
- **Usage:** Used for navigation within the application.
- **Props:** None

### 8. **Profile Component**

- **Description:** Renders user profile information.
- **Usage:** Used for displaying user details.
- **Props:** None

### 9. **UsageInfoInput Component**

- **Description:** Renders input options for usage information.
- **Usage:** Used for collecting usage information.
- **Props:** None

### 10. **Chat Component**

- **Description:** Renders a chat interface.
- **Usage:** Used for communicating with the AI chatbot and collapsing the syptom list.
- **Props:** `setViewMore`

## Home Components

### 1. **Sidebar Component**

- **Description:** Renders a sidebar navigation menu.
- **Usage:** Used for navigation within the application.
- **Props:** None

### 2. **Main Component**

- **Description:** Renders the main content area.
- **Usage:** Used for displaying the main content of the application.
- **Props:** None

## ProfileInfo Components

### 1. **ProfileInfo Component**

- **Description:** Renders user profile information.
- **Usage:** Used for displaying and updating user profile information.
- **Props:** None

### 2. **Alert Component**

- **Description:** Renders an alert message.
- **Usage:** Used for displaying important information or notifications.
- **Props:**
  - `children`: Content of the alert.

### 3. **UsageInfoInput Component**

- **Description:** Renders input options for usage information.
- **Usage:** Used for collecting usage information.
- **Props:** None

### 4. **Banner Component**

- **Description:** Renders a banner element.
- **Usage:** Used for displaying banner content.
- **Props:**
  - `children`: Content of the banner.
  - `sx`: Additional styles for the banner.

### 5. **SymptomsSelectionInput Component**

- **Description:** Renders input options for selecting symptoms.
- **Usage:** Used for selecting symptoms during the health assessment process.
- **Props:**
  - `children`: Content of the input options.
  - `cn`: Additional classes for styling.
  - `sx`: Additional styles for styling.

### 6. **Card Component**

- **Description:** Renders a card element.
- **Usage:** Used for grouping related information.
- **Props:**
  - `children`: Content of the card.
  - `cn`: Additional classes for the card.
  - `sx`: Additional styles for the card.

## Shared Components

### 1. **Button Component**

- **Description:** Renders a button element.
- **Usage:** Used for various actions throughout the authentication process.
- **Props:**
  - `children`: Button text or content.
  - `sx`: Additional styles for the button.
  - `cn`: Additional classes for the button.
  - `navigatePage`: Function to navigate to the next page.
  - `isCurrentPage`: Boolean value indicating whether the current page is for authentication or registration.

### 2. **Content Component**

- **Description:** Renders content.
- **Usage:** Used for displaying various content elements.
- **Props:**
  - `cn`: Additional classes for the content.
  - `sx`: Additional styles for the content.
  - `children`: Content to be displayed.

### 3. **Input Component**

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
  - `stopListening`: Abort the text to speech conversion
  - `startListening`: Start the text to speech conversion
  - `listening`: Listen to user's speech for speech-text conversion

### 4. **Card Component**

- **Description:** Renders a card element.
- **Usage:** Used for grouping related information.
- **Props:**
  - `children`: Content of the card.
  - `cn`: Additional classes for the card.
  - `sx`: Additional styles for the card.

### 5. **Alert Component**

- **Description:** Renders an alert message.
- **Usage:** Used for displaying important information or notifications.
- **Props:**
  - `children`: Content of the alert.

## Community Components

### 1. **Question Component**

- **Description:** Renders a question with associated metadata.
- **Usage:** Used for displaying questions in the community forum.
- **Props:** None

### 2. **Tag Component**

- **Description:** Renders tags associated with a question.
- **Usage:** Used for displaying tags in the community forum.
- **Props:**
  - `sx`: Additional styles for the tag container.

### 3. **ChatResponse Component**

- **Description:** Renders a response to a question in a chat format.
- **Usage:** Used for displaying responses to questions in the community forum.
- **Props:** None

### 4. **Forum Component**

- **Description:** Renders the community forum.
- **Usage:** Used for displaying questions and responses in the community.

- **Props:** None

### 5. **ChatQADetail Component**

- **Description:** Renders the detail page for a question and its responses.
- **Usage:** Used for displaying detailed information about a question and its responses in a chat format.
- **Props:** None

### 6. **Question List Component**

- **Description:** Renders a list of question components.
- **Usage:** Used for displaying questions asked by the user.
- **Props:** None

## Other Components

### 1. **CopyIcon Component**

- **Description:** Renders an icon for copying content.
- **Usage:** Used for copying content in the application.
- **Props:** None

### 2. **QAIcon Component**

- **Description:** Renders icons for question and answer actions.
- **Usage:** Used for displaying icons related to questions and answers.
- **Props:** None

### 3. **ChatResponseList Component**

- **Description:** Renders a list of chat responses.
- **Usage:** Used for displaying a list of responses in a chat format.
- **Props:** None

### 4. **LeftCardQA Component**

- **Description:** Renders the left side of the question and answer card.
- **Usage:** Used for displaying the left side of the question and answer card.
- **Props:** None

### 5. **RightCardQA Component**

- **Description:** Renders the right side of the question and answer card.
- **Usage:** Used for displaying the right side of the question and answer card.
- **Props:** None

### 6. **LeftInputSearch Component**

- **Description:** Renders an input field for searching.
- **Usage:** Used for searching within the application.
- **Props:** None

### 7. **RightFilterButton Component**

- **Description:** Renders filter buttons.
- **Usage:** Used for filtering content in the application.
- **Props:** None

### 8. **Symptom Button Component**

- **Description:** Renders a button for symptom actions.
- **Usage:** Used for symptom-related actions.
- **Props:**
  - `viewMore`: Boolean value indicating whether to view more symptoms.
  - `handleViewMoreClick`: Function to handle view more click.

### 9. **SymptomList Component**

- **Description:** Renders a list of symptoms.
- **Usage:** Used for displaying a list of symptoms.
- **Props:**
  - `viewMore`: Boolean value indicating whether to view more symptoms.

### 10. **CompleteSymptomList Component**

- **Description:** Renders a complete list of symptoms.
- **Usage:** Used for displaying a complete list of symptoms.
- **Props:**
  - `viewMore`: Boolean value indicating whether to view more symptoms.
  - `fullSymptomList`: Array of all symptoms.

### 11. **IncompleteSymptomList Component**

- **Description:** Renders an incomplete list of symptoms.
- **Usage:** Used for displaying an incomplete list of symptoms.
- **Props:**
  - `symptoms`: Array of selected symptoms.

---

To run the application, use the following commands:

```bash
git clone https://github.com/Pillometer/pillometer-ai.git
npm install
npm start
```
