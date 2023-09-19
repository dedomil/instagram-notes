// Aditya Yadav - adityayadav@tutanota.com

const uuid = require('uuid').v4;
const api = require("./api");

class Notes {
  constructor(session) {
    if (!session) throw new Error("cookie must be set");
    this.session = session;
  }

  getNotes = async () => {
    try {
      const { data, status } = await api.get("/get_notes",
        { headers: { "cookie": this.session } }
      );
      return { data, status };
    } catch (error) {
      throw new Error(error.toJSON().message)
    }
  };

  createNote = async (text, audience = 0) => {
    try {
      if (!text) throw new Error("can't send a empty note");
      if (![0, 1].includes(parseInt(audience))) throw new Error("audience must be 0 or 1");
      const { data, status } = await api.post("/create_note",
        { audience: parseInt(audience), text, _uuid: uuid() },
        { headers: { "cookie": this.session } }
      );
      return { data, status };
    } catch (error) {
      throw new Error(error.toJSON().message)
    }
  }
}

module.exports = Notes;
