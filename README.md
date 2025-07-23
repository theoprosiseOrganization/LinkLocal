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

## Links
**Project Plan**: [DOCUMENT](https://docs.google.com/document/d/1IzVixf38Zmvk7Wrw93jVC6rlOulZEJLKhD5qWValPNU/edit?tab=t.0#heading=h.6b6nbvhbbspp)
**Wireframes**: [WIREFRAMES](https://app.moqups.com/NHtHEc8z7ygj99jd1jDdcNob7VSv1IwO/view/page/a57f5c842)

**Demo Presentation**: [SLIDES](https://docs.google.com/presentation/d/1-d_dzQ2Jr7Bj0cFU70FiyQVNiokMrXLvuXzCz1Z3QKM/edit?usp=sharing)
**Recommendation System Flowchart**: [CHART](https://www.mermaidchart.com/app/projects/d6594cbc-d7bf-408c-ab1d-d1f3481dc4d9/diagrams/0da7cc2d-f788-4109-bb42-cae1bb6c2325/version/v0.1/edit)

**Location Data Storage Plan**: [PLAN](https://docs.google.com/document/d/1kYD2qAJxblI4sDbYJ-tGkQkwn-RBuUe2Jvc0n-PV5vs/edit?usp=sharing)

## Demo Video
[CREATED WEEK 9](<insert link in Week 9!>)

## Requirements

## Cursor Interaction

Upon hovering over the user location, [the cursor changes and shows a tooltip.](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/MapComponent/UserLocationMarker.jsx#L43)
![GIF of hover interaction](/images/ScreenRecording2025-07-22at1.15.09PM-ezgif.com-video-to-gif-converter.gif)

## Complex Visual Styling

A component with advanced visual styling is the [PeopleGrid component](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/FriendsPage/PeopleGrid.jsx). This component is utilized on multiple pages to view a grid of users. It dynamically displays the information for multiple users in a pleasing and efficient manner. It uses [CSS styling](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/ProfilePage/ProfilePage.css) consistent with the rest of the site.
![GIF of people grid](/images/peopleGridGIF.gif)
## Loading State

When uploading images to an event plan, a [loading alert is set](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/CreateEventPage/CreateEventPage.jsx#L372) while S3 receives the images.
![GIF of image upload loading](/images/imageUpload.gif)
## Multiple Views

The app has multiple pages with different views, here are some examples:

Home Page:
![Home Page](/images/homepage.png)

Create Plan:
![Create Plan](/images/eventplan.png)

View Plan:
![Home Page](/images/viewplan.png)

Friends Page:
![Friends Page](/images/suggested.png)

View User:
![User Page](/images/user.png)

View Event:
![Event Page](/images/viewevent.png)





## User Authentication

The app allows users to create accounts, [sign in](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/SignInPage/SignInPage.jsx), [sign out](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/SignUpPage/SignUpPage.jsx), and stay authenticated with [Express session management](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/backend/src/controllers/authController.js).

Here are images of the sign in and sign up screens:

![Sign In](/images/login.png)
![Sign Up](/images/signup.png)

## Database Integration

This site uses supabase to host a Postgres server with a PostGIS extension to allow for efficient querying of geospatial data.
Images are hosted on AWS S3.

![Supabase Schema](/images/supabaseDb.png)

## API Integration

This site uses [Google Maps API](https://developers.google.com/maps) for [routing](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/backend/src/controllers/eventController.js#L342), [map display](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/MapComponent/MapComponent.jsx), and [location lookups](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/components/LocationAutocomplete/LocationAutocomplete.jsx). It uses [OpenWeather API](https://openweathermap.org/) to [query weather data](https://github.com/theoprosiseOrganization/LinkLocal/blob/main/src/frontend/frontend/src/api.js#L527) for event planning.