# AutomTest 4.0 Frontend

Frontend for AutomTest 4.0, a tool that supports test case generation from functional requirements.

## Download the compiled version

You can download the compiled version of AutomTest 3.0 Frontend directly from the repository's **Releases** page.

On the Releases page, choose the latest version and download the file for your operating system.

## Run in development mode

To run the project locally, install Node.js 18 or higher and run:

```bash
npm install
npm start
```

This project contains only the frontend. To use the full AutomTest 3.0 application, you also need to run the backend.

## Environment variables

Create a `.env` file in the project root using the example below:

```env
AUTOMTEST_BACKEND_URL=http://localhost:8000
API_KEY=your-api-key
```

## Build locally

Windows:

```bash
npm run package:win
```

Ubuntu/Linux:

```bash
npm run package:linux
```

The generated files are placed in `release/build`.
