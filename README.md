# IRC Chat

IRC Chat est une application de messagerie en temps réel avec la possiblité de créer des cannaux et d'envoyer des messages privées  
Documentation Socket.IO & API : https://irc-docs.atressel.dev/

## Features
- Création/Supréssion/Modification de cannaux
- Rejoindre des cannaux
- Affichage d'un message lorsque un utilisateur rejoint le cannal
- Modification de son propre nom

## Commandes 
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
- **MongoDB** : 27017  
- **Backend** : 3000  
- **MongoDB**-UI : 4321  
- **Frontend** : 3001  

## Get started
```
git clone git@github.com:EpitechMscProPromo2026/T-JSF-600-NAN_1.git
cd T-JSF-600-NAN_1
docker compose up --build -d
-> http://localhost:5173
```

## Membres du Projet
| Nom | Rôle |
|----------|:-------------:|
| Valentin Rgt | Backend | 
| Alexandre Tressel | Frontend | 

## Screenshots
_soon_


