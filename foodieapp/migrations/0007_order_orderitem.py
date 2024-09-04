# Generated by Django 5.1 on 2024-08-10 01:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foodieapp', '0006_rename_in_stock_meal_instock'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=255)),
                ('customer_mobile', models.CharField(max_length=15)),
                ('delivery_address', models.TextField()),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='foodieapp.meal')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='foodieapp.order')),
            ],
        ),
    ]