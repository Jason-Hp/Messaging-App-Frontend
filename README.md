# Messaging App Frontend

This is the frontend of the Messaging App built with React and Vite. It allows users to interact with the messaging system, including sending and receiving messages & files.

## Features
- User authentication (login/signup)
- Real-time messaging via Socket I/O
- Responsive design
- Integration with the backend server

## Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jason-Hp/Messaging-App-Frontend.git
   cd Messaging-App-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development
To start the development server:
```bash
npm run dev
```
This will start the app in development mode. Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

### Production
To build the app for production:
```bash
npm run build
```
Then preview the production build:
```bash
npm run preview
```

## Backend Repository
The backend repository for this project can be found [here](https://github.com/Jason-Hp/Messaging-App).

Ensure the backend server is running and properly configured before using the frontend.

## Configuration

### API Base URL
Update all API calls in the code to point to the correct backend API server URL. This can typically be configured via an environment variable.

Unfortunately, please replace all "hard-coded" API calls with correct backend API server URL.

### Socket Configuration
Update the WebSocket connection URL in `Navbar.jsx` or any relevant component if needed. Example:
```javascript
const socket = setSocket(io("<YOUR_BACKEND_URL>", { withCredentials: true }));
```
Ensure you have the correct URL for your backend's Socket server.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.

## Folder Structure

```
Messaging-App-Frontend/
├── src/
│   ├── components/       # React components
│   ├── routes/           # Route components
│   ├── assets/           # Static assets (images, styles, etc.)
│   ├── context.js/       # context utility
|   ├── index.css/        # Styling
|   ├── main.jsx/         # Main
├── public/               # Public assets
├── vite.config.js        # Vite configuration
├── package.json          # Project metadata and dependencies
```


## Contribution
If you'd like to contribute to this project, feel free to fork the repository and create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
