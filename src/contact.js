class Contact {
  constructor(db) {
    this.collection = db.collection("contacts");
  }
  async addContact(contact) {
    const newContact = await this.collection.insertOne(contact);
    return newContact;
  }
  async findContact(username) {
    const newContact = await this.collection.findOne({ username: username });
    return newContact;
  }
  async sayHello(username) {
    const newContact = await this.collection.updateOne(
      { username: username },
      { $set: { lastContact: new Date() } }
    );
    return newContact;
  }
}
module.exports = Contact;
