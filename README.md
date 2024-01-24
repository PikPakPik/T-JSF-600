# IRC Project

## Contexte
Le but de ce projet est de réaliser une application de chat en temps réel avec un système de Cannaux, Message persistant en utilisant Socket.IO.  
Avec pour le côté client la possibilité d'éffectuer plusieurs commandes :  
- **/nick** _nickname_: define the nickname of the user on the server.  
- **/list** _[string]_: list the available channels from the server. If string is specified, only displays  
those whose name contains the string.  
- **/create** _channel_: create a channel with the specified name.  
- **/delete** _channel_: delete the channel with the specified name.  
- **/join** _channel_: join the specified channel.  
- **/quit** _channel_: quit the specified channel.  
- **/users**: list the users currently in the channel.  
- **/msg** _nickname message_: send a private message to the specified nickname.  
- **message**: send a message to all the users on the channel.  

### Obligation
Stack MERN ( MongoDB, Express, React, NodeJS)

### Ports utilisés
**MongoDB** :  
**Backend** :  
**MongoDB**-UI :  
**Frontend** :  

## Installation
```
git clone ............
cd T-JSF-600-NAN_1
docker compose up --build -d
-> http://localhost:5173
```

# Auteurs
Valentin Rgt
Alexandre Tressel
