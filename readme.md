# Simple Sauna Reservation System

Simple reservation system for home sauna.
Aimed to practice React/NodeJS, Heroku integration, Clean architecture, JWT, MongoDB

## Description

Simple reservation system, where user can check available sauna session (by datetime), choose preferences and book it
* User is notified via email about new reservation.
* User can check his previous, and upcoming reservations (and cancel them) in User Dashboard
* Admin can create new sessions, remove upcoming sessions and see list of all sessions
* Admin can cancel any future reservations (user is notified via email)
* Admin can send email to users of future reservations

## Getting Started

* git clone project
* touch ./server/.env and fill variables according to ./server/.env.example
* cd ./client && npm run build 
* cd ../server && npm start

### Dependencies

* node, npm

#### TODO
* tests
* frontend css
* refactor hardcoded email texts to db templates
* validation
