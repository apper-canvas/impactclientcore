class ActivityService {
  constructor() {
    this.tableName = 'activity_c';
  }

  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch activities:", response.message);
        return [];
      }

      // Transform database fields to match UI expectations
      const transformedActivities = (response.data || []).map(activity => ({
        Id: activity.Id,
        contactId: activity.contact_id_c?.Id || activity.contact_id_c,
        dealId: activity.deal_id_c?.Id || activity.deal_id_c || null,
        type: activity.type_c || 'Call',
        description: activity.description_c || '',
        date: activity.date_c || activity.CreatedOn,
        userId: activity.user_id_c || 'user1'
      }));

      return transformedActivities;
    } catch (error) {
      console.error("Error fetching activities:", error);
      return [];
    }
  }

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "user_id_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }

      const activity = response.data;
      // Transform database fields to match UI expectations
      return {
        Id: activity.Id,
        contactId: activity.contact_id_c?.Id || activity.contact_id_c,
        dealId: activity.deal_id_c?.Id || activity.deal_id_c || null,
        type: activity.type_c || 'Call',
        description: activity.description_c || '',
        date: activity.date_c || activity.CreatedOn,
        userId: activity.user_id_c || 'user1'
      };
    } catch (error) {
      console.error("Error fetching activity by ID:", error);
      return null;
    }
  }

  async create(activityData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${activityData.type || 'Activity'} - ${activityData.description || ''}`.substring(0, 100),
          contact_id_c: parseInt(activityData.contactId),
          deal_id_c: activityData.dealId ? parseInt(activityData.dealId) : null,
          type_c: activityData.type || 'Call',
          description_c: activityData.description || '',
          date_c: activityData.date || new Date().toISOString(),
          user_id_c: activityData.userId || 'user1'
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create activity:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const activity = result.data;
          return {
            Id: activity.Id,
            contactId: activity.contact_id_c?.Id || activity.contact_id_c,
            dealId: activity.deal_id_c?.Id || activity.deal_id_c || null,
            type: activity.type_c || 'Call',
            description: activity.description_c || '',
            date: activity.date_c || activity.CreatedOn,
            userId: activity.user_id_c || 'user1'
          };
        }
      }
      
      throw new Error("Failed to create activity");
    } catch (error) {
      console.error("Error creating activity:", error);
      throw error;
    }
  }

  async update(id, activityData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${activityData.type || 'Activity'} - ${activityData.description || ''}`.substring(0, 100),
          contact_id_c: parseInt(activityData.contactId),
          deal_id_c: activityData.dealId ? parseInt(activityData.dealId) : null,
          type_c: activityData.type || 'Call',
          description_c: activityData.description || '',
          date_c: activityData.date || new Date().toISOString(),
          user_id_c: activityData.userId || 'user1'
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update activity:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const activity = result.data;
          return {
            Id: activity.Id,
            contactId: activity.contact_id_c?.Id || activity.contact_id_c,
            dealId: activity.deal_id_c?.Id || activity.deal_id_c || null,
            type: activity.type_c || 'Call',
            description: activity.description_c || '',
            date: activity.date_c || activity.CreatedOn,
            userId: activity.user_id_c || 'user1'
          };
        }
      }
      
      throw new Error("Failed to update activity");
    } catch (error) {
      console.error("Error updating activity:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to delete activity:", response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw error;
    }
  }
}

export const activityService = new ActivityService();