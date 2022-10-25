"""empty message

Revision ID: b21655426019
Revises: 3a05e3e724e8
Create Date: 2022-10-25 02:06:49.370166

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b21655426019'
down_revision = '3a05e3e724e8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('galleries', 'title',
               existing_type=sa.VARCHAR(length=100),
               nullable='False')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('galleries', 'title',
               existing_type=sa.VARCHAR(length=100),
               nullable=False)
    # ### end Alembic commands ###