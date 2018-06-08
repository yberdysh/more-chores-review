Backend Changes/Tips
 * Make change to notes private params - should be able to accept a user_id param
 * Run your migrations (tables already created)
 * Seed your backend (data exists in seed file)

FrontEnd
* A user should be able to display all their notes- a note should render like
`<div class='note-card'>
<h3> Title </h3>
<p> Body </p>
</div>`
* A user can click on a note title and reveal the full preview of their notes
* A user can create a note which appears on the note list and persists when a page reloads

Routes
* "Get" already existing user notes
  http://localhost:3000/api/v1/notes
* "Post" a new note for a user
  http://localhost:3000/api/v1/notes
  the headers expected are
  {
    Accept: 'applicaton/json',
    'Content-Type': 'application/json'
  }
  the body of the request expects
  {body: 'note body',
  title: 'note title',
  user_id: 1} <-- Important: User id will always be 1
