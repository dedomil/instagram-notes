import axios, { RawAxiosRequestHeaders, Method } from "axios";
import qs from "query-string";
import {
  baseURL,
  defaultHeaders,
  loginURL,
  fetchHeaderURL,
  loginHeaders,
} from "./config.json";

class Note {
  sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = `sessionid=${sessionId}`;
  }

  private static formatCookie(setCookie: string[] | undefined) {
    return setCookie?.map((x) => x.match(/(.*?=.*?);/)?.[1])?.join("; ");
  }

  static async getSessionId(username: string, password: string) {
    const fetchHeaders = (await axios.get(fetchHeaderURL)).headers;
    const cookie = this.formatCookie(fetchHeaders["set-cookie"]) || "";

    const payload = qs.stringify({
      username,
      password: password,
      device_id: crypto.randomUUID(),
      login_attempt_count: 0,
    });

    const { headers } = await axios.post(loginURL, payload, {
      headers: { ...loginHeaders, cookie },
    });

    const sessionIdCookie = headers["set-cookie"]?.find((e) =>
      e.startsWith("sessionid=")
    );

    return sessionIdCookie?.match(/sessionid=([A-Za-z0-9%_]+)/)?.[1] || "";
  }

  async privateRequest(
    method: Method,
    url: string,
    data?: any,
    headers?: RawAxiosRequestHeaders
  ) {
    return await axios.request({
      url,
      method,
      baseURL,
      data,
      headers: {
        ...defaultHeaders,
        ...headers,
        Cookie: this.sessionId,
      },
    });
  }

  async getNotes() {
    const { data } = await this.privateRequest("GET", "get_notes/");
    return data;
  }

  async createNote(text: string, audience: 0 | 1 = 0) {
    const { data } = await this.privateRequest("POST", "create_note/", {
      audience,
      text,
      uuid: crypto.randomUUID(),
    });
    return data;
  }

  async deleteNote(id: string) {
    const { data } = await this.privateRequest("POST", "delete_note/", {
      id,
      uuid: crypto.randomUUID(),
    });
    return data;
  }

  async lastSeenUpdateNote() {
    const { data } = await this.privateRequest(
      "POST",
      "update_notes_last_seen_timestamp/",
      { uuid: crypto.randomUUID() }
    );
    return data;
  }
}

export default Note;
