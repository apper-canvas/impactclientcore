class ContactService {
  constructor() {
    this.tableName = 'contact_c';
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to fetch contacts:", response.message);
        return [];
      }

      // Transform database fields to match UI expectations
      const transformedContacts = (response.data || []).map(contact => ({
        Id: contact.Id,
        firstName: contact.first_name_c || '',
        lastName: contact.last_name_c || '',
        email: contact.email_c || '',
        phone: contact.phone_c || '',
        company: contact.company_c || '',
        status: contact.status_c || 'Lead',
        tags: contact.tags_c ? contact.tags_c.split(',') : [],
        createdAt: contact.created_at_c || contact.CreatedOn,
        lastActivity: contact.last_activity_c || contact.ModifiedOn
      }));

      return transformedContacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "tags_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }

      const contact = response.data;
      // Transform database fields to match UI expectations
      return {
        Id: contact.Id,
        firstName: contact.first_name_c || '',
        lastName: contact.last_name_c || '',
        email: contact.email_c || '',
        phone: contact.phone_c || '',
        company: contact.company_c || '',
        status: contact.status_c || 'Lead',
        tags: contact.tags_c ? contact.tags_c.split(',') : [],
        createdAt: contact.created_at_c || contact.CreatedOn,
        lastActivity: contact.last_activity_c || contact.ModifiedOn
      };
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
      return null;
    }
  }

  async create(contactData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${contactData.firstName} ${contactData.lastName}`.trim(),
          first_name_c: contactData.firstName || '',
          last_name_c: contactData.lastName || '',
          email_c: contactData.email || '',
          phone_c: contactData.phone || '',
          company_c: contactData.company || '',
          status_c: contactData.status || 'Lead',
          tags_c: contactData.tags ? contactData.tags.join(',') : '',
          created_at_c: new Date().toISOString(),
          last_activity_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to create contact:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const contact = result.data;
          return {
            Id: contact.Id,
            firstName: contact.first_name_c || '',
            lastName: contact.last_name_c || '',
            email: contact.email_c || '',
            phone: contact.phone_c || '',
            company: contact.company_c || '',
            status: contact.status_c || 'Lead',
            tags: contact.tags_c ? contact.tags_c.split(',') : [],
            createdAt: contact.created_at_c || contact.CreatedOn,
            lastActivity: contact.last_activity_c || contact.ModifiedOn
          };
        }
      }
      
      throw new Error("Failed to create contact");
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async update(id, contactData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${contactData.firstName} ${contactData.lastName}`.trim(),
          first_name_c: contactData.firstName || '',
          last_name_c: contactData.lastName || '',
          email_c: contactData.email || '',
          phone_c: contactData.phone || '',
          company_c: contactData.company || '',
          status_c: contactData.status || 'Lead',
          tags_c: contactData.tags ? contactData.tags.join(',') : '',
          last_activity_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error("Failed to update contact:", response.message);
        throw new Error(response.message);
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success && result.data) {
          const contact = result.data;
          return {
            Id: contact.Id,
            firstName: contact.first_name_c || '',
            lastName: contact.last_name_c || '',
            email: contact.email_c || '',
            phone: contact.phone_c || '',
            company: contact.company_c || '',
            status: contact.status_c || 'Lead',
            tags: contact.tags_c ? contact.tags_c.split(',') : [],
            createdAt: contact.created_at_c || contact.CreatedOn,
            lastActivity: contact.last_activity_c || contact.ModifiedOn
          };
        }
      }
      
      throw new Error("Failed to update contact");
    } catch (error) {
      console.error("Error updating contact:", error);
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
        console.error("Failed to delete contact:", response.message);
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  }
}

export const contactService = new ContactService();