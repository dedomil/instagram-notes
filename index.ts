import axios, { RawAxiosRequestHeaders, Method } from "axios";
import { baseURL, defaultHeaders, loginURL } from "./config.json";

class Note {
  sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = `sessionid=${sessionId}`;
  }

  async formatCookie(setCookie: string[] | undefined) {
    return setCookie?.map((x) => x.match(/(.*?=.*?);/)?.[1])?.join("; ");
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
