# AyurBotanica 🌿

AyurBotanica is a community-driven platform where users can explore and share information about medicinal plants. Users can upload pictures of plants, which are then classified using machine learning models to provide information about the plants. Additionally, users can contribute to the map by marking the locations of these plants, allowing others to explore and learn more about them.

## Features

- **Plant Identification**: Upload pictures of plants, and our machine learning models will identify them for you.
- **Plant Information**: Learn about the properties, uses, and other information about medicinal plants.
- **Map Integration**: Contribute to the map by adding the locations of medicinal plants, allowing others to explore and discover them.
- **Community-driven**: Join our community to share your knowledge and discoveries about medicinal plants.

## Getting Started

To get started with AyurBotanica, follow these steps:

1. Clone this repository:

    ```bash
    git clone git repo
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

Create a `.env` file in the root directory and add your API key:


### Configuration

1. Sign up for a Clerk account at [Clerk.dev](https://clerk.dev/) and create a new Clerk application.

2. Copy the provided Clerk API keys.

3. Create a `.env` file in the root of the project and add your Clerk API keys:

   ```plaintext
   VITE_CLERK_PUBLISHABLE_KEY=https://api.clerk.dev/v1/your-clerk--api-key
   ```

### Development

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:5173` by default.

### Deployment

To deploy the project, follow the deployment instructions for your chosen hosting platform. Remember to set up environment variables for production, including your Clerk API keys.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs
- [Clerk](https://clerk.dev/) - A complete solution for user authentication and user management

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.