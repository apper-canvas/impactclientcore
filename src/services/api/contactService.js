import contactsData from "@/services/mockData/contacts.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
    this.nextId = Math.max(...this.contacts.map(c => c.Id)) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.contacts];
  }

  async getById(id) {
    await delay(200);
    const contact = this.contacts.find(c => c.Id === id);
    return contact ? { ...contact } : null;
  }

  async create(contactData) {
    await delay(400);
    const newContact = {
      ...contactData,
      Id: this.nextId++,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      tags: contactData.tags || []
    };
    this.contacts.unshift(newContact);
    return { ...newContact };
  }

  async update(id, contactData) {
    await delay(350);
    const index = this.contacts.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    const updatedContact = {
      ...this.contacts[index],
      ...contactData,
      Id: id,
      lastActivity: new Date().toISOString()
    };
    
    this.contacts[index] = updatedContact;
    return { ...updatedContact };
  }

  async delete(id) {
    await delay(250);
    const index = this.contacts.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Contact not found");
    }
    
    this.contacts.splice(index, 1);
    return true;
  }
}

export const contactService = new ContactService();