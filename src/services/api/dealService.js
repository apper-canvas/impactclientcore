class DealService {
  constructor() {
    this.tableName = 'deal_c';
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch deals:", response.message);
        return [];
      }

      // Transform database fields to match UI expectations
      const transformedDeals = (response.data || []).map(deal => ({
        Id: deal.Id,
        title: deal.title_c || '',
        contactId: deal.contact_id_c?.Id || deal.contact_id_c,
        value: parseFloat(deal.value_c) || 0,
        stage: deal.stage_c || 'Lead',
        probability: parseInt(deal.probability_c) || 0,
        expectedCloseDate: deal.expected_close_date_c || null,
        createdAt: deal.created_at_c || deal.CreatedOn,
        notes: deal.notes_c || ''
      }));

      return transformedDeals;
    } catch (error) {
      console.error("Error fetching deals:", error);
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }

      const deal = response.data;
      // Transform database fields to match UI expectations
      return {
        Id: deal.Id,
        title: deal.title_c || '',
        contactId: deal.contact_id_c?.Id || deal.contact_id_c,
        value: parseFloat(deal.value_c) || 0,
        stage: deal.stage_c || 'Lead',
        probability: parseInt(deal.probability_c) || 0,
        expectedCloseDate: deal.expected_close_date_c || null,
        createdAt: deal.created_at_c || deal.CreatedOn,
        notes: deal.notes_c || ''
      };
    } catch (error) {
      console.error("Error fetching deal by ID:", error);
      return null;
    }
  }

  async create(dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: dealData.title || 'Untitled Deal',
          title_c: dealData.title || '',
          contact_id_c: parseInt(dealData.contactId),
          value_c: parseFloat(dealData.value) || 0,
          stage_c: dealData.stage || 'Lead',
          probability_c: parseInt(dealData.probability) || 0,
          expected_close_date_c: dealData.expectedCloseDate ? new Date(dealData.expectedCloseDate).toISOString() : null,
          created_at_c: new Date().toISOString(),
          notes_c: dealData.notes || ''
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create deal:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const deal = result.data;
          return {
            Id: deal.Id,
            title: deal.title_c || '',
            contactId: deal.contact_id_c?.Id || deal.contact_id_c,
            value: parseFloat(deal.value_c) || 0,
            stage: deal.stage_c || 'Lead',
            probability: parseInt(deal.probability_c) || 0,
            expectedCloseDate: deal.expected_close_date_c || null,
            createdAt: deal.created_at_c || deal.CreatedOn,
            notes: deal.notes_c || ''
          };
        }
      }
      
      throw new Error("Failed to create deal");
    } catch (error) {
      console.error("Error creating deal:", error);
      throw error;
    }
  }

  async update(id, dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: dealData.title || 'Untitled Deal',
          title_c: dealData.title || '',
          contact_id_c: parseInt(dealData.contactId),
          value_c: parseFloat(dealData.value) || 0,
          stage_c: dealData.stage || 'Lead',
          probability_c: parseInt(dealData.probability) || 0,
          expected_close_date_c: dealData.expectedCloseDate ? new Date(dealData.expectedCloseDate).toISOString() : null,
          notes_c: dealData.notes || ''
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update deal:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const deal = result.data;
          return {
            Id: deal.Id,
            title: deal.title_c || '',
            contactId: deal.contact_id_c?.Id || deal.contact_id_c,
            value: parseFloat(deal.value_c) || 0,
            stage: deal.stage_c || 'Lead',
            probability: parseInt(deal.probability_c) || 0,
            expectedCloseDate: deal.expected_close_date_c || null,
            createdAt: deal.created_at_c || deal.CreatedOn,
            notes: deal.notes_c || ''
          };
        }
      }
      
      throw new Error("Failed to update deal");
    } catch (error) {
      console.error("Error updating deal:", error);
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
        console.error("Failed to delete deal:", response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      console.error("Error deleting deal:", error);
      throw error;
    }
  }
}

export const dealService = new DealService();