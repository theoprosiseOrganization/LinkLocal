# LinkLocal
Repository for capstone project. Geospatial social media for everyone.

[Project Planning Doc](https://docs.google.com/document/d/1IzVixf38Zmvk7Wrw93jVC6rlOulZEJLKhD5qWValPNU/edit?usp=sharing)

# Overview

**People Connection** is a web application designed to facilitate connections and activities among friends when they are geographically close. It uses geolocation and mapping technology to notify users when friends are nearby, enabling them to plan activities and meetups. The app addresses the challenge of coordinating spontaneous meetups and activities among friends who are in close proximity but may not be aware of each other's presence, as well as allows users in new areas to have the knowledge of an experienced local.

- **Category:** Social Networking  
- **Story:** Users sign up and create profiles. The app notifies them when friends are nearby, allowing them to view and join activities. Users can also create and share their own activities, connect with local guides, and participate in community discussions.  
- **Market:** Social individuals who enjoy spontaneous meetups and activities, likely targeting young adults who are tech-savvy and socially active.  
- **Habit:** The app is designed for frequent use, potentially daily, as users check for nearby friends and activities, plan meetups, and engage with community content.  
- **Scope:** Initially, the app focuses on geolocation-based social networking, including media posting and sharing by users. It may expand to include more advanced features like AI-driven recommendations and business partnerships.

---

# Product Spec

Based on the app description, this section goes into more detail about what the app should do, and what functionalities it must provide to the users.

---

# User Stories

User stories are actions that the user should be able to perform in your app.

First, focus and identify functionality that is required for your **MVP (Minimum Viable Product)** that conforms to all the project requirements and expectations. Make sure your technical challenges are part of your MVP.

You should also identify optional / nice-to-have functionalities that would be done as stretch goals during MU Week 8 and 9. Remember, technical challenges should **not** be optional features; they must be code complete before the end of Week 8!

---

## User Roles:

- **“tourist”**: a user who is looking for activities in a new area  
- **“friend”**: a user who is meeting with connections in an area

---

## Required

- User can create an account  
- User can sign up with email and password  
- User can verify their email address  
- User data - including personal information and events - stored in PostgreSQL DB  
- User can login  
- User can log in with their email and password  
- User can stay logged in across sessions  
- User can view a map of nearby activities and users  
- User can see a map view of activities and users in their area  
- User can zoom in and out of the map to explore different areas  
- Get directions and accurate map - Google Maps API  
- User can search for specific activities or locations  
- User can enter keywords to search for activities or locations  
- User can filter search results by distance, category, or rating  
- User can create and upload activity listings  
- User can create a new activity listing with description, images, and tags  
- User can upload activity listings to the platform  
- User can view activities  
- User can view details of an activity, including description, location, and time  
- User can connect with friends and see their activities  
- User can add friends to their network  
- User can see their friends' activities  
- User can receive push notifications when friends are nearby or enter an area  
- User can customize notification settings and preferences  
- User can view their profile and activity history  
- User can see their profile information, including name, email, and activity history  
- User can edit their profile information

---

## Optional

- User can integrate with popular social media platforms  
- User can share activity listings and connect with friends on social media platforms  
- User can use social media APIs to fetch user data and improve recommendations  
- User can pay/subscribe to locals for exclusive events  
- User can purchase subscriptions to access exclusive events and activities  
- User can partner with local businesses to offer premium experiences  
- Businesses can post activities in their area  
- Businesses can create activity listings and promote their services  
- Businesses can implement a review system to ensure high-quality business listings  
- User can chat with friends and plan activities using text input  
- User can develop a conversational AI chatbot  
- User can enable users to plan trips and activities using text input  
- User can see personalized recommendations based on their interests and location  
- User can develop a recommendation engine using collaborative filtering or content-based filtering  
- User can suggest activities based on user interests, location, and past interactions

---

# Screen Archetypes

- **Home Page:**  
  - Map list of nearby people  
  - Big button to encourage users to create event  
  - Friends nearby notification
 ![Home Page](./images/home.png)

- **Suggested Page:**  
  - Grid or carousel showcasing 3–4 suggested events/friends with images, titles, and brief descriptions
  ![Suggested Page](./images/suggested.png)

- **Create Event Page:**  
  - Form to input details — name, date, time, location, and description
 ![Create Event Page](./images/createEvent.png)

- **Profile Page:**  
  - User information — editable  
  - List of all user-created events and friends list
 ![Profile Page](./images/profile.png)

- **Friends Page:**  
  - List of friends
  - Search form to find new friends
  ![Friends Page](./images/friends.png)


- **Event Page:**  
  - Detailed view of a certain event  
  - Many use cases and highly modular
  ![Event Page](./images/event.png)

---

# Data Model
=====================

### Users Table

| Field Name | Description |
| --- | --- |
| ID | Unique identifier for each user. |
| Name | Store the user's name. |
| Email | For login |
| Password | Hashed and salted for security |
| Avatar | URL or binary data for the user's profile picture. |
| Location (GeoJSON) | Current or default location of the user, which can be used for map features. |
| Friends (ID) | Store friend relationships using IDs, possibly in a separate table to handle many-to-many relationships. |
| Preferences Data | Useful for personalizing user experiences, such as suggesting events. |
| Events (ID) | Store event IDs that the user has created or is interested in. This could also be managed in a separate table to handle many-to-many relationships. |
| Liked Events (ID) | Store event IDs that the user has liked. |

### Events Table

| Field Name | Description |
| --- | --- |
| ID | Unique identifier for each event. |
| User who posted (ID) | Reference to the user ID who created the event. |
| Images | URLs or binary data for event images. |
| Text Description | Detailed description of the event. |
| GeoJSON Data | Store location data in GeoJSON format for easy integration with mapping services. |
| Likes (ID) | Store user ID for users who have liked this specific event.

---

# Users Endpoints


#### GET /users

* Retrieves a list of all users.
* Expected parameters: None
* Returns: JSON array of user objects

#### GET /users/:id

* Retrieves a single user by ID.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: JSON user object

#### POST /users

* Creates a new user.
* Expected parameters:
	+ name: User's name
	+ email: User's email
	+ password: User's password (hashed and salted)
	+ avatar: URL or binary data for the user's profile picture
	+ location: GeoJSON data for the user's current or default location
* Returns: JSON user object with generated ID

#### PUT /users/:id

* Updates an existing user.
* Expected parameters:
	+ id: Unique identifier for the user
	+ name: Updated user's name
	+ email: Updated user's email
	+ password: Updated user's password (hashed and salted)
	+ avatar: Updated URL or binary data for the user's profile picture
	+ location: Updated GeoJSON data for the user's current or default location
* Returns: JSON user object with updated fields

#### DELETE /users/:id

* Deletes a user by ID.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: Success message

#### GET /users/:id/friends

* Retrieves a list of friends for a user.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: JSON array of friend objects

#### POST /users/:id/friends

* Adds a new friend to a user's friends list.
* Expected parameters:
	+ id: Unique identifier for the user
	+ friend_id: Unique identifier for the friend to add
* Returns: JSON friend object with added relationship

#### DELETE /users/:id/friends/:friend_id

* Removes a friend from a user's friends list.
* Expected parameters:
	+ id: Unique identifier for the user
	+ friend_id: Unique identifier for the friend to remove
* Returns: Success message

#### GET /users/:id/preferences

* Retrieves a user's preferences data.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: JSON preferences object

#### PUT /users/:id/preferences

* Updates a user's preferences data.
* Expected parameters:
	+ id: Unique identifier for the user
	+ preferences_data: Updated preferences data
* Returns: JSON preferences object with updated fields

#### GET /users/:id/events

* Retrieves a list of events created or interested in by a user.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: JSON array of event objects

#### POST /users/:id/events

* Creates a new event for a user.
* Expected parameters:
	+ id: Unique identifier for the user
	+ event_data: Event data (see Events Endpoints)
* Returns: JSON event object with generated ID

#### GET /users/:id/liked_events

* Retrieves a list of events liked by a user.
* Expected parameters:
	+ id: Unique identifier for the user
* Returns: JSON array of event objects

#### POST /users/:id/liked_events

* Likes an event for a user.
* Expected parameters:
	+ id: Unique identifier for the user
	+ event_id: Unique identifier for the event to like
* Returns: JSON event object with added like relationship

#### DELETE /users/:id/likedevents/:eventid

* Unlikes an event for a user.
* Expected parameters:
---

# Database

- **PostgreSQL** with **PostGIS** for geospatial queries and map-based functionalities

---

# API

- **Google Maps API** for map rendering, directions, and geocoding

---

# Backend

- **Express.js** and **Node.js**
