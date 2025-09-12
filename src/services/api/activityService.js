import activitiesData from "@/services/mockData/activities.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ActivityService {
  constructor() {
    this.activities = [...activitiesData];
    this.nextId = Math.max(...this.activities.map(a => a.Id)) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.activities];
  }

  async getById(id) {
    await delay(200);
    const activity = this.activities.find(a => a.Id === id);
    return activity ? { ...activity } : null;
  }

  async create(activityData) {
    await delay(400);
    const newActivity = {
      ...activityData,
      Id: this.nextId++,
      userId: "user1",
      contactId: parseInt(activityData.contactId),
      dealId: activityData.dealId ? parseInt(activityData.dealId) : null
    };
    this.activities.unshift(newActivity);
    return { ...newActivity };
  }

  async update(id, activityData) {
    await delay(350);
    const index = this.activities.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    const updatedActivity = {
      ...this.activities[index],
      ...activityData,
      Id: id,
      contactId: parseInt(activityData.contactId),
      dealId: activityData.dealId ? parseInt(activityData.dealId) : null
    };
    
    this.activities[index] = updatedActivity;
    return { ...updatedActivity };
  }

  async delete(id) {
    await delay(250);
    const index = this.activities.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    
    this.activities.splice(index, 1);
    return true;
  }
}

export const activityService = new ActivityService();