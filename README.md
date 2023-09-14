# Discord Full Stack Clone

Author: JamesCicada

This is a full-stack clone of Discord, a popular communication platform for gamers and communities. This project is built using Next.js, React, Prisma, TypeScript, and Shadcn to replicate the core features of Discord.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Discord Full Stack Clone is a project created for both portfolio and educational purposes. It aims to provide a complete implementation of a Discord-like application, including features like real-time chat, voice chat, server management, user authentication, and more. By building this project, you can gain valuable experience in developing full-stack web applications with modern technologies.

## Features

- User authentication and authorization.
- Real-time chat functionality for text messages.
- Voice chat support for users to communicate via audio.
- Server creation and management.
- Direct messaging between users.
- User profiles with avatars and status updates.
- Customization options for servers and profiles.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) - Package managers for Node.js.
- [PostgreSQL](https://www.postgresql.org/) - A relational database management system.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/JamesCicada/discord-clone.git
   cd discord-full-stack-clone
   ```

```bash
npm install
# or
yarn install
```

# Running the Development Server
1. Running the Development Server
- Create a new PostgreSQL database for the project.
- Create a new PostgreSQL database for the project.
2. Apply database migrations:
```bash
npx prisma migrate dev
```
3. Start the development server:
```bash
npm run dev
# or
yarn dev
```
4. Open http://localhost:3000 in your web browser to access the Discord Full Stack Clone.

# Open http://localhost:3000 in your web browser to access the Discord Full Stack Clone.

- **Next.js** - A React framework for building server-rendered web applications.
- **React** - A JavaScript library for building user interfaces.
- **Prisma** - A modern database toolkit for TypeScript and Node.js.
- **TypeScript** - A statically typed superset of JavaScript.
- **Shadcn** - A CSS framework for creating responsive and visually appealing web applications.

# Contributing
Contributions to this project are welcome. You can contribute by submitting bug reports, feature requests, or by implementing new features. Please follow the contribution guidelines for more details.

# License
This project is licensed under the MIT License. See the LICENSE file for details.
