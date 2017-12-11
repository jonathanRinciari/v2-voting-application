** Setup **

** Change Enviornmental Keys for Authorization ID, Secret, Callback, and MongoDB **

** Fix Routes & add stuff if we want to retrieve more from the authorization query **

** Update Models if needed**

**change github remote by using git remote set-url origin url**

**add .gitignore & .env to that ignore**


Voting Application ToDo List

-Home page route
   ``-for not logged in users
       `` -See a note about signing up
        ``-list of polls from all users
        ``-click on polls
        ``-read about polls
        ``-view all polls 
        ``-login instead of being able to vote
    ``-for users logged in
        ``-navbar says
            ``-create new poll
            ``-view my polls
``-create new poll
    ``-can only be logged in
    ``-title of poll
    ``-description of poll
    ``-options comma seperated
    ``-submit button
    ``-hides options to vote when not logged in, but will show results
  -view user polls
      -shows user their created polls
        ``-functionality
        -design
      -delete user poll 
        ``-functionality
        -design
``-add middleware to make sure user is logged in for a bunch of routes
    ``-myviews page
    ``-post id
-Set up flash handinling for errors
