## Snipp-Board

A small React-based code snippet manager for saving, searching, copying,
and organizing reusable code snippets.

## Project Structure

Snipp-Board/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── Logo.jpg
│   └── logo2.gif
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── BackGroundCont.jsx
│   │   ├── Navbar.jsx
│   │   ├── SnippetCard.jsx
│   │   ├── SnippetContainer.jsx
│   │   └── SnippetForm.jsx
│   │
│   ├── data/
│   │   └── languages.js
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx

node_modules/ is intentionally omitted from this documentation
because it contains dependencies rather than application code.

## Architecture

main.jsx
   ↓
 App.jsx
   ↓
Dashboard.jsx
   ├── Navbar
   ├── BackGroundCont
   ├── SnippetContainer
   │      └── SnippetCard
   └── SnippetForm

Dashboard is the main state/controller layer. It stores snippets in
React state, persists them to localStorage, filters them for search,
and passes actions down to child components through props.

## Files & Responsibilities

src/main.jsx

Application entry point.

Creates the React root.

Loads global CSS and Remix Icons.

Renders <App /> inside StrictMode.

src/App.jsx

Root application component.

App() - Renders the Dashboard page.

src/pages/Dashboard.jsx

Main application logic and state management.

State - editingSnippet --- stores the snippet selected for
editing. - searchText --- current search query. - ViewForm ---
controls whether the snippet form is visible. - AllsnippetData ---
stores all snippets and initializes from localStorage.

Functions - editSnippet(snippet) --- selects a snippet for editing
and opens the form. - addSnippet(data) --- creates a new snippet,
converts comma-separated tags into an array, assigns an ID using
Date.now(), and adds it to state. - deleteSnippet(id) --- removes
the snippet whose ID matches the supplied ID. - copySnippet(code) ---
attempts to copy code to the clipboard and displays a success/error
toast. - clickForm() --- toggles the visibility of the snippet form.

Derived logic - filteredSearchData searches snippets by: - title -
language - code - tags

useEffect - Saves AllsnippetData to localStorage whenever the
snippet list changes.

src/components/Navbar.jsx

Top navigation and search controls.

Navbar({ clickFormbtn, setSearchText }) - Displays the project
logo. - Provides the search input. - Displays the language dropdown. -
Provides the Add button. - Calls setSearchText() whenever the search
input changes. - Calls clickFormbtn() to open/close the form.

src/components/BackGroundCont.jsx

Decorative background layer.

BackGroundCont() - Renders the Make-it-simple text and large
DOCs background typography. - Uses fixed positioning and Tailwind CSS
classes for the visual background.

src/components/SnippetContainer.jsx

Renders the collection of snippets.

SnippetContainer({ alldata, deleteSnippet, copySnippet, editSnippet }) -
Iterates over the supplied snippet array. - Creates one SnippetCard
for every snippet. - Passes delete, copy, and edit handlers to each
card.

src/components/SnippetCard.jsx

Displays an individual snippet.

Local state - copy --- controls whether the copy icon temporarily
changes to a success icon.

handleCopy() - Copies data.code using the browser Clipboard
API. - Sets the local copy state to true. - Calls the supplied
copySnippet() callback. - Resets the copy state after 2 seconds.

Rendered actions - Copy snippet. - Delete snippet using
deleteSnippet(data.id). - Edit snippet using editSnippet(data). -
Displays language, title, syntax-highlighted code, tags, and favorite
status.

Uses react-syntax-highlighter with the oneDark Prism theme.

src/components/SnippetForm.jsx

Form used to create a snippet.

Local state: FormData Stores: - id - title - language -
code - favorite - tags

Input handlers Each input updates its corresponding property in
FormData.

Submit handler - Prevents the browser's default form submission. -
Calls addSnippet(FormData). - Closes the form using clickFormbtn().

The form supports title, language, tags, favorite status, and code
input.

src/data/languages.js

Static application data.

languages - Array of supported languages/technologies used by the
language selectors.

snippets - Contains sample snippet objects with: - ID - title -
language - code - tags - favorite status

src/index.css

Global Tailwind import and scrollbar utility.

.no-scrollbar - Hides scrollbars while preserving scrolling
behavior.

src/App.css

CSS from the project's UI/template styling.

Contains styles for elements such as .hero, #center, #next-steps,
#docs, #spacer, and .ticks.

## Data Flow

User searches
     ↓
Navbar
     ↓
setSearchText()
     ↓
Dashboard.searchText
     ↓
filteredSearchData
     ↓
SnippetContainer
     ↓
SnippetCard

## Adding a snippet:

SnippetForm
     ↓
addSnippet()
     ↓
AllsnippetData
     ↓
useEffect()
     ↓
localStorage

## Deleting:

SnippetCard
     ↓
deleteSnippet(id)
     ↓
AllsnippetData
     ↓
localStorage


## Storage key:

snippets

The snippet list is serialized with JSON.stringify() and restored with
JSON.parse() when the application starts.