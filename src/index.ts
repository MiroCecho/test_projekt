import { AuthorizationService } from "./authorization.service";
const auth = new AuthorizationService();
const testBtn = document.getElementById("btTest");
const tokenBtn=document.getElementById("btToken");
const initializeBtn = document.getElementById("btInitialize");

testBtn?.addEventListener("click", () => {
  auth.signIn().then(() => {
    console.log("signed in");
  })
})

initializeBtn?.addEventListener("click", () => {
  auth.initialize().then(() => {
    console.log("initialized");
    auth.getAccessToken().then((token) => {
      console.log(token);
    })
  });
})

tokenBtn?.addEventListener("click", () => { 
  auth.getAccessToken().then((token) => {
    console.log(token);
  })
})