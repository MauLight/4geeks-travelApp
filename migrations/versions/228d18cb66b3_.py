"""empty message

Revision ID: 228d18cb66b3
Revises: fd988391bf7a
Create Date: 2022-10-25 14:51:16.189973

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '228d18cb66b3'
down_revision = 'fd988391bf7a'
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
               nullable=True)
    # ### end Alembic commands ###
