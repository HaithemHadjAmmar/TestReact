# Person Management System

This project is a simple web application for managing people's information. It allows users to add new persons with details such as name, date of birth, gender, and email. The added persons are displayed in a dynamic table that updates automatically.

## Features

- **Add Person Form**: Users can fill out a form to add new persons with details like name, date of birth, gender, and email.
- **Dynamic Table**: The application displays the list of persons in a dynamic table that updates automatically when a new person is added.
- **Redux Integration**: Redux is used to manage the state of the application, including form data and the list of persons.
- **Backend Integration**: The application communicates with a backend API to fetch and add persons' data.

## Technologies Used

- React.js: Frontend framework for building user interfaces.
- Redux: State management library for managing application state.
- Axios: HTTP client for making requests to the backend API.
- Tailwind CSS: Utility-first CSS framework for styling the components.

## Installation

1. Clone the repository: `git clone https://github.com/HaithemHadjAmmar/TestReact.git`
2. Navigate to the project directory: `TestReact`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm start`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
3. You can now use the application to add and manage persons' information.

## API Documentation

The backend API provides the following endpoints:

- `GET /api/users`: Fetches the list of persons.
- `POST /api/users`: Adds a new person to the database.

For detailed API documentation, refer to the backend documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
