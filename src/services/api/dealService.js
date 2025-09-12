import dealsData from "@/services/mockData/deals.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DealService {
  constructor() {
    this.deals = [...dealsData];
    this.nextId = Math.max(...this.deals.map(d => d.Id)) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.deals];
  }

  async getById(id) {
    await delay(200);
    const deal = this.deals.find(d => d.Id === id);
    return deal ? { ...deal } : null;
  }

  async create(dealData) {
    await delay(400);
    const newDeal = {
      ...dealData,
      Id: this.nextId++,
      createdAt: new Date().toISOString(),
      contactId: parseInt(dealData.contactId)
    };
    this.deals.unshift(newDeal);
    return { ...newDeal };
  }

  async update(id, dealData) {
    await delay(350);
    const index = this.deals.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    const updatedDeal = {
      ...this.deals[index],
      ...dealData,
      Id: id,
      contactId: parseInt(dealData.contactId)
    };
    
    this.deals[index] = updatedDeal;
    return { ...updatedDeal };
  }

  async delete(id) {
    await delay(250);
    const index = this.deals.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Deal not found");
    }
    
    this.deals.splice(index, 1);
    return true;
  }
}

export const dealService = new DealService();