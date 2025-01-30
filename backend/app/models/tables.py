
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float, Table, UniqueConstraint, Index
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid


Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role_id = Column(Integer, ForeignKey('roles.id'))

    role = relationship("Role")
    products = relationship("Product", back_populates="owner")


class Product(Base):
    __tablename__ = 'products'
    
    product_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    cost_price = Column(Float, nullable=False)
    selling_price = Column(Float, nullable=False)
    category = Column(String)
    stock_available = Column(Integer, nullable=False)
    units_sold = Column(Integer, nullable=False, default=0)
    customer_rating = Column(Float)
    demand_forecast = Column(Float)
    optimized_price = Column(Float)
    owner_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))

    owner = relationship("User", back_populates="products")

    __table_args__ = (
        UniqueConstraint('name', 'owner_id', name='_name_owner_uc'),
        Index('ix_products_name', 'name'),
        Index('ix_products_category', 'category'),
    )


role_permission_table = Table(
    'role_permission', Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.id'), primary_key=True),
    Column('permission_id', Integer, ForeignKey('permissions.id'), primary_key=True)
)


class Role(Base):
    __tablename__ = 'roles'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    users = relationship('User', back_populates='role')

    permissions = relationship('Permission', secondary=role_permission_table, back_populates='roles')



class Permission(Base):
    __tablename__ = 'permissions'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    
    roles = relationship('Role', secondary=role_permission_table, back_populates='permissions')
