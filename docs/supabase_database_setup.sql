-- ============================================================================
-- Business Management Application Database Setup for Supabase PostgreSQL
-- ============================================================================
-- This script creates the complete database schema for the multi-tenant
-- business management application with all tables, constraints, indexes,
-- and support for internationalization (Arabic/English).
-- 
-- Compatible with: Supabase PostgreSQL 15+
-- Last Updated: 2025-11-05
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable necessary extensions for JSON operations
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- CUSTOM ENUM TYPES
-- ============================================================================

-- Order and payment enums
CREATE TYPE order_type_enum AS ENUM ('sales', 'purchase');
CREATE TYPE order_status_enum AS ENUM ('draft', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'approved', 'received');
CREATE TYPE order_priority_enum AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE payment_type_enum AS ENUM ('receipt', 'payment');
CREATE TYPE payment_method_enum AS ENUM ('cash', 'credit_card', 'debit_card', 'bank_transfer', 'check', 'paypal', 'stripe', 'other');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- Contact and product enums
CREATE TYPE contact_type_enum AS ENUM ('customer', 'vendor');
CREATE TYPE contact_tier_enum AS ENUM ('bronze', 'silver', 'gold');
CREATE TYPE contact_status_enum AS ENUM ('active', 'inactive', 'suspended');

CREATE TYPE product_unit_enum AS ENUM ('piece', 'kg', 'meter', 'liter', 'box', 'pack');
CREATE TYPE product_status_enum AS ENUM ('active', 'inactive', 'discontinued', 'out_of_stock');

-- Return and inventory enums
CREATE TYPE return_type_enum AS ENUM ('return', 'exchange', 'refund', 'credit_note');
CREATE TYPE return_status_enum AS ENUM ('pending', 'approved', 'processed', 'rejected', 'completed');
CREATE TYPE inventory_movement_type_enum AS ENUM ('in', 'out', 'transfer', 'adjustment', 'return', 'damaged');

-- Treasury and system enums
CREATE TYPE treasury_transaction_type_enum AS ENUM ('receipt', 'payment', 'transfer', 'adjustment');
CREATE TYPE treasury_account_type_enum AS ENUM ('cash', 'bank', 'credit_card', 'paypal');
CREATE TYPE treasury_category_enum AS ENUM ('sales', 'purchase', 'refund', 'expense', 'income', 'transfer', 'payroll', 'utilities', 'rent', 'marketing');

-- User and system enums
CREATE TYPE user_role_enum AS ENUM ('owner', 'admin', 'manager', 'employee', 'viewer');
CREATE TYPE user_status_enum AS ENUM ('active', 'inactive', 'suspended');

CREATE TYPE tenant_status_enum AS ENUM ('active', 'suspended', 'cancelled', 'trial');
CREATE TYPE subscription_plan_type_enum AS ENUM ('trial', 'basic', 'premium', 'enterprise');
CREATE TYPE billing_cycle_enum AS ENUM ('monthly', 'quarterly', 'yearly');
CREATE TYPE subscription_status_enum AS ENUM ('active', 'cancelled', 'past_due', 'unpaid');

CREATE TYPE setting_type_enum AS ENUM ('string', 'number', 'boolean', 'json', 'array');
CREATE TYPE setting_scope_enum AS ENUM ('system', 'tenant', 'user');

CREATE TYPE audit_action_enum AS ENUM ('create', 'update', 'delete', 'login', 'logout');
CREATE TYPE risk_level_enum AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TYPE notification_type_enum AS ENUM ('info', 'warning', 'error', 'success', 'reminder', 'alert');
CREATE TYPE notification_priority_enum AS ENUM ('low', 'normal', 'high', 'urgent');

CREATE TYPE api_key_status_enum AS ENUM ('active', 'inactive', 'expired', 'revoked');
CREATE TYPE storage_provider_enum AS ENUM ('local', 'aws_s3', 'google_cloud', 'azure');

