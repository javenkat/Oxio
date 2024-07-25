# Setup instructions
1. Clone the Repository 
git clone <repo_url>
2. Install Dependencies:
npm install
3. Run app
npm start

# Architectural overview
1. Three pages are implemented one each for the Table, the Chart and the input form
2. React's Context API is used for managing state across the app
3. All of these components are wrapped under the DataProvider, so that they have access to the state

# Design Choices
1. React is the UI javascript framework of choice
2. TS is the language of choice
3. Context API is used since it is appropriate for this level of complexity as opposed to Redux which would be overkill
4. ReChart is used for Pie Chart visualization
5. React Router is used for routing

# Scope Cuts
1. UI Design and CSS Styling is minimalistic
2. Accessibility has not been tested
