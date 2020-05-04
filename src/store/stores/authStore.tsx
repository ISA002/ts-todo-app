import { postRequest } from "../../agent/";
import commonStore from "./commonStore";
import { observable, action, computed } from "mobx";
import TodosStore from "./todosStore";

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable logIn = false;

  @observable values = {
    username: "",
    password: "",
  };

  @computed get getlogIn() {
    return this.logIn;
  }

  @action setlLogIn(val: boolean) {
    this.logIn = val;
  }

  @action setUsername(username: string) {
    this.values.username = username;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = "";
    this.values.password = "";
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return postRequest("https://muctodo.a6raywa1cher.com/api-auth", {
      username: this.values.username,
      password: this.values.password,
    })
      .then(({ token }: any) => commonStore.setToken(token))
      .catch(
        action((error: any) => {
          console.log("LoginError", error);
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action logout() {
    commonStore.setToken(undefined);
    this.logIn = false;
    return Promise.resolve();
  }
}

export default new AuthStore();
