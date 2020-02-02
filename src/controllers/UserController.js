import httpClient from './HttpClient';
import axios from 'axios';
import Url from '../helpers/Url';

class UserController {
  constructor() {
    this.basePath = Url;
  }

  login = async (user, password) => {
  // Real implementation of a login request using the HttpClient
  return new Promise((resolve, reject) => {
    console.log(this.basePath);
    axios.get(`${this.basePath}/login`, {
      params: {
        user: user,
        pass: password
      },
      method: 'GET'
    }).then((result) => {
      console.log("!!!!");
      console.log(result.data);
      if(result.status !== 200) {
        reject(Error('Invalid Email/Password'));
      }
      if ('error' in result.data) {
        reject(Error('Invalid Email/Password'));
      }
      result.data.name = user;
      console.log(result.data);
      resolve(result.data);
      // Data is the object exposes by axios for the response json
    }).catch((error) => {
      console.log(error);
      reject(new Error(error));
    });
  });
    // // This is a mocked example to simulate api behavior
    // new Promise((resolve, reject) => {
    //   if (email !== 'a@a.com' && password !== '') {
    //     setTimeout(
    //       () => resolve({ name: 'Jorge' }),
    //       1000,
    //     );
    //   } else {
    //     setTimeout(
    //       () => reject(new Error('Invalid Email/Password')),
    //       1000,
    //     );
    //   }
    // });
  }

  logout = async (id) => {
    // Real implementation of a login request using the HttpClient
    return new Promise((resolve, reject) => {
      console.log(id);
      axios.get(`${this.basePath}/logout`, {
        params: {
          id: id
        },
        method: 'GET'
      }).then((result) => {
        console.log("!!!!");
        console.log(result.data);
        if(result.status !== 200) {
          reject(Error('Something went wrong'));
        }
        // Data is the object exposes by axios for the response json
      }).catch((error) => {
        console.log(error);
        reject(new Error(error));
      });
    });
  }
}

export default new UserController();
