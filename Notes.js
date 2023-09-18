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
      throw new Error("please enter a valid cookie")
    }
  };

  setNote = async (text) => {
    try {
      if (!text) throw new Error("can't send a empty note");
      const { data, status } = await api.post("/create_note",
        { audience: 0, text, _uuid: uuid().toUpperCase() },
        { headers: { "cookie": this.session } }
      );
      return { data, status };
    } catch (error) {
      throw new Error("please enter a valid cookie")
    }
  }
}

module.exports = Notes;
