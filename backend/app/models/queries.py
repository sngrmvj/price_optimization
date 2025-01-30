
CREATE_UUID_EXTENSION = """CREATE EXTENSION IF NOT EXISTS "uuid-ossp";"""



CREATE_UNIQUE_CONSTRAINT_PRODUCT = """
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_type = 'UNIQUE'
        AND table_name = 'products'
        AND constraint_name = 'uq_name_owner_id'
    ) THEN
        ALTER TABLE products
        ADD CONSTRAINT uq_name_owner_id UNIQUE (name, owner_id);
    END IF;
END $$;
"""



CREATE_INDEX_NAME = """
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'ix_products_name'
    ) THEN
        CREATE INDEX ix_products_name ON products (name);
    END IF;
END $$;
"""


CREATE_INDEX_CATEGORY = """
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'ix_products_category'
    ) THEN
        CREATE INDEX ix_products_category ON products (category);
    END IF;
END $$;
"""


CREATE_ROLES = """INSERT INTO roles (name) VALUES 
('admin'),
('buyer'),
('supplier')
ON CONFLICT (name) DO NOTHING;"""


CREATE_PERMISSIONS = """INSERT INTO permissions (name) VALUES 
('manage_users'),
('view_products'),
('add_products'),
('edit_products'),
('delete_products'),
('view_orders'),
('create_orders'),
('update_orders'),
('delete_orders')
ON CONFLICT (name) DO NOTHING;"""


CREATE_ROLE_PERMISSIONS_ADMIN = """INSERT INTO role_permission (role_id, permission_id) VALUES 
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='manage_users')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='view_products')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='add_products')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='edit_products')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='delete_products')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='view_orders')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='create_orders')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='update_orders')),
((SELECT id FROM roles WHERE name='admin'), (SELECT id FROM permissions WHERE name='delete_orders'))
ON CONFLICT DO NOTHING;"""


CREATE_ROLE_PERMISSIONS_BUYER = """INSERT INTO role_permission (role_id, permission_id) VALUES 
((SELECT id FROM roles WHERE name='buyer'), (SELECT id FROM permissions WHERE name='view_products')),
((SELECT id FROM roles WHERE name='buyer'), (SELECT id FROM permissions WHERE name='view_orders')),
((SELECT id FROM roles WHERE name='buyer'), (SELECT id FROM permissions WHERE name='create_orders'))
ON CONFLICT DO NOTHING;"""



CREATE_ROLE_PERMISSIONS_SUPPLIER = """INSERT INTO role_permission (role_id, permission_id) VALUES 
((SELECT id FROM roles WHERE name='supplier'), (SELECT id FROM permissions WHERE name='view_products')),
((SELECT id FROM roles WHERE name='supplier'), (SELECT id FROM permissions WHERE name='add_products')),
((SELECT id FROM roles WHERE name='supplier'), (SELECT id FROM permissions WHERE name='edit_products')),
((SELECT id FROM roles WHERE name='supplier'), (SELECT id FROM permissions WHERE name='view_orders')),
((SELECT id FROM roles WHERE name='supplier'), (SELECT id FROM permissions WHERE name='update_orders'))
ON CONFLICT DO NOTHING;"""
