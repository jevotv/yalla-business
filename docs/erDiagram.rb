erDiagram
    %% Core Tenant Structure
    tenants ||--o{ users : has
    tenants ||--o{ contacts : contains
    tenants ||--o{ categories : manages
    tenants ||--o{ products : owns
    tenants ||--o{ orders : processes
    tenants ||--o{ payments : records
    tenants ||--o{ returns : handles
    tenants ||--o{ treasury_transactions : tracks
    tenants ||--o{ tenant_subscriptions : bills
    tenants ||--o{ user_settings : configures
    tenants ||--o{ audit_logs : monitors
    tenants ||--o{ api_keys : authenticates
    tenants ||--o{ notifications : sends
    tenants ||--o{ file_uploads : stores
    
    %% Core Entities with relationships
    tenants {
        uuid id PK
        varchar company_name
        varchar business_type
        varchar industry
        varchar country
        varchar timezone
        json settings
        enum status
        timestamp created_at
        timestamp updated_at
    }
    
    users {
        uuid id PK
        uuid tenant_id FK
        varchar email
        varchar password_hash
        varchar first_name
        varchar last_name
        varchar role
        json permissions
        enum status
        timestamp created_at
        timestamp updated_at
    }
    
    contacts {
        uuid id PK
        uuid tenant_id FK
        varchar name
        varchar email
        varchar phone
        enum type
        enum tier
        decimal max_debt
        json custom_fields
        enum status
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    categories {
        uuid id PK
        uuid tenant_id FK
        varchar name
        uuid parent_id FK
        integer sort_order
        enum status
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    categories ||--o{ categories : parent_child
    
    products {
        uuid id PK
        uuid tenant_id FK
        uuid category_id FK
        varchar name
        varchar sku
        varchar barcode
        enum unit
        decimal cost_price
        decimal sale_price
        decimal current_stock
        decimal low_stock_threshold
        json images
        json custom_fields
        enum status
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    products ||--o{ order_items : sold_in
    products ||--o{ return_items : returned_as
    products ||--o{ inventory_movements : moved
    categories ||--o{ products : categorizes
    
    %% Order Management
    orders {
        uuid id PK
        uuid tenant_id FK
        uuid contact_id FK
        enum order_type
        enum status
        decimal subtotal
        decimal tax_amount
        decimal total_amount
        json custom_fields
        date order_date
        uuid created_by FK
        uuid assigned_to FK
        timestamp created_at
        timestamp updated_at
    }
    
    contacts ||--o{ orders : places
    orders ||--o{ order_items : contains
    orders ||--o{ payments : has
    orders ||--o{ returns : generates
    orders ||--o{ treasury_transactions : relates_to
    
    order_items {
        uuid id PK
        uuid tenant_id FK
        uuid order_id FK
        uuid product_id FK
        decimal quantity_ordered
        decimal unit_price
        decimal total_price
        json serial_numbers
        timestamp created_at
    }
    
    %% Payment Management
    payments {
        uuid id PK
        uuid tenant_id FK
        uuid contact_id FK
        uuid order_id FK
        decimal amount
        enum payment_method
        enum status
        json metadata
        timestamp payment_date
        timestamp created_at
        timestamp updated_at
    }
    
    %% Returns Management
    returns {
        uuid id PK
        uuid tenant_id FK
        uuid order_id FK
        uuid contact_id FK
        enum return_type
        enum status
        decimal total_amount
        text reason
        date return_date
        uuid created_by FK
        uuid approved_by FK
        timestamp created_at
        timestamp updated_at
    }
    
    returns ||--o{ return_items : includes
    return_items {
        uuid id PK
        uuid tenant_id FK
        uuid return_id FK
        uuid order_item_id FK
        uuid product_id FK
        decimal quantity_returned
        decimal unit_price
        decimal total_amount
        enum condition
        timestamp created_at
    }
    
    order_items ||--o{ return_items : returned_from
    
    %% Treasury & Inventory
    treasury_transactions {
        uuid id PK
        uuid tenant_id FK
        varchar transaction_number
        enum transaction_type
        enum category
        decimal amount
        uuid contact_id FK
        uuid order_id FK
        enum account_type
        enum payment_method
        timestamp transaction_date
        timestamp created_at
        timestamp updated_at
    }
    
    inventory_movements {
        uuid id PK
        uuid tenant_id FK
        uuid product_id FK
        enum movement_type
        decimal quantity
        enum reference_type
        uuid reference_id FK
        timestamp movement_date
        uuid created_by FK
        timestamp created_at
    }
    
    %% System Management
    user_settings {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        varchar setting_key
        text setting_value
        enum setting_type
        boolean is_system
        enum scope
        timestamp created_at
        timestamp updated_at
    }
    
    audit_logs {
        uuid id PK
        uuid tenant_id FK
        varchar entity_type
        uuid entity_id
        enum action
        json old_values
        json new_values
        uuid user_id FK
        text change_reason
        enum risk_level
        timestamp timestamp
    }
    
    tenant_subscriptions {
        uuid id PK
        uuid tenant_id FK
        varchar plan_name
        enum plan_type
        enum billing_cycle
        decimal amount
        date start_date
        date end_date
        enum status
        json features
        json limits
        timestamp created_at
        timestamp updated_at
    }
    
    api_keys {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        varchar key_name
        varchar key_hash
        varchar key_prefix
        json permissions
        integer rate_limit
        timestamp expires_at
        enum status
        timestamp created_at
        timestamp updated_at
    }
    
    notifications {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        enum type
        varchar title
        text message
        json data
        enum priority
        varchar action_url
        timestamp read_at
        timestamp created_at
    }
    
    file_uploads {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        varchar original_filename
        varchar file_path
        varchar mime_type
        bigint file_size
        varchar entity_type
        uuid entity_id
        varchar purpose
        boolean is_public
        timestamp created_at
        timestamp updated_at
    }
    
    %% User relationships
    users ||--o{ contacts : creates
    users ||--o{ categories : creates
    users ||--o{ products : creates
    users ||--o{ orders : creates
    users ||--o{ orders : assigned_to
    users ||--o{ payments : creates
    users ||--o{ returns : creates
    users ||--o{ returns : approves
    users ||--o{ inventory_movements : creates
    users ||--o{ user_settings : owns
    users ||--o{ api_keys : creates
    users ||--o{ file_uploads : uploads
    users ||--o{ audit_logs : performed_by
    users ||--o{ notifications : receives