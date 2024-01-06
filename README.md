
# Coffee Culture

Ecommerce Project on icp



## Run Locally

1. Clone the project

```bash
 
```

2. Go to the project directory

```bash
  cd coffee-culture
```

3. Install dependencies

```bash
  npm install
```

4. Start the dfx

```bash
  dfx start --clean --background
```

5. Generate Candid definitions

```bash
  dfx generate
```

6. Copy the generated files into the .dfx/local directory

```bash
  cp src/declarations/backend/* .dfx/local/canisters/backend/
```

7. Deploy the project

```bash
dfx deploy
```
```bash
  dfx deploy --network ic
```

* all commands
```bash
  dfx generate
  cp src/declarations/backend/* .dfx/local/canisters/backend/
  dfx deploy
  dfx deploy --network ic
```



BACKEND:-
Navigate to the backend canister to view the Candid UI

```bash
  http://127.0.0.1:4943/?canisterId=<canister-id>&id=<candid_ui_canister-id>
```

such as:

```bash
    http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&id=bd3sg-teaaa-aaaaa-qaaba-cai
```



FRONTEND:-
Start the local development server for the frontend

```bash
  npm run dev
```

Navigate to the frontend canister to view the React frontend

```bash
  http://127.0.0.1:4943/?canisterId=<canister-id>
```

such as:

```bash
  http://127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai
```


DFX SERVER STOP:-
Stop the dfx(optional) 

```bash
  dfx stop
```