CREATE TYPE file_purpose_enum AS ENUM ('product_image', 'attachment', 'document', 'avatar', 'logo', 'receipt', 'invoice', 'other');

-- ============================================================================
-- CORE TENANT MANAGEMENT TABLES
-- ============================================================================

-- Tenants/Companies table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name VARCHAR(255) NOT NULL,
    company_name_ar VARCHAR(255),
    subdomain VARCHAR(100) UNIQUE,
    domain VARCHAR(255) UNIQUE,
    business_type VARCHAR(100) NOT NULL,
    industry VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    currency VARCHAR(3) DEFAULT 'SAR',
    language VARCHAR(5) DEFAULT 'en',
    fiscal_year_start DATE,
    logo_url VARCHAR(500),
    settings JSONB,
    subscription_plan subscription_plan_type_enum DEFAULT 'basic',
    subscription_status subscription_status_enum DEFAULT 'active',
    subscription_expires_at TIMESTAMP,
    max_users INTEGER DEFAULT 5,
    max_contacts INTEGER DEFAULT 1000,
    max_products INTEGER DEFAULT 10000,
    max_orders INTEGER,
    features JSONB,
    api_enabled BOOLEAN DEFAULT FALSE,
    backup_enabled BOOLEAN DEFAULT TRUE,
    status tenant_status_enum DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role_enum NOT NULL,
    permissions JSONB,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    language VARCHAR(5) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    last_login_at TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    password_changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    email_verified_at TIMESTAMP,
    status user_status_enum DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT users_email_unique_per_tenant UNIQUE (tenant_id, email)
);

-- Tenant subscriptions
CREATE TABLE tenant_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) NOT NULL,
    plan_type subscription_plan_type_enum NOT NULL,
    billing_cycle billing_cycle_enum NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    start_date DATE NOT NULL,
    end_date DATE,
    next_billing_date DATE,
    auto_renew BOOLEAN DEFAULT TRUE,
    payment_method VARCHAR(100),
    stripe_subscription_id VARCHAR(255),
    status subscription_status_enum DEFAULT 'active',
    trial_used BOOLEAN DEFAULT FALSE,
    features JSONB,
    limits JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- CORE BUSINESS ENTITIES
-- ============================================================================

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100),
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    color VARCHAR(7),
    icon VARCHAR(50),
    status contact_status_enum DEFAULT 'active',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT categories_name_unique_per_tenant UNIQUE (tenant_id, name)
);

-- Contacts table (Customers & Vendors)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    mobile VARCHAR(50),
    fax VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    tax_number VARCHAR(50),
    type contact_type_enum NOT NULL,
    tier contact_tier_enum,
    max_debt DECIMAL(15,2) DEFAULT 0.00,
    opening_balance DECIMAL(15,2) DEFAULT 0.00,
    total_sales DECIMAL(15,2) DEFAULT 0.00,
    total_purchases DECIMAL(15,2) DEFAULT 0.00,
    avatar_url VARCHAR(500),
    social_links JSONB,
    custom_fields JSONB,
    status contact_status_enum DEFAULT 'active',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255),
    description TEXT,
    description_ar TEXT,
    sku VARCHAR(100) NOT NULL,
    barcode VARCHAR(100),
    qr_code VARCHAR(255),
    category_id UUID NOT NULL REFERENCES categories(id),
    unit product_unit_enum DEFAULT 'piece',
    cost_price DECIMAL(15,2) NOT NULL,
    sale_price DECIMAL(15,2) NOT NULL,
    lowest_sell_price DECIMAL(15,2) DEFAULT 0.00,
    wholesale_price DECIMAL(15,2),
    retail_price DECIMAL(15,2),
    opening_quantity DECIMAL(10,3) DEFAULT 0,
    current_stock DECIMAL(10,3) DEFAULT 0,
    reserved_stock DECIMAL(10,3) DEFAULT 0,
    available_stock DECIMAL(10,3) DEFAULT 0,
    low_stock_threshold DECIMAL(10,3) DEFAULT 10,
    weight DECIMAL(8,3),
    dimensions VARCHAR(100),
    brand VARCHAR(100),
    model VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    images JSONB,
    attachments JSONB,
    custom_fields JSONB,
    seo_title VARCHAR(255),
    seo_description TEXT,
    tags JSONB,
    status product_status_enum DEFAULT 'active',
    track_inventory BOOLEAN DEFAULT TRUE,
    allow_backorders BOOLEAN DEFAULT FALSE,
    is_service BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT products_sku_unique_per_tenant UNIQUE (tenant_id, sku),
    CONSTRAINT products_barcode_unique_per_tenant UNIQUE (tenant_id, barcode)
);

