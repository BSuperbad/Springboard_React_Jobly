import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

    /** Authenticate a user by matching username and password */

  static async authenticate(username, password) {
    const data = { username, password };
    const result = await this.request("auth/token", data, "post");
    this.token = result.token;
    return result;
  }

    /** Register a user */

  static async register(user) {
    const result = this.request("auth/register", user, "post");
    this.token = result.token;
    return result;
  }
    /** Update a user */

    static async update(username, user) {
      if (!this.token) {
        throw new Error("Unauthorized: Token not set");
      }
    
      return this.request(`users/${username}`, user, "patch");
    }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a company by handle. */
  static async applyForJob(username, jobId) {
    if (!this.token) {
      throw new Error("Unauthorized: Token not set");
    }

    return this.request(`users/${username}/jobs/${jobId}`, { jobId }, "post");
  }

  
  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

}

export default JoblyApi;
