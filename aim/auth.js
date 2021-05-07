const aimConfig = {
  auth: {
    clientId: 'c52aba40-11fe-4400-90b9-cee5bda2c5aa',
    redirectUri: 'https://aliconnect.nl/graph/',
    redirectUri: 'http://localhost:8080',
  }
};
const aimClient = new aim.PublicClientApplication(aimConfig);

const aimRequest = {
  scopes: [
    'user.read',
    'contact.read',
    // 'mailboxsettings.read',
    // 'calendars.readwrite'
  ]
}

const authProvider = {
  getAccessToken: async () => {
    let account = sessionStorage.getItem('aimAccount');
    if (!account){
      throw new Error(
        'User account missing from session. Please sign out and sign in again.'
      );
    }

    try {
      // First, attempt to get the token silently
      const silentRequest = {
        scopes: aimRequest.scopes,
        account: aimClient.getAccountByUsername(account)
      };
      const silentResult = await aimClient.acquireTokenSilent(silentRequest);
      return silentResult.accessToken;
    } catch (silentError) {
      console.error(silentError);
      // If silent requests fails with InteractionRequiredAuthError,
      // attempt to get the token interactively
      // if (silentError instanceof msal.InteractionRequiredAuthError) {
      //   const interactiveResult = await msalClient.acquireTokenPopup(msalRequest);
      //   return interactiveResult.accessToken;
      // } else {
      //   throw silentError;
      // }
    }
  }
};

const aliconnectClient = Aim.Client.initWithMiddleware({authProvider});

function Obj(data = {}) {
  const self = this;
  this.setData(data);
  ['name'].forEach(propertyName => {
    Object.defineProperty(this, propertyName, {
      get(){
        return {
          toString() {
            return self.data[propertyName].Value;
          },
          get displayValue() {
            return `>>${self.data[propertyName].Value}<<`;
          },
        };
      },
      set(value){
        (self.data[propertyName] = self.data[propertyName] || {}).Value = value;
      }
    });
  })
}
Obj.prototype = {
  setData (data) {
    this.data = data;
  }
}
const a = new Obj({
  name: {
    Value: 'max',
  }
})
a.name = 'Piet';


function updatePage() {
  const user = $(JSON.parse(sessionStorage.getItem('aimUser')));
  console.log(user);
  if (user) {
    $("main").text("").append(
      $("div").text("a:", a.name, a.name.displayValue),
      $("div").text("displayName:", user.displayName),
      $("div").text("mail:", user.mail),
      $("div").text("userPrincipalName:", user.userPrincipalName),
      $("div").text("email:", user.email),
      $("div").text("name:", user.name),
      $("div").text("unique_name:", user.unique_name),
      $("div").text("phone_number:", user.phone_number),
    )
  }
  // account:
  // environment: "login.windows.net"
  // homeAccountId: "f40f8462-da7f-457c-bd8c-d9e5639d2975.09786696-f227-4199-91a0-45783f6c660b"
  // tenantId: "09786696-f227-4199-91a0-45783f6c660b"
  // username: "max.van.kampen@alicon.nl"

}

updatePage();

async function getUser() {
  return await aliconnectClient
  .api('/me')
  // .select('id,displayName,mail,userPrincipalName,mailboxSettings,phone_number')
  .select('id,name,unique_name,displayName,mail,userPrincipalName,mailboxSettings,phone_number')
  // .select('*')
  .get();
}


async function signIn() {
  try {
    const authResult = await aimClient.loginPopup(aimRequest);
    sessionStorage.setItem('aimAccount', authResult.account.preferred_username);
    user = await getUser();
    console.log(user);
    sessionStorage.setItem('aimUser', JSON.stringify(user.data));

    // user = JSON.parse(atob(authResult.id_token.split('.')[1]));
    //
    updatePage();
  } catch (error) {
    console.log(error);
  }

  // $('username').text(user.name || id.email);
  // // console.log(authResult, id.name || id.email);
  // sessionStorage.setItem('id_token', authResult.id_token);
}

function signOut() {
  account = null;
  sessionStorage.removeItem('aimUser');
  aimClient.logout();

  // https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https%3A%2F%2Faliconnect.nl%2Fdev%2Fgraph%2F&client-request-id=b5dce219-2dd1-4fb9-909e-69b544bf500f
}


async function signInCustomer() {
  const authResult = await aimClient.loginPopup({
    scopes: [
      'user.read',
    ]
  });
  console.log(authResult);
}

async function requestDataFromCustomer() {
  const data = await aimClient
  .request()
  .email('max@alicon.nl')
  .sub(265090)
  .scopes([
    'name',
    'email',
  ])
  .select('*')
  .get();
  console.log(data);
}




window.addEventListener('load', async event => {
  return;

  const aliconnectClient = Aim.Client.initWithMiddleware({authProvider});
  console.log(aliconnectClient);

  user = await aliconnectClient
  .api('/me')
  .select('id,displayName')
  .get();
  console.log(user);

  const domainClient = Aim.Client.initWithMiddleware({authProvider, url: 'https://schiphol.aliconnect.nl/api'});
  console.log(domainClient);

  account = await domainClient
  .api('/me')
  .select('id,displayName,mail,userPrincipalName,mailboxSettings')
  .get();
  console.log(account);

  const customerClient = Aim.Client.initWithMiddleware({authProvider, url: 'https://schiphol.aliconnect.nl/api', email: 'max@alicon.nl'});
  console.log(customerClient);

  customer = await domainClient
  .api('/me')
  .select('id,displayName,mail,userPrincipalName,mailboxSettings')
  .get();
  console.log(customer);

});
