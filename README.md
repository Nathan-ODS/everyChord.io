# [EveryChord.io](https://everychord-io.onrender.com/)
<img width="1436" alt="image" src="https://github.com/Nathan-ODS/everyChord.io/assets/114931186/d0b04904-9b12-4ea6-be5c-71c0849f79ac">

- This app will display an interactive menu chord with a piano to learn how to play them ! 🎹
You can :
- search for a chord and change roots using the interactive chord wheel 👍
- learn and hear the chord you chose and learn how to play it on the menu and piano 🎹 🎶
- (you might have to wait a bit and refresh the page when accessing the web app 😞 _i'm using a free host_)

# For the Devs (and curious ones)
- `/server` is the express server (backend) used for storing and computing the chords and notes played 🧠 🏭
- `/client` is the React app (frontend) uses the `server` to get the chords and notes and display them to the user 👨‍🎓 🎹 🎵
- The proxy is used to resolve Same-Origin Policy and HTTP access control (CORS) issues. (see client/package.json)

# Installation
- `npm install` _this will install everything needed for the client and the server_
- you might want to have two terminals for this:
  -  **client** terminal: `cd client && npm start`
  -  **server** terminal: `cd server && npm start`

# Build
- `npm install`
- `npm run build` _this will build the React client_
- `npm run start:prod` _this will make the node server use this build_

# Handy stuffed used 🙏 🫂
- [Piano React Component](https://www.kevinqi.com/react-piano/)
- [sampler](https://github.com/danigb/smplr)
- [midi-note](https://www.npmjs.com/package/midi-note?activeTab=readme) [source](https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies)
