function handleCredentialResponse(response){
    const idToken = response.credential;

    try {
        const decodedToken = jwt_decode(idToken);
        // Exemplo de como acessar informações específicas do token
        const issuer = decodedToken.iss;  // Emissor (issuer)
        const clientId = decodedToken.aud;  // Identificador do cliente (client ID)
        console.log('Token Decodificado:', decodedToken);
      
        dataUser = {
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          email:decodedToken.email,
          password: decodedToken.sub
        }
        sendDataToAPI(dataUser)
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
    }

}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "669308203280-vret2qbiprusuncpmnlbsh4fid2f1re5.apps.googleusercontent.com",
    callback: handleCredentialResponse //aqui ele recebe as credenciais do handlecredential
  }); //inicia as configurações do cliente ID

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large",
        type:"standard",
        shape:"rectangular",
        text:"Enter_with",
        locale:"pt-BR",
        logo_alignment:"left"
    }// customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}