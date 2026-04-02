install:
    npm install --prefix backend
    npm install --prefix frontend

run: install
    npm run dev --prefix backend &
    npm run dev --prefix frontend -- --host