-- ============================================================================
-- ORDER MANAGEMENT
-- ============================================================================

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    order_number VARCHAR(50) NOT NULL,
    order_type order_type_enum NOT NULL,
    contact_id UUID NOT NULL REFERENCES contacts(id),
    status order_status_enum NOT NULL,
    priority order_priority_enum DEFAULT 'normal',
    order_date DATE NOT NULL,
    delivery_date DATE,
    due_date DATE,
    subtotal DECIMAL(15,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    discount_amount DECIMAL(15,2) DEFAULT 0.00,
    shipping_cost DECIMAL(15,2) DEFAULT 0.00,
    handling_cost DECIMAL(15,2) DEFAULT 0.00,
    tax_rate DECIMAL(5,2) DEFAULT 0.00,
    tax_amount DECIMAL(15,2) DEFAULT 0.00,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0.00,
    unpaid_amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SAR',
    exchange_rate DECIMAL(10,6) DEFAULT 1.000000,
    shipping_address TEXT,
    billing_address TEXT,
    payment_terms VARCHAR(100),
    delivery_method VARCHAR(100),
    tracking_number VARCHAR(100),
    internal_notes TEXT,
    customer_notes TEXT,
    attachments JSONB,
    custom_fields JSONB,
    created_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT orders_number_unique_per_tenant_type UNIQUE (tenant_id, order_number, order_type)
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    item_number INTEGER NOT NULL,
    quantity_ordered DECIMAL(10,3) NOT NULL,
    quantity_delivered DECIMAL(10,3) DEFAULT 0.000,
    quantity_remaining DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    cost_price DECIMAL(15,2),
    discount_percentage DECIMAL(5,2) DEFAULT 0.00,
    discount_amount DECIMAL(15,2) DEFAULT 0.00,
    tax_rate DECIMAL(5,2) DEFAULT 0.00,
    tax_amount DECIMAL(15,2) DEFAULT 0.00,
    total_price DECIMAL(15,2) NOT NULL,
    total_cost DECIMAL(15,2) NOT NULL,
    profit_margin DECIMAL(5,2),
    notes TEXT,
    serial_numbers JSONB,
    batch_numbers JSONB,
    expiry_dates JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    transaction_number VARCHAR(50) NOT NULL,
    payment_type payment_type_enum NOT NULL,
    contact_id UUID NOT NULL REFERENCES contacts(id),
    order_id UUID REFERENCES orders(id),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    exchange_rate DECIMAL(10,6) DEFAULT 1.000000,
    payment_method payment_method_enum NOT NULL,
    reference_number VARCHAR(100),
    cheque_number VARCHAR(50),
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    description TEXT,
    transaction_date TIMESTAMP NOT NULL,
    cleared_date TIMESTAMP,
    reconciled BOOLEAN DEFAULT FALSE,
    reconciled_date TIMESTAMP,
    status payment_status_enum DEFAULT 'pending',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT payments_number_unique_per_tenant UNIQUE (tenant_id, transaction_number)
);

-- ============================================================================
-- RETURNS MANAGEMENT
-- ============================================================================

