import React from 'react';
import App from './App.tsx'
import './index.css'
import {createRoot} from "react-dom/client";
import {PaginationProvider} from "./contexts/paginationProvider.tsx";
import {SnackbarProvider} from "./contexts/snackbarProvider.tsx";
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-mzg8hx5d6cmcfq7t.us.auth0.com";
const clientId = "4ylKiEzvi2lo5seSxkcbgAfZO0BZlUyh";
const audience = "http://localhost:8080/snippet-holder";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: audience,
            }}
        >
          <PaginationProvider>
            <SnackbarProvider>
              <App/>
            </SnackbarProvider>
          </PaginationProvider>
        </Auth0Provider>
    </React.StrictMode>,
)
