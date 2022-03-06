// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

// Importing HomePage explicitly here will disable code splitting for this page.
// Since it's the first page to load, we don't want to wait for page load
import HomePage from 'src/pages/HomePage'
import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" prerender />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
