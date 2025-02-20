## Project Authentication using JWT

-  Stateless Authentication approach was chosen for this project and was achieved using JWT Access and Refresh Token.
-  Interceptor in GraphQL and Axios from the FE generate new `Access Token` using `Refresh Token` Validity.
-  `AccessToken` will be alive for 7 minutes and `RefreshToken` will be alive for a 1 day.