"""empty message

Revision ID: 2b10953b2f89
Revises: 43fa42d7bf44
Create Date: 2022-10-24 19:44:04.092743

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b10953b2f89'
down_revision = '43fa42d7bf44'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('galleries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('filename', sa.String(length=200), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstname', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=50), nullable=False),
    sa.Column('birthdate', sa.String(length=50), nullable=True),
    sa.Column('gender', sa.String(length=20), nullable=True),
    sa.Column('languages', sa.String(length=20), nullable=True),
    sa.Column('countryofresidence', sa.String(length=20), nullable=True),
    sa.Column('socialmedia', sa.String(length=20), nullable=True),
    sa.Column('photos', sa.String(length=20), nullable=True),
    sa.Column('verified', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('mytrips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('travelling', sa.Integer(), nullable=False),
    sa.Column('with_children', sa.Boolean(), nullable=False),
    sa.Column('gender_specific', sa.Integer(), nullable=False),
    sa.Column('stay', sa.Integer(), nullable=False),
    sa.Column('budget', sa.Integer(), nullable=False),
    sa.Column('partner_age', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('trekking', sa.Boolean(), nullable=True),
    sa.Column('gastronomy', sa.Boolean(), nullable=True),
    sa.Column('cultural', sa.Boolean(), nullable=True),
    sa.Column('nightlife', sa.Boolean(), nullable=True),
    sa.Column('shopping', sa.Boolean(), nullable=True),
    sa.Column('trips_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['trips_id'], ['mytrips.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False),
    sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('email', name='user_email_key')
    )
    op.drop_table('activities')
    op.drop_table('mytrips')
    op.drop_table('users')
    op.drop_table('galleries')
    # ### end Alembic commands ###
