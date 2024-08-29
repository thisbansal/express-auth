# Auth Server

A basic authentication server built using ExpressJS

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Description

This is a basic authentication server built using ExpressJS. It allows you to set up an authentication service with environment variables for the port number and other configurations.

## Installation

1. Clone the repository:

`git clone https://github.com/thisbansal/express-auth.git`

2. Navigate to the project directory:
   `cd express-auth`

3. Install dependencies:
   `npm install`

## Usage

1. Create a .env file in the root of your project with the following content:
   `PORT_NUMBER=your_port_number`
   `HOST=NETWORK_INTERFACE_ADDRESS`

2. Run the server:
   `npm start`
   or for development mode:
   `npm run dev`

## Environment Variables

- `PORT_NUMBER`: Specifies the port number on which the server will listen. Set this in your `.env` file.
- `HOST`: Specifies the network interface address to which the server should bind. Set this in your `.env` file.

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/yourusername/auth-server/blob/main/LICENSE) for more information.