-- Returns table
CREATE TABLE returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    return_number VARCHAR(50) NOT NULL,
    order_id UUID NOT NULL REFERENCES orders(id),
    contact_id UUID NOT NULL REFERENCES contacts(id),
    return_type return_type_enum NOT NULL,
    status return_status_enum DEFAULT 'pending',
    priority order_priority_enum DEFAULT 'normal',
    return_date DATE NOT NULL,
    approved_date DATE,
    processed_date DATE,
    total_amount DECIMAL(15,2) NOT NULL,
    refund_amount DECIMAL(15,2) DEFAULT 0.00,
    restocking_fee DECIMAL(15,2) DEFAULT 0.00,
    reason VARCHAR(255),
    reason_details TEXT,
    condition VARCHAR(50),
    internal_notes TEXT,
    customer_notes TEXT,
    attachments JSONB,
    created_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT returns_number_unique_per_tenant UNIQUE (tenant_id, return_number)
);

-- Return items table
CREATE TABLE return_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    return_id UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL REFERENCES order_items(id),
    product_id UUID NOT NULL REFERENCES products(id),
    quantity_ordered DECIMAL(10,3) NOT NULL,
    quantity_returned DECIMAL(10,3) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    refund_unit_price DECIMAL(15,2),
    discount_amount DECIMAL(15,2) DEFAULT 0.00,
    total_amount DECIMAL(15,2) NOT NULL,
    refund_amount DECIMAL(15,2) NOT NULL,
    condition VARCHAR(50),
    damage_description TEXT,
    serial_number VARCHAR(100),
    batch_number VARCHAR(100),
    expiry_date DATE,
    restocking_fee DECIMAL(15,2) DEFAULT 0.00,
    notes TEXT,
    inspection_notes TEXT,
    photos JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- TREASURY & INVENTORY MANAGEMENT
-- ============================================================================

-- Treasury transactions table
CREATE TABLE treasury_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    transaction_number VARCHAR(50) NOT NULL,
    transaction_type treasury_transaction_type_enum NOT NULL,
    category treasury_category_enum NOT NULL,
    subcategory VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'SAR',
    exchange_rate DECIMAL(10,6) DEFAULT 1.000000,
    balance_before DECIMAL(15,2) NOT NULL,
    balance_after DECIMAL(15,2) NOT NULL,
    account_type treasury_account_type_enum NOT NULL,
    contact_id UUID REFERENCES contacts(id),
    order_id UUID REFERENCES orders(id),
    payment_method payment_method_enum NOT NULL,
    reference_number VARCHAR(100),
    cheque_number VARCHAR(50),
    bank_name VARCHAR(100),
    description TEXT,
    tags JSONB,
    location VARCHAR(100),
    project VARCHAR(100),
    transaction_date TIMESTAMP NOT NULL,
    cleared_date TIMESTAMP,
    reconciled BOOLEAN DEFAULT FALSE,
    reconciled_date TIMESTAMP,
    reconciled_by UUID REFERENCES users(id),
    attachments JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT treasury_transactions_number_unique_per_tenant UNIQUE (tenant_id, transaction_number)
);

-- Inventory movements table
CREATE TABLE inventory_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    movement_type inventory_movement_type_enum NOT NULL,
    quantity DECIMAL(10,3) NOT NULL,
    unit_cost DECIMAL(15,2),
    total_cost DECIMAL(15,2),
    reference_type VARCHAR(50),
    reference_id UUID,
    from_location VARCHAR(100),
    to_location VARCHAR(100),
    batch_number VARCHAR(100),
    serial_numbers JSONB,
    expiry_date DATE,
    reason VARCHAR(255),
    notes TEXT,
    movement_date TIMESTAMP NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- SYSTEM & AUDIT TABLES
-- ============================================================================

-- User settings table
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    setting_type setting_type_enum DEFAULT 'string',
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    is_encrypted BOOLEAN DEFAULT FALSE,
    scope setting_scope_enum DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT user_settings_unique_per_scope UNIQUE (tenant_id, user_id, setting_key, scope)
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action audit_action_enum NOT NULL,
    field_changes JSONB,
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES users(id),
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(255),
    change_reason TEXT,
    risk_level risk_level_enum DEFAULT 'low',
    api_endpoint VARCHAR(255),
    timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

