# Next.js Document Management System

I've created a document management system using Next.js. Additionally, I've used TainwindCSS and DaisyUI to design the website. It allows the users to create, read, edit, and delete text documents. The user can also edit the formatting of the documents in real time using the WYSIWYG-editor Quilljs-React.

## Prerequisites

Before you begin, make sure you have the following environment variables set in your `.env.local` file:

- `DB_HOST`: Your database host.
- `DB_PORT`: Your database port.
- `DB_NAME`: Your database name.
- `DB_USER`: Your database username.
- `DB_PASSWORD`: Your database user password.

Make sure to replace the values with the actual credentials to the database.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:
```sh
git clone git@github.com:Sn1cke/dokumenthantering.git
```

2. Change into the project directory
```sh
cd dokumenthantering-grupp
```

3. Install the project dependencies
```sh
npm install
```

4. Start the development server
```sh
npm run dev
```

Access the application in your browser at http://localhost:3000.

## Usage
This project provides basic document management functionality (CRUD). You can create, read, update, and delete documents. The main components include:

List of documents

Detailed document page

Create new document

Edit existing document

Delete document

Favourite document
