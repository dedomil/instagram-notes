// Aditya Yadav - adityayadav@tutanota.com

const uuid = require('uuid').v4;
const api = require("./api");

class Notes {
  constructor(session) {
    if (!session) throw new Error("cookie must be set");
    this.session = session;
  }
  /**
   * gets all the notes from the direct
   * @returns array of notes from the direct
   */
  getNotes = async () => {
    try {
      const { data: { items } } = await api.get("/get_notes",
        { headers: { "cookie": this.session } }
      );
      return items;
    } catch (error) {
      throw new Error(error.toJSON().message);
    }
  };
  /**
   * create personal note
   * @param {String} text content of the note
   * @param {Number} audience audience who can view, default 0 (followers you follow back), 1 (close friends)
   * @returns created note
   */
  createNote = async (text, audience = 0) => {
    try {
      if (!text) throw new Error("can't send a empty note");
      if (![0, 1].includes(parseInt(audience))) throw new Error("audience must be 0 or 1");
      const { data } = await api.post("/create_note",
        { audience: parseInt(audience), text, _uuid: uuid() },
        { headers: { "cookie": this.session } }
      );
      return data;
    } catch (error) {
      throw new Error(error.toJSON().message);
    }
  }
  /**
   * delete one of your personal notes
   * @param {Number} id id of the note to be deleted
   * @returns a boolean value
   */
  deleteNote = async (id) => {
    try {
      if (!id) throw new Error("note id must be set");
      const { data: { status } } = await api.post("/delete_note",
        { id, _uuid: uuid() },
        { headers: { "cookie": this.session } }
      );
      return status == 'ok';
    } catch (error) {
      throw new Error(error.toJSON().message);
    }
  }
  /**
   * update your notes last seen time
   * @returns a boolean value
   */
  lastSeenUpdateNote = async () => {
    try {
      const { data: { status } } = await api.post("/update_notes_last_seen_timestamp",
        { _uuid: uuid() },
        { headers: { "cookie": this.session } }
      );
      return status == 'ok';
    } catch (error) {
      throw new Error(error.toJSON().message);
    }
  }
}

module.exports = Notes;
