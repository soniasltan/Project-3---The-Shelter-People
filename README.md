# Project 3: The Shelter People

Animal Shelter Website for TheShelterPeople.

<!-- ##### ============Website:  ================ -->

## Description
We want to create a useful app that would be of help for the shelter volunteers (volunteer group at Animal Lodge @ sungei tengah).

-	Helping the shelter volunteers to organise their animal details list -  keep track of the cats inside? Name, cage, description, photo, gender, adoptable
-	App is meant to raise awareness about the cats + showcase the cats

Suggested pages:
1.	Nav bar: Home/Cats/Contact/About/Login
2.	Home page A short intro about the shelter, the location of the shelter, + layout of the cages
3.	Cats page: displays the cats (name, cage, image, description, adoptable, gender) and filter for adoption
4.	Contact Page: Link to theshelterpeople’s insta? @theshelterpeople_sg + address + map 
5.	About page: Explain more about the team behind the website, i.e. GA SEI-32 Group + TheShelterPeople?
6.	Login Page for: 
a.	Admin: login page for admin to edit/add/delete pages (cats+blog). Only admin can do so, we don’t want people from outside meddling with the pages and cat list

### Technology Used

```
- Mongo
- Express
- React
- React Router
- NodeJS
```
### MVP
User-facing page showing cats + about + contact info (no authentication required to view)
Authenticated login for admins
Separate views to add/delete animal details

### Wireframes
<img src="./drawio/wireframe1.JPG"/>
<img src="./drawio/wireframe2.JPG"/>
<img src="./drawio/wireframe3.JPG"/>

### User Stories

There will be 2 main groups of users: Admin and Guest.
Admin users are the shelter people volunteers and they are able to create/read/update/delete the cats.
Guest users are just browsing the website and they can either be logged in or not.
Guest users that are logged in can add comments.

```
To use the app, user should:

- Select "cats" from the navbar
- View all the cats at a glance
- Click on a particular cat to see specific details about the cat
- User can register an account and login to add comments
- CRUD features for Admin users only
- Users can refer to other pages on navbar (Home/About/Contact) too

```

---

### General Approach / Problem-Solving Strategy
Our plan is to have 3 models: cats, comments, and users.
Cats model (for CRUD): id, name, cage, image, description, adoptable, gender.
Comments model: id, user id, text, cat id, timestamp.
User model: id, username, email, password, role.


### Unsolved problems

Unsolved problems here...

## Installation instructions for dependencies
<!-- Fill up as the project goes along... -->
npm installation
- Express
- bcrypt
- mongoose

---