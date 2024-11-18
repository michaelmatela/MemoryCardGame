npm version 10.8.2
node version v20.18.0
expo version 6.3.12
react-native version 0.76.2

To run the app:
1.) After pulling from the repo go to MemoryCardGame directory.
2.) run "npm install" to install dependencies.
3.) prepare a running simulator for iOS/Android.
Note: the app was mostly tested on iOS(iPhone 15 simulator).
4.) Run "npm start"
5.)in the cli you can choose between running in android and iOS by pressing "i" key for iOS and "a" key for android.

Gameplay
1.) click the Start Game button to run the game
2.) on the modal you can input 1 - n
Note: N can be millions but good luck finding a pair.
3.) I added an easy mode, Originally this was used for my debugging but on higher "n" I think this will be usefull, since this is togglable I don't find it harmful so I added it as a feature.
4.) on GameOver I added a feature to auto increment the level by 1 in the text input.
5.) for the animation, due to the unlimited potential of the user input, I decided to make it simple as it may cause some issue when too many items we're added in the list.