-- API keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    key_name VARCHAR(100) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    key_prefix VARCHAR(20) NOT NULL,
    permissions JSONB,
    rate_limit INTEGER DEFAULT 1000,
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    ip_whitelist JSONB,
    user_agent_filter VARCHAR(255),
    status api_key_status_enum DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type notification_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    priority notification_priority_enum DEFAULT 'normal',
    category VARCHAR(50),
    action_url VARCHAR(500),
    action_text VARCHAR(100),
    read_at TIMESTAMP,
    clicked_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- File uploads table
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    original_filename VARCHAR(255) NOT NULL,
    stored_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500),
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_hash VARCHAR(64),
    storage_provider storage_provider_enum DEFAULT 'local',
    storage_bucket VARCHAR(100),
    storage_path VARCHAR(500),
    entity_type VARCHAR(50),
    entity_id UUID,
    purpose file_purpose_enum,
    is_public BOOLEAN DEFAULT FALSE,
    access_count INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Tenant isolation indexes (most important for multi-tenancy)
CREATE INDEX idx_all_tables_tenant_id ON tenants(id);
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_contacts_tenant_id ON contacts(tenant_id);
CREATE INDEX idx_categories_tenant_id ON categories(tenant_id);
CREATE INDEX idx_products_tenant_id ON products(tenant_id);
CREATE INDEX idx_orders_tenant_id ON orders(tenant_id);
CREATE INDEX idx_order_items_tenant_id ON order_items(tenant_id);
CREATE INDEX idx_payments_tenant_id ON payments(tenant_id);
CREATE INDEX idx_returns_tenant_id ON returns(tenant_id);
CREATE INDEX idx_return_items_tenant_id ON return_items(tenant_id);
CREATE INDEX idx_treasury_transactions_tenant_id ON treasury_transactions(tenant_id);
CREATE INDEX idx_inventory_movements_tenant_id ON inventory_movements(tenant_id);
CREATE INDEX idx_user_settings_tenant_id ON user_settings(tenant_id);
CREATE INDEX idx_audit_logs_tenant_id ON audit_logs(tenant_id);
CREATE INDEX idx_api_keys_tenant_id ON api_keys(tenant_id);
CREATE INDEX idx_notifications_tenant_id ON notifications(tenant_id);
CREATE INDEX idx_file_uploads_tenant_id ON file_uploads(tenant_id);
CREATE INDEX idx_tenant_subscriptions_tenant_id ON tenant_subscriptions(tenant_id);

-- Contact indexes
CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_phone ON contacts(phone);
CREATE INDEX idx_contacts_city ON contacts(city);

-- Product indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_low_stock ON products(current_stock, low_stock_threshold);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english', name));
CREATE INDEX idx_products_name_ar ON products USING gin(to_tsvector('simple', name_ar));

-- Category indexes
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_name ON categories USING gin(to_tsvector('english', name));

