# LimeCRM 🍋

<p align="center">
<img src="https://user-images.githubusercontent.com/47941079/132249864-6a56edc9-bcb2-4479-a77f-e9a98654d353.png">

![Licence Badge](https://img.shields.io/github/license/pmihaly/limecrm?style=for-the-badge) ![Website](https://img.shields.io/website?style=for-the-badge&url=https://2389-84-3-31-39.ngrok.io) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/pmihaly/limecrm/CI?style=for-the-badge)

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)

</p>

---

LimeCRM egy képmegosztó szolgáltatás.

## Linkek

- [Kanban táblák](https://github.com/pmihaly/limecrm/projects)
- [Interakatív API doksi](https://2389-84-3-31-39.ngrok.io/api-docs)
- [Production deploy](https://2389-84-3-31-39.ngrok.io)

## Funkciók

- 🐙 Git verziókezelő használata
  - ✨ [Conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/)
- 🌐 HTTPS protokoll és REST elvek követése
- 🪂 Production deployment
- 📝 Jó minőségű dokumentáció
  - JsDoc
  - [Interakatív API doksi](https://2389-84-3-31-39.ngrok.io/api-docs)
- 🧪 Unit tesztek (kliens- és szerveroldal)
- 🐳 Docker és docker-compose használata
- 🤖 CI/CD pipeline
- ✅ ESLint és Prettier használata

## Tech stack

Elvárások szerint Typescript MERN-stack.

### Backend

- [Boilerplate](https://www.npmjs.com/package/typescript-express-starter)
  - MVC struktúra
  - Dockerrel, ESLint+Prettierrel és Unit testinggel jön: csak személyre kell szabni
  - dev és prod npm szkriptek működnek out of the box
- [Multer](https://www.npmjs.com/package/multer): fájlfeltöltés és tárolás

### Frontend

- Create react app 'typescript' template
- [Material UI](https://material-ui.com/): komponenskönyvtár, nem kell CSS-el annyit törődni
  - [Album template](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/album): kiindulási alap

### CI/CD és szerver

- CI/CD: Github actions: github felületén van, mások előre megírt actionjeivel (shimataro/ssh-key-action@v2) időt spórolok
- VPS host:
  1.  Digital Ocean: weboldalamat és emailemet kiszolgáló Debian példány nem bírta el az `npm install` parancsot docker-compose-ban
  2.  Saját szerver: ..., így nekem kellett elővennem az otthoni médiaszerveremet

## Használat

### Telepítés éles használatra

```shell
echo "PORT=3000" > .env
docker-compose up
```

Miután a `client` lebuildelte a react appot, bezárul.
A `server` szolgáltatás a 3000-es porton fut, és kiszolgálja a lebuildelt frontendet.

Következő lépés egy nginx reverse proxy beállítása.

### Fejlesztőkörnyezet előállítása (MongoDB a default porton fusson a háttérben)

```shell
git clone https://github.com/pmihaly/limecrm
cd limecrm
# Szerveroldal beállítása
npm i
cp .env-dev-example .env
mkdir uploads
# Kliensoldal beállítása
cd frontend
npm i
cp .env-dev-example .env
cd ..
# Teljes fejlesztői környezet futtatása
npm run dev
```

MongoDB manuális futtatása (mongohoz nincs OpenRC szolgáltatás)

```shell
sudo /usr/bin/mongod --quiet --config /etc/mongodb.conf
```

## Fájlstruktúra

<!-- tree src/controllers src/dtos src/interfaces src/models src/routes src/services src/tests frontend/src/ -->

```
src/controllers
├── index.controller.ts
└── pictures.controller.ts
src/dtos
└── pictures.dto.ts
src/interfaces
├── db.interface.ts
├── pictureDimensions.interface.ts
├── pictures.interface.ts
└── routes.interface.ts
src/models
└── pictures.model.ts
src/routes
├── index.route.ts
└── pictures.route.ts
src/services
└── pictures.service.ts
src/tests
├── fixtures
│   └── picture.jpg
├── index.test.ts
└── pictures.test.ts
frontend/src/
├── App.tsx
├── components
│   ├── NewPictureCard.tsx
│   ├── NewPictureDialog.tsx
│   └── PictureCard.tsx
├── context
│   └── PicturesContext.ts
├── index.tsx
├── interfaces
│   └── PictureInterface.ts
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
└── tests
    ├── appRenderer.tsx
    ├── App.test.tsx
    └── components
        ├── NewPictureCard.test.tsx
        └── PictureCard.test.tsx

```

## Licenc

LimeCRM
Copyright © 2021 Papp Mihály

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