-- Order indexes
CREATE INDEX idx_orders_type ON orders(order_type);
CREATE INDEX idx_orders_contact ON orders(contact_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_created_by ON orders(created_by);
CREATE INDEX idx_orders_assigned_to ON orders(assigned_to);

-- Order item indexes
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_tenant_order ON order_items(tenant_id, order_id);

-- Payment indexes
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_contact ON payments(contact_id);
CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_date ON payments(transaction_date);
CREATE INDEX idx_payments_method ON payments(payment_method);
CREATE INDEX idx_payments_status ON payments(status);

-- Return indexes
CREATE INDEX idx_returns_order ON returns(order_id);
CREATE INDEX idx_returns_contact ON returns(contact_id);
CREATE INDEX idx_returns_status ON returns(status);
CREATE INDEX idx_returns_date ON returns(return_date);
CREATE INDEX idx_returns_number ON returns(return_number);

-- Return item indexes
CREATE INDEX idx_return_items_return ON return_items(return_id);
CREATE INDEX idx_return_items_order_item ON return_items(order_item_id);
CREATE INDEX idx_return_items_product ON return_items(product_id);

-- Treasury indexes
CREATE INDEX idx_treasury_type ON treasury_transactions(transaction_type);
CREATE INDEX idx_treasury_category ON treasury_transactions(category);
CREATE INDEX idx_treasury_date ON treasury_transactions(transaction_date);
CREATE INDEX idx_treasury_contact ON treasury_transactions(contact_id);
CREATE INDEX idx_treasury_order ON treasury_transactions(order_id);

-- Inventory indexes
CREATE INDEX idx_inventory_product ON inventory_movements(product_id);
CREATE INDEX idx_inventory_type ON inventory_movements(movement_type);
CREATE INDEX idx_inventory_date ON inventory_movements(movement_date);
CREATE INDEX idx_inventory_reference ON inventory_movements(reference_type, reference_id);

-- User and audit indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- Settings and notifications indexes
CREATE INDEX idx_user_settings_key ON user_settings(setting_key);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(read_at);
CREATE INDEX idx_api_keys_tenant_user ON api_keys(tenant_id, user_id);

-- File upload indexes
CREATE INDEX idx_file_uploads_entity ON file_uploads(entity_type, entity_id);
CREATE INDEX idx_file_uploads_user ON file_uploads(user_id);
CREATE INDEX idx_file_uploads_purpose ON file_uploads(purpose);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- Contact balance summary view
CREATE VIEW contact_balances AS
SELECT 
    c.id,
    c.tenant_id,
    c.name,
    c.type,
    c.opening_balance,
    COALESCE(s.total_sales, 0) as total_sales,
    COALESCE(p.total_payments, 0) as total_payments,
    COALESCE(pr.total_purchases, 0) as total_purchases,
    COALESCE(prpay.total_purchase_payments, 0) as total_purchase_payments,
    (c.opening_balance + COALESCE(s.total_sales, 0) - COALESCE(p.total_payments, 0)) as customer_balance,
    (c.opening_balance + COALESCE(pr.total_purchases, 0) - COALESCE(prpay.total_purchase_payments, 0)) as vendor_balance,
    c.created_at
FROM contacts c
LEFT JOIN (
    SELECT 
        contact_id,
        SUM(total_amount) as total_sales
    FROM orders 
    WHERE order_type = 'sales' 
    AND status NOT IN ('cancelled')
    GROUP BY contact_id
) s ON c.id = s.contact_id
LEFT JOIN (
    SELECT 
        contact_id,
        SUM(amount) as total_payments
    FROM payments 
    WHERE payment_type = 'receipt' 
    AND status = 'completed'
    GROUP BY contact_id
) p ON c.id = p.contact_id
LEFT JOIN (
    SELECT 
        contact_id,
        SUM(total_amount) as total_purchases
    FROM orders 
    WHERE order_type = 'purchase' 
    AND status NOT IN ('cancelled')
    GROUP BY contact_id
) pr ON c.id = pr.contact_id
LEFT JOIN (
    SELECT 
        contact_id,
        SUM(amount) as total_purchase_payments
    FROM payments 
    WHERE payment_type = 'payment' 
    AND status = 'completed'
    GROUP BY contact_id
) prpay ON c.id = prpay.contact_id;

-- Product inventory summary view
CREATE VIEW product_inventory_summary AS
SELECT 
    p.id,
    p.tenant_id,
    p.name,
    p.sku,
    p.category_id,
    c.name as category_name,
    p.current_stock,
    p.reserved_stock,
    p.available_stock,
    p.low_stock_threshold,
    p.cost_price,
    p.sale_price,
    (p.current_stock * p.cost_price) as inventory_value,
    CASE 
        WHEN p.current_stock <= p.low_stock_threshold THEN 'low_stock'
        WHEN p.current_stock = 0 THEN 'out_of_stock'
        ELSE 'in_stock'
    END as stock_status
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Order summary view
CREATE VIEW order_summary AS
SELECT 
    o.id,
    o.tenant_id,
    o.order_number,
    o.order_type,
    o.status,
    o.order_date,
    c.name as contact_name,
    c.type as contact_type,
    o.total_amount,
    o.paid_amount,
    o.unpaid_amount,
    o.created_by,
    u.first_name || ' ' || u.last_name as created_by_name,
    o.assigned_to,
    ua.first_name || ' ' || ua.last_name as assigned_to_name
FROM orders o
JOIN contacts c ON o.contact_id = c.id
LEFT JOIN users u ON o.created_by = u.id
LEFT JOIN users ua ON o.assigned_to = ua.id;

-- ============================================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_returns_updated_at BEFORE UPDATE ON returns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_treasury_transactions_updated_at BEFORE UPDATE ON treasury_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_file_uploads_updated_at BEFORE UPDATE ON file_uploads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tenant_subscriptions_updated_at BEFORE UPDATE ON tenant_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate available stock
CREATE OR REPLACE FUNCTION update_product_available_stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products 
    SET available_stock = current_stock - reserved_stock
    WHERE id = NEW.product_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update available stock when inventory movements occur
CREATE TRIGGER update_available_stock_on_inventory_movement
    AFTER INSERT ON inventory_movements
    FOR EACH ROW
    EXECUTE FUNCTION update_product_available_stock();

-- ============================================================================
-- SECURITY & ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tenant-specific tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE return_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE treasury_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policies for tenant isolation
-- Note: These policies assume you'll set a session variable or use Supabase auth context
-- You'll need to customize these based on your authentication strategy

-- Example policy for contacts (adjust based on your auth setup)
CREATE POLICY tenant_isolation_policy ON contacts
    FOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- You would create similar policies for all other tenant-specific tables
-- The exact implementation will depend on your Supabase auth configuration

-- ============================================================================
-- SAMPLE DATA FOR TESTING
-- ============================================================================

-- Sample tenant
INSERT INTO tenants (id, company_name, business_type, country, currency) 
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',
    'Test Business LLC',
    'retail',
    'United States',
    'USD'
);

-- Sample user
INSERT INTO users (id, tenant_id, email, first_name, last_name, role, password_hash)
VALUES (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440000',
    'admin@testbusiness.com',
    'Admin',
    'User',
    'owner',
    '$2b$10$example_hash_here' -- Replace with actual bcrypt hash
);

-- Sample category
INSERT INTO categories (id, tenant_id, name, created_by)
VALUES (
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440000',
    'Electronics',
    '550e8400-e29b-41d4-a716-446655440001'
);

-- ============================================================================
-- NOTES FOR SUPABASE IMPLEMENTATION
-- ============================================================================

/*
IMPORTANT NOTES FOR SUPABASE:

1. AUTHENTICATION INTEGRATION:
   - Replace the RLS policies with proper Supabase Auth integration
   - Use Supabase auth.uid() function for user identification
   - Consider using Supabase auth.jwt() for tenant identification

2. SUPABASE FUNCTIONS:
   - Create Supabase functions for complex business logic
   - Use Supabase RPC calls for database operations
   - Consider using Supabase storage for file uploads

3. REAL-TIME SUBSCRIPTIONS:
   - Set up real-time subscriptions for live updates
   - Consider performance impact on large datasets

4. BACKUP STRATEGY:
   - Configure automated backups in Supabase dashboard
   - Set up point-in-time recovery if needed

5. MONITORING:
   - Use Supabase dashboard for monitoring
   - Set up alerts for database performance issues

6. MIGRATIONS:
   - Use Supabase CLI for managing schema migrations
   - Keep this script as reference for initial setup

7. SEED DATA:
   - Remove sample data for production
   - Create proper seeding scripts for your use case

8. PERFORMANCE:
   - Monitor query performance with Supabase Analytics
   - Consider connection pooling for high traffic
   - Implement caching strategies as needed
*/

-- Script completion message
SELECT 'Business Management Database setup completed successfully!' as status